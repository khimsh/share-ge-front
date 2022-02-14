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
const lightMode = document.querySelector('[data-mode="light"]');
const darkMode = document.querySelector('[data-mode="dark"]');

lightMode.addEventListener('click', () => {
  console.log('light was clicked');
  if (document.body.classList.contains('light')) return;

  document.body.classList.remove('dark');
  document.body.classList.add('light');
  localStorage.setItem('mode', 'light'); // save new mode to local storage
});

darkMode.addEventListener('click', () => {
  console.log('dark was clicked');

  if (document.body.classList.contains('dark')) return;

  document.body.classList.remove('light');
  document.body.classList.add('dark');

  localStorage.setItem('mode', 'dark'); // save new mode to local storage
});

if (localStorage.getItem('mode') != null) {
  document.body.className = '';
  document.body.classList.add(`${localStorage.getItem('mode')}`); // set mode if it exists in local storage
}

// Drag & Drop
if (document.querySelector('#drop-zone')) {
  const dropZone = document.querySelector('#drop-zone');

  dropZone.addEventListener('dragover', (e) => {
    dragOverHandler(e);
  });

  dropZone.addEventListener('dragleave', (e) => {
    dragLeaveHandler(e);
  });

  dropZone.addEventListener('drop', (e) => {
    dropHandler(e);
  });

  function dragOverHandler(e) {
    console.log('File(s) in drop zone');
    dropZone.classList.add('active');

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
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
}

// Register form
if (document.querySelector('[data-register]')) {
  const form = document.querySelector('[data-register]');
  const stageOne = document.querySelector('[data-stage="1"]');
  const stageTwo = document.querySelector('[data-stage="2"]');
  const proceedBtn = document.querySelector('[data-proceed]');

  proceedBtn.addEventListener('click', () => {
    if (
      form.name.value !== '' &&
      form.lastname.value !== '' &&
      form.email.value !== '' &&
      form.password1.value !== '' &&
      form.password2.value !== '' &&
      form.password1.value === form.password2.value
    ) {
      stageOne.classList.add('hide');
      stageTwo.classList.add('active');
    }
  });
}
