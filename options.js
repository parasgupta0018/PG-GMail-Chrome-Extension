function homebadge() {
    $('.name').nameBadge({
        border: {
            color: '#ddd',
            width: 0
        },
        colors: ['#8C6D62', '#f85931', "#3498db", "#f1c40f", '#ce1836', "#9b59b6", "#2ecc71", "#34495e",
            "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
            "#e67e22", "#e74c3c", "#95a5a6", "#f39c12",
            "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d", '#edb92e', "#1abc9c"
        ],
        text: '#fff',
        size: 36,
        margin: 5,
        middlename: true,
        uppercase: true

    });
}
const colors = ['#8C6D62', '#f85931', "#3498db", "#f1c40f", '#ce1836', "#9b59b6", "#2ecc71", "#34495e",
    "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
    "#e67e22", "#e74c3c", "#95a5a6", "#f39c12",
    "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d", '#edb92e', "#1abc9c"
];
$(document).ready(function() {
    homebadge();
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#profile-pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function() {
        readURL(this);

    });

    $(".upload-button").on('click', function() {
        $(".file-upload").click();
    });
});

chrome.storage.sync.get("user_array", ({ user_array }) => {
    if (user_array) {
        update_list(user_array)
    } else {
        user_array = [];
        update_list(user_array)
    }
});


chrome.storage.onChanged.addListener(function(changes, storageName) {
    update_new_list(changes.user_array.newValue)
})

function update_new_list(user_array) {
    if (user_array.length != 0) {
        var user_info = '';
        user_array.forEach(user_function);

        function user_function(user, index) {
            imgdata = localStorage.getItem(`${user.email}`);
            if (imgdata == '') {
                var color = colors[index];
                user_info +=
                    `<tr>
                    <th style="vertical-align: middle;" scope="row">` + (index + 1) + `</th>
                    <td style="vertical-align: middle;"><div class="name" style="background-color: ` + color + `!important">` + user.email + `</div></td>
                    <td style="vertical-align: middle;">` + user.username + `</td> 
                    <td style="vertical-align: middle;">` + user.email + `<i class="fa fa-trash fa-2x" style="color:red;float: right;cursor:pointer"></i></td>
                </tr>`;
            } else {

                user_info +=
                    `<tr>
                    <th style="vertical-align: middle;" scope="row">` + (index + 1) + `</th>
                    <td style="vertical-align: middle;"><img class="profile-pic" src=` + imgdata + `></td>
                    <td style="vertical-align: middle;">` + user.username + `</td> 
                    <td style="vertical-align: middle;">` + user.email + `<i class="fa fa-trash fa-2x" style="color:red;float: right;cursor:pointer"></i></td>
                </tr>`;
            }
        }
        document.getElementById("tbody").innerHTML = user_info;
        homebadge();
    } else {
        document.getElementById("tbody").innerHTML =
            `<tr style="text-align:center">
            <td colspan="4">No User added !!</td>
        </tr> `
    }

    $('.fa-trash').click(function(e) {
        deleteAccount(e.target.parentElement.innerText)
    })
}

function update_list(user_array) {
    // console.log(user_array.length == 0)
    if (user_array.length != 0) {
        var user_info = '';
        user_array.forEach(user_function);

        function user_function(user, index) {
            imgdata = localStorage.getItem(`${user.email}`);
            if (imgdata == '') {
                var color = colors[index];
                user_info +=
                    `<tr>
                    <th style="vertical-align: middle;" scope="row">` + (index + 1) + `</th>
                    <td style="vertical-align: middle;"><div class="name" style="background-color: ` + color + `!important">` + user.email + `</div></td>
                    <td style="vertical-align: middle;">` + user.username + `</td> 
                    <td style="vertical-align: middle;">` + user.email + `<i class="fa fa-trash fa-2x" style="color:red;float: right;cursor:pointer"></i></td>
                </tr>`;
            } else {

                user_info +=
                    `<tr>
                    <th style="vertical-align: middle;" scope="row">` + (index + 1) + `</th>
                    <td style="vertical-align: middle;"><img class="profile-pic" src=` + imgdata + `></td>
                    <td style="vertical-align: middle;">` + user.username + `</td> 
                    <td style="vertical-align: middle;">` + user.email + `<i class="fa fa-trash fa-2x" style="color:red;float: right;cursor:pointer"></i></td>
                </tr>`;
            }
        }
        document.getElementById("tbody").innerHTML = user_info;
        homebadge();
    } else {
        document.getElementById("tbody").innerHTML =
            `<tr style="text-align:center">
            <td colspan="4">No User added !!</td>
        </tr> `
    }

    $('.fa-trash').click(function(e) {
        deleteAccount(e.target.parentElement.innerText)
    })

}

function check_email(user_array, email) {
    var flag = 0
    user_array.forEach(function(user, index) {
        if (user.email == email) {
            flag++;
        }
    })
    if (flag != 0) return true
    else return false
}

function deleteAccount(email) {
    if (confirm('Are you sure you want to delete account (' + email + ')?')) {
        chrome.storage.sync.get("user_array", ({ user_array }) => {
            user_array.forEach(function(user, index) {
                if (user.email == email) {
                    user_array.splice(index, 1);
                    localStorage.removeItem(`${user.email}`)
                }
            })
            chrome.storage.sync.set({ user_array });

        });
    } else {
        return
    }
}

$(document).ready(function() {
    $('#add-user-form').submit(function(e) {
        e.preventDefault();
        var FormElement = document.getElementById('add-user-form');
        var formData = new FormData(FormElement);
        var username = formData.get('username');
        var email = formData.get('email');

        var imgdata = ($('#profile-pic').attr('src'))

        var user = { username, email }

        chrome.storage.sync.get("user_array", ({ user_array }) => {
            if (user_array) {
                var check = check_email(user_array, email)
                if (!check) {
                    user_array.push(user);
                    document.getElementById('alert').innerHTML = `<div class="alert alert-success alert-dismissible fade show" style="text-align: center" role="alert">
                        User Account added!!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                        </div>`;

                    localStorage.setItem(`${email}`, imgdata);
                } else {
                    document.getElementById('alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" style="text-align: center" role="alert">
                        User Account already exists!!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                        </div>`;

                }
            } else {
                var user_array = [];
                user_array.push(user);
            }
            chrome.storage.sync.set({ user_array });

        })

        document.getElementsById("add-user-form").reset();
        $('#profile-pic').attr('src', '');
    });

})