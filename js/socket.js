$(document).ready(function() {
  var socket = new WebSocket("ws://localhost:8080/bla");

  socket.onopen = function() 
  {
    socket.send("get_conf");
  };

  socket.onerror = function(err) { alert(err); }
  socket.onclose = function(err) { alert("closed"); }

  socket.onmessage = function(msg) 
  {
    console.log("received: " + msg.data);

    json = JSON.parse(msg.data);
    var fx_underlyings = json["fx_underlyings"];
    var otc_underlyings = json["otc_underlyings"];

    $(document).trigger("on_fx_underlyings",  [fx_underlyings]);
    $(document).trigger("on_otc_underlyings", [otc_underlyings]);
  };
});

