$(document).ready(function() 
{
  var otc_table = $('#otc_underlyings').DataTable(
  {
    "order": [0, 'asc']
  });

  $('#otc_underlyings tbody').on( 'click', 'tr', function ()
  {
    if ($(this).hasClass('info'))
    {
      $(this).removeClass('info');
    }
    else 
    {
      $('#otc_underlyings tr.info').removeClass('info');
      $(this).addClass('info');
    }
  });

  $(this).on("on_otc_underlyings", function (e, underlyings) 
  {
    for (var i = 0; i < underlyings.length; i++) 
    {
      otc_table.row.add(underlyings[i]).draw(false);
    }
  });
});

