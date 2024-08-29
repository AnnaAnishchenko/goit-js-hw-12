//pixabay.com/api/

import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');

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

  // викликаємо завантажувач
  showLoader();

  try {
    // Запит на сервер
    const response = await fetchPhotos(searchedValue);
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

searchFormEl.addEventListener('submit', onSearchFormSubmit);
