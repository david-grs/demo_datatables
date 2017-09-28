$(document).ready(function() 
{
  var table = $('#underlyings').DataTable(
  {
    "order": [0, 'asc']
  });
    
  var tableItems = $('#items').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": "data.json"
  });
    
  setInterval( function () {
    tableItems.ajax.reload(null, false);
  }, 1000 );

  $('#underlyings tbody').on( 'click', 'tr', function ()
  {
    if ($(this).hasClass('info'))
    {
      $(this).removeClass('info');
    }
    else 
    {
      $('#underlyings tr.info').removeClass('info');
      $(this).addClass('info');
    }
  });

  $(this).on("on_underlyings", function (e, underlyings) 
  {
    for (var i = 0; i < underlyings.length; i++) 
    {
      table.row.add(underlyings[i]).draw(false);
    }
  });
});

