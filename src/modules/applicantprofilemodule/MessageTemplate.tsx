import { useState, useEffect, SetStateAction } from 'react';
import classNames from 'classnames/bind';
import { FormikProps } from 'formik';
import SvgSearch from '../../icons/SvgSearch';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import Modal from '../../uikit/Modal/Modal';
import { CANCEL } from '../constValue';
import { MessageTemplates } from './applicantProfileTypes';
import styles from './messagetemplate.module.css';
import MessageTemplateList from './MessageTemplateList';

const cx = classNames.bind(styles);

type Props = {
  messageTemplate: MessageTemplates[];
  formik: FormikProps<any>;
  open: boolean;
  hanldeClose: () => void;
};
const MessageTemplate = ({
  messageTemplate,
  formik,
  open,
  hanldeClose,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MessageTemplates[]>([]);
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = messageTemplate.filter(
      (tempList) =>
        tempList.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tempList.templates.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm, messageTemplate]);

  return (
    <Modal open={open}>
      {console.log('rd', searchResults)}

      <Flex columnFlex className={styles.overAll}>
        <Text bold color="theme" className={styles.insertStyles}>
          Insert Templates
        </Text>
        <InputText
          id="messsageTemplate_search_id"
          placeholder="Search by template name"
          value={searchTerm}
          onChange={handleChange}
          actionRight={() => (
            <label htmlFor={'messsageTemplate_search_id'} style={{ margin: 0 }}>
              <SvgSearch />
            </label>
          )}
        />
        <Flex columnFlex className={cx('scrollStyle')}>
          {searchResults && searchResults.length !== 0 ? (
            searchResults.map((list, index) => {
              return (
                <MessageTemplateList
                  key={list.name + index}
                  list={list}
                  formik={formik}
                  hanldeClose={() => {
                    hanldeClose();
                    setSearchTerm('');
                  }}
                  searchTerm={searchTerm}
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
        <Flex columnFlex row center end>
          <Button
            types="secondary"
            onClick={() => {
              hanldeClose();
              setSearchTerm('');
            }}
          >
            {CANCEL}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default MessageTemplate;
