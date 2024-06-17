let dropArea = document.getElementById('drop-area');
let fileInput = document.getElementById('fileElem');
let gallery = document.getElementById('gallery');
let formData = new FormData();

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false)
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false)
});

dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    [...files].forEach(file => {
        formData.append('file', file);
        previewFile(file);
    });
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let img = document.createElement('img');
        img.src = reader.result;
        img.style.maxWidth = '100%';
        gallery.innerHTML = '';
        gallery.appendChild(img);
    }
}

function convertImage() {
    let format = document.getElementById('formatSelect').value;
    formData.append('format', format);

    fetch('/convert', {
        method: 'POST',
        body: formData
    }).then(response => response.blob())
      .then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `converted.${format.toLowerCase()}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(() => alert('Error converting image.'));
}
