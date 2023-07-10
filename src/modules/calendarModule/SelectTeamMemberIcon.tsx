import SvgCheckedCircle from '../../icons/SvgCheckedCircle';
import style from './styles/SelectTeamMemberIcon.module.css';
import { Colors } from './types';

interface Props {
  checked: boolean;
  label: string;
  onClick: () => void;
  color: Colors;
  disabled?: boolean;
}

const SelectTeamMemberCheckBox = ({
  checked,
  label,
  onClick,
  color,
  disabled = false,
}: Props) => {
  return (
    <>
      <div className={style.checkboxContainer}>
        <div
          className={style.checkbox}
          onClick={() => {
            if (!disabled) onClick();
          }}
          role="button"
        >
          <SvgCheckedCircle fill="#581845" checked={checked} />
        </div>
        <p
          className={style.label}
          style={{ backgroundColor: color?.backgroundColor }}
        >
          {label}
        </p>
      </div>
    </>
  );
};

export default SelectTeamMemberCheckBox;
