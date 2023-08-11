import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { memo, useEffect, useState } from 'react';
import Totalcount from '../../globulization/TotalCount';
import Button from '../../uikit/Button/Button';
import SvgSearch from '../../icons/SvgSearch';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import { CANCEL } from '../constValue';
import { JDTemplates } from './createJdTypes';
import JdTemplateList from './JdTemplateList';
import styles from './jobdescriptiontemplate.module.css';

const cx = classNames.bind(styles);

type Props = {
  jdTemplates: JDTemplates[];
  open: boolean;
  close: () => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
};
type FormProps = {
  jobTitle: string;
};

const initial: FormProps = {
  jobTitle: '',
};

const JobDescriptionTemplate = ({
  jdTemplates,
  open,
  close,
  setFieldValue,
}: Props) => {
  const [searchResults, setSearchResults] = useState<JDTemplates[]>([]);

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  useEffect(() => {
    const results = jdTemplates.filter((tempList) =>
      tempList.job_title
        .toLowerCase()
        .includes(formik.values.jobTitle.toLowerCase()),
    );
    setSearchResults(results);
  }, [formik.values.jobTitle, jdTemplates]);
// template close function
  const hanldeClose = () => {
    close();
    formik.resetForm();
  };

  return (
   
    <Modal open={open}>
       {console.log("hbhgy6tf",searchResults)}
      <Flex
        columnFlex
        className={styles.overAll}
        width={window.innerWidth / 1.35}
      >
        <Flex className={styles.title}>
          <Text color="black" bold size={14}>
            Job Description Template
          </Text>
        </Flex>
        <Flex row className={styles.inputContainer} center>
          <Flex row center>
            <Flex row center>
              {/* <Text style={{marginRight:"10px"}}>Job Title</Text> */}
              {/* <Text color="theme" style={{ marginLeft: 2, marginRight: 8 }}>
                *
              </Text> */}
            </Flex>
            <Flex row >
                <Flex style={{ width: 300, position: 'relative' }}>
                  <InputText
                    placeholder="Search by job title"
                    value={formik.values.jobTitle}
                    onChange={formik.handleChange('jobTitle')}
                  />
                  <div style={{ position: 'absolute', zIndex: 11, top: 4, right: 10 }}>
                    <SvgSearch/>
                  </div>
                </Flex>
                <Flex className={styles.totalsearchcount}>
                <Totalcount 
                  name="Total Search Count"
                  numbers={searchResults.length}
                 />
                    {/* <Text color="theme">Total Search Count: {searchResults.length}</Text> */}
                  </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          height={window.innerHeight - 401}
          columnFlex
          className={cx('scrollStyle')}
        >
          {searchResults && searchResults.length !== 0 ? (
            searchResults.map((list, index) => {
              return (
                <JdTemplateList
                  key={list.job_title + index}
                  list={list}
                  setFieldValue={setFieldValue}
                  hanldeClose={hanldeClose}
                  searchTerm={formik.values.jobTitle}
                />
              );
            })
          ) : (
            <Flex flex={1} middle center>
              <Text style={{ padding: 24 }} align="center" color="gray">
                No result found
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex style={{justifyContent: "end"}}>
        <Button
            className={styles.addBtn}
            types="close"
            onClick={hanldeClose}
          >
            {CANCEL}
          </Button>
          </Flex>
      </Flex>
    </Modal>
  );
};
export default memo(JobDescriptionTemplate);
