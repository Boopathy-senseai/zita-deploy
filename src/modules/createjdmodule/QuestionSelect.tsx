import Flex from '../../uikit/Flex/Flex';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import { TemplateEntity } from './createJdTypes';

type Props = {
  value: TemplateEntity;
  handleCheckBoxClick: (e: {
    target: { id: string; checked: boolean };
  }) => void;
  isCheck: string[];
};
const QuestionSelect = ({ value, handleCheckBoxClick, isCheck }: Props) => {
  return (
    <Flex middle>
      <InputCheckBox
        checked={isCheck.includes(value.id.toString())}
        key={value.id.toString()}
        name={value.question}
        id={value.id.toString()}
        onChange={handleCheckBoxClick}
      />
    </Flex>
  );
};

export default QuestionSelect;
