import gallery from './gallery-items.js';

// Додаємо галерею в HTML
const galleryPic = document.querySelector('.js-gallery');
const galleryMarkup = galleryCreate();

galleryPic.insertAdjacentHTML('beforeend', galleryMarkup);

function galleryCreate() {
  const markup = gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');

  return markup;
}
