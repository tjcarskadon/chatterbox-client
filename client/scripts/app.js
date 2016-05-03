var message = {
  username: window.location.search.slice(10),
  text: '',
  roomname: ''
};


//psuedoclassical method for making the app
var AppMaker = function() {};


var app = new AppMaker();

app.rooms = {};
//init method
app.init = function() {
  app.server = 'https://api.parse.com/1/classes/messages';
  setInterval(app.fetch, 1000);
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
      app.clearMessages();
      app.addMessage(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }

  });
};



app.addMessage = function(data) {
  var selectedRoom = $('#roomSelect option:selected').text();

  for (var i = 0; i < data.results.length; i++) {


    if (data.results[i].text && data.results[i].text !== ' ' && selectedRoom === 'Select A Chat Room' ) {
      $('.chat-container').append('<div class="chat" id=' + data.results[i].objectId + '></div>');
      $('#' + data.results[i].objectId).text(data.results[i].text);
    } else if (selectedRoom === data.results[i].roomname) {
      $('.chat-container').append('<div class="chat" id=' + data.results[i].objectId + '></div>');
      $('#' + data.results[i].objectId).text(data.results[i].text);
    }
    if ( !app.rooms.hasOwnProperty(data.results[i].roomname )) {
      app.rooms[data.results[i].roomname] = data.results[i].roomname;
      app.addRoom(data.results[i].roomname);
    }
  }
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.addRoom = function(uniqueRoom) {
  
  $('#roomSelect').append('<option value=' + uniqueRoom + '>' + uniqueRoom + '</option>');
};


$(document).ready(function() {
    app.init();
  //click handler to fetch
  $('#get-messages').on('click', app.fetch);
  //click handler to send
  $('#send-messages').on('click', function() { 
    //get the value 'hihi' from the input field
    message.text = _.escape($('#input-message').val());
    $('#input-message').val('');
    message.roomname = $('#roomSelect option:selected').text();
    app.send(message); 
  });
  //clear messages
  $('#clear-messages').on('click', app.clearMessages);



   



}); 
