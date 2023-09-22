import { useState } from 'react';
import classNames from 'classnames/bind';
import { FormikProps } from 'formik';
import SvgAdd from '../../icons/SvgAdd';
import SvgAngle from '../../icons/SvgAngle';
import { GARY_4 } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { HighlightText } from '../../uikit/HighlightText/HighlightText';
import Text from '../../uikit/Text/Text';
import { MessageTemplates } from './applicantProfileTypes';
import styles from './messagetemplate.module.css';

const cx = classNames.bind(styles);

type Props = {
  list: MessageTemplates;
  formik: FormikProps<any>;
  hanldeClose: () => void;
  searchTerm: string;
  user?: string;
};

const MessageTemplateList = ({
  list,
  formik,
  hanldeClose,
  searchTerm,
  user,
}: Props) => {
  const [isCollapse, setCollapse] = useState(false);

  // copy template function
  const handleCopy = (templates: string) => {
    formik.setFieldValue('userMessage', templates);
    hanldeClose();
    setCollapse(false);
  };

  return (
    <Flex className={styles.listOverAll}>
      <Flex row center between>
        <Text
          bold
          className={styles.listHeadingStyle}
          style={{ fontSize: '14px' }}
        >
          <HighlightText
            value={list.name}
            className={styles.listHeadingStyles}
            higlight={searchTerm}
            user={user}
          />
        </Text>
        <Flex row center>
          <div
            style={{ marginRight: 16 }}
            onClick={() => setCollapse(!isCollapse)}
            className="pointer"
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            <SvgAngle width={12} height={12} fill={GARY_4} up={isCollapse} />
          </div>
          <div
            className="pointer"
            onClick={() => handleCopy(list.templates)}
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            <SvgAdd width={12} height={12} />
          </div>
        </Flex>
      </Flex>
      {!isCollapse ? (
        <HighlightText
          className={cx({ trimStyle: !isCollapse })}
          value={user === '' ? list.templates : list.templates_text}
          higlight={searchTerm}
          user={user}
        />
      ) : (
        <HighlightText
          className={styles.preStyle}
          tag="pre"
          value={user === '' ? list.templates : list.templates_text}
          higlight={searchTerm}
          user={user}
        />
      )}
    </Flex>
  );
};

export default MessageTemplateList;
