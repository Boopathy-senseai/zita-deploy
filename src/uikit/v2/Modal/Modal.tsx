import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  top?: number | null;
  left?: number | null;
  center?: boolean;
  right?: number | null;
  bottom?: number | null;
  closeModalOnOuterClick?: boolean;
  backgroundColor?: string;
  boxShadow?: boolean;
}

const Modal = ({
  open,
  children,
  onClose,
  top,
  bottom,
  center = true,
  left,
  right,
  closeModalOnOuterClick = true,
  backgroundColor = 'white',
  boxShadow = true,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  let modalStyles = {};
  if (top !== null) modalStyles['top'] = top;
  if (bottom !== null) modalStyles['bottom'] = bottom;
  if (left !== null) modalStyles['left'] = left;
  if (right !== null) modalStyles['right'] = right;
  if (backgroundColor) modalStyles['backgroundColor'] = backgroundColor;

  if (boxShadow) {
    modalStyles['boxShadow'] = '0px 0px 20px rgba(0, 0, 0, 0.2)';
  }

  const handleCloseModal = (e: any) => {
    e.stopPropagation();
    if (onClose) onClose();
  };

  useEffect(() => {
    if (closeModalOnOuterClick && open && overlayRef && overlayRef.current) {
      overlayRef.current.addEventListener('click', handleCloseModal);

      return () =>
        overlayRef.current?.removeEventListener('click', handleCloseModal);
    }
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={style.overlay} ref={overlayRef}></div>
      <div
        className={`${style.modal} ${center ? style.center : ''}`}
        style={modalStyles}
      >
        {children}
      </div>
    </>,
    document.getElementById('portal') as HTMLElement,
  );
};

export default Modal;
