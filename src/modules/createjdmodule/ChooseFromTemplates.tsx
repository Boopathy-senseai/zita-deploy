import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Button from '../../uikit/Button/Button';
import Table from '../../uikit/Table/Table';
import { AppDispatch } from '../../store';
import { QuestionnaireForJdEntity, TemplateEntity } from './createJdTypes';
import { templateTitle } from './questionnaireTable';
import styles from './choosefromtemplates.module.css';
import {
  questionnaireForJdMiddleWare,
  questionnaireSaveMiddleWare,
} from './store/middleware/createjdmiddleware';

type Props = {
  template: TemplateEntity[];
  jdId: string;
  tabledata: QuestionnaireForJdEntity[];
  tabledataisLoading: boolean;
  tempLoading: boolean;
  onDirty: () => void;
  onPristine: () => void;
};
const ChooseFromTemplates = ({
  template,
  jdId,
  tabledata,
  tabledataisLoading,
  tempLoading,
  onDirty,
  onPristine,
}: Props) => {
  const [isCheckBox, setCheckBox] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: { template },
    onSubmit: () => {},
  });

  const updateId = tabledata.map((updateList) => {
    return updateList.question;
  });

  // template filter array
  const setTemplateValue = template.filter(
    (item) => !updateId.includes(item.question),
  );

  useEffect(() => {
    formik.setFieldValue('template', setTemplateValue);
  }, [tabledataisLoading, tempLoading]);

  const handleCheckBoxClick = (e: {
    target: { id: string; checked: boolean };
  }) => {
    const { id, checked } = e.target;
    setCheckBox([...isCheckBox, id]);
    if (!checked) {
      setCheckBox(isCheckBox.filter((item: any) => item !== id));
    }
  };

  const columns = useMemo(
    () => templateTitle(handleCheckBoxClick, isCheckBox, formik),
    [isCheckBox, handleCheckBoxClick, formik],
  );

  const getCheckedValue = formik.values.template.filter((item) =>
    isCheckBox.includes(item.id.toString()),
  );

  const postValue =
    getCheckedValue &&
    getCheckedValue.map((list) => {
      return list.id + '***' + list.is_required;
    });

  // template form submit
  const handleSubmit = () => {
    dispatch(
      questionnaireSaveMiddleWare({ jd_id: jdId, temp: postValue }),
    ).then((res) => {
      if (res.payload.success === true) {
        setCheckBox([]);
        dispatch(questionnaireForJdMiddleWare({ jd_id: jdId }));
      }
    });
  };

  useEffect(() => {
    if (isCheckBox.length === 0) {
      onPristine();
    } else {
      onDirty();
    }
  }, [isCheckBox]);
  return (
    <Flex columnFlex>
      <div className={styles.tableDiv}>
        <Table dataSource={formik.values.template} columns={columns} />
      </div>
      <Flex columnFlex className={styles.addBtn}>
        <Button onClick={handleSubmit} disabled={isCheckBox.length === 0}>
          Add
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChooseFromTemplates;
