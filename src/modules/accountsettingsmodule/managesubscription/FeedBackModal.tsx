import { useFormik } from 'formik';
import { useState } from 'react';
import SvgInfo from '../../../icons/SvgInfo';
import Button from '../../../uikit/Button/Button';
import { BLACK } from '../../../uikit/Colors/colors';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../../uikit/InputText/InputText';
import Modal from '../../../uikit/Modal/Modal';
import Text from '../../../uikit/Text/Text';
import { THIS_FIELD_REQUIRED } from '../../constValue';
import styles from './feedbackmodal.module.css';
import { feedbackData } from './mock';

type Props = {
  open: boolean;
  cancel: () => void;
  onClick: () => void;
};
const FeedBackModal = ({ open, cancel, onClick }: Props) => {
  const [isCheck, setIsCheck] = useState<any>([]);
  const handleCheckBoxClick = (e: {
    target: { id: string; checked: boolean };
  }) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item !== id));
    }
  };

  const handleValid = (values: any) => {
    const errors: Partial<any> = {};
    if (isCheck.includes('6') && isEmpty(values.value)) {
      errors.value = THIS_FIELD_REQUIRED;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { value: '' },
    onSubmit: () => {
      onClick();
    },
    validate: handleValid,
  });

  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        <Flex row className={styles.infoFlex} marginBottom={15}>
         
          <Flex >
            <Text style={{ marginBottom: 8 }} size={14} bold>
              We would love to hear your feedback on Zita
            </Text>
            <Text>
              We would appreciate it, if you would take a moment to let us know
              your reason for cancelling the subscription
            </Text>
            <Text>cancelling the subscription</Text>
          </Flex>
        </Flex>
        {feedbackData.map((list) => {
          return (
            <Flex row center key={list.label} marginBottom={12}>
              <InputCheckBox
                label={list.label}
                onChange={handleCheckBoxClick}
                checked={isCheck.includes(list.value.toString())}
                key={list.value.toString()}
                name={list.value}
                id={list.value.toString()}
              />
              {list.label === 'Others' && (
                <div>
                  <InputText
                    style={{ marginLeft: 16 }}
                    placeholder="Please Specify"
                    value={formik.values.value}
                    onChange={formik.handleChange('value')}
                    disabled={isCheck.includes('6') ? false : true}
                  />
                  <ErrorMessage
                    name="value"
                    errors={formik.errors}
                    touched={formik.values}
                  />
                </div>
              )}
            </Flex>
          );
        })}
        <Flex columnFlex center marginTop={8} style={{display:'flex',alignItems:'flex-end'}}>
          <Flex row center>
            <Button
              onClick={cancel}
              types="secondary"
              style={{ marginRight: 8 }}
            >
              No Thanks
            </Button>
            <Button
              // disabled={!formik.isValid}
              onClick={formik.handleSubmit}
              style={{ marginLeft: 8 }}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default FeedBackModal;
