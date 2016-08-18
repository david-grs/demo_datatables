$(document).ready(function() 
{
  var editor = new $.fn.dataTable.Editor( 
  {
    ajax: function (data, success, error) { return true; },table: "#underlyings",
      fields: [ {
        label: "Source UL:",
      name: "source_ul"
      }, {
        label: "Destinartion UL:",
      name: "dest_ul"
      }
  ]});

  $('#underlyings').on( 'click', 'tbody td', function (e) 
  {
    editor.inline(this);
  });

  var underlyings = $('#underlyings').DataTable(
  {
    dom: "Bfrtip",
      columns: [
        { data: "source_ul" },
        { data: "dest_ul" }
      ], 
      "order": [0, 'asc'],
  });
});

