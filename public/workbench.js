let user = 'Sophia';
let project = 'awsome-project1';

let data = {};

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
    data['file' + i] = file;
    uploadDirectory(fileList, (i + 1), res);
  };
}

$('#uploadForm').on('submit', function(event) {
  event.preventDefault();
  console.log('button was clicked');

  let fileList = $('#fileSelector')[0].files;
  console.log('flielist is:', fileList);

  data['project'] = $('#projectName').val();

  let uploadPromise = new Promise(function(res, rej) {
    uploadDirectory(fileList, 0, res);
  })

  uploadPromise.then(function() {
    console.log('posting', data);
    //$.post("/workbench", {data: data});
    $.ajax({
      url: '/workbench',
      data: JSON.stringify(data),
      cache: false,
      contentType: 'application/json',
      processData: false,
      method: 'POST',
      type: 'POST',
      success: function(data){
          alert(data);
      }
    });
  })

  // let formData = new FormData($('#uploadForm')[0]);
  // for (let i = 0; i < fileList.length; i++) {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(fileList[i]);
  //   reader.onload = function () {
  //     let file = {
  //       type: fileList[i].type,
  //       path: fileList[i].webkitRelativePath,
  //       content: reader.result
  //     }
  //
  //  };
  //   console.log('adding:', fileList[i].webkitRelativePath);
  //   formData.append(`file${i}`, fileList[i]);
  // }
  //
  // jQuery.ajax({
  //   url: '/workbench',
  //   data: {
  //     data: formData
  //   },
  //   cache: false,
  //   contentType: false,
  //   processData: false,
  //   method: 'POST',
  //   type: 'POST',
  //   success: function(data){
  //       alert(data);
  //   }
  // });

  // $.post("/workbench", {data: formData});
  // data.append('user', 'person');
  // data.append('pwd', 'password');
  // data.append('organization', 'place');
  // data.append('requiredkey', 'key');

  // let xhr = new XMLHttpRequest();
  // xhr.open('POST', 'somewhere', true);
  // xhr.onload = function () {
  //     // do something to response
  //     console.log(this.responseText);
  // };
  // xhr.send(data);

  // let uploadPromise = new Promise((res,rej) => {
  //   uploadDirectory(fileList, 0, res);
  // })
})
