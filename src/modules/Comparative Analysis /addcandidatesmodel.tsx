import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Card, InputCheckBox, InputText, Modal } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';

import SvgClose from '../../icons/SvgClose';

import SvgSearch from '../../icons/SvgSearch';
import { isEmpty } from '../../uikit/helper';
import { mediaPath } from '../constValue';
import { Comparativeanalysis } from './mock';
import styles from './addcandidates.module.css';
const cx = classNames.bind(styles);
type Props = {
  model?: any;
  openfunction?: any;
};
const AddcandidatesModal = ({ model, openfunction }: Props) => {
  const [isColor, setColor] = useState<string[]>([]);
  const originalData = [
    {
      name: 'manoj',
      mail: 'manoj@gmasafsadgdbfdbdvaasdbnfndbvcazx il.com',
      profile: 'default.png',
      value: 1,
    },
  ];

  const jsonData = [];

  for (let i = 1; i <= 11; i++) {
    jsonData.push({ ...originalData[0] });
  }
  useEffect(() => {
    const colorCode = [
      '#d08014',
      '#d04343',
      '#db1f77',
      '#c0399f',
      '#6367de',
      '#286eb4',
      '#0f828f',
      '#7ca10c',
      '#925ace',
      '#647987',
    ];

    setColor(colorCode);
  }, []);

  const close = () => {
    openfunction(false);
  };
  return (
    <Flex>
      <Modal open={model}>
        <Flex width={750} className={styles.candidatesellectoverall}>
          <Flex
            style={{
              borderBottom: '1px solid rgb(195, 195, 195)',
              paddingBottom: '10px',
            }}
          >
            <Text size={14}>Add Candidate</Text>
          </Flex>
          <Flex row between center marginTop={10}>
            <Flex>
              <Text size={13}>Recommended candidates</Text>
            </Flex>
            <Flex row center>
              <InputText
                placeholder="search candidates"
                className={styles.inputchanges}
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
            </Flex>
          </Flex>
          <Flex row center wrap marginTop={10}>
            {jsonData.map((e, index) => {
              return (
                <Flex
                  key={index}
                  row
                  width={340}
                  style={{ padding: '7px 0px' }}
                  center
                >
                  <Flex>
                    <InputCheckBox />
                  </Flex>
                  <Flex marginLeft={10}>
                    {isEmpty(e.image) || e.image === 'default.jpg' ? (
                      <div
                        className={cx('profile')}
                        style={{
                          backgroundColor: isColor[index % isColor.length],
                        }}
                      >
                        <Text
                          color="white"
                          transform="uppercase"
                          className={styles.firstlastchar}
                        >
                          {!isEmpty(e.name) && `${e.name.charAt(0)}`}
                        </Text>
                      </div>
                    ) : (
                      <img
                        alt="profile"
                        style={{
                          borderRadius: '100%',
                          objectFit: 'cover',
                          marginRight: 8,
                          height: 40,
                          width: 40,
                        }}
                        src={mediaPath + e.image}
                      />
                    )}
                  </Flex>

                  <Flex marginLeft={10}  row >
                  <Flex
                        width={4}
                        style={{
                          backgroundColor: '#581845',
                          borderRadius: '4px',
                        }}
                        height={16}
                        marginRight={5}
                        marginTop={3}
                      ></Flex>
                    <Flex 
                      >
                      
                      <Flex>{e.name}</Flex>
                      <Flex>
                      <Text className={styles.changingtexts} title={e.mail}>
                        {e.mail}
                      </Text>
                    </Flex>
                    </Flex>
                    
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <Flex
            style={{
              borderBottom: '1px solid rgb(195, 195, 195)',
              paddingBottom: '10px',
            }}
          ></Flex>
          <Flex row end>
            <Flex
              center
              marginRight={10}
              marginTop={10}
              className={styles.centerali}
            >
              <Button types="secondary" onClick={() => close()}>
                Cancel
              </Button>
            </Flex>
            <Flex center marginTop={10} className={styles.centerali}>
              <Button>Compare</Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default AddcandidatesModal;
