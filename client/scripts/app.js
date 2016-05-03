var message = {
  username: window.location.search.slice(10),
  text: '',
  roomname: 'in your head'
};

//psuedoclassical method for making the app
var AppMaker = function() {};


var app = new AppMaker();

//init method
app.init = function() {
  app.server = 'https://api.parse.com/1/classes/messages';
};

//send method
app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    // dataType: 'jsonp',
    success: function(data) {
      app.addMessage(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }

  });
};



app.addMessage = function(data) {

    for (var i = 0; i < data.results.length; i++) {
      $('.chat-container').append('<div class="chat" id=' + data.results[i].objectId + '></div>');
      $('#' + data.results[i].objectId).text(data.results[i].text);
      //call addRoom(roomname)
      app.addRoom(data.results[i].roomname);
    }


};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.addRoom = function(roomname) {
  var roomnames = $('#dropdown>option').map(function() {
    return $(this).val();
  });
  roomnames = Array.prototype.slice.apply(roomnames);
  console.log(roomname);
  if (roomnames.indexOf(roomname) === -1) {
    $('#dropdown').append('<option value=' + roomname + '>' + roomname + '</option>');
  }

  //check if the new room name is in the room
  //if not then add it. 
};


$(document).ready(function() {
  //click handler to fetch
  $('#get-messages').on('click', app.fetch);
  //click handler to send
  $('#send-messages').on('click', function() { 
    //get the value 'hihi' from the input field
    message.text = _.escape($('#input-message').val());
    $('#input-message').val('');
    app.send(message); 
  });
  //clear messages
  $('#clear-messages').on('click', app.clearMessages);



   



}); 
