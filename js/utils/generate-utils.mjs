const pageEl = document.querySelector('.page-a');
const paperContentEl = document.querySelector('.page-a .paper-content');
const overlayEl = document.querySelector('.overlay');


function applyPaperStyles() {
  pageEl.style.border = 'none';
  pageEl.style.overflowY = 'hidden';

  // Adding class shadows even if effect is scanner
  if (document.querySelector('#page-effects').value === 'scanner') {
    overlayEl.classList.add('shadows');
  } else {
    overlayEl.classList.add(document.querySelector('#page-effects').value);
  }

  if (document.querySelector('#page-effects').value === 'scanner') {
    // For scanner, we need shadow between 50deg to 120deg only
    // Since If the lit part happens to be on margins, the margins get invisible
    overlayEl.style.background = `linear-gradient(${
      Math.floor(Math.random() * (120 - 50 + 1)) + 50
    }deg, #0008, #0000)`;
  } else if (document.querySelector('#page-effects').value === 'shadows') {
    overlayEl.style.background = `linear-gradient(${
      Math.random() * 360
    }deg, #0008, #0000)`;
  }
}

function removePaperStyles() {
  pageEl.style.overflowY = 'auto';
  pageEl.style.border = '1px solid var(--elevation-background)';

  if (document.querySelector('#page-effects').value === 'scanner') {
    overlayEl.classList.remove('shadows');
  } else {
    overlayEl.classList.remove(document.querySelector('#page-effects').value);
  }

}

function renderOutput(outputImages) {
  if (outputImages.length <= 0) {
    document.querySelector('#output').innerHTML = 'Images:None';
    document.querySelector('#download-as-pdf-button').classList.remove('show');
    document.querySelector('#delete-all-button').classList.remove('show');
    return;
  }

  document.querySelector('#download-as-pdf-button').classList.add('show');
  document.querySelector('#delete-all-button').classList.add('show');
  document.querySelector('#output').innerHTML = outputImages
    .map(
      (outputImageCanvas, index) => /* html */ `
    <div class="output-image-container" style="position: relative;display: inline-block;">
      <button data-index="${index}" class="close-button close-${index}">
          &times;
      </button>
      <img class="shadow" alt="Output image ${index}" src="${outputImageCanvas.toDataURL('image/png')}"/>
      <div style="text-align: center; ">
        <a class="download-image-button" style="color:rgb(90,90,250);" download href="${outputImageCanvas.toDataURL('image/png')}">Download Image</a>
      </div>
    </div>
    `
    )
    .join('');
}

export { removePaperStyles, applyPaperStyles, renderOutput };
