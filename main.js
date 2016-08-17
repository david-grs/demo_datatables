$(document).ready(function() {
  var socket = new WebSocket("ws://localhost:8080/bla");

  socket.onopen = function() {
    socket.send("get_conf");
  };

  socket.onerror = function(err) { alert(err); }
  socket.onclose = function(err) { alert("closed"); }

  /*
  var editor = new $.fn.dataTable.Editor( {
    ajax: function (data, success, error) { return true; },table: "#underlyings",
      fields: [ {
        label: "Source UL:",
      name: "source_ul"
      }, {
        label: "Destinartion UL:",
      name: "dest_ul"
      }
  ]});

  $('#underlyings').on( 'click', 'tbody td', function (e) {
    editor.inline(this);
  });

  var underlyings = $('#underlyings').DataTable({
    dom: "Bfrtip",
      columns: [
        { data: "source_ul" },
        { data: "dest_ul" }
      ], 
      "order": [0, 'asc'],
  });
  */
  var underlyings = $('#underlyings').DataTable({
      "order": [0, 'asc']
  });

  $('#underlyings tbody').on( 'click', 'tr', function () {
    $(this).toggleClass('selected info');
  });

  socket.onmessage = function(msg) {
    console.log("received: " + msg.data);

    ul = JSON.parse(msg.data);
    for (var i = 0; i < ul.length; i++) {
      underlyings.row.add(ul[i]).draw(false);
    }
  };
});

