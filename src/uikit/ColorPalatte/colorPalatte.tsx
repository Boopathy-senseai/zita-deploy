import { StageData } from "../../hooks/useStages/types";
import SvgPicker from "../../icons/SvgPicker";
import SvgTickOne from "../../icons/SvgTickOne";
import { Button, Flex, InputText, Loader } from '../../uikit';
import styles from './colorPalatte.module.css';

interface ColorPalletProps {
    data: StageData;
    onChange: (value: StageData) => void;
    onMoreColour: () => void;
  }
  export const ColorPallete: React.FC<ColorPalletProps> = (props) => {
    const { data, onChange, onMoreColour } = props;
    const colors = [
      '#19BEBE',
      '#E7A3D2',
      '#FFA8A7',
      '#EBCBA2',
      '#F0926A',
      '#F1F181',
      '#C4F7C3',
      '#F4C5CD',
      '#3AE7B2',
    ];
  
    return (
      <Flex row wrap className={styles.colorMenu}>
        {colors.map((doc, index) => (
          <Button
            types="link"
            key={index}
            onClick={() => onChange({ ...data, stage_color: doc })}
            className={styles.colorButton}
            style={{ backgroundColor: doc }}
          >
            {data.stage_color === doc && (
              <div>
                <SvgTickOne fill="white" />
              </div>
            )}
          </Button>
        ))}
        <Button
          types="link"
          onClick={() => onMoreColour()}
          className={styles.colorButton}
        >
          <div >
            <SvgPicker height={30} width={30} fill="#581845" />
          </div>
        </Button>
      </Flex>
    );
  };