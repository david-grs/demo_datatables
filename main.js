$(document).ready(function() {
  var fx_underlyings = []; // list of all FX underlyings, for completion purposes
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
  var grid_otc = $('#otc_underlyings').DataTable({
    "order": [0, 'asc']
  });

  $('#otc_underlyings tbody').on( 'click', 'tr', function () {
  });

  socket.onmessage = function(msg) {
    console.log("received: " + msg.data);

    var msg = JSON.parse(msg.data);
    fx_underlyings = msg["fx_underlyings"];
    var otc = msg["otc_underlyings"]

    $(".fx_underlying").autocomplete({
      source: fx_underlyings,
      delay: 0
    });

    for (var i = 0; i < otc.length; i++) {
      grid_otc.row.add(otc[i]).draw(false);
    }
  };
});

