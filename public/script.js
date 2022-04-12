document.querySelector('.overview').addEventListener('click', () => {
    window.open('http://127.0.0.1:1800/overview','_self')
})

document.querySelector('.log').addEventListener('click', () => {
    window.open('http://127.0.0.1:1800/log','_self')
})

document.querySelector('.spreadsheet').addEventListener('click', () => {
    window.open('http://127.0.0.1:1800/spreadsheet','_self')
})

document.querySelector('.preferences').addEventListener('click', () => {
    window.open('http://127.0.0.1:1800/preferences','_self')
})

let name = document.cookie.split('=').pop();
document.querySelector('.s1-name').innerHTML = name.charAt(0).toUpperCase() + name.slice(1,name.length);
document.querySelector('.s1-initial').innerHTML = name.charAt(0).toUpperCase() 