const gallery = document.querySelector('.gallery');

function createMarkup(images) {
    const markup = images
    .map(image => {
        const {webformatURL, largeImageURL, tags, likes, views, comments, downloads, id} = image;
        return `
        <a class="large-image" href="${largeImageURL}">
        <div class="photo-card" id="${id}">
  <img class="small-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item"><b>Likes</b>${likes}</p>
    <p class="info-item"><b>Views</b>${views}</p>
    <p class="info-item"><b>Comments</b>${comments}</p>
    <p class="info-item"><b>Downloads</b>${downloads}</p>
  </div>
</div>
</a>`
    })
    .join('')

    gallery.insertAdjacentHTML('beforeend', markup);
}

export { createMarkup };