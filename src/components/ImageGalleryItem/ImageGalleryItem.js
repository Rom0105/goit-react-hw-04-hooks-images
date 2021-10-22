import React from 'react';
import PropTypes from 'prop-types';
import style from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick, tags }) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img src={image} alt={tags} onClick={onClick} className={style.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.defaultProps = {
  tags: '',
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
