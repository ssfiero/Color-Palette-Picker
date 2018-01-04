console.log('script loaded');

$('#saveButton').click(function(event) {
  console.log('clicked button');
  let htmlFile = '<!DOCTYPE html>\n' + '<html>\n' + $('iframe').contents().find('html').html() + '\n</html>';

  $.ajax({
    url: '/upload/file',
    data: JSON.stringify({
      file: window.btoa(htmlFile)
    }),
    cache: false,
    contentType: 'application/json',
    processData: false,
    method: 'POST',
    type: 'POST',
  });

  $('iframe').first().attr("src", $('iframe').first().attr("src"));
})
