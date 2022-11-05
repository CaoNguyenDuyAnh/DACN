var OrderAPI = "http://localhost:3000/orders";

function start() {
    getOrder(renderOrders);
}
start();
function getOrder(callback) {
    fetch(OrderAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function deleteUser(id) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(OrderAPI + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function() {
            getOrder(renderOrders);
        });
}

function renderOrders(order) {
    var listOrderBlock = document.querySelector('.orders-render');
    var htmls = order.map(function(order) {
        return `
        <tr>
            <td>${order.id}</td>
            <td>${order.fullname}</td>
            <td>${order.dateOrder}</td>
            <td>${order.total}</td>
            <td>${order.pay}</td>
            <td>${order.ship}</td>
            <td>
                <button class="info-btn" data-index="${order.id}"  onclick="openChangeForm(this)">
                    <i class="info-icon fas fa-edit"></i>
                </button>
                <button class="trash-btn" onclick="openDeleteForm(${order.id})">
                    <i class="info-trash fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });
    listOrderBlock.innerHTML = htmls.join('');
}

var modal = document.querySelector('.modal')
var closeForm = document.querySelector('.js-modal-close')
var nameCustomer = document.querySelector('#name-order')
var dateOrder = document.querySelector('#day-order')
var sumOrder = document.querySelector('#sum-order')
var paymentOrder = document.querySelector('#payment-order')
var statusOrder = document.querySelector('#status-order')

function openChangeForm(d) {
    modal.classList.add('open')
    getOrder(function(order) {
        var valueTest = order.find(function(order) {
            return order.id == d.getAttribute("data-index");
        })
        nameCustomer.value = valueTest.fullname
        dateOrder.value = valueTest.dateOrder
        sumOrder.value = valueTest.total
        paymentOrder.value = valueTest.pay
        statusOrder.value = valueTest.ship
    })
}

closeForm.addEventListener('click' ,function() {
    modal.classList.remove('open')
})

function openDeleteForm(id) {
    deleteUser(id);
}
