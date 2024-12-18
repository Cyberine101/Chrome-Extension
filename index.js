let links = []
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("links"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
    links = leadsFromLocalStorage;
    render(links);
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        links.push(tabs[0].url);
        localStorage.setItem("links", JSON.stringify(links) );
        render(links);
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    links = []
    render(links)
})

inputBtn.addEventListener("click", function() {
    links.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("links", JSON.stringify(links) )
    render(links)
})