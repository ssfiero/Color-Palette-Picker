let user = 'Sophia';
let project = 'awsome-project1';

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
      type: fileList[i].type,
      path: fileList[i].webkitRelativePath,
      content: reader.result
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
      url: '/upload',
      data: JSON.stringify(data),
      cache: false,
      contentType: 'application/json',
      processData: false,
      method: 'POST',
      type: 'POST',
    });
    $('#uploadForm')[0].reset();
  })
})

$('.modal').modal();