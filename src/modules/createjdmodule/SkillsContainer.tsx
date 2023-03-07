import { useFormik } from 'formik';
import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import CrossAreaTagEditer from '../../uikit/ReactDraggable/CrossAreaTagEditer';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Text from '../../uikit/Text/Text';
import { SkillsEntityOne } from './createJdTypes';
import { dsFormProps } from './formikTypes';
import SkillSaveModal from './SkillSaveModal';
import styles from './skillscontainer.module.css';
import { missSkillPostMiddleWare } from './store/middleware/createjdmiddleware';

type Props = {
  dataBaseleftTags: any;
  setDataBaseLeftTags: any;
  toolsLeftTags: any;
  setToolsLeftTags: any;
  platformsLeftTags: any;
  setPlatformsLeftTags: any;
  othersLeftTags: any;
  setOthersLeftTags: any;
  programLeftTags: any;
  setProgramLeftTags: any;
  dataBaseTags: any;
  setDataBaseTags: any;
  toolsTags: any;
  setToolsTags: any;
  platformsTags: any;
  setPlatformsTags: any;
  programTags: any;
  setProgramTags: any;
  othersTags: any;
  setOtherTags: any;
  skillsData: any;
  values: dsFormProps;
  createJdLoader: boolean;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  isMissSkill?: boolean;
  profileTitle?: string;
  profileTitleRight?: string;
  jd_id?: string;
  setMiss: (arg: boolean) => void;
  skillOne: any;
  skillFour: any;
  skillTwo: any;
  skillFive: any;
  skillThree: any;
  updateSkills: any;
  errors: any;
  touched: any;
  missPop?: boolean;
  onPristine: () => void;
  onDirty: () => void;
};

type initialProps = {
  data: {
    dataBaseTags: SkillsEntityOne[];
    toolsTags: SkillsEntityOne[];
    platformsTags: SkillsEntityOne[];
    othersTags: SkillsEntityOne[];
    programTags: SkillsEntityOne[];
  };
};

const SkillsContainer = ({
  dataBaseleftTags,
  setDataBaseLeftTags,
  toolsLeftTags,
  setToolsLeftTags,
  platformsLeftTags,
  setPlatformsLeftTags,
  othersLeftTags,
  setOthersLeftTags,
  programLeftTags,
  setProgramLeftTags,
  dataBaseTags,
  setDataBaseTags,
  toolsTags,
  setToolsTags,
  platformsTags,
  setPlatformsTags,
  programTags,
  setProgramTags,
  othersTags,
  setOtherTags,
  skillsData,
  values,
  createJdLoader,
  setFieldValue,
  isMissSkill,
  profileTitle,
  profileTitleRight,
  setMiss,
  skillOne,
  skillFour,
  skillTwo,
  skillFive,
  skillThree,
  updateSkills,
  jd_id,
  errors,
  touched,
  missPop,
  onDirty,
  onPristine,
}: Props) => {
  const [isModal, setModal] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const dataBaseSkillFilter = values.skillData.dataBaseTags.filter(
    (x) => x.skill !== '',
  );
  const otherSkillFilter = values.skillData.othersTags.filter(
    (x) => x.skill !== '',
  );
  const platSkillFilter = values.skillData.platformsTags.filter(
    (x) => x.skill !== '',
  );
  const programSkillFilter = values.skillData.programTags.filter(
    (x) => x.skill !== '',
  );
  const toolsSkillFilter = values.skillData.toolsTags.filter(
    (x) => x.skill !== '',
  );
  const skillValid =
    dataBaseSkillFilter.length === 0 &&
    otherSkillFilter.length === 0 &&
    platSkillFilter.length === 0 &&
    programSkillFilter.length === 0 &&
    toolsSkillFilter.length === 0
      ? false
      : true;
  const getJobRoleNo =
    values.jobRole.toString() === '' || values.jobRole.toString() === '0'
      ? 1
      : Number(values.jobRole);

  const getDefaultDataBaseSkills = useMemo(
    () =>
      skillsData &&
      skillsData[getJobRoleNo].database.map(
        (dataList: any, dataIndex: number) => {
          return { skill: dataList, id: dataIndex, exp: 0 };
        },
      ),
    [skillsData, getJobRoleNo],
  );

  const getDefaultToolsSkills = useMemo(
    () =>
      skillsData &&
      skillsData[getJobRoleNo].tool.map((dataList: any, dataIndex: number) => {
        return { skill: dataList, id: dataIndex, exp: 0 };
      }),
    [skillsData, getJobRoleNo],
  );

  const getDefaultPlatformSkills = useMemo(
    () =>
      skillsData &&
      skillsData[getJobRoleNo].platform.map(
        (dataList: any, dataIndex: number) => {
          return { skill: dataList, id: dataIndex, exp: 0 };
        },
      ),
    [skillsData, getJobRoleNo],
  );

  const getDefaultProgramSkills = useMemo(
    () =>
      skillsData &&
      skillsData[getJobRoleNo].programming.map(
        (dataList: any, dataIndex: number) => {
          return { skill: dataList, id: dataIndex, exp: 0 };
        },
      ),
    [skillsData, getJobRoleNo],
  );

  const getDefaultOtherSkills = useMemo(
    () =>
      skillsData &&
      skillsData[getJobRoleNo].misc.map((dataList: any, dataIndex: number) => {
        return { skill: dataList, id: dataIndex, exp: 0 };
      }),
    [skillsData, getJobRoleNo],
  );

  useEffect(() => {
    setDataBaseLeftTags(getDefaultDataBaseSkills);
    setToolsLeftTags(getDefaultToolsSkills);
    setPlatformsLeftTags(getDefaultPlatformSkills);
    setProgramLeftTags(getDefaultProgramSkills);
    setOthersLeftTags(getDefaultOtherSkills);
  }, [getJobRoleNo, createJdLoader]);

  const inital: initialProps = {
    data: {
      dataBaseTags,
      toolsTags,
      platformsTags,
      othersTags,
      programTags,
    },
  };
  const formik = useFormik({
    initialValues: inital,
    onSubmit: () => {},
  });

  const handleSubmit = () => {
    if (!isMissSkill) {
      setModal(false);
    }
    setDataBaseTags(formik.values.data.dataBaseTags);
    setToolsTags(formik.values.data.toolsTags);
    setPlatformsTags(formik.values.data.platformsTags);
    setOtherTags(formik.values.data.othersTags);
    setProgramTags(formik.values.data.programTags);

    if (isMissSkill && !isEmpty(jd_id)) {
      setLoader(true);
      const dataBaseSkill = formik.values.data.dataBaseTags.map((dataList) => {
        return dataList.skill + '|';
      });
      const dataToolsSkill = formik.values.data.toolsTags.map((dataList) => {
        return dataList.skill + '|';
      });
      const dataProgramSkill = formik.values.data.programTags.map(
        (dataList) => {
          return dataList.skill + '|';
        },
      );
      const dataPlatSkill = formik.values.data.platformsTags.map((dataList) => {
        return dataList.skill + '|';
      });
      const dataOtherSkill = formik.values.data.othersTags.map((dataList) => {
        return dataList.skill + '|';
      });

      const dataBaseExp = formik.values.data.dataBaseTags.map((dataList) => {
        return dataList.exp;
      });
      const dataToolsExp = formik.values.data.toolsTags.map((dataList) => {
        return dataList.exp;
      });
      const dataProgramExp = formik.values.data.programTags.map((dataList) => {
        return dataList.exp;
      });
      const dataPlatExp = formik.values.data.platformsTags.map((dataList) => {
        return dataList.exp;
      });
      const dataOtherExp = formik.values.data.othersTags.map((dataList) => {
        return dataList.exp;
      });

      const dataBaseSkillOne = formik.values.data.dataBaseTags.map(
        (dataList) => {
          return dataList.skill;
        },
      );
      const dataToolsSkillOne = formik.values.data.toolsTags.map((dataList) => {
        return dataList.skill;
      });
      const dataProgramSkillOne = formik.values.data.programTags.map(
        (dataList) => {
          return dataList.skill;
        },
      );
      const dataPlatSkillOne = formik.values.data.platformsTags.map(
        (dataList) => {
          return dataList.skill;
        },
      );
      const dataOtherSkillOne = formik.values.data.othersTags.map(
        (dataList) => {
          return dataList.skill;
        },
      );

      let dataBaseComma = '';
      let toolComma = '';
      let progarmComma = '';
      let platComma = '';

      if (!isEmpty(dataBaseExp.toString())) {
        dataBaseComma = ',';
      } else {
        dataBaseComma = '';
      }
      if (!isEmpty(dataToolsExp.toString())) {
        toolComma = ',';
      } else {
        toolComma = '';
      }
      if (!isEmpty(dataProgramExp.toString())) {
        progarmComma = ',';
      } else {
        progarmComma = '';
      }
      if (!isEmpty(dataPlatExp.toString())) {
        platComma = ',';
      } else {
        platComma = '';
      }

      const experience =
        dataBaseExp.toString() +
        dataBaseComma +
        dataToolsExp.toString() +
        toolComma +
        dataProgramExp.toString() +
        progarmComma +
        dataPlatExp.toString() +
        platComma +
        dataOtherExp.toString();

      const skillsList =
        dataBaseSkill.toString() +
        dataToolsSkill.toString() +
        dataProgramSkill.toString() +
        dataPlatSkill.toString() +
        dataOtherSkill.toString();

      dispatch(
        missSkillPostMiddleWare({
          skills: skillsList.replace(/,/g, ''),
          skills_exp: experience,
          database_skill:
            dataBaseSkillOne.length === 0 ? [''] : dataBaseSkillOne,
          platform_skill:
            dataPlatSkillOne.length === 0 ? [''] : dataPlatSkillOne,
          tool_skill: dataToolsSkillOne.length === 0 ? [''] : dataToolsSkillOne,
          misc_skill: dataOtherSkillOne.length === 0 ? [''] : dataOtherSkillOne,
          programming_skill:
            dataProgramSkillOne.length === 0 ? [''] : dataProgramSkillOne,
          jd_id,
        }),
      ).then(() => {
        setLoader(false);
        setMiss(false);
        setModal(false);
      });
    }
  };

  const columnsDataBase = {
    'column-1': {
      items: dataBaseleftTags,
    },
    'column-2': {
      items: dataBaseTags,
    },
  };
  const [dataBasecolumns, setDataBaseColumns] = useState<any>(columnsDataBase);

  useEffect(() => {
    setDataBaseColumns(columnsDataBase);
  }, [getJobRoleNo, dataBaseleftTags, dataBaseTags]);

  const columnsTools = {
    'column-1': {
      items: toolsLeftTags,
    },
    'column-2': {
      items: toolsTags,
    },
  };
  const [toolsColumns, setToolsColumns] = useState<any>(columnsTools);

  useEffect(() => {
    setToolsColumns(columnsTools);
  }, [getJobRoleNo, toolsLeftTags, toolsTags]);

  const columnsProgarm = {
    'column-1': {
      items: programLeftTags,
    },
    'column-2': {
      items: programTags,
    },
  };
  const [progarmColumns, setprogarmColumns] = useState<any>(columnsProgarm);

  useEffect(() => {
    setprogarmColumns(columnsProgarm);
  }, [getJobRoleNo, programTags, programLeftTags]);

  const columnsPlat = {
    'column-1': {
      items: platformsLeftTags,
    },
    'column-2': {
      items: platformsTags,
    },
  };
  const [platColumns, setPlatColumns] = useState<any>(columnsPlat);

  useEffect(() => {
    setPlatColumns(columnsPlat);
  }, [getJobRoleNo, platformsLeftTags, platformsTags]);

  const columnsOther = {
    'column-1': {
      items: othersLeftTags,
    },
    'column-2': {
      items: othersTags,
    },
  };
  const [otherColumns, setOtherColumns] = useState<any>(columnsOther);

  useEffect(() => {
    setOtherColumns(columnsOther);
  }, [getJobRoleNo, othersLeftTags, othersTags]);

  const otherGet = useMemo(
    () => otherColumns['column-2'].items,
    [otherColumns],
  );
  const platGet = useMemo(() => platColumns['column-2'].items, [platColumns]);
  const progarmGet = useMemo(
    () => progarmColumns['column-2'].items,
    [progarmColumns],
  );
  const baseGet = useMemo(
    () => dataBasecolumns['column-2'].items,
    [dataBasecolumns],
  );
  const toolGet = useMemo(() => toolsColumns['column-2'].items, [toolsColumns]);

  useEffect(() => {
    formik.setFieldValue('data', {
      othersTags: otherGet,
      platformsTags: platGet,
      programTags: progarmGet,
      dataBaseTags: baseGet,
      toolsTags: toolGet,
    });
    setFieldValue('skillData', {
      othersTags: otherGet,
      platformsTags: platGet,
      programTags: progarmGet,
      dataBaseTags: baseGet,
      toolsTags: toolGet,
    });
  }, [
    dataBaseTags,
    platformsTags,
    toolsTags,
    othersTags,
    programTags,
    isModal,
    otherGet,
    platGet,
    progarmGet,
    baseGet,
    toolGet,
  ]);

  useEffect(() => {
    if (!isEmpty(jd_id)) {
      setDataBaseTags(skillOne);
      setToolsTags(skillFour);
      setPlatformsTags(skillTwo);
      setOtherTags(skillFive);
      setProgramTags(skillThree);
    }
  }, [updateSkills]);

  return (
    <Flex columnFlex className={styles.overAll}>
      <SkillSaveModal
        open={isModal}
        close={() => setModal(false)}
        formik={formik}
        isMissSkill={isMissSkill}
        handleSubmit={handleSubmit}
        isLoader={isLoader}
        jd_id={jd_id}
      />
      <Flex row className={styles.titleContainer}>
        <Flex className={styles.leftTitleFlex}>
          <LabelWrapper label={profileTitle} bold>
            {!isMissSkill && (
              <Text color="gray" size={12}>
                (Please drag and drop the skills tag into the technical skills
                for adding)
              </Text>
            )}
          </LabelWrapper>
        </Flex>
        <Flex className={styles.rightTitleFlex}>
          <LabelWrapper label={profileTitleRight} required bold>
            <Text color="gray" size={12}>
              (You can add/type/copy-paste more skills in the below fields)
            </Text>
          </LabelWrapper>
        </Flex>
      </Flex>
      <Flex
        className={styles.scroll}
        height={missPop ? window.innerHeight - 400 : '100%'}
      >
        <CrossAreaTagEditer
          inputId={1}
          label={'Database:'}
          labelBold
          columns={dataBasecolumns}
          setColumns={setDataBaseColumns}
          duplicate={formik.values.data}
          onDirty={onDirty}
        />
        <div className={styles.tagTop}>
          <CrossAreaTagEditer
            tagColor="yellow"
            inputId={2}
            label={'Tools/Frameworks:'}
            labelBold
            columns={toolsColumns}
            setColumns={setToolsColumns}
            duplicate={formik.values.data}
            onDirty={onDirty}
          />
        </div>
        <div className={styles.tagTop}>
          <CrossAreaTagEditer
            tagColor="red"
            inputId={3}
            label={'Programming Languages:'}
            labelBold
            columns={progarmColumns}
            setColumns={setprogarmColumns}
            duplicate={formik.values.data}
            onDirty={onDirty}
          />
        </div>
        <div className={styles.tagTop}>
          <CrossAreaTagEditer
            tagColor="green"
            inputId={4}
            label={'Platforms:'}
            labelBold
            setColumns={setPlatColumns}
            columns={platColumns}
            duplicate={formik.values.data}
            onDirty={onDirty}
          />
        </div>
        <div className={styles.tagTop} style={{ position: 'relative' }}>
          <CrossAreaTagEditer
            tagColor="theme"
            inputId={5}
            label={'Other Skills:'}
            labelBold
            setColumns={setOtherColumns}
            columns={otherColumns}
            duplicate={formik.values.data}
            onDirty={onDirty}
          />
          <Flex end row>
            <input
              id="skillscontainer__skillValid"
              name="skillValid"
              className={styles.displayNone}
            />
            <ErrorMessage name="skillValid" errors={errors} touched={touched} />
          </Flex>
        </div>
      </Flex>

      {!isMissSkill && (
        <Flex start className={styles.btnFlex}>
          <Button
            onClick={() => {
              onPristine();
              setModal(true);
            }}
            disabled={!skillValid}
          >
            Add experience for each skill
          </Button>
        </Flex>
      )}

      {isMissSkill && (
        <Flex row middle center className={styles.btnFlexOne}>
          <Button
            onClick={() => {
              onPristine();
              setModal(true);
            }}
            disabled={!skillValid}
            className={styles.saveBtn}
          >
            Add experience for each skill
          </Button>
          <LinkWrapper
            onClick={() => onPristine()}
            target={'_parent'}
            to={`/jobs/questionnaire/${jd_id}`}
          >
            <Button disabled={!skillValid} onClick={handleSubmit}>
              Save and Continue
            </Button>
          </LinkWrapper>
        </Flex>
      )}
    </Flex>
  );
};

export default memo(SkillsContainer);
