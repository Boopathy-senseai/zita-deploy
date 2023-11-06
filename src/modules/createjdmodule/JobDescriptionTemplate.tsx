import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { memo, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
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
  const [valuelist, setvaluelist] = useState(null)
  const [applybtn, setapplybtn] = useState(null)
  const [indextick, setindextick] = useState(null)


  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => { },
    enableReinitialize: true,
  });

  const update = (val, index) => {
    setindextick(index)
    setvaluelist(val)
  }

  const applyfun = (val) => {

    setapplybtn(val)
  }
  const handleCopy = (list: any) => {
    if (valuelist !== null) {
      const expSplit = list?.experience.split('-').toString();
      if (expSplit?.length !== 0) {
        setFieldValue('minimumExperience', expSplit?.charAt(0));
      }
      if (expSplit?.length === 3) {
        setFieldValue('maximumExperience', expSplit?.charAt(2));
      }
      setFieldValue('jobTitle', list?.job_title);
      setFieldValue('jobDescription', list?.job_description);
      if (list?.skills !== null) {
        var d = []
        var a = list?.skills.split(",")

        a.map((val) => {
          var c = { "label": val, "value": val }
          d.push(c)

        })

        setFieldValue('nonDsSkill', d);
      }
      hanldeClose();
      //  setCollapse(false);
    }
  };
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
    setindextick(null);
    setvaluelist(null)
    formik.resetForm();
  };

  return (

    <Modal open={open}>
      {console.log("appl", applybtn)}
      <Flex
        columnFlex
        className={styles.overAll}
        width={valuelist ? (window.innerWidth / 1.35) : ('600px')}
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
                  <SvgSearch />
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
        {/* <Flex
          height={window.innerHeight - 401}
          columnFlex
          className={cx('scrollStyle')}
        > */}


        <Flex className={styles.alignrow}>
          <Flex style={{ width: valuelist === null ? '100%' : '50%', }}
            height={window.innerHeight - 230}
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
                    update={update}
                    applyfun={applyfun}
                    index={index}
                    valuelist={valuelist}
                    indextick={indextick}

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

          {valuelist !== null &&
            <>
              <Flex height={innerHeight - 232} className={styles.border}> </Flex>
              <Flex  style={{ width: '50%' }} marginTop={2} >
              <Card >
                <Flex marginBottom={10} className={styles.paddingtitle}>
                  <Text bold>{applybtn.job_title}</Text>
                </Flex>
                <Flex className={styles.scroll}  height={innerHeight - 278}>
                  <div className={cx('normalStyle')} dangerouslySetInnerHTML={{ __html: valuelist }} />
                </Flex>
              </Card></Flex>
            </>
          }
        </Flex>
        {/* </Flex> */}
        <Flex className={styles.bordertop}></Flex>
        <Flex className={styles.btnstyle} marginTop={15}>
          <Button
            className={styles.addBtn}
            types="close"
            onClick={hanldeClose}
          >
            {CANCEL}
          </Button>
          <Button
            onClick={() => handleCopy(applybtn)}
          >
            Apply
          </Button>
        </Flex>
      </Flex>

    </Modal>
  );
};
export default memo(JobDescriptionTemplate);
