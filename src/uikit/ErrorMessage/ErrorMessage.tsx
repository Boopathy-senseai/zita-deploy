import Text from '../Text';
import styles from './errormessage.module.css';

type Props = {
  name: string;
  errors: any;
  touched: any;
};
const ErrorMessage = ({ name, errors, touched }: Props) => {
  if (errors && typeof errors[name] === 'string' && touched[name]) {
    return (
      <Text color="error" size={12} className={styles.errorMessage}>
        {errors[name]}
      </Text>
    );
  }
  return null;
};
export default ErrorMessage;
