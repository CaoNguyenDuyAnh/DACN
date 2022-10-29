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

function renderOrders(order) {
    var listOrderBlock = document.querySelector('.orders-render');
    console.log(listOrderBlock)
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
                <button class="info-btn">
                    <i class="info-icon fas fa-edit"></i>
                </button>
                <button class="trash-btn">
                    <i class="info-trash fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });
    listOrderBlock.innerHTML = htmls.join('');
}