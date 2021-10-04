const pageEl = document.querySelector('.page-a');
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


function createPDF(imgs) {
  // eslint-disable-next-line new-cap
  const doc = new jsPDF('p', 'pt', 'a4');
  const width = doc.internal.pageSize.width;
  const height = doc.internal.pageSize.height;
  for (const i in imgs) {
    doc.text(10, 20, '');
    doc.addImage(
      imgs[i],
      'png',
      0,
      0,
      width,
      height+4,
      'image-' + i
    );
    if (i != imgs.length - 1) {
      doc.addPage();
    }
  }
  doc.save();
}

function formatText(event) {
  event.preventDefault();
  const text = event.clipboardData
    .getData('text/plain')
    .replace(/\n/g, '<br/>');
  document.execCommand('insertHTML', false, text);
}

function addPaperFromFile(file) {
  var tmppath = URL.createObjectURL(file);
  pageEl.style.backgroundImage = `url(${tmppath})`;
}

export { isMobile, createPDF, formatText, addPaperFromFile };

