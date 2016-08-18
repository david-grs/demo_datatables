$(document).ready(function() 
{
  var fx_underlyings = []; // list of all FX underlyings

  $(this).on("on_fx_underlyings", function (e, data) 
  {
    fx_underlyings = data;
    
    $(".fx_underlying").autocomplete(
    {
      source: fx_underlyings,
      delay: 0
    })
    .keyup(function() 
    {
      if (fx_underlyings.indexOf($("#srcUnderlying").val()) == -1
          || fx_underlyings.indexOf($("#dstUnderlying").val()) == -1
          || $("#srcUnderlying").val() == $("#dstUnderlying").val()) 
      {
        $("#formAddOTC").addClass("has-error");
        $("#btnAddOTC").attr("disabled", "disabled");
      }
      else 
      {
        $("#formAddOTC").removeClass("has-error");
        $("#btnAddOTC").removeAttr("disabled");
      }
    });
  });
});
