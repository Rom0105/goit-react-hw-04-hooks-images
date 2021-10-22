import React from 'react';
import PropTypes from 'prop-types';
import style from '../ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, selectedImage }) => {
  return (
    <ul className={style.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        const fullImage = () => selectedImage(largeImageURL);
        return <ImageGalleryItem key={id} image={webformatURL} onClick={fullImage} tags={tags} />;
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  image: PropTypes.array,
  selectedImage: PropTypes.func,
};

export default ImageGallery;
