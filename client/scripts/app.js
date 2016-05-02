
$(document).ready(function() {
  //example $post
// var message = {
//   username: 'tlc',
//   text: 'i am here ',
//   roomname: 'in your head'
// };


  $('form').on('submit', function(e) {  
    var message = {
      username: 'tlc',
      text: $('#msg').val(),
      roomname: 'in your head'
    };
  // console.log($('#msg').val());
    event.preventDefault();
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
   // $.get('https://api.parse.com/1/classes/messages', function(data) {
   //    for (var i = 0; i < data.results.length; i++) {
   //      // console.log(data.results[i]);
   //      if (data.results[i].username === 'tlc' && data.results[i].text === 'tj rolls!!') {
   //        console.log(data.results[i]);
   //        // var toBeRemoved =
   //      }
   //    }
   // });

  });

}); 
