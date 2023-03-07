/* eslint-disable */
import { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

function Toaster(props) {
  const [show, setShow] = useState(true);

  return (
    <div className="container mt-4">
      <Toast
        className={props.type}
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
      >
        <Toast.Header>
          <div className="pr-3">
            {props.type === 'success' ? <CheckCircleFill /> : <XCircleFill />}
          </div>
          <strong className="mr-auto">{props.content}</strong>
        </Toast.Header>
      </Toast>
    </div>
  );
}

export default Toaster;
