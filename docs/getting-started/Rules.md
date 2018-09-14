## Rules

So far, anytime that we want to search for products we must have the keyword 'products' within the original sentence. It is likely that real users will want to ask less qualified questions, such as 'whats trending now?'. It is clear to us that this is a request to search for current trending products. Watson will likewise understand this if we add the following rewriting rule:

`wmt:TrendingNow -> wmt:Trending(wmt:Products)`

A rewriting rule effectively rewrites a higher level concept into a set of already existing lower level concepts. Here we are rewriting a request for `wmt:TrendingNow` into a request for trending products. We already added a pattern for this concept, so save your changes and try the question 'what's trending now'?