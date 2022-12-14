

var productApi = 'http://localhost:3000/product';

function start() {
    getProducts(renderProducts);
}

start();


//Functions

function getProducts(callback) {
    fetch(productApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderProducts(product) {
    var listProductBlock = document.querySelector('.product-render');
    var htmls = product.map(function(product) {
        return `
        <div class="grid__column-2-4 product-sale-hover" data-id="${product.id}" onclick="getDataIndex(this)">
            <span class="product-sale-note">Sale!</span>
            <a href="./detailProduct.html" class="product-sale-link">
                <img src="${product.image}" alt="" class="product-sale-img">
                <div class="product-sale-content">
                    <h2 class="product-sale-heading">${product.name}</h2>
                    <span class="product-sale-price">${product.price}</span>
                    <span class="product-sale-price_sale">${product.priceSale}</span>
                </div>
            </a>
            <button class="product-sale-btn">
                <a href="" class="product-sale-add">Add to cart</a>
                <p class="product-sale-test" style = "display:none"></p>
            </button>
        </div>
        `;
    });
    listProductBlock.innerHTML = htmls.join('');
}


function getDataIndex(d) {
    d.getAttribute("data-id")
    console.log( d.getAttribute("data-id"))
    getProducts(function renderOneProduct(product) {
        var a = product.find(function(product) {
            return product.id == d.getAttribute("data-id")
        })
    })
}


