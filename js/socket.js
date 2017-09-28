$(document).ready(function() {
  var socket = new WebSocket("ws://localhost:8080/");

  socket.onopen = function() 
  {
    socket.send("get_conf");
    
    $("#textStatus")
      .text("Connected")
      .removeClass()
      .addClass("text-success"); 
  }

  socket.onerror = function(e) { socket.close(); }

  socket.onclose = function(e)
  {
    $("#textStatus")
      .text("Disconnected")
      .removeClass()
      .addClass("text-danger");
  }

  socket.onmessage = function(msg)
  {
    console.log("received: " + msg.data);

    json = JSON.parse(msg.data);
    
    if (json["message"] == "item");
        $(document).trigger("on_item",  json);
  };
});

