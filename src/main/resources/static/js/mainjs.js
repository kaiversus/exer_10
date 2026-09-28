$(document).ready(function() {
    if (window.location.pathname.includes('/user/profile')) {
        $.ajax({
            type: 'GET',
            url: '/users/me',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            beforeSend: function(xhr) {
                if (localStorage.token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
                }
            },
            success: function(data) {
                $('#profile').html(data.fullName + ' (' + data.email + ')');
                if (data.images) {
                    var imgSrc = (data.images.startsWith('http') || data.images.startsWith('/')) ? data.images : '/images/' + data.images;
                    document.getElementById("images").src = imgSrc;
                }
            },
            error: function() {
                alert("Sorry, you are not logged in.");
                window.location.href = "/login";
            }
        });
    }

    $('#logout').click(function() {
        localStorage.clear();
        window.location.href = "/login";
    });

    $('#login').click(function() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var basicInfo = JSON.stringify({
            email: email,
            password: password
        });
        $.ajax({
            type: "POST",
            url: "/auth/login",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: basicInfo,
            success: function(data) {
                localStorage.token = data.token;
                window.location.href = "/user/profile";
            },
            error: function() {
                alert("Login Failed: Incorrect email or password");
            }
        });
    });

    $('#btnRegister').click(function() {
        var fullName = document.getElementById('regFullName').value;
        var email = document.getElementById('regEmail').value;
        var password = document.getElementById('regPassword').value;
        if (!email || !password || !fullName) {
            alert("Please fill in all fields");
            return;
        }
        var regData = JSON.stringify({
            fullName: fullName,
            email: email,
            password: password
        });
        $.ajax({
            type: "POST",
            url: "/auth/signup",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: regData,
            success: function() {
                alert("Account created successfully! You can now log in.");
                $('#email').val(email);
                $('#password').val(password);
                var loginTabTrigger = document.querySelector('#login-tab');
                if (loginTabTrigger) {
                    var tab = new bootstrap.Tab(loginTabTrigger);
                    tab.show();
                }
            },
            error: function() {
                alert("Registration failed! Email might already be registered.");
            }
        });
    });
});
