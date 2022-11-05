var ProductAPI = "http://localhost:3000/product";

function start() {
    getProduct(renderProduct);
}
start();
function getProduct(callback) {
    fetch(ProductAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function deleteProduct(id) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(ProductAPI + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function() {
            getUser(renderUser);
        });
}

function updateProduct(data,id,callback) {
    var option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(ProductAPI + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function() {
            getUser(renderUser);
        });
}

function renderProduct(product) {
    var listOrderBlock = document.querySelector('.orders-render');
    var htmls = product.map(function(product) {
        return `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>
                <img src="${product.image}" alt="" style="height: 50px;width:50px">
            </td>
            <td>${product.price}</td>
            <td>${product.priceSale}</td>
            <td>${product.brand}</td>
            <td>
                <button class="info-btn" data-index="${product.id}"  onclick="openChangeForm(this)">
                    <i class="info-icon fas fa-edit"></i>
                </button>
                <button class="trash-btn" onclick="openDeleteForm(${product.id})">
                    <i class="info-trash fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });
    listOrderBlock.innerHTML = htmls.join('');
}

var modal = document.querySelector('.modal')
var modalCreate = document.querySelector('.modal-create')
var closeForm = document.querySelector('.js-modal-close')
var closeFormCreate = document.querySelector('.js-modalCreate-close')
var inputName = document.querySelector('#name-change')
var inputImg = document.querySelector('#img-change')
var inputPrice = document.querySelector('#price-change')
var inputPriceSale = document.querySelector('#priceSale-change')
var inputBrand = document.querySelector('#brand-change')
var saveBtn = document.querySelector('#Save-change')
var newBtn = document.querySelector('.create-btn')
var linkImg = document.querySelector('#link-img')
function openChangeForm(d) {
    modal.classList.add('open')
    getProduct(function(product) {
        var valueTest = product.find(function(product) {
            return product.id == d.getAttribute("data-index");
        })
        inputName.value = valueTest.name
        inputImg.value = valueTest.image
        inputPrice.value = valueTest.price
        inputPriceSale.value = valueTest.priceSale
        inputBrand.value = valueTest.brand
        saveBtn.onclick = function() {
            let name = inputName.value;
            let img = inputImg.value;
            let price = inputPrice.value;
            let priceSale = inputPriceSale.value;
            let brand = inputBrand.value;
            let formData = {
                name: name,
                image:img,
                price:price,
                priceSale:priceSale,
                brand:brand
            };
            updateProduct(formData,d.getAttribute("data-index"), function() {
                getProduct(renderProduct);
            });
        }
    })
}

closeForm.addEventListener('click' ,function() {
    modal.classList.remove('open')
})

function openDeleteForm(id) {
    deleteProduct(id);
}

function chooseFile(fileInput) {
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#imageLoad').attr('src', e.target.result);
        }
        reader.readAsDataURL(fileInput.files[0]);
    }
}

newBtn.onclick = function() {
    modalCreate.classList.add('open')

}

closeFormCreate.addEventListener('click' ,function() {
    modalCreate.classList.remove('open')
})