const { dialog } = require('@electron/remote')
const path = require('path')
const fs = require('fs');
let photoData;
let video;

function savePhoto(filePath){
  if (filePath) {
    fs.writeFile(filePath, photoData, 'base64', (err) => {
      if (err) alert(`There was a problem saving the photo: ${err.message}`);
      photoData = null;
      console.log('saved')
    });
  }
}

function initialize(){
  video = window.document.querySelector('video');
  let errorCallback = (error) => {
    console.log(`Error loading camera feed: ${error.message}`);
  };

  window.navigator.webkitGetUserMedia({video: true}, (stream) => {
    video.srcObject = stream;
  }, errorCallback);
}

function takePhoto() {
  let canvas = window.document.querySelector('canvas');
  canvas.getContext('2d').drawImage(video, 0, 0, 800, 600);
  photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  // console.log(photoData)
  dialog.showSaveDialog({ 
    title: "Save picture",
    defaultPath: path.join(__dirname, 'default.png'),
    buttonLabel: 'Save',
    filters: [{ name: 'Images', extensions: ['jpg', 'png'] }]
  }).then((file) => {
    savePhoto(file.filePath.toString())
  })
}

window.onload = initialize;