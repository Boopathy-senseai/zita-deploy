import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './newmodal.module.css';

const cx = classNames.bind(styles);

type Props = {
  open?: boolean;
  children: ReactNode;
  ModalTitle?: string | React.ElementType;
  minWidth?: string;
  onClose?: () => void;
};

const CrossButton = ({ onClick }: { onClick: Function }) => {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      role="button"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '25px',
        height: '25px',
        backgroundColor: '#A80006',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <span
          style={{
            width: '70%',
            height: '2px',
            backgroundColor: '#ddd',
            display: 'inline-block',
            position: 'absolute',
            left: '15%',
            top: 'calc(50% - 1px)',
            transformOrigin: 'center center',
            transform: 'rotate(45deg)',
          }}
        ></span>
        <span
          style={{
            width: '70%',
            height: '2px',
            backgroundColor: '#ddd',
            display: 'inline-block',
            position: 'absolute',
            left: '15%',
            top: 'calc(50% - 1px)',
            transformOrigin: 'center center',
            transform: 'rotate(-45deg)',
          }}
        ></span>
      </div>
    </div>
  );
};

const Modal = ({ open, children, onClose, ModalTitle, minWidth }: Props) => {
  const closeModal = (callback: Function | undefined) => {
    console.log('MODAL CLOSE');
    open = false;
    if (callback) callback();
  };
  return open ? (
    <Flex className={cx('container')}>
      <div
        style={{
          backgroundColor: 'white',
          // width: '100%',
          // minHeight: '60%',
          // maxHeight: '80%',
          padding: '15px 25px',
          position: 'relative',
          minWidth: minWidth ? minWidth : null,
          // maxWidth: '80%',
          boxShadow: '1px 1px 20px rgba(0,0,0,.2)',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        <CrossButton onClick={() => closeModal(onClose)} />
        {ModalTitle ? (
          typeof ModalTitle === 'string' ? (
            <Text
              tag={'p'}
              size={20}
              color="theme"
              style={{ marginBottom: '5px' }}
            >
              {ModalTitle}
            </Text>
          ) : (
            <ModalTitle />
          )
        ) : (
          <div
            style={{
              padding: '10px',
            }}
          ></div>
        )}
        <Flex>{children}</Flex>
      </div>
    </Flex>
  ) : null;
};

export default Modal;
