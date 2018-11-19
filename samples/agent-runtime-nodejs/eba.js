const request = require("request-promise")
const crypto = require("crypto")
const _ = require("lodash")

function levenshtein(pat, text) {
    let m = pat.length
    let n = text.length

    let v0 = []
    let v1 = []

    for (var i = 0; i <= n; i++) {
        v0[i] = 0
        v1[i] = 0
    }

    for (var i = 0; i < m; i++) {
        v1[0] = i + 1

        for (var j = 0; j < n; j++) {
            let cost = pat[i] == text[j] ? 0 : 1
            v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost)
        }

        for (var k = 0; k <= n; k++) {
            v0[k] = v1[k]
        }
    }

    return Math.min(...v0)
}

function normalize(text) {
    return _.toLower(text).replace(/[-.,;:\"'!?\(\)\{\}\[\]]/g, '')
}

function fuzzyCheck(text, pat) {
    let patN = normalize(pat)
    let base = patN.length
    return base > 0
        ? levenshtein(patN, normalize(text)) / base < 0.3
        : true
}

function startsWith(text, pat) {
    return _.startsWith(_.toLower(text), _.toLower(pat))
}

function endsWith(text, pat) {
  return _.endsWith(_.toLower(text), _.toLower(pat))
}

function contains(text, pat) {
    return _.toLower(text).indexOf(_.toLower(pat)) != -1
}

function between(value, range) {
    let d = new Date(value)
    if (d != 'Invalid Date') {
        return range != null && d >= new Date(range.from) && d <= new Date(range.to)
    } else {
        return range != null && value >= range.from && value <= range.to
    }
}

function evaluateOperator(p) {
    if (p == "<")  return (x, y) => x <  y
    if (p == "<=") return (x, y) => x <= y
    if (p == "=")  return (x, y) => x == y
    if (p == "<>") return (x, y) => x != y
    if (p == ">=") return (x, y) => x >= y
    if (p == ">")  return (x, y) => x >  y
    if (p == "startsWith") return startsWith
    if (p == "endsWith") return endsWith
    if (p == "contains") return contains
    if (p == "like") return fuzzyCheck
    if (p == "between") return between

    throw `unknown comparison operator: ${p}`
}

function bearerAuth(token) {
    return `bearer ${token}`
}

class LazyLike {
    constructor(source) {
        this.source = source
    }

    lazyTake(n) {
        return new LazyLike(_.take(this.source, n))
    }

    lazySort(column) {
        return new LazyLike(_.sortBy(this.source, column))
    }

    lazyValues(column) {
        return new LazyLike(_.map(this.source, column))
    }

    lazyFilter(column, predicate, value) {
        let f = evaluateOperator(predicate)
        return new LazyLike(_.filter(this.source, obj => f(_.get(obj, column), value)))
    }

    lazyFilters(filters) {
        function check(obj) {
            return _.reduce(filters, (result, [column, predicate, value]) => result || evaluateOperator(predicate)(_.get(obj, column), value), false)
        }

        return new LazyLike(_.filter(this.source, check))
    }

    lazyPortion(percentile) {
        let n = Math.round(_.size(this.source) * percentile)
        return new LazyLike(_.take(this.source, n))
    }

    lazyReverse() {
        return new LazyLike(_.reverse(this.source))
    }

    lazyLength() {
        return new LazyLike(_.size(this.source))
    }

    lazyFirst() {
        return new LazyLike(_.head(this.source))
    }

    lazyLast() {
        return new LazyLike(_.last(this.source))
    }

    toJSON() {
        return this.source
    }

    lazyForce() {
        return this.source
    }
}

class LazyValue {
    constructor(apiurl, token, source) {
        this.apiurl = apiurl
        this.token = token
        this.source = source || {}
    }

    putOnTop(method, args) {
        return new LazyValue(this.apiurl, this.token, {
            method: method,
            args: args,
            type: this.source.type,
            kind: this.source.kind,
            source: this.source
        })
    }

    lazyTake(n) {
        return this.putOnTop("take", [n])
    }

    lazySort(column) {
        return this.putOnTop("sort", [column])
    }

    lazyValues(column) {
        return this.putOnTop("values", [column])
    }

    lazyFilters(filters) {
        return this.putOnTop("filter", filters)
    }

    lazyFilter(column, predicate, value) {
        return this.putOnTop("filter", [[column, predicate, value]])
    }

    lazyPortion(percentile) {
        return this.putOnTop("portion", [percentile])
    }

    lazyReverse() {
        return this.putOnTop("reverse")
    }

    lazyLength() {
        return this.putOnTop("length")
    }

    lazyFirst() {
        return this.putOnTop("first")
    }

    lazyLast() {
        return this.putOnTop("last")
  }

    toJSON() {
        return this.source
    }

    lazyForce() {
        return request.post({
            uri: `${this.apiurl}api/v0/force`,
            headers: { "Authorization": bearerAuth(this.token) },
            body: this.source,
            json: true
        })
    }
}

class GenericLazyExecutor {
    load(json) {
        return null
    }

    apply(data, method, args) {
        let lazyLike = new LazyLike(data)

        switch (method) {
            case "length":
                return lazyLike.lazyLength().source

            case "first":
                return lazyLike.lazyFirst().source

            case "last":
                return lazyLike.lazyLast().source

            case "take":
                return lazyLike.lazyTake(...args).source

            case "portion":
                return lazyLike.lazyPortion(...args).source

            case "sort":
                return lazyLike.lazySort(...args).source

            case "values":
                return lazyLike.lazyValues(...args).source

            case "reverse":
                return lazyLike.lazyReverse().source

            case "filter":
                return lazyLike.lazyFilters(args).source
        }
    }

    force(json) {
        let { method, args, source } = json

        if (method == "local") {
            return this.load(source)
        } else {
            return Promise.resolve(this.force(source)).then(data => this.apply(data, method, args))
        }
    }
}

class NLToken {
    static load(json) {
        let prop = _.map(json.prop, pairs => [
                pairs[0],
                pairs[1] ? NLToken.load(pairs[1]) : null]
                )
        return new NLToken(json.name, json.data, prop)
    }

    constructor(name, data = null, prop = []) {
        this.name = name
        this.data = data
        this.prop = prop
    }

    addProperty(name, token) {
        this.prop.unshift([name, token])
        return this
    }
}

class Params {
    constructor(params) {
        this.agent = params.agent
        this.apiurl = params.apiurl
        this.token = params.token
        this.input = params.input
        this.settings = params.settings
        this.storage = params.storage

        this.__apiurl = this.settings.apiurl || this.apiurl
    }

    makeLazyData(source) {
        return new LazyValue(this.__apiurl, this.token, {
            method: "local",
            type: `${this.agent}LazyData`,
            kind: "genericLazyData",
            source: source
        })
    }

    getLazy(paramName) {
        let node = this.input[paramName]

        if (!node) return null

        if (node.data && node.data.kind == "genericLazyData") {
            return new LazyValue(this.__apiurl, this.token, node.data)
        } else {
            return new LazyLike(node.data)
        }
    }

    get(paramName) {
        let lazyData = this.getLazy(paramName)
        return lazyData ? lazyData.lazyForce() : null
    }

    getName(paramName) {
        let node = this.input[paramName]

        return node ? node.name : null
    }

    getMeta(paramName) {
        let node = this.input[paramName]

        return node ? NLToken.load(node.meta) : null
    }

    load(path) {
        return request.get({
            uri: `${this.__apiurl}api/v0/storage/${path}`,
            headers: { "Authorization": bearerAuth(this.token) }
        })
    }

    save(path, data) {
        return request.put({
            uri: `${this.__apiurl}api/v0/storage/${path}`,
            headers: { "Authorization": bearerAuth(this.token) },
            body: data,
            json: true
        })
    }

    query(queryString) {
        return request.get({
            uri: `${this.__apiurl}api/v0/ontology`,
            headers: { "Authorization": bearerAuth(this.token) },
            qs: { query: queryString },
            json: true
        })
    }
}

class Result {
    constructor(output = {}) {
        this.output = output
        this.storage = {}
    }

    set(paramName, node) {
        _.merge(this.output, _.fromPairs([[paramName, node]]))
        return this
    }

    setData(paramName, data) {
        return this.set(paramName, { data: data })
    }

    setName(paramName, nodeName) {
        return this.set(paramName, { name: nodeName })
    }

    setType(paramName, type) {
        return this.set(paramName, { type: type })
    }

    setMeta(paramName, meta) {
        return this.set(paramName, { meta: meta })
    }

    addTags(paramName, ...tags) {
        return this.set(paramName, { addTags: tags })
    }

    store(key, value) {
        _.merge(this.storage, _.fromPairs([[key, value]]))
        return this
    }
}

function sha1(input) {
    return crypto.createHash("sha1").update(input, "utf8").digest("hex")
}

function makeAnnotation(conceptName, confidence, data) {
    return {
        id: sha1(conceptName),
        concept: conceptName,
        confidence: confidence,
        data: data
    }
}

function insertAnnotation({ token, annotations }, conceptName, confidence = 1, data = null) {
    return {
        token: token,
        annotations: annotations.concat(makeAnnotation(conceptName, confidence, data))
    }
}

function hasAnnotation({ annotations }, conceptName) {
    return _.findIndex(annotations, { concept: conceptName }) != -1
}

function mapTree(tree, f) {
    let [rootLabel, subForest] = tree
    return [
        f(rootLabel),
        _.map(subForest, subTree => mapTree(subTree, f))
    ]
}

function reduceTree(tree, f, accumulator) {
    let [rootLabel, subForest] = tree
    return _.reduce(subForest, (s, subTree) => reduceTree(subTree, f, s), f(accumulator, rootLabel))
}

function flattenTree(tree) {
  return reduceTree(tree, (acc, root) => _.concat(acc, root), []);
}

module.exports = {Params, Result, LazyLike, LazyValue, GenericLazyExecutor, NLToken, mapTree, reduceTree, flattenTree, makeAnnotation, insertAnnotation, hasAnnotation}
