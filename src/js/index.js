import { fetchImages } from "./fetch-photos"
import { createMarkup } from "./create-photo-card";
import Notiflix from 'notiflix';
import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let query = '';
let simpleLightbox;
const perPage = 40;

function formOnSearch(e) {
    e.preventDefault();
    window.scrollTo({top: 0});
    page = 1;
    query = e.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('hidden')

    if (query === '') {
        Notiflix.Notify.failure('Type something to see the results')
        return;
    }
    try {
        fetchImages(query, page, perPage)
        .then(({data}) => {
            if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            }
            else {
                createMarkup(data.hits);
                simpleLightbox = new simpleLightbox('.gallery a').refresh();
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
            }

            if (data.totalHits > perPage) {
                loadMoreBtn.classList.remove('hidden');
            }
        })
    }
    catch (error){
        console.log(error);
    }
    finally{
        form.reset();
    }
    }

    form.addEventListener('submit', formOnSearch);

    function loadMoreFctn() {
        page ++;

        fetchImages(query, page, perPage)
        .then(({data}) => {
            createMarkup(data.hits);
            simpleLightbox = new simpleLightbox('.gallery a').refresh();

            const totalPages = Math.ceil(data.totalHits / perPage);

            if (page > totalPages) {
                loadMoreBtn.classList.add('hidden');
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
            }
        })
        .catch(error => console.log(error))
    }

    loadMoreBtn.addEventListener('click', loadMoreFctn);
    

