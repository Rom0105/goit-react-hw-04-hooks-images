import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ showModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      showModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      showModal();
    }
  };

  return createPortal(
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}
