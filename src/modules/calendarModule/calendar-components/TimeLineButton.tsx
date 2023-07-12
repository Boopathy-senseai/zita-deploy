import React, {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { Messages, View, ViewsProps } from 'react-big-calendar';
import style from '../styles/CalendarComponents.module.css';

interface Props {
  view: View;
  views: ViewsProps;
  messages: Messages;
  onView: (view: View) => void;
}

const TimeLineButton = ({ view, views, messages, onView }: Props) => {
  const timeSelectorRef = useRef() as MutableRefObject<HTMLDivElement>;
  const activeButtonRef = useRef() as MutableRefObject<HTMLDivElement>;
  const currentViewRef = useRef() as MutableRefObject<HTMLButtonElement>;

  const updateActiveButton = useCallback(
    (geometry: DOMRect, leftPosition: number, textContent: string | null) => {
      activeButtonRef.current.textContent = null;
      activeButtonRef.current.style.left = `${geometry.left - leftPosition}px`;
      activeButtonRef.current.style.width = geometry.width + 'px';
      activeButtonRef.current.style.height = geometry.height + 'px';
      setTimeout(() => {
        requestAnimationFrame(() => {
          activeButtonRef.current.textContent = textContent;
        });
      }, 150);
    },
    [],
  );

  useLayoutEffect(() => {
    if (
      timeSelectorRef.current &&
      activeButtonRef.current &&
      currentViewRef.current
    ) {
      let leftPosition = timeSelectorRef.current.getBoundingClientRect();
      let geometry = currentViewRef.current.getBoundingClientRect();

      updateActiveButton(
        geometry,
        leftPosition?.left,
        currentViewRef.current.textContent,
      );
    }
  }, []);

  const handleActiveButton = useCallback(
    (event: React.MouseEvent<HTMLElement>, name: View) => {
      if (timeSelectorRef.current && activeButtonRef.current) {
        let leftPosition = timeSelectorRef.current.getBoundingClientRect();
        let geometry = event.currentTarget.getBoundingClientRect();

        updateActiveButton(
          geometry,
          leftPosition?.left,
          event.currentTarget.textContent,
        );
      }

      onView(name);
    },
    [],
  );

  useEffect(() => {
    if (timeSelectorRef.current && currentViewRef.current) {
      let leftPosition = timeSelectorRef.current.getBoundingClientRect();
      let geometry = currentViewRef.current.getBoundingClientRect();
      
      updateActiveButton(
        geometry,
        leftPosition?.left,
        currentViewRef.current.textContent,
      );
    }
  }, [view]);

  return (
    <>
      <div className={style.timesButtonWrapper} ref={timeSelectorRef}>
        <>
          <div className={style.activeButton} ref={activeButtonRef}></div>
          {(views as View[]).map((name) => (
            <button
              type="button"
              key={name}
              ref={view === name ? currentViewRef : null}
              className={view === name ? style.active : ''}
              onClick={(event) => handleActiveButton(event, name)}
            >
              {messages[name]}
            </button>
          ))}
        </>
      </div>
    </>
  );
};

export default memo(TimeLineButton);
