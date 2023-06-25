
/* chrome.storage.sync.get(['switchState'], function(result) {
    const switchState = result.switchState;
    run = switchState;
    console.log(run)
}); */

// let images = document.getElementsByTagName('img');


let images = document.querySelectorAll("img");
console.log("hello")
for(let i = 0; i < images.length; i++){
    if (images[i].width < 150 || images[i].height < 150) continue;
    chrome.runtime.sendMessage({src: images[i].src, index: i}, function({data, index}){
    if (data) {
        images[index].src = "";
        images[index].alt = "This image was generated using AI."
    }
    });
}



