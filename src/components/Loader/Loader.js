import React from 'react';
import Loader from 'react-loader-spinner';
import style from '../Loader/Loader.module.css';

function loader() {
  return (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={200}
      width={200}
      timeout={3000}
      className={style.Loader}
    />
  );
}

export default loader;
