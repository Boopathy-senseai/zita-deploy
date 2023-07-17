import SvgCheckedCircle from '../../icons/SvgCheckedCircle';
import { InputCheckBox } from '../../uikit';
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
        <div className={style.checkbox}>
          <InputCheckBox
            checked={checked}
            onChange={() => {
              if (!disabled) onClick();
            }}
          />
        </div>
        <div
          className={style.dot}
          style={{ backgroundColor: color?.borderColor }}
        ></div>
        <span className={style.label}>{label}</span>
      </div>
    </>
  );
};

export default SelectTeamMemberCheckBox;
