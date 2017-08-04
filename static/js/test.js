/*
 console.log(inputs);
 $("button").click(function(e){
  e.preventDefault();
  var inputValues = {
    data: inputs[0]
  };

  $.ajax({
    type: "POST",
    url: "/api/",
    data: {"data": inputValues},
    success: function(response){
      console.log("success" + response);
    },
    error: function(response){
      alert("error")
    }
  });

});
*/

$(".temp").click(function(e){
  e.preventDefault();
  class_id = this.id.replace('button', 'section');
  console.log(class_id)
  var inputs = [];
  $('.' + class_id + ' .form-control').each(function() {
    inputs.push($(this).val());
  });
  console.log(inputs);
  var inputValues = {
    class_id: class_id.split("_")[0],
    data: inputs
  };

  $.ajax({
    type: "POST",
    url: "/api/",
    data: inputValues,
    success: function(response){
      console.log("success " + response);
    },
    error: function(response){
      alert("error" + response)
    }
  });

});
  
/*
$(function() {
  $('#welcome_button').bind('click', function() {

    var inputs = [];
    $('.section-form-0 .form-control').each(function() {
      inputs.push($(this).val());
    });
     console.log(inputs);

    $.getJSON('/api/', {
      inputValues: inputs,
    }, function(data) {
      //$("#result").text(data.result);
      console.log("Success " + data)
    });
    return false;
  });
});
*/