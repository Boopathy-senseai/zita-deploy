/* eslint-disable */
import { Spinner } from 'react-bootstrap';

const LoadingButton = (props) => {
  return (
    <>
      <button
        type={props.type}
        className={props.className}
        disabled={props.isLoading === true ? 'disabled' : ''}
      >
        {props.isLoading === true ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          ''
        )}
        {props.text}
      </button>
    </>
  );
};

export default LoadingButton;
