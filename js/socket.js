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
    var fx_underlyings = json["fx_underlyings"];
    var underlyings = json["underlyings"];

    $(document).trigger("on_fx_underlyings",  [fx_underlyings]);
    $(document).trigger("on_underlyings", [underlyings]);
  };
});

