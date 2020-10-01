let baseUrl = "http://localhost:3000"

$(document).ready(function () {
    checkLogin()
})

function login(event) {
    event.preventDefault();
    let email = $("#login-email").val();
    let password = $("#login-password").val();
    $.ajax({
            url: `${baseUrl}/users/login`,
            method: "POST",
            data: {
                email,
                password
            }
        })
        .done(data => {
            console.log(data, '<<<<<<<<<<<<<<<<< data login');
            localStorage.setItem("token", data.token)
            checkLogin()

        })
        .fail(err => {
            console.log(err.responseJSON.errors, '<<<<<<<<<<<<<<<<< error login');
        })
}

function checkLogin() {
    if (localStorage.token) {
        $('#login-page').hide()
        } else {
        $('#login-page').show()

    }
}

