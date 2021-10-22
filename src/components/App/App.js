import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class App extends Component {
  state = {
    page: 1,
    pictures: [],
    query: '',
    largeImage: '',
    imgTags: '',
    error: '',
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchPictures();
    }
    if (this.state.page !== 2 && prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  bigImage = (largeImage = '') => {
    this.setState({ largeImage });

    this.toggleModal();
  };

  fetchPictures = () => {
    const { page, query } = this.state;

    const options = {
      page,
      query,
    };

    this.setState({ isLoading: true });

    searchApi(options)
      .then(pictures => {
        if (!pictures.length) {
          error({
            text: 'No image!',
            delay: 1000,
          });
        }
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          page: prevState.page + 1,
        }));
      })
      .catch(error =>
        error({
          text: 'No image!',
          delay: 1000,
        }),
      )
      .finally(() => this.setState({ isLoading: false }));
  };

  onChangeQwery = query => {
    this.setState({ query: query, page: 1, pictures: [], error: null });
  };

  render() {
    const { pictures, isLoading, error, showModal, largeImage, imgTags } = this.state;

    return (
      <div className={style.AppStyle}>
        <Searchbar onSubmit={this.onChangeQwery} />

        {error && <h1>{error}</h1>}

        <ImageGallery images={pictures} selectedImage={this.bigImage} />
        {isLoading && <Loader />}
        {pictures.length > 11 && !isLoading && <Button onClick={this.fetchPictures} />}
        {showModal && (
          <Modal showModal={this.bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}
      </div>
    );
  }
}

App.propTypes = {
  pictures: PropTypes.array,
  page: PropTypes.number,
  query: PropTypes.string,
  largeImage: PropTypes.string,
  imgTags: PropTypes.string,
  error: PropTypes.string,
  showModal: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default App;
