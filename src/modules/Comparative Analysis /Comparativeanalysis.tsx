import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import StarsRating from 'react-star-rate';
import { Card, Modal, Button, LinkWrapper } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgClose from '../../icons/SvgClose';
import SvgshareIcon from '../../icons/SvgShareIconview';
import SvgLocationicon from '../../icons/SvgLocationicon';
import Svgeditingnotes from '../../icons/editingnotes';
import SvgJobselection from '../../icons/SvgJobselection';
import SvgAdd from '../../icons/SvgAdd';
import Avatar from '../../uikit/Avatar';
import { isEmpty } from '../../uikit/helper';
import styles from './ComparativeAnalysis.module.css';
import Addcandidatesmodal from './addcandidatesmodel';

const cx = classNames.bind(styles);

type Props = {
  Comparative?: any;
  update_alysismodal?: (val: any) => void;
  updatemodel?: (val: any, id: any) => void;
  resetdata: any;
};
const ComparativeanalysisModal = ({
  Comparative,
  update_alysismodal,
  updatemodel,
  resetdata,
}: Props) => {
  const [addmodel, setaddmodel] = useState(false);

  const openaddmodel = (val) => {
    setaddmodel(val);
  };

  const closemodel = () => {
    resetdata();
    updatemodel(false, 1);
    update_alysismodal(false);
  };
  const overall_percentage = 25;
  const data = [
    {
      candidate_id: 6763,
      candidate_id__first_name: 'abi123abi',
      candidate_id__last_name: null,
      candidate_id__email: 'abineshnk.19civil@kongu.edu',
      stage_name: 'Interviewed',
      stage_color: '#F29111',
      image: 'default.jpg',
      rank: 1,
      overallpercentage: 60,
      data: [
        {
          'Roles and Responsibilities Matching': 3,
          'Technical Tools and Languages': 5,
          ' Qualifications': 2,
        },
      ],
    },
    {
      candidate_id: 7044,
      candidate_id__first_name: 'Niranjan Kasi',
      candidate_id__last_name: null,
      candidate_id__email: 'niranjankasi776@gmail.com',
      stage_name: 'New Applicant',
      stage_color: '#888888',
      image: 'default.jpg',
      rank: 2,
      overallpercentage: 70,
      data: [
        {
          'Roles and Responsibilities Matching': 3,
          'Technical Tools and Languages': 5,
          ' Qualifications': 2,
        },
      ],
    },
    {
      candidate_id: 7096,
      candidate_id__first_name: 'manoj',
      candidate_id__last_name: 'R',
      candidate_id__email: 'nbh@gmail.com',
      stage_name: 'New Applicant',
      stage_color: '#888888',
      image: 'default.jpg',
      rank: 3,
      overallpercentage: 10,
      data: [
        {
          'Roles and Responsibilities Matching': 3,
          'Technical Tools and Languages': 5,
          ' Qualifications': 2,
        },
      ],
    },
    {
      candidate_id: 7086,
      candidate_id__first_name: 'HIBRO',
      candidate_id__last_name: null,
      candidate_id__email: 'HIBRO@gmail.com',
      stage_name: 'New Applicant',
      stage_color: '#888888',
      image: 'default.jpg',
      rank: 4,
      overallpercentage: 90,
      data: [
        {
          'Roles and Responsibilities Matching': 3,
          'Technical Tools and Languages': 5,
          ' Qualifications': 2,
        },
      ],
    },
    {
      candidate_id: 7090,
      candidate_id__first_name: 'TIGER',
      candidate_id__last_name: null,
      candidate_id__email: 'FFFF@gmail.com',
      stage_name: 'New Applicant',
      stage_color: '#888888',
      image: 'default.jpg',
      rank: 5,
      overallpercentage: 100,
      data: [
        {
          'Roles and Responsibilities Matching': 3,
          'Technical Tools and Languages': 5,
          ' Qualifications': 2,
        },
      ],
    },
  ];
  return (
    <Flex width={700} middle>
      <Modal open={Comparative}>
        <Flex style={{ backgroundColor: 'white' }}>
          <Flex
            center
            row
            between
            style={{ backgroundColor: '#EEE8EC', padding: '10px' }}
            flex={1}
          >
            <Flex></Flex>
            <Flex>Comparative Analysis & AI Recommendation</Flex>
            <Flex end onClick={closemodel}>
              <SvgClose
                width={10}
                height={10}
                fill={'#888888'}
                cursor={'pointer'}
              />
            </Flex>
          </Flex>
          <Flex style={{ padding: '25px' }}>
            <Card className={styles.card}>
              <Flex className={styles.cardheader}>
                <Text style={{ color: 'white', padding: ' 5px 0px 0px 20px' }}>
                  {' '}
                  AI Recommendation{' '}
                </Text>
              </Flex>
              <Flex className={styles.container}>
                <Flex className={styles.part1}>
                  <Flex style={{ justifyContent: 'center' }}>
                    <Flex>
                      <Avatar
                        className={styles.profile}
                        style={{ fontSize: '26px', textTransform: 'uppercase' }}
                        avatar={
                          //   candiList.image && candiList.image !== 'default.jpg'
                          //     ? `${process.env.REACT_APP_HOME_URL}media/${candiList.image}`
                          //     : undefined
                          'https://i.ibb.co/fFSqFCW/new.png'
                        }
                        // initials={getUserInitials({
                        //   firstName: candiList.first_name,
                        //   lastName: candiList.last_name,
                        // })}
                        initials={'m'}
                      />
                    </Flex>
                    <Text style={{ padding: '2px 0px 0px 0px' }}>John Doe</Text>
                  </Flex>
                </Flex>
                <Flex className={styles.part2}></Flex>
                <Flex className={styles.part3}>
                  <Text style={{ marginTop: '15px' }}>
                    {' '}
                    Lorem ipsum dolor sit amet consectetur. Ac ac ornare enim id
                    in. Ipsum vitae tempus amet quam quam vehicula velit.
                    Tincidunt quisque lectus gravida eget magna. Mi ultrices
                    facilisi velit quam metus{' '}
                  </Text>
                </Flex>
              </Flex>
            </Card>
            <Flex row between marginTop={20} marginBottom={13}>
              <Flex>
                <Text>Comparative Analysis</Text>
              </Flex>
              <Flex
                onClick={() => openaddmodel(true)}
                row
                center
                style={{ cursor: 'pointer' }}
              >
                <Flex marginRight={7} style={{ cursor: 'pointer' }}>
                  <SvgAdd height={10} width={10} fill="#581845" />
                </Flex>
                <Flex>
                  <Text color="theme" size={13} style={{ cursor: 'pointer' }}>
                    Add Candidate
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex row flex={12}>
              <Flex>
                <Flex row marginTop={20} flex={4}>
                  <Flex>
                    {' '}
                    <SvgJobselection width={15} height={15} />
                  </Flex>
                  <Flex marginLeft={7}>
                    <Text size={13} color="theme">
                      Senior Devops Engineer - JD001
                    </Text>
                  </Flex>
                </Flex>
                <Flex row marginTop={10}>
                  <Flex marginLeft={-1.5}>
                    {' '}
                    <SvgLocationicon height={18} width={18} fill={'#581845'} />
                  </Flex>
                  <Flex marginLeft={7}>
                    <Text size={13} color="theme">
                      California, US
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  row
                  marginTop={67}
                  center
                  style={{
                    borderBottom: '1px solid rgb(195, 195, 195)',
                    paddingBottom: '6px',
                  }}
                >
                  <Flex> Criteria </Flex>
                  <Flex marginLeft={15} style={{ cursor: 'pointer' }}>
                    <Svgeditingnotes height={14} width={14} fill={'#581845'} />
                  </Flex>
                </Flex>
                {Object.keys(data[0].data[0]).map((propertyName, index) => {
                  return (
                    <Flex
                      marginTop={6}
                      style={{
                        borderBottom: '1px solid rgb(195, 195, 195)',
                        paddingBottom: '6px',
                      }}
                      key={index}
                    >
                      {propertyName}
                    </Flex>
                  );
                })}
              </Flex>
              <Flex
                flex={8}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  overflowX: 'scroll',
                  margin: '5px',
                }}
              >
                {data.map((e) => {
                  return (
                    <Flex
                      key=""
                      row
                      marginRight={20}
                      marginBottom={2}
                      marginTop={2}
                      marginLeft={1}
                    >
                      <Card className={styles.cardstructureforprofile}>
                        <Flex row between>
                          <Flex
                            style={{
                              backgroundColor: '#581845',
                              borderRadius: '2px 2px 0px 0px',
                            }}
                            width={20}
                            height={37}
                            marginLeft={10}
                          >
                            <Flex center middle>
                              <text style={{ color: 'white' }}>{e.rank}</text>
                            </Flex>
                            <Flex className={styles.triangle}> </Flex>
                          </Flex>
                          <Flex
                            marginTop={20}
                            marginLeft={-10}
                            marginBottom={-20}
                          >
                            <Avatar
                              className={styles.profile}
                              style={{
                                fontSize: '26px',
                                textTransform: 'uppercase',
                              }}
                              // avatar={
                              //   candiList.image && candiList.image !== 'default.jpg'
                              //     ? `${process.env.REACT_APP_HOME_URL}media/${candiList.image}`
                              //     : undefined
                              // 'https://i.ibb.co/fFSqFCW/new.png'}
                              // initials={getUserInitials({
                              //   firstName: candiList.first_name,
                              //   lastName: candiList.last_name,
                              // })}
                              initials={`${e?.candidate_id__first_name?.charAt(
                                0,
                              )}${
                                !isEmpty(e.candidate_id__last_name)
                                  ? e.candidate_id__last_name?.charAt(0)
                                  : ''
                              }`}
                            />
                            <Flex
                              className={cx({
                                countStyle1: e.overallpercentage < 40,
                                countStyle2:
                                  e.overallpercentage >= 40 &&
                                  e.overallpercentage < 69,
                                countStyle3: e.overallpercentage > 69,
                              })}
                            >
                              <Text style={{ fontSize: 10, marginTop: ' 2px' }}>
                                {e.overallpercentage}
                              </Text>
                            </Flex>
                          </Flex>
                          <Flex marginRight={10} marginTop={10}>
                            <SvgClose
                              width={10}
                              height={10}
                              fill={'#888888'}
                              cursor={'pointer'}
                            />
                          </Flex>
                        </Flex>
                        <Flex row middle center>
                          <Flex
                            width={4}
                            style={{
                              backgroundColor:'#581845',
                              borderRadius: '4px',
                            }}
                            height={16}
                            marginRight={5}
                          ></Flex>
                          <Flex>
                            <Text className={styles.changingtexts}>
                              {e.candidate_id__first_name}{' '}
                              {e.candidate_id__last_name}
                            </Text>
                          </Flex>
                          <LinkWrapper
                            target={'_blank'}
                            to={`/applicant_profile_view/${1826}/${
                              e.candidate_id
                            }`}
                          >
                            {' '}
                            <Flex
                              marginLeft={5}
                              style={{
                                cursor: 'pointer',
                                position: 'relative',
                              }}
                            >
                              {' '}
                              <SvgshareIcon width={18} height={18} />
                            </Flex>
                          </LinkWrapper>
                        </Flex>
                        <Flex
                          middle
                          center
                          style={{ cursor: 'default' }}
                          height={25}
                          marginTop={5}
                          className={styles.starratingoverall}
                        >
                          {' '}
                          <StarsRating value={2} disabled count={5} />
                        </Flex>
                        <Flex marginTop={20}>
                          {Object.values(data[0].data[0]).map(
                            (propertyName, index) => {
                              return (
                                <Flex
                                  style={{
                                    borderTop: '1px solid rgb(195, 195, 195)',
                                    padding: '4px',
                                  }}
                                  middle
                                  key={index}
                                  height={34}
                                  center
                                >
                                  {propertyName}
                                </Flex>
                              );
                            },
                          )}
                        </Flex>
                      </Card>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
      <Addcandidatesmodal model={addmodel} openfunction={openaddmodel} />
    </Flex>
  );
};

export default ComparativeanalysisModal;
