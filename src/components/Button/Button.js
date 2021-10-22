import style from '../Button/Button.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={style.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
