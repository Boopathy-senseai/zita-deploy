import { useState, useEffect, SetStateAction } from 'react';
import classNames from 'classnames/bind';
import { FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import SvgSearch from '../../icons/SvgSearch';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import Modal from '../../uikit/Modal/Modal';
import { CANCEL } from '../constValue';
import Card from '../../uikit/Card/Card';
import { RootState } from '../../store';
import { Toast } from '../../uikit';
import { MessageTemplates } from './applicantProfileTypes';
import styles from './messagetemplate.module.css';
import MessageTemplateList from './MessageTemplateList';

const cx = classNames.bind(styles);

type Props = {
  // messageTemplate: MessageTemplates[];
  formik: FormikProps<any>;
  open: boolean;
  hanldeClose: () => void;
  user?: string;
  setSubject:any,

};
const MessageTemplate = ({
  // messageTemplate,
  formik,
  open,
  hanldeClose,
  user,
  setSubject
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MessageTemplates[]>([]);
  const [valuelist, setvaluelist] = useState(null)
  const [applybtn, setapplybtn] = useState(null)
  const [indextick, setindextick] = useState(null)

  const { messageTemplate } = useSelector(
    ({ messageTemplateReducers }: RootState) => {
      return {
        messageTemplate: messageTemplateReducers.messageTemplate,
      };
    },
  );
  console.log("messageTemplatemessageTemplate",messageTemplate)



  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(e.target.value);
  };

  const update = (val, index) => {
    setindextick(index)
    setvaluelist(val)
  }

  const applyfun = (val) => {
    setapplybtn(val)
  }
  
  const handleCopy = (templates: string, subject: any) => {
    formik.setFieldValue('userMessage', templates);
    formik.setFieldValue('userSubject', subject);
    hanldeClose();
    setSubject(subject);
    Toast('Email template added successfully.', 'LONG', 'success');
  }


  useEffect(() => {
    const results = messageTemplate.filter(
      (tempList) =>
        tempList.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tempList.templates.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    {console.log("Not a Function", messageTemplate)}

    setSearchResults(results);
  }, [searchTerm]);

  return (
    <Modal open={open}>
      <Flex columnFlex className={styles.overAll} width={valuelist ? (window.innerWidth / 1.30) : ('600px')}>
        <Text bold className={styles.insertStyles}>
          {/* Insert Message Template */}
          Email Template
        </Text>
        <Flex row center style={{padding: "10px 0px 10px 0px"}}>
          <InputText
            id="messsageTemplate_search_id"
            placeholder="Search by template name..."
            className={styles.inputchanges}
            value={searchTerm}
            onChange={handleChange}
            // actionRight={() => (
            //   <label htmlFor={'messsageTemplate_search_id'} style={{ margin: 0,right:0 }}>
            //     <SvgSearch />
            //   </label>
            // )}
          />

          <Flex
            style={{ position: 'absolute' }}
            marginTop={1.5}
            middle
            center
            marginLeft={5}
          >
            <SvgSearch />
          </Flex>
          <Flex
            middle
            center
            row
            marginLeft={15}
            className={styles.totalcountchanges}
            style={{ color: '#581845', fontsize: '13px' }}
          >
            <Flex><Text color='black'>Total Search Count :</Text></Flex>
            <Flex><Text color='black'>{messageTemplate?.length}</Text></Flex>
          </Flex>
        </Flex>
        {/* <InputText
          id="messsageTemplate_search_id"
          placeholder="Search by template name"
          value={searchTerm}
          onChange={handleChange}
          actionRight={() => (
            <label htmlFor={'messsageTemplate_search_id'} style={{ margin: 0,left:8 }}>
              <SvgSearch />
            </label>
          )}
        /> */}
        <Flex row>
        <Flex
          style={{ width: valuelist === null ? '100%' : '50%'}}
          columnFlex
          height={window.innerHeight - 277}
          marginTop={5}
          className={cx('scrollStyle')}
        >
          <Flex>
          {messageTemplate && messageTemplate.length !== 0 ? (
            messageTemplate.map((list, index) => {
              return (
                <MessageTemplateList
                  key={list.name + index}
                  list={list}
                  formik={formik}
                  hanldeClose={() => {
                    hanldeClose();
                    setSearchTerm('');
                    setindextick(null);
                    setvaluelist(null)
                  } }
                  update={update}
                  applyfun={applyfun}
                  indextick={indextick}
                  index={index}
                  searchTerm={searchTerm}
                  user={user !== '' ? user : ''}
                  valuelist={valuelist} 
                  messageTemplate={messageTemplate}
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
        </Flex>
        {valuelist !== null &&
            <>
              <Flex height={innerHeight - 277} className={styles.border}></Flex>
              <Flex  style={{ width: '50%' }} marginTop={5}>
              <Flex>
                <Flex className={styles.descCardstyles} height={innerHeight - 277}>
                <Flex marginBottom={5}>
                  <Text bold size={13}>{applybtn.name}</Text>
                </Flex>
                <Flex style={{overflow:"scroll", padding: "0px 10px 10px 10px"}}>
                <Flex row marginBottom={5}>
                  <Text bold color='theme'>Subject: {applybtn.subject}</Text>
                </Flex>
                <Flex>
                  <Text bold>Body:</Text>
                  <div className={styles.templatealignment} dangerouslySetInnerHTML={{ __html: valuelist }} />
                </Flex>
                </Flex>
                </Flex>
              </Flex>
              </Flex>
            </>
          }
        </Flex>
        <Flex columnFlex row center end className={styles.botomBtncontainer}>
          <Flex row width={130} style={{justifyContent:"space-between"}}>
          <Button
            types="close"
            onClick={() => {
              hanldeClose();
              setSearchTerm('');
              setvaluelist(null);
              setindextick(null);
            }}
          >
            {CANCEL}
          </Button>
          <Button
            types="primary"
            onClick={() => {
              handleCopy(valuelist, applybtn.subject);
            }}
          >
            Add
          </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default MessageTemplate;
