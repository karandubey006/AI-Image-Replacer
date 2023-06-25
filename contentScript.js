let images = document.querySelectorAll('img');
function detect(event) {
    console.log(event.src)
        chrome.runtime.sendMessage({msg: 'image', input: { src: event.src}, index: i}, function({data, index}){
            if (data) {
                event.src = "";
                event.alt = "This image was generated using AI.";
            }
        });
}
for (e in images) {
    e.addEventListener("mousover", )
}
