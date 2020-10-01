import gallery from './gallery-items.js';

// Додаємо галерею в HTML
const galleryPic = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxEl = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('.lightbox__button');
const overlayModal = document.querySelector('.lightbox__overlay');
const overlayContent = document.querySelector('.lightbox__content');

const galleryMarkup = galleryCreate();
galleryPic.insertAdjacentHTML('beforeend', galleryMarkup);

function galleryCreate() {
  let i = 0;
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
      data-index ="${(i += 1)}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');

  return markup;
}

//Делегування на галереї та отримання посилання на велике зображення
galleryPic.addEventListener('click', onGalleryClick);

function onGalleryClick(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
}

//Відкриття модального вікна по кліку картинки галереї та підміна значень alt, src

galleryPic.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  lightbox.classList.add('is-open');
  lightboxEl.src = event.target.dataset.source;
  lightboxEl.alt = event.target.alt;
  lightboxEl.dataset.index = event.target.dataset.index;

  document.addEventListener('keydown', onCloseModalByEsc);
}

closeModalBtn.addEventListener('click', onCloseModal);

//Закриття модалки різними методами

function onCloseModal(event) {
  lightbox.classList.remove('is-open');
  document.removeEventListener('keydown', onCloseModalByEsc);
  lightboxEl.src = '';
}

function onCloseModalByEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

overlayModal.addEventListener('click', closeModalByOverlay);

function closeModalByOverlay(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

//Будем створювати слайди

const leftBtn = document.querySelector('.move-left');
const rightBtn = document.querySelector('.move-right');
const imgGallery = document.querySelectorAll('.gallery__image');

leftBtn.addEventListener('click', () => {
  const currentOpenImageIndex = lightboxEl.dataset.index;
  // Images indexes starts from 1, i.e. 1...9
  // While indexes in array starts from 0, i.e 0...8
  // So if we took image №2 in array it's under index №1
  // So to get previou one we need to subtract 2 i.e. 2 - 2
  const nextImage = gallery[currentOpenImageIndex - 2];

  console.log(currentOpenImageIndex);

  if (nextImage !== undefined) {
    lightboxEl.src = nextImage.original;
  }

  // Check if it's first one
  if (currentOpenImageIndex === 1) {
    leftBtn.setAttribute('disabled');
  } else {
    leftBtn.removeAttribute('disabled');
  }
});

rightBtn.addEventListener('click', () => {
  const currentOpenImageIndex = lightboxEl.dataset.index;
  const nextImage = gallery[currentOpenImageIndex];

  if (nextImage !== undefined) {
    lightboxEl.src = nextImage.original;
  }

  // Check if it's last one
  if (currentOpenImageIndex === gallery.length) {
    rightBtn.setAttribute('disabled');
  } else {
    rightBtn.removeAttribute('disabled');
  }
});
