var UserAPI = "http://localhost:3000/users";

function start() {
    getUser(renderUser);
}
start();
function getUser(callback) {
    fetch(UserAPI)
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
    fetch(UserAPI + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function() {
            getUser(renderUser);
        });
}

function updateUser(data,id,callback) {
    var option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(UserAPI + '/' + id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function() {
            getUser(renderUser);
        });
}

function renderUser(users) {
    var listOrderBlock = document.querySelector('.orders-render');
    var htmls = users.map(function(users) {
        return `
        <tr>
            <td>${users.id}</td>
            <td>${users.fullname}</td>
            <td>${users.email}</td>
            <td>${users.address}</td>
            <td>${users.Role}</td>
            <td>
                <button class="info-btn info-js" data-index="${users.id}"  onclick="openChangeForm(this)">
                    <i class="info-icon fas fa-edit"></i>
                </button>
                <button class="trash-btn" onclick="openDeleteForm(${users.id})">
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
var inputName = document.querySelector('#name-change')
var inputEmail = document.querySelector('#email-change')
var optRole = document.querySelector('#modal-option')
var saveBtn = document.querySelector('#Save-change')
function openChangeForm(d) {
    modal.classList.add('open')
    getUser(function(users) {
        var valueTest = users.find(function(users) {
            return users.id == d.getAttribute("data-index");
        })
        inputName.value = valueTest.fullname
        inputEmail.value = valueTest.email
        optRole.value = valueTest.Role
        saveBtn.onclick = function() {
            let name = inputName.value;
            let email = inputEmail.value;
            let role = optRole.value;
            let formData = {
                fullname: name,
                email: email,
                Role: role
            };
            updateUser(formData,d.getAttribute("data-index"), function() {
                getUser(renderUser);
            });
        }
    })
}

closeForm.addEventListener('click' ,function() {
    modal.classList.remove('open')
})

function openDeleteForm(id) {
    deleteUser(id);
}

