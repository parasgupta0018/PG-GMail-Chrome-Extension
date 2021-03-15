$(document).ready(function() {
    $('.name').nameBadge({

        // boder options
        border: {
            color: '#ddd',
            width: 0
        },

        // an array of background colors.
        colors: ['#8C6D62', '#f85931', "#3498db", "#f1c40f", '#ce1836', "#9b59b6", "#2ecc71", "#34495e",
            "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
            "#e67e22", "#e74c3c", "#95a5a6", "#f39c12",
            "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d", '#edb92e', "#1abc9c"
        ],

        // text color
        text: '#fff',

        // avatar size
        size: 36,

        // avatar margin
        margin: 5,

        // disable middle name 
        middlename: true,

        // force uppercase
        uppercase: true

    });
});

function openEmail() {
    $('.list-group-item').click(function(e) {
        var parent = e.target.parentNode;
        var parent_tag = e.target.parentNode.tagName;
        while (parent_tag != 'LI') {
            parent = parent.parentNode;
            parent_tag = parent.tagName;
        }

        var email = parent.firstChild.lastChild.lastChild.innerText
        var url = 'https://mail.google.com/mail/u/?authuser=' + email;
        chrome.tabs.query({ currentWindow: true, active: true },
            function(tabArray) {
                var id = (tabArray[0].id + 1);
                console.log(id)
                chrome.tabs.create({ url: url, index: id });
            }
        );
        // 
    });
}

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
        uppercase: true,

    });
}
const colors = ['#8C6D62', '#f85931', "#3498db", "#f1c40f", '#ce1836', "#9b59b6", "#2ecc71", "#34495e",
    "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
    "#e67e22", "#e74c3c", "#95a5a6", "#f39c12",
    "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d", '#edb92e', "#1abc9c"
];

function update_list(user_array) {

    if (user_array.length != 0) {
        var user_info = '';
        user_array.forEach(user_function);

        function user_function(user, index) {
            imgdata = localStorage.getItem(`${user.email}`);
            if (imgdata == '') {
                var color = colors[index];
                user_info += `<li class="list-group-item justify-content-between"><div class="row"><div class="col-sm-3 col-wid"><div class="name" style="background-color: ` + color + ` !important">` + user.email + `</div></div><div class="col-sm-9"><span class="account-username">` + user.username + `</span><br><span class="account-email">` + user.email + `</span></div></div></li>`
            } else {
                user_info += `<li class="list-group-item justify-content-between"><div class="row"><div class="col-sm-3 col-wid"><img class="profile-pic" src=` + imgdata + `></div><div class="col-sm-9"><span class="account-username">` + user.username + `</span><br><span class="account-email">` + user.email + `</span></div></div></li>`
            }
        }

        document.getElementById("accounts").innerHTML = user_info;
        homebadge();
        openEmail();
    } else {
        $('#accounts').hide();
        $('#none').show();
    }
}

function update_new_list(user_array) {
    if (user_array.length != 0) {
        var user_info = '';
        user_array.forEach(user_function);

        function user_function(user, index) {
            imgdata = localStorage.getItem(`${user.email}`);
            if (imgdata == '') {
                var color = colors[index];
                user_info += `<li class="list-group-item justify-content-between"><div class="row"><div class="col-sm-3 col-wid"><div class="name" style="background-color: ` + color + ` !important">` + user.email + `</div></div><div class="col-sm-9"><span class="account-username">` + user.username + `</span><br><span class="account-email">` + user.email + `</span></div></div></li>`
            } else {
                user_info += `<li class="list-group-item justify-content-between"><div class="row"><div class="col-sm-3 col-wid"><img class="profile-pic" src=` + imgdata + `></div><div class="col-sm-9"><span class="account-username">` + user.username + `</span><br><span class="account-email">` + user.email + `</span></div></div></li>`
            }
        }
        document.getElementById("accounts").innerHTML = user_info;
        homebadge();
        openEmail();
    } else {
        $('#accounts').hide();
        $('#none').show();
    }

}
chrome.storage.sync.get("user_array", ({ user_array }) => {
    if (user_array) {
        update_list(user_array)
    } else {
        $('#accounts').hide();
        $('#none').show();
    }
});


chrome.storage.onChanged.addListener(function(changes, storageName) {
    update_new_list(changes.user_array.newValue)
})