let apiClient;
let currentPage = 1;
let totalImages = 0;
const imagesPerPage = 6;

// Inicializar la API de Google Photos
function init() {
  gapi.client.init({
    'apiKey': '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', // Reemplaza con tu API Key
    'clientId': '475265601922-3vl694onsjtttpa2q0a8d0mom5bs97ib.apps.googleusercontent.com', // Reemplaza con tu Client ID
    'scope': 'https://www.googleapis.com/auth/photoslibrary.appendonly https://www.googleapis.com/auth/photoslibrary.readonly',
  }).then(function () {
    apiClient = gapi.client.photoslibrary;
  });
}

// Subir las fotos seleccionadas
document.getElementById("uploadForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;

  for (let file of files) {
    await uploadPhoto(file);
  }
  loadGallery();
});

// Función para subir una foto a Google Photos
async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
    },
    body: formData,
  });

  const uploadToken = await response.text();
  await createMediaItem(uploadToken);
}

// Crear un ítem en Google Photos con el token de subida
async function createMediaItem(uploadToken) {
  const createItemRequest = {
    "newMediaItems": [
      {
        "simpleMediaItem": {
          "uploadToken": uploadToken
        }
      }
    ]
  };

  await apiClient.mediaItems.batchCreate(createItemRequest).then(response => {
    console.log('Foto subida con éxito:', response);
  });
}

// Cargar las fotos desde Google Photos
async function loadGallery() {
  const response = await apiClient.mediaItems.list({
    pageSize: imagesPerPage,
    pageToken: getPageToken(currentPage),
  });

  totalImages = response.result.totalItems;
  const mediaItems = response.result.mediaItems;

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = '';

  mediaItems.forEach(item => {
    const imgElement = document.createElement('img');
    imgElement.src = item.baseUrl + '=w600-h400-c';
    imgElement.classList.add('col-12', 'col-md-4', 'mb-3');
    gallery.appendChild(imgElement);
  });

  updatePagination();
}

// Obtener el token de la página
function getPageToken(page) {
  const pageSize = imagesPerPage;
  return (page - 1) * pageSize;
}

// Actualizar los botones de paginación
function updatePagination() {
  const pagination = document.getElementById("pagination").querySelector("ul");
  pagination.innerHTML = '';

  const totalPages = Math.ceil(totalImages / imagesPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item');
    if (i === currentPage) {
      pageItem.classList.add('active');
    }

    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.href = '#';
    pageLink.innerText = i;
    pageLink.onclick = function() {
      currentPage = i;
      loadGallery();
    };

    pageItem.appendChild(pageLink);
    pagination.appendChild(pageItem);
  }
}

// Inicializar el cliente de Google API
gapi.load('client:auth2', init);



// Función para autenticar al usuario
async function authenticate() {
  try {
    // Si el usuario ya está autenticado, simplemente obtenemos el usuario actual
    const authInstance = gapi.auth2.getAuthInstance();
    const currentUser = authInstance.currentUser.get();
    
    if (!currentUser || !currentUser.getAuthResponse()) {
      // Si no está autenticado, solicitamos el inicio de sesión
      await gapi.auth2.getAuthInstance().signIn();
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    alert('Hubo un problema al autenticarte. Por favor, intenta nuevamente.');
  }
}

// Actualiza la función para subir fotos, asegurando que el usuario esté autenticado
document.getElementById("uploadForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Asegúrate de que el usuario esté autenticado antes de proceder
  await authenticate();

  const fileInput = document.getElementById("fileInput");
  const files = fileInput.files;

  for (let file of files) {
    await uploadPhoto(file);
  }
  loadGallery();
});

// Subir las fotos
async function uploadPhoto(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
      },
      body: formData,
    });

    const uploadToken = await response.text();
    await createMediaItem(uploadToken);
  } catch (error) {
    console.error('Error al subir la foto:', error);
  }
}

// Crear un ítem en Google Photos con el token de subida
async function createMediaItem(uploadToken) {
  const createItemRequest = {
    "newMediaItems": [
      {
        "simpleMediaItem": {
          "uploadToken": uploadToken
        }
      }
    ]
  };

  try {
    await apiClient.mediaItems.batchCreate(createItemRequest).then(response => {
      console.log('Foto subida con éxito:', response);
    });
  } catch (error) {
    console.error('Error al crear el ítem de la foto:', error);
  }
}
