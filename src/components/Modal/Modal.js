import { Component } from 'react';
import { createPortal } from 'react-dom';
import style from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.showModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.showModal();
    }
  };

  render() {
    return createPortal(
      <div className={style.Overlay} onClick={this.handleBackdropClick}>
        <div className={style.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
