import { useRef, useEffect } from 'react';
import { any, element } from 'prop-types';

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setOpen]);
}

const OutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.setOpen);

  return <div ref={wrapperRef}>{props.children}</div>;
};

OutsideAlerter.propTypes = {
  children: element.isRequired,
  setOpen: any,
};

export default OutsideAlerter;
