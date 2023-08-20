import SvgCheckedCircle from '../../../icons/SvgCheckedCircle';
import { InputCheckBox } from '../../../uikit';
import style from './peopleCheckbox.module.css';


interface Props {
  checked: boolean;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const PeopleCheckbox = ({
  checked,
  label,
  onClick,
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
        <span className={style.label}>{label}</span>
      </div>
    </>
  );
};

export default PeopleCheckbox;
