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
    xhr.open("POST", "http://api-tempel-ar.herokuapp.com/products", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
            "image": "https://picsum.photos/600",
            "name": "Asado",
            "price": 1000.0,
    }));

    return true;
}

function sendData () {
    // (A) GET FORM DATA
    var data = {
        name: document.getElementById('product-name').value,
        price: document.getElementById('product-price').value,
        image: document.getElementById('product-image').value,
        amount: document.getElementById("product-amount").value
    }

    // (B) INIT FETCH POST
    fetch("https://api-tempel-ar.herokuapp.com/products", {
        method: "POST",
        body: JSON.stringify(data)
    })

    // (C) RETURN SERVER RESPONSE AS TEXT
    .then((result) => {
        if (result.status != 200) { throw new Error("Bad Server Response"); }
        return result.text();
    })

    // (D) SERVER RESPONSE
    .then((response) => {
        console.log(response);
    })

    // (E) HANDLE ERRORS - OPTIONAL
    .catch((error) => { console.log(error); });

    // (F) PREVENT FORM SUBMIT
    return false;
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




/*
$(document).ready(function(){
    $("#open-pop-up").on("click", function(){
        $("#popUp").fadeIn(slow);
    });
});
*/

/*
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
myInput.focus()
})


var exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
var button = event.relatedTarget
  // Extract info from data-bs-* attributes
var recipient = button.getAttribute('data-bs-whatever')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
var modalTitle = exampleModal.querySelector('.modal-title')
var modalBodyInput = exampleModal.querySelector('.modal-body input')

modalTitle.textContent = 'New message to ' + recipient
modalBodyInput.value = recipient
})
*/
