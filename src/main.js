//pixabay.com/api/

import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more');

// початкова сторінка
let currentPage = 1;
let searchedValue = '';
let cardHeight = 0;
let totalHits = 0;

// Створюємо екземпляр SimpleLightbox
let lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

//функції для показу  завантажувача
const showLoader = () => {
  loaderEl.style.display = 'block';
};

//функції для приховування завантажувача
const hideLoader = () => {
  loaderEl.style.display = 'none';
};

const onSearchFormSubmit = async event => {
  // відміна дії за замовчуванням
  event.preventDefault();

  currentPage = 1;

  //значення елемента форми
  const searchedValue = searchFormEl.elements.user_query.value.trim();

  if (!searchedValue) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }
  // Очищення галереї перед новим пошуком
  galleryEl.innerHTML = '';

  loadMoreBtnEl.classList.add('is-hidden');
  // викликаємо завантажувач
  showLoader();

  try {
    // Запит на сервер
    const response = await fetchPhotos(searchedValue, currentPage);
    console.log(response);

    // Перевірка на відсутність результатів
    if (response.data.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });

      searchFormEl.reset();
      return;
    }

    // Перебираємо масив, додаємо всі елементи
    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    // Додаємо в розмітку HTML
    galleryEl.innerHTML = galleryCardsTemplate;
    lightbox.refresh();

    const galleryCardEl = galleryEl.querySelector('li');

    cardHeight = galleryCardEl
      ? galleryCardEl.getBoundingClientRect().height
      : 0;

    if (response.data.totalHits > currentPage * 15) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    // Оновлюємо галерею SimpleLightbox
    lightbox.refresh();
  } catch (err) {
    console.log(err);
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${err.message}`,
    });
  } finally {
    // Приховуємо завантажувач після завершення запиту
    hideLoader();
  }
};

// завантаження
const onLoadMoreBtnClick = async event => {
  currentPage++;
  showLoader();

  try {
    const response = await fetchPhotos(searchedValue, currentPage);

    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);
    lightbox.refresh();

    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage === response.data.totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${err.message}`,
    });
  } finally {
    hideLoader();
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
