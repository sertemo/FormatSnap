let dropArea = document.getElementById('drop-area');
let fileInput = document.getElementById('fileElem');
let gallery = document.getElementById('gallery');
let clearBtn = document.getElementById('clearBtn');
let errorMessage = document.getElementById('error-message');
let sameFormatError = document.getElementById('same-format-error');
let formData = new FormData();
let loadedFileFormat = ''; // Variable para almacenar el formato del archivo cargado

const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/ico', 'image/tiff', 'image/webp'];

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
        // Validación de tipos de archivo
        if (!imageTypes.includes(file.type)) {
            alert('Tipo de archivo no admitido.');
            return;
        }
        formData.append('file', file);
        loadedFileFormat = file.name.split('.').pop().toUpperCase(); // Obtiene el formato del archivo cargado
        previewFile(file);
    });
    errorMessage.style.display = 'none'; // Ocultar mensaje de error al cargar archivos
    sameFormatError.style.display = 'none'; // Ocultar mensaje de error al cargar archivos
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        let img = document.createElement('img');
        img.src = reader.result;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '200px'; // Limita la altura de la imagen
        gallery.innerHTML = '';
        gallery.appendChild(img);
        clearBtn.style.display = 'block'; // Mostrar botón de limpiar
        errorMessage.style.display = 'none'; // Ocultar mensaje de error
        sameFormatError.style.display = 'none'; // Ocultar mensaje de error
    }
}

function clearImage() {
    gallery.innerHTML = '';
    clearBtn.style.display = 'none'; // Ocultar botón de limpiar
    formData.delete('file');
    loadedFileFormat = ''; // Reiniciar el formato del archivo cargado
    errorMessage.style.display = 'none'; // Ocultar mensaje de error
    sameFormatError.style.display = 'none'; // Ocultar mensaje de error
}

function convertImage() {
    if (!formData.has('file')) {
        errorMessage.style.display = 'block'; // Mostrar mensaje de error
        return;
    }
    let format = document.getElementById('formatSelect').value;

    if (loadedFileFormat === format) {
        sameFormatError.style.display = 'block'; // Mostrar mensaje de error si el formato es el mismo
        return;
    }

    formData.append('format', format);

    fetch('/', {
        method: 'POST',
        body: formData
    }).then(response => response.blob())
      .then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;

        // Obtener el nombre original del archivo desde formData
        let originalFileName = formData.get('file').name;
        let fileExtension = format.toLowerCase();
        let fileName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) + '.' + fileExtension;
        
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }).catch(() => alert('Error converting image.'));
}
