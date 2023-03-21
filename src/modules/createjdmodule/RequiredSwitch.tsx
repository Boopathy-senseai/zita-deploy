import { FormikProps } from 'formik';
import Flex from '../../uikit/Flex/Flex';
import InputSwitch from '../../uikit/Switch/InputSwitch';

type Props = {
  value: boolean;
  formik: FormikProps<any>;
  index: number;
};
const RequiredSwitch = ({ value, formik, index }: Props) => {
  return (
    <Flex middle>
      <InputSwitch
        checked={value}
        onClick={() =>
          value === true
            ? formik.setFieldValue(`template[${index}].is_required`, false)
            : formik.setFieldValue(`template[${index}].is_required`, true)
        }
      />
    </Flex>
  );
};

export default RequiredSwitch;
