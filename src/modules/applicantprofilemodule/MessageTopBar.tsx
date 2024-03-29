import InputText from '../../uikit/InputText/InputText';
import styles from './messagetopbar.module.css';

type Props = {
  formik: any;
};
const MessageTopBar = ({ formik }: Props) => {
  return (
    <InputText 
      id={'message_top_bar'} 
      textarea 
      className={styles.textInput}
      value={formik.values.userMessage}
      onChange={formik.handleChange('userMessage')}
      placeholder="Type your message here..."
    />
  );
};

export default MessageTopBar;
