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
};

const MessageTemplateList = ({
  list,
  formik,
  hanldeClose,
  searchTerm,
}: Props) => {
  const [isCollapse, setCollapse] = useState(false);
  const handleCopy = (templates: string) => {
    formik.setFieldValue('userMessage', templates);
    hanldeClose();
    setCollapse(false);
  };

  return (
    <Flex className={styles.listOverAll}>
      <Flex row center between>
        <Text bold className={styles.listHeadingStyle}>
          <HighlightText value={list.name} higlight={searchTerm} />
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
          value={list.templates}
          higlight={searchTerm}
        />
      ) : (
        <HighlightText
          tag="pre"
          className={styles.preStyle}
          value={list.templates}
          higlight={searchTerm}
        />
      )}
    </Flex>
  );
};

export default MessageTemplateList;
