let elementOptions = [];

function appendOption(element, index) {
  console.log('appending', element);
  $('#elementSelector').append($("<option></option>").attr("value", index).text(element));
  console.log('appended element');
}

$('iframe').on('load', function() {
  $('iframe').contents().find('body').click(function (event) {
    event.preventDefault();
    console.log('something got clicked');
    console.log('i think it was:', event);
    console.log('or:', event.target);

    elementOptions = []
    $('#elementSelector').empty();
    elementOptions.push(event.target);

    console.log('parents are:', $(event.target).parents().toArray());
    elementOptions = elementOptions.concat($(event.target).parents().toArray());

    console.log('array is:', elementOptions);

    elementOptions.forEach(function(element, index) {
      console.log('element is:', element);
      appendOption(element, index);
    })

    //appendOption($(event.target));
    //$(event.target).parents().each(appendOption($(this)));
  })
})

$('#applyColor').click(function(event) {
  console.log('setting:', elementOptions[$('#elementSelector').val()]);
  console.log('to:', $('#selectedColor').val());
  $(elementOptions[$('#elementSelector').val()]).css({backgroundColor: $('#selectedColor').val()});
})
