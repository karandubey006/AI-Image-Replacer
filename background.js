const artificialTolerance = 0.4

var process = false;
chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){
  if(message.src && process){
    const src = message.src;
    /* if (src.substring(0,4).includes("data")) {
        console.log("failed to read data URL")
        senderResponse({data: true, index: message.index})
        return true;
    } */
    console.log(src)
    console.log("fetching pika")
    const str = `http://127.0.0.1:5000/inference?src=${src}`;
    let reqSrc = str
    if (src.substring(0,4) !== "data") {
        reqSrc = str.split("&").join("%26");
    }
    fetch(reqSrc)
        .then(response => response.json(), (err) => { console.log(err) })
        .then(data => {
            console.log(src, data)
            senderResponse({data: parseFloat(data.artificial) >= artificialTolerance, index: message.index});
        })
        .catch(error => console.log("error", error));
    /* fetch('https://some-random-api.ml/img/pikachu')
          .then(response => response.text())
          .then(data => {
            let dataObj = JSON.parse(data);
            senderResponse({data: dataObj, index: message.index});
          })
          .catch(error => console.log("error", error)) */
      return true;  // Will respond asynchronously.
  }
  if (message.action === "toggleContentScript") {
    process = message.enabled;
  }
});