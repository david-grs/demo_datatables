$(document).ready(function() 
{
  var table = $('#underlyings').DataTable(
  {
    "order": [0, 'asc']
  });

  var selected = [];

  var tableItems = $('#items').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "http://localhost:8000/data.json",
            "crossDomain": true,
            "dataType": "jsonp"            
        },
        colReorder: {
            realtime: false
        },
        "rowCallback": function( row, data ) {
            if ( $.inArray(data.DT_RowId, selected) !== -1 ) {
                $(row).addClass('selected');
            }
        }
  });
 
    $('#items tbody').on('click', 'tr', function () {
        var id = this.id;
        var index = $.inArray(id, selected);
 
        if ( index === -1 ) {
            selected.push( id );
        } else {
            selected.splice( index, 1 );
        }
 
        $(this).toggleClass('selected');
    } );
    
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

