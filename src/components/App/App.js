import { useState, useEffect } from 'react';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import 'react-toastify/dist/ReactToastify.css';
import style from '../App/App.module.css';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import searchApi from '../../Services/AppiServise';
import Button from '../Button/Button';

export default function App() {
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [imgTags] = useState('');
  const [mistake, setMistake] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchPictures = async () => {
      try {
        const pictures = await searchApi(query, page);
        if (pictures.length === 0) {
          error({
            text: 'No image!',
            delay: 1000,
          });
        }
        setPictures(prevImages => [...prevImages, ...pictures]);

        page > 1 &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
      } catch (error) {
        error({
          text: 'No image!',
          delay: 1000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPictures();
  }, [page, query]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const bigImage = (largeImage = '') => {
    setLargeImage(largeImage);

    toggleModal();
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const onChangeQuery = newSearch => {
    setQuery(newSearch);
    setPage(1);
    setPictures([]);
    setMistake(null);
    setIsLoading(true);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={onChangeQuery} />

      {mistake && <h1>{mistake}</h1>}

      <ImageGallery images={pictures} selectedImage={bigImage} />
      {isLoading && <Loader />}
      {pictures.length > 11 && !isLoading && <Button onClick={onLoadMore} />}
      {showModal && (
        <Modal showModal={bigImage}>
          <img src={largeImage} alt={imgTags} />
        </Modal>
      )}
    </div>
  );
}
