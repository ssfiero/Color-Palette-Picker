let data = {
  files: [],
  projectName: ''
};

function uploadDirectory(fileList, i, res) {
  console.log('in updir');
  if (i === fileList.length) return res();

  console.log('passed');
  let reader = new FileReader();
  reader.readAsDataURL(fileList[i]);
  reader.onload = function () {
    let file = {
      path: encodeURI(fileList[i].webkitRelativePath.slice(fileList[i].webkitRelativePath.indexOf('/'))),
      content: reader.result.split(',')[1]
    }

    console.log('adding', file);
    data.files.push(file);
    uploadDirectory(fileList, (i + 1), res);
  };
}

$('#uploadButton').click(function(event) {
  console.log('button was clicked');

  let fileList = $('#fileSelector')[0].files;
  console.log('flielist is:', fileList);

  data.projectName = $('#projectName').val();

  let uploadPromise = new Promise(function(res, rej) {
    uploadDirectory(fileList, 0, res);
  })

  uploadPromise.then(function() {
    console.log('posting', data);
    $.ajax({
      url: '/upload/directory',
      data: JSON.stringify(data),
      cache: false,
      contentType: 'application/json',
      processData: false,
      method: 'POST',
      type: 'POST',
    })
    .done(function() {
      location.reload();
    });
    $('#uploadForm')[0].reset();
  })
})

$('.modal').modal();
