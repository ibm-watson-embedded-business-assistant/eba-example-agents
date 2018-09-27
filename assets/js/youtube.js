window.onload = function() {
  for (let a of document.getElementsByTagName('a')) {
    let match = a.href.match(/https?:\/\/www\.youtube\.com\/watch\?v=(.*)$/)
    if (match) {
      let video = match[1]
      let wrapper = document.createElement("div")
      wrapper.style.position = "relative"
      wrapper.style.height = "0"
      wrapper.style.paddingTop = "25px"
      wrapper.style.paddingBottom =  "56.25%"

      let iframe = document.createElement("iframe")
      iframe.src = "https://www.youtube-nocookie.com/embed/#{video}"
      iframe.style.border = "none"
      iframe.style.position = "absolute"
      iframe.style.top = "0"
      iframe.style.left = "0"
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.allow = "autoplay; encrypted-media"
      iframe.setAttribute("allowFullScreen", "")

      wrapper.appendChild(iframe)
      a.parentNode.insertBefore(wrapper, a)
      a.remove()
    }
  })
}
