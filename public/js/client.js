var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
  //console.log('Connected to socket.io server');
});



socket.on('message', function(data) {
  console.log('New Message');
    console.log(data.text);
    var parent = document.getElementById('childElement').parentNode;
    var newNode = document.createElement("p");
    newNode.innerHTML = data.text;
    parent.appendChild(newNode);

});

var form = document.getElementById('chat-form');
var input = document.getElementById('msg');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  socket.emit('message', {text:input.value});
  input.value = '';
});

// store the FORM object in variable
//var form = $('#message-form');
// grab the user input
//var input = $('#msg');
// form event-listener
//form.submit(function(e) {
  // Cancels the event if it is cancelable,
  // without stopping further propagation of the event.
  //e.preventDefault();
  // send message out to others
  //socket.emit('message', {
    //text: input.val()
  //})
  // clear the input field after submit
  //input.val('');
//});
