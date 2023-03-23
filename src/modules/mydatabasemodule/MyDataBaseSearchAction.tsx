import { FormikProps } from 'formik';
import { useRef, useState } from 'react';
import SvgSearch from '../../icons/SvgSearch';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { enterKeyPress } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { MyDataFormProps } from './MyDataBaseScreen'; // eslint-disable-line
import styles from './mydatabasesearchaction.module.css';
import { JobTitleEntity } from './myDataBaseTypes';

type Props = {
  jobTitle: JobTitleEntity[];
  formik: FormikProps<MyDataFormProps>;
};

const MyDataBaseSearchAction = ({ jobTitle, formik }: Props) => {
  const [isSearchValue, setSearchValue] = useState<any>('');
  const selectInputRef = useRef<any>();

  const hanldeSearch = () => {
    formik.setFieldValue('searchValue', isSearchValue);
  };

  const customFilter = (option: { label: string }, inputValue: string) => {
    const result = option.label
      .toLocaleLowerCase()
      .includes(inputValue.toLocaleLowerCase());
    return result;
  };

  const getOptionLabel = (option: { job_title: string }) =>
    ` ${option.job_title}`;
  const getOptionValue = (option: { id: any }) => option.id;

  return (
    <Flex className={styles.overAll}>
      <Text bold size={20}>
        My Database
      </Text>
      <Flex row center className={styles.jobTitleFlex}>
        <Flex row center flex={7}>
          <Text className={styles.jobTitleText}>Job Title</Text>
          <div style={{ width: '100%' }}>
            <SelectTag
              isSearchable={true}
              ref={selectInputRef}
              options={jobTitle}
              placeholder="Select job to find match & invite profiles"
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              onChange={(options) => {
                formik.setFieldValue('jobTitle', options.id.toString());
              }}
              noOptionsMessage={({}) => 'You have no posted jobs to display.'}
              filterOption={customFilter}
            />
          </div>
        </Flex>

        <Flex flex={5} className={styles.inputStyle}>
          <InputText
            placeholder="Search candidate by name or email"
            value={isSearchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            actionRight={() => <SvgSearch />}
            onKeyPress={(e) => enterKeyPress(e, hanldeSearch)}
          />
        </Flex>

        <Flex>
          <Button
            disabled={isSearchValue.length === 0 ? true : false}
            className={styles.btnStyle}
            onClick={hanldeSearch}
          >
            Find Candidates
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MyDataBaseSearchAction;
