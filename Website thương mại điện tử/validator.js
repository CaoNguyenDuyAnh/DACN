function validator (formSelector, options ) {

    if(!options) {
        options ={};
    }

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement; 
            }
            element = element.parentElement;
            
        }
    }
    formRules = {};
    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là Email';
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`;
            }
        },
    }
    var formElement = document.querySelector(formSelector);
    if (formElement) {

        var inputs = formElement.querySelectorAll('[name][rules]')

        for(var input of inputs) {
            var rules = input.getAttribute('rules').split('|');

            for(var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    
                    rule = ruleInfo [0];
                }
                var ruleFunc =validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                }else {
                    formRules[input.name] = [ruleFunc];
                }


                
            }
            input.onblur = handleValidate;
            input.oninput = handleClearError;


        }

        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;
            for(var rule of rules) {
                errorMessage = rule(event.target.value);
                if(errorMessage) break;
            }

            if(errorMessage) {
                var formGroup = getParent(event.target, '.form-group');
                if(formGroup) {
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if(formMessage) {
                        formMessage.innerText = errorMessage
                    }
                }
            }
            return !errorMessage;
        }

        function handleClearError (event) {
            var formGroup = getParent(event.target, '.form-group'); 
            if(formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid')
                var formMessage = formGroup.querySelector('.form-message');
                if(formMessage) {
                    formMessage.innerText = '';
                }
            }
        }
    }

    formElement.onsubmit = function (event) {
        event.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;
        for(var input of inputs) {
            if(!handleValidate({target: input })) {
                isValid = false;
            }
        }
        if (isValid) {
            if(typeof options.onsubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                var formValues = Array.from(enableInputs).reduce(function(values,input){
                    switch(input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name ="' +input.name + '"]:checked' ).value;
                            break;
                        case 'checkbox':
                            if(!input.matches(':checked')){
                                values[input.name] = [];
                                return values;
                            } 
                            if(!Array.isArray(values[input.name])){
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        default:
                            values[input.name] = input.value;
                    }
                    return values;
                    },{})

                options.onsubmit(formValues);
            } else {
                formElement.submit();
            }
        }
    }
}


// Change form
var openLogin = document.querySelector('#validator-form-login')
var openRegister = document.querySelector('#validator-form-regist')
var openFormLogin = document.querySelector('.form-login')
var openFormRegister = document.querySelector('.form-register')


openLogin.onclick = function(e) {
    e.preventDefault();
    openFormLogin.classList.add('open')
    openFormRegister.classList.add('remove')
}

openRegister.onclick = function(e) {
    e.preventDefault();
    openFormLogin.classList.remove('open')
    openFormRegister.classList.remove('remove')
}


// login

var userAPI = 'http://localhost:3000/users';

var loginBtn = document.getElementById('loginBtn')


function getUser(callback) {
    fetch(userAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

loginBtn.onclick = function(e) {
    var emailInput = document.getElementById('email-login').value;
    var passInput = document.getElementById('password-login').value
    e.preventDefault();
    getUser(function(users) {
        var user = users.find(function(user) {
            return user.email === emailInput && user.password === passInput
        })
        if (user == undefined) {
            console.log("Không có tài khoản")

        }else {
            console.log('đăng nhập thành công')
        }

    })
}

