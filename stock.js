const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const btnEdit = document.getElementsByClassName('btn-edit')

document.addEventListener('DOMContentLoaded', e => { fetchData() });
btnEdit.addEventListener('click', e => {})


function addProduct() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "htpp://api.tempel.ar/products", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
            "image": "https://picsum.photos/600",
            "name": "Asado",
            "price": 1000.0,
    }));

    return true;
}


// Traer productos
const fetchData = async () => {
    const res = await fetch('http://api.tempel.ar/products');
    // const res = await fetch('http://localhost:5000/products');

    const data = await res.json()
    console.log(data.result)
    renderCards(data)
}

// Pintar productos
const renderCards = data => {
    data.result.forEach(item => {
        // setTimeout(function() {}, 10)
        templateCard.querySelector("img").setAttribute("src", item.image)
        templateCard.querySelector('h5').textContent = item.name
        templateCard.querySelector('p').textContent = item.price
        templateCard.querySelector('button').dataset.id = item.product_id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

function openWindow() {
    document.getElementsByClassName("popUp").style.display="block";
}