console.log("confirm working")
chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){
  if(message.msg === "image"){
    console.log(message.msg)
    const src = message.input.src;
    const str = `http://127.0.0.1:5000/inference?src=${src}`;
    const reqSrc = str.split("&").join("%26");
    fetch(reqSrc)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            senderResponse({data: parseFloat(data.artificial) >= 0.5, index: message.index});
          })
          .catch(error => console.log("error", error))
      return true;  // Will respond asynchronously.
  }
});


async function isAIGenerated(src) {
    console.log(src)
    const response = (await fetch(reqSrc));
    const data = await response.json();
    console.log(data)
    return parseFloat(data.artificial) >= 0.5;
}