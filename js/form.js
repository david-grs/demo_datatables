$(document).ready(function() 
{
  var underlyings = []; 
    
  $(this).on("on_underlyings", function (e, data) 
  {
    underlyings = data;
    
    $(".underlying").autocomplete(
    {
      source: underlyings,
      delay: 0
    })
    .keyup(function() 
    {
      if (underlyings.indexOf($("#srcUnderlying").val()) == -1
          || underlyings.indexOf($("#dstUnderlying").val()) == -1
          || $("#srcUnderlying").val() == $("#dstUnderlying").val()) 
      {
        $("#formAdd").addClass("has-error");
        $("#btnAdd").attr("disabled", "disabled");
      }
      else 
      {
        $("#formAdd").removeClass("has-error");
        $("#btnAdd").removeAttr("disabled");
      }
    });
  });


  $("#btnAdd").click(function() 
  {
    // TODO: send to server

    $("#srcUnderlying").val("");
    $("#dstUnderlying").val("");
  });
});
