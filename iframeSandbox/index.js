let domElements;

function applyIds() {
  domElements.each(function (index) {
    $(this).data('dom-id', index);
    console.log('giving:', $(this));
    console.log('data:', $(this).data('test'));
  });
}

function appendOption(element, index) {
  $('#elementSelector').append($("<option></option>").attr("value", index).text(element));
}

function populateParentSelector(target) {
  elementOptions = []
  $('#elementSelector').empty();
  elementOptions.push(event.target);

  $(event.target).parents().toArray().forEach(function (element) {
    elementOptions.push(element);
  })

  elementOptions.forEach(function(element, index) {
    appendOption(element, index);
  })
}

$('iframe').on('load', function() {
  $('iframe').contents().find('body').click(function (event) {
    event.preventDefault();

    console.log('target:', $(event.target));
    console.log('target data:', $(event.target).data('dom-id'));
    let index = $(event.target).data('dom-id');
    console.log('target from data is:', domElements.eq(index));

    // setSelected(event.target);
    //
    // populateParentSelector(event.target);



  })

  let prev;
  $('iframe').contents().find('body').mousemove(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(prev).css('border', 'none');
    $(event.target).css('border', '1px solid red');
    prev = event.target;
  })

  let iframeBody = $('iframe').contents().find('body');
  domElements = iframeBody.add(iframeBody.find('*'));

  console.log('dom elements are:', domElements);

  applyIds();
})

$('#applyColor').click(function(event) {
  $(elementOptions[$('#elementSelector').val()]).css({backgroundColor: $('#selectedColor').val()});
})
