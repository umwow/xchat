var nameChange = document.getElementById('changeName');
var form = document.getElementById('chat-form');
var input = document.getElementById('msg');
var usr = document.querySelector('.is-5');
var usrHash = document.querySelector('.is-6');

/*
 * grab query string params
 * source: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
function qs(str) {
    var half = location.search.split(str + '=')[1];
    return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
}

var name = qs('name');

// change username
nameChange.addEventListener('click', function() {
    window.history.back();
});

var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
    socket.emit('joined', {
        name: name
    });
    //console.log('Connected to socket.io server');
});

socket.on('chat message', function(data) {
    // pure javascript timestamp
    var now = new Date();
    console.log(data.name)
    // convert timestamp to human readable format
    var timestamp = now.toLocaleTimeString();

    console.log('New Message');
    console.log(data.text);
    var parent = document.getElementById('childElement').parentNode;
    var newNode = document.createElement("p");
    newNode.innerHTML = '<p class="button is-disabled">' + '#' + data.name + '</p>' +
        ' - ' + ' ' +
    ' ' + '<p class="button">' + data.text + '</p>'  +' ' + ' <b class="button is-warning is-disabled">' + ' ' + timestamp + '</b>';
    parent.appendChild(newNode);
});

// add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value === '') {
        return false;
    }
    socket.emit('chat message', {
        text: input.value,
        name: name
    });
    input.value = '';
});
