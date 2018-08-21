### Visualizers

Watson is able to understand our questions, but these raw JSON responses are not very pretty. We should add some visualizers to our frontend.

Switch to the Assets tab, create two assets, and mark them as frontend. The first asset is `wmt/products.jsx` and the second is `wmt/product.css`. Make sure you set the type of each file appropriately, viz. `text/jsx` and `text/css`

In jsx file we will declare the following objects, viz. `wmt_ProductsData` and `wmt_ProductData`. Each concept can be assigned a visualization following the pattern: `<namespace>_<Concept>Data`. The data produced by our actions is passed to these functions for visaulization.

Add the following jsx code to your asset:

```
wmt_ProductsData = ({data}) => {
  return (
    <div className="wmt-products">
      { data.map((item) =>
        React.createElement(
          wmt_ProductData,
          {data:item, key:item.itemId})) }
    </div>)
}

wmt_ProductData = ({data}) => {
  const item = data
  return (
    <div key={item.itemId} className="wmt-product">
      <div className="wmt-product-info">
        <a href={item.addToCartUrl} target="_blank" className="wmt-product-info-image">
          <img src={item.mediumImage}/>
        </a>
        <div className="wmt-product-info-name">
          <p><strong>{item.name}</strong></p>
          <p>
            {new Number(item.salePrice)
              .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD"})
              .replace(/\.00/,"")}
            {item.msrp && item.salePrice/item.msrp < 0.99 ?
              <span> {"\u2014 "}
                <span className="wmt-product-discount">
                  {new Number(1-item.salePrice/item.msrp)
                    .toLocaleString("en-US", {style: "percent"})}
                  {" off MSRP"}
                </span>
              </span> : null}
          </p>
        </div>
      </div>
      <div className="wmt-product-info-description">
        <div dangerouslySetInnerHTML={{__html:wmt_decodeHTMLEntities(item.shortDescription
)}}/>
      </div>
    </div>)
}

wmt_decodeHTMLEntities = (encoded) => {
  if (encoded) {
    var elem = document.createElement('textarea')
    elem.innerHTML = encoded.replace(/[\uFFFD]/g,' ')
    return elem.value
  }
  else return ""
}

```

Our system understands that products is a list of product elements, so in our products visualizer, we simply call `data.map` to render each individual product. Inside of the product visualizer, we implement an html outline and fill in the tags with raw data from our product, e.g. `item.mediumImage`. These html tags make use of a few styles which we will expose in our second asset.

In the css file, add the following styles:

```
.wmt-product {
  margin-bottom: 20px;
}
.wmt-product:last-child {
  margin-bottom: 0;
}
.wmt-product-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.wmt-product-info img {
  max-width: 100px;
  margin-right: 15px;
}
.wmt-product-discount {
  color: red;
}
.wmt-product-info-description {
  display: block;
  overflow: hidden;
  line-height: 16px;
  max-height: calc(16px * 5);
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}
```

We now have some nice visaulizations for our responses. Save your changes and try them out. Note: if you do not see any changes, try refreshing your browser. Session refresh and browser refresh are two distinct operations within our application.

### The End For Now

At this point, you should have a working Walmart sample, which is almost identical to the sample we have posted online. There are always a points of improvement. We leave these as an exercise to the reader. For instance, you may have noticed that our action bodies are almost identical. In this case, we may create a backend asset which encapsulates our http request to walmart by exposing a simple `get` function with takes certain configuration parameters. You can then import this asset within your actions and perform a single function call to return the appropriate data. Additionally, the NLG could be improved for a few responses. You may reference our other public samples for examples on how to tune NLG using our helpers package. And, of course, feel free to extend the sample according to your desire.
