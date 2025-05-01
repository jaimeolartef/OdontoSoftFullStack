// FileViewerModal.js
import showMessage from "../../util/UtilMessage";

/**
 * Muestra un modal con el contenido del archivo
 * @param {string} archivoContenido - Contenido del archivo en base64
 * @param {string} archivoTipo - Tipo MIME del archivo
 * @param {string} archivoNombre - Nombre del archivo (opcional)
 */
export const mostrarArchivoModal = (archivoContenido, archivoTipo, archivoNombre) => {
  if (!archivoContenido) {
    showMessage('warning', 'El archivo está vacío o no disponible');
    return;
  }

  try {
    // Convertir bytes Base64 a Blob
    const byteCharacters = atob(archivoContenido);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: archivoTipo });

    // Crear URL del blob
    const fileURL = URL.createObjectURL(blob);

    // Crear y mostrar modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.backgroundColor = '#fefefe';
    modalContent.style.margin = '5% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';
    modalContent.style.height = '80%';

    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.color = '#aaa';
    closeButton.style.float = 'right';
    closeButton.style.fontSize = '28px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => {
      document.body.removeChild(modal);
      URL.revokeObjectURL(fileURL); // Liberar la URL del blob
    };

    const title = document.createElement('h4');
    title.textContent = archivoNombre || 'Archivo adjunto';

    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);

    // Renderizar según el tipo de archivo
    if (archivoTipo === 'application/pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = fileURL;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none';
      modalContent.appendChild(iframe);
    } else if (archivoTipo.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = fileURL;
      img.style.maxWidth = '90%';
      img.style.maxHeight = '90%';
      img.style.display = 'block';
      img.style.margin = '0 auto';
      modalContent.appendChild(img);
    } else {
      const message = document.createElement('p');
      message.textContent = 'No se puede mostrar este tipo de archivo. Descargue para verlo.';

      const downloadBtn = document.createElement('a');
      downloadBtn.href = fileURL;
      downloadBtn.download = archivoNombre || 'archivo_descargado';
      downloadBtn.className = 'btn btn-primary';
      downloadBtn.textContent = 'Descargar archivo';

      modalContent.appendChild(message);
      modalContent.appendChild(downloadBtn);
    }

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Cerrar modal si se hace clic fuera del contenido
    window.onclick = (event) => {
      if (event.target === modal) {
        document.body.removeChild(modal);
        URL.revokeObjectURL(fileURL);
      }
    };
  } catch (error) {
    console.error('Error al visualizar archivo:', error);
    showMessage('error', 'Error al visualizar el archivo');
  }
};
