'use strict';

if (document.querySelector('circle')) {
  // upload progress indicator
  var circle = document.querySelector('circle');
  var radius = circle.r.baseVal.value;
  var circumference = radius * 2 * Math.PI;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  // ამ ფუნქციით იცვლება წრის ანიმაცია
  setProgress(50);
}

if (document.querySelector('.generated-link a')) {
  // copy to clipboard
  const textToCopy = document.querySelector('.generated-link a').innerText;

  document.querySelector('.copy-link').addEventListener('click', () => {
    navigator.clipboard.writeText(textToCopy).then(
      function () {
        /* clipboard successfully set */
        console.log('Yay!');
      },
      function () {
        /* clipboard write failed */
        console.log('Nay...');
      }
    );
  });
}

// switch theme colors
const colors = document.querySelectorAll('[data-color');
const bodyStyles = window.getComputedStyle(document.body);
const themeColor = bodyStyles.getPropertyValue('--theme-color'); //get

colors.forEach((color) =>
  color.addEventListener('click', () => {
    document.body.style.setProperty('--theme-color', `var(--${color.dataset.color})`); //set new theme-color
    localStorage.setItem('theme-color', color.dataset.color); // save new theme color to local storage
  })
);

if (localStorage.getItem('theme-color') != null) {
  document.body.style.setProperty('--theme-color', `var(--${localStorage.getItem('theme-color')})`); // set theme-clor if it exists in local storage
}

// switch mode
const modes = document.querySelectorAll('[data-mode');
const modeTheme = bodyStyles.getPropertyValue('--mode'); //get

modes.forEach((mode) =>
  mode.addEventListener('click', () => {
    document.body.style.setProperty('--mode', `var(--${mode.dataset.mode})`); //set new mode
    localStorage.setItem('mode', mode.dataset.mode); // save new mode to local storage
  })
);

if (localStorage.getItem('mode') != null) {
  document.body.style.setProperty('--mode', `var(--${localStorage.getItem('mode')})`); // set mode if it exists in local storage
}

// Drag & Drop
const dropZone = document.querySelector('#drop-zone');

function dragOverHandler(ev) {
  console.log('File(s) in drop zone');
  dropZone.classList.add('active');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function dragLeaveHandler(e) {
  dropZone.classList.remove('active');
}

function dropHandler(e) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  e.preventDefault();

  if (e.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (e.dataTransfer.items[i].kind === 'file') {
        var file = e.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < e.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
    }
  }

  dropZone.classList.remove('active');
}

dropZone.addEventListener('dragover', (e) => {
  dragOverHandler(e);
});

dropZone.addEventListener('dragleave', (e) => {
  dragLeaveHandler(e);
});

dropZone.addEventListener('drop', (e) => {
  dropHandler(e);
});
