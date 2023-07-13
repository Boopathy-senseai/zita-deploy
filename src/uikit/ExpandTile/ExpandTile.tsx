import SvgArrowDown from '../../icons/SvgArrow';
import styles from './expandtile.module.css';

interface Props {
  children: React.ReactNode;
  title: string;
  backgroundColor: string;
  activeColor: string;
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  show?: boolean;
  onClick?: () => void;
}

const ExpandTile = (props: Props) => {
  const { show = true } = props;
  return (
    <div className={styles['scrd-container']}>
      <button
        className={styles['scrd-header']}
        style={{ backgroundColor: props.backgroundColor }}
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
            <span
              className={styles['scrd-path-txt']}
              style={{ color: props.activeColor }}
            >
              {props.title}
            </span>
          </div>
        </div>
        <div
          className={styles['scrd-icon']}
          style={{ marginBottom: 11, marginRight: 0 }}
        >
          {!show ? (
            <SvgArrowDown
              width={'100%'}
              height={'100%'}
              fill={"#581845"}
            />
          ) : (
            /// TODO: Find up arrow icon & replace here
            <SvgArrowDown
              width={'100%'}
              height={'100%'}
              fill={"#581845"}
            />
          )}
        </div>
      </button>
      {show && <div className={styles['scrd-content']}>{props.children}</div>}
    </div>
  );
};

export default ExpandTile;
