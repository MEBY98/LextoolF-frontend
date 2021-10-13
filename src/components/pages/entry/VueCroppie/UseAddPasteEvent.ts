function retrieveImageFromClipboardAsBlob(pasteEvent, callback) {
  console.log('pasteEvent', pasteEvent);
  if (pasteEvent.clipboardData == false) {
    if (typeof callback == 'function') {
      callback(undefined);
    }
  }

  let items = pasteEvent.clipboardData.items;

  if (items == undefined) {
    if (typeof callback == 'function') {
      callback(undefined);
    }
  }

  for (let i = 0; i < items.length; i++) {
    // Skip content if not image
    if (items[i].type.indexOf('image') == -1) continue;
    // Retrieve image on clipboard as blob
    let blob = items[i].getAsFile();

    if (typeof callback == 'function') {
      callback(blob);
    }
  }
}

export default function UseAddPasteEvent(context) {
  const addPasteEvent = () => {
    window.addEventListener(
      'paste',
      function (e) {
        // Handle the event
        retrieveImageFromClipboardAsBlob(e, function (imgFile) {
          // If there's an image, display it in the canvas
          if (imgFile) {
            // let canvas = document.getElementById(
            //   'mycanvas'
            // ) as HTMLCanvasElement;
            // let ctx = canvas.getContext('2d');
            // Create an image to render the blob on the canvas
            // let img = new Image();
            // Once the image loads, render the img on the canvas
            // img.onload = function () { }
            // Update dimensions of the canvas with the dimensions of the image
            // canvas.width = img.width;
            // canvas.height = img.height;
            // Draw the image
            // ctx.drawImage(img, 0, 0);
            // Crossbrowser support for URL
            // let URLObj = window.URL || window.webkitURL;
            // Creates a DOMString containing a URL representing the object given in the parameter
            // namely the original Blob
            // img.src = URLObj.createObjectURL(imageBlob);
            context.emit('paste', imgFile);
          }
        });
      },
      false
    );
  };

  return { addPasteEvent };
}
