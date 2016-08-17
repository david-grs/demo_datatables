
$(document).ready(function() {
  var underlyings = $('#underlyings').DataTable();
  var socket = new WebSocket("ws://localhost:8080/bla");
  
  socket.onopen = function() {
    socket.send("get_conf");
  };

  socket.onmessage = function(msg) {
    console.log("received: " + msg.data);
    
    ul = JSON.parse(msg.data);
    for (var i = 0; i < ul.length; i++) {
      underlyings.row.add(ul[i]).draw(false);
    }
  };

  socket.onerror = function(err) { alert(err); }
  socket.onclose = function(err) { alert("closed"); }
});

