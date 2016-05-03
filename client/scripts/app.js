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
      app.writeMessages(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }

  });
};



app.writeMessages = function(array) {

  for (var i = 0; i < array.results.length; i++) {
    $('.chat-container').append('<div class="message" id=' + array.results[i].objectId + '></div>');
    $('#' + array.results[i].objectId).text(array.results[i].text);
  }
};



$(document).ready(function() {
  //click handler to fetch
  $('#get-messages').on('click', app.fetch);
  //click handler to send
  $('#send-messages').on('click', function() { 
    //get the value 'hihi' from the input field
    message.text = _.escape($('#input-message').val());
    $('#input-message').val('')
    app.send(message); 
  });




   



}); 
