$(document).ready(function() 
{
  var otc_table = $('#otc_underlyings').DataTable(
  {
    "order": [0, 'asc']
  });

  $('#otc_underlyings tbody').on( 'click', 'tr', function () 
  {

  });

  $(this).on("on_otc_underlyings", function (e, underlyings) 
  {
    for (var i = 0; i < underlyings.length; i++) 
    {
      otc_table.row.add(underlyings[i]).draw(false);
    }
  });
});

