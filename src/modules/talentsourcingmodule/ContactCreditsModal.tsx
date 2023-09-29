import { useFormik } from 'formik';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgTick from '../../icons/SvgTick';
import SvgTickmanage from '../../icons/SvgTickmanage';
import Button from '../../uikit/Button/Button';
import { SECONDARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Modal from '../../uikit/Modal/Modal';
import Toast from '../../uikit/Toast/Toast';
import Text from '../../uikit/Text/Text';
import { AppDispatch } from '../../store';
import { ERROR_MESSAGE } from '../constValue';
import { createCheckoutMiddleWare } from './store/middleware/talentSoucringMiddleware';
import styles from './contactcreditsmodal.module.css';
import { contactData } from './mock';

type Props = {
  open: boolean;
  cancelBtnOnClick: () => void;
  publicKey: string;
  setCheckOutLoader: (arg: boolean) => void;
};
type FormProps = {
  value: string;
};
const initial: FormProps = {
  value: '5',
};

const ContactCreditsModal = ({
  open,
  cancelBtnOnClick,
  publicKey,
  setCheckOutLoader,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const handleValidation = (values: FormProps) => {
    const errors: Partial<FormProps> = {};
    if (Number(values.value) < 5) {
      errors.value = 'Minimum Candidate 5';
    }
    return errors;
  };
// conatct credits form submit
  const handleSubmit = async (values: FormProps) => {
    cancelBtnOnClick();
    setCheckOutLoader(true);
    const stripe = await loadStripe(publicKey);
    dispatch(
      createCheckoutMiddleWare({
        can_count: values.value,
        amount: totalAmount,
      }),
    )
      .then((response) => {
        if (response.payload.sessionId) {
          stripe?.redirectToCheckout({ sessionId: response.payload.sessionId });
        }
      })
      .catch(() => {
        setCheckOutLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const formik = useFormik({
    initialValues: initial,
    validate: handleValidation,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const disPlayValue = Number(formik.values.value) * 2;

  const totalAmount: string = disPlayValue.toString();

//   <Flex end onClick={cancelBtnOnClick}>
//   <SvgCloseSmall />
// </Flex>

  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
      <Flex center end onClick={cancelBtnOnClick} >
        <Flex className={styles.hovercross}>
      <SvgCloseSmall  />
      </Flex>
    </Flex>

        <Flex className={styles.overAllPadding}>
          <Text type="titleMedium" align="center">
            Contact Credits
          </Text>
          <Text type="titleSmall" align="center" className={styles.contact}>
            $2/Contact
          </Text>
          {contactData.map((list, index) => {
            return (
              <Flex
                className={styles.listContainer}
                row
                center
                key={list.name + index}
              >
                <SvgTickmanage />
                <Text className={styles.listNameStyle}>{list.name}</Text>
              </Flex>
            );
          })}
          <Flex row center between className={styles.candiDateContainer}>
            <Flex row center>
              <Text bold>Contacts:</Text>
              <Flex>
                <InputText
                  id="contactCreditsModal__inputId"
                  value={formik.values.value}
                  onChange={formik.handleChange('value')}
                  className={styles.inputStyle}
                  errorMessage={formik.errors.value}
                  error={formik.touched.value}
                />
              </Flex>
            </Flex>
            <Text bold>Total: $ {disPlayValue}</Text>
          </Flex>
        </Flex>
        <Flex row center middle className={styles.btnConatiner}>
          <Button
          className={styles.btnCancelStyle}
          types="close"
            onClick={cancelBtnOnClick}
          >
            Cancel
          </Button>
          <Button
            className={styles.buyBtn}
            onClick={formik.handleSubmit}
            disabled={Number(formik.values.value) < 5}
          >
            Buy
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ContactCreditsModal;
