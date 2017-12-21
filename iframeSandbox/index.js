let elementOptions = [];

function appendOption(element, index) {
  $('#elementSelector').append($("<option></option>").attr("value", index).text(element));
}

$('iframe').on('load', function() {
  $('iframe').contents().find('body').click(function (event) {
    event.preventDefault();

    elementOptions = []
    $('#elementSelector').empty();
    elementOptions.push(event.target);

    $(event.target).parents().toArray().forEach(function (element) {
      elementOptions.push(element);
    })

    elementOptions.forEach(function(element, index) {
      appendOption(element, index);
    })
  })

  let prev;
  $('iframe').contents().find('body').mousemove(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(prev).css('border', 'none');
    $(event.target).css('border', '1px solid red');
    prev = event.target;
  })
})

$('#applyColor').click(function(event) {
  $(elementOptions[$('#elementSelector').val()]).css({backgroundColor: $('#selectedColor').val()});
})
