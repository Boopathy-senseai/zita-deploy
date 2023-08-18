import clsx from 'classnames';
import SvgArrowDown from '../../icons/SvgArrow';
import styles from './expandtile.module.css';
interface Props {
  children: React.ReactNode;
  title: string | React.ReactNode;
  backgroundColor: string;
  activeColor: string;
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  show?: boolean;
  className?: string;
  btnClassName?: string;
  contentClassName?: string;
  styles?: React.CSSProperties;
  btnStyles?: React.CSSProperties;
  contentStyles?: React.CSSProperties;
  onClick?: () => void;
}

const ExpandTile = (props: Props) => {
  const { show = true, className, btnClassName, btnStyles } = props;
  return (
    <div
      className={clsx(styles['scrd-container'], className)}
      style={props.styles}
    >
      <button
        className={clsx(styles['scrd-header'], btnClassName)}
        style={{
          ...btnStyles,
          backgroundColor: props.backgroundColor,
          borderBottomLeftRadius: !show ? '5px' : '0px',
          borderBottomRightRadius: !show ? '5px' : '0px',
        }}
        onClick={props.onClick}
      >
        <div className="srcd-title-holder">
          {props.icon && (
            <div className={styles['scrd-icon']}>
              <props.icon
                width={'100%'}
                height={'100%'}
                style={{ color: props.activeColor }}
              />
            </div>
          )}
          <div className={styles['scrd-path-name']}>
            {typeof props.title === 'string' ? (
              <span
                className={styles['scrd-path-txt']}
                style={{ color: props.activeColor }}
              >
                {props.title}
              </span>
            ) : (
              props.title
            )}
          </div>
        </div>
        <div
          className={styles['scrd-icon']}
          style={{ marginBottom: 11, marginRight: 0 }}
        >
          {!show ? (
            <SvgArrowDown width={'100%'} height={'100%'} fill={'#581845'} />
          ) : (
            /// TODO: Find up arrow icon & replace here
            <SvgArrowDown width={'100%'} height={'100%'} fill={'#581845'} />
          )}
        </div>
      </button>
      {show && (
        <div
          className={clsx(styles['scrd-content'], props.contentClassName)}
          style={props.contentStyles}
        >
          {props.children}
        </div>
      )}
    </div>
  );
};

export default ExpandTile;
