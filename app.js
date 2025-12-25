console.log("APP.JS VERSION 2025-09-22 CONTINENT");
fetch('albums.json')
  .then(response => response.json())
  .then(albums => {
    const container = document.getElementById('albums-container');
    if (!container) return;

    albums.forEach(album => {
      const card = document.createElement('div');
      card.className = 'album-card';

      card.innerHTML = `
        <h3>${album.name}</h3>
        <p><strong>Continent:</strong> ${album.continent_country}</p>
        <p><strong>Pages:</strong> ${album.pages}</p>
      `;

      card.onclick = () => {
        window.location.href = `album.html?id=${album.album_id}`;
      };

      container.appendChild(card);
    });
  });

// Album page loader
function loadAlbum() {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get('id');

  fetch('albums.json')
    .then(response => response.json())
    .then(albums => {
      const album = albums.find(a => a.album_id === albumId);
      if (!album) return;

      document.getElementById('album-title').innerText = album.name;
      const imgContainer = document.getElementById('images-container');

      album.images.forEach(filename => {
        const img = document.createElement('img');
        img.src = `${album.folder}/${filename}`;
        img.loading = "lazy";
        imgContainer.appendChild(img);
      });
    });
}

if (document.getElementById('album-title')) {
  loadAlbum();
}
