import Flex from '../../uikit/Flex/Flex';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import SelectTag from '../../uikit/SelectTag/SelectTag';

const NonDsRequiredSkills = () => {
  return (
    <Flex>
      <LabelWrapper label="Required Skills" required>
        <SelectTag
          isMulti
          options={[]}
          isCreate
          isSearchable
          menuIsOpen={false}
        />
      </LabelWrapper>
    </Flex>
  );
};
export default NonDsRequiredSkills;
