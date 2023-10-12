import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import StarsRating from 'react-star-rate';
import { Card, Modal, Button, LinkWrapper } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Loader from '../../uikit/Loader/Loader';
import { Toast } from '../../uikit';
import SvgClose from '../../icons/SvgClose';
import SvgshareIcon from '../../icons/SvgShareIconview';
import SvgLocationicon from '../../icons/SvgLocationicon';
import Svgeditingnotes from '../../icons/editingnotes';
import SvgJobselection from '../../icons/SvgJobselection';
import SvgAdd from '../../icons/SvgAdd';
import Avatar from '../../uikit/Avatar';
import { isEmpty } from '../../uikit/helper';
import { AppDispatch } from '../../store';
import styles from './ComparativeAnalysis.module.css';
import Addcandidatesmodal from './addcandidatesmodel';
import {
  comparativeanalysismiddleware,
  comparativesearchingdatamiddleware,
} from './store/middleware/comparativemiddleware';

const cx = classNames.bind(styles);
type ParamsType = {
  jdId: string;
};
type Props = {
  Comparative?: any;
  update_alysismodal?: (val: any) => void;
  updatemodel?: (val: any, id: any) => void;
  resetdata: any;
  Matching: any;
  job_details: any;
  isData: any;
  select_candidate?: (val: any, id: any) => void;
};
const ComparativeanalysisModal = ({
  Comparative,
  update_alysismodal,
  updatemodel,
  resetdata,
  Matching,
  job_details,
  isData,
  select_candidate,
}: Props) => {
  const [addmodel, setaddmodel] = useState(false);
  const { jdId } = useParams<ParamsType>();
  const [responsibledata, a] = useState<any>();
  const [selectedcandidate, setselectedcandidate] = useState<any>();
  const [selectedcriteria, setresponsibledateria] = useState<any>();
  const [isLoader, setLoader] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const openaddmodel = (val) => {
    setaddmodel(val);
  };
  const Edit = () => {
    update_alysismodal(false);
  };

  const closemodel = () => {
    resetdata();
    updatemodel(false, 1);
    update_alysismodal(false);
  };

  useEffect(() => {
    dispatchcomparativeApi();
  }, []);
  const dispatchcomparativeApi = () => {
    setLoader(true);
    let candidateids = Matching.map((item) => item.candidate_id).join(',');
    let selectcriteria = isData.map((item) => item.label).join(',');
    dispatch(
      comparativeanalysismiddleware({
        candidate_ids: candidateids,
        job_id: jdId,
        categories: selectcriteria,
      }),
    ).then((response) => {
      if (response.payload.success === true) {
        setresponsibledateria(response);
        setLoader(false);
        dispatch(comparativesearchingdatamiddleware({ jd_id: jdId }));
      } else {
        Toast(
          'Sorry, there was a problem connecting to the API. Please try again later.',
          'LONG',
          'error',
        );
      }
    });
  };
  return (
    <>
      <Flex width={700} middle>
        {isLoader ? (
          <Loader />
        ) : (
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
              <Flex
                className={styles.fixingcontent}
                height={window.innerHeight - 70}
              >
                <Card className={styles.card}>
                  <Flex className={styles.cardheader}>
                    <Text
                      style={{ color: 'white', padding: ' 5px 0px 0px 20px' }}
                    >
                      {' '}
                      AI Recommendation{' '}
                    </Text>
                  </Flex>
                  {selectedcriteria ? (
                    <Flex className={styles.container}>
                      <Flex className={styles.part1}>
                        <Flex style={{ justifyContent: 'center' }}>
                          <Flex middle>
                            <Avatar
                              className={styles.profile}
                              style={{
                                fontSize: '26px',
                                textTransform: 'uppercase',
                              }}
                              avatar={
                                selectedcriteria.payload.analysis[0].image &&
                                selectedcriteria.payload.analysis[0].image !==
                                  'default.jpg'
                                  ? `${process.env.REACT_APP_HOME_URL}media/${selectedcriteria.payload.analysis[0].image}`
                                  : undefined
                              }
                              initials={`${selectedcriteria.payload.analysis[0]?.first_name?.charAt(
                                0,
                              )}
                          ${
                            !isEmpty(
                              selectedcriteria.payload.analysis[0].last_name,
                            )
                              ? selectedcriteria.payload.analysis[0].last_name?.charAt(
                                  0,
                                )
                              : ''
                          }`}
                            />
                          </Flex>
                          <Text style={{ padding: '2px 0px 0px 0px' }}>{`${
                            selectedcriteria.payload.analysis[0]?.first_name
                          }${
                            !isEmpty(
                              selectedcriteria.payload.analysis[0].last_name,
                            )
                              ? selectedcriteria.payload.analysis[0].last_name
                              : ''
                          }`}</Text>
                        </Flex>
                      </Flex>
                      <Flex className={styles.part2}></Flex>
                      <Flex className={styles.part3}>
                        <Text style={{ marginTop: '15px' }}>
                          {' '}
                          {
                            selectedcriteria.payload.analysis[0]?.Description
                          }{' '}
                        </Text>
                      </Flex>
                    </Flex>
                  ) : (
                    ''
                  )}
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
                      <Text
                        color="theme"
                        size={13}
                        style={{ cursor: 'pointer' }}
                      >
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
                          {job_details.job_title} - {job_details.job_id}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex row marginTop={10}>
                      <Flex marginLeft={-1.5}>
                        {' '}
                        <SvgLocationicon
                          height={18}
                          width={18}
                          fill={'#581845'}
                        />
                      </Flex>
                      <Flex marginLeft={7}>
                        <Text size={13} color="theme">
                          {job_details.city}, {job_details.state},
                          {job_details.country}
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
                      <Flex
                        marginLeft={15}
                        style={{ cursor: 'pointer' }}
                        onClick={Edit}
                      >
                        <Svgeditingnotes
                          height={14}
                          width={14}
                          fill={'#581845'}
                        />
                      </Flex>
                    </Flex>
                    {selectedcriteria ? (
                      <>
                        {selectedcriteria.payload.analysis[0].categories.map(
                          (item, index) => (
                            <Flex
                              marginTop={6}
                              style={{
                                borderBottom: '1px solid rgb(195, 195, 195)',
                                paddingBottom: '6px',
                              }}
                              key={index}
                            >
                              {Object.keys(item).map((key, subIndex) => (
                                <div key={subIndex}>{`${key}`}</div>
                              ))}
                            </Flex>
                          ),
                        )}
                      </>
                    ) : (
                      ''
                    )}
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
                    {selectedcriteria &&
                      selectedcriteria.payload.analysis.map((e, indexnum) => {
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
                                    <text style={{ color: 'white' }}>
                                      {indexnum + 1}
                                    </text>
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
                                    avatar={
                                      e.image && e.image !== 'default.jpg'
                                        ? `${process.env.REACT_APP_HOME_URL}media/${e.image}`
                                        : undefined
                                    }
                                    initials={`${e?.first_name?.charAt(0)}${
                                      !isEmpty(e.last_name)
                                        ? e.last_name?.charAt(0)
                                        : ''
                                    }`}
                                  />
                                  <Flex
                                    className={cx({
                                      countStyle1:
                                        e.Total_matching_percentage < 40,
                                      countStyle2:
                                        e.Total_matching_percentage >= 40 &&
                                        e.Total_matching_percentage < 69,
                                      countStyle3:
                                        e.Total_matching_percentage > 69,
                                    })}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        marginTop: ' 2px',
                                      }}
                                    >
                                      {e.Total_matching_percentage}
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
                                  title={e.stage_name}
                                  style={{
                                    backgroundColor: e.stage_color,
                                    borderRadius: '4px',
                                  }}
                                  height={16}
                                  marginRight={5}
                                ></Flex>
                                <Flex>
                                  <Text className={styles.changingtexts}>
                                    {e.first_name}{' '}
                                    {e.last_name ? e.last_name : ''}
                                  </Text>
                                </Flex>
                                <LinkWrapper
                                  target={'_blank'}
                                  to={`/applicant_profile_view/${jdId}/${e.candidateid}`}
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
                                <StarsRating
                                  value={e.overall_scorecard}
                                  disabled
                                  count={5}
                                />
                              </Flex>
                              <Flex marginTop={20}>
                                {e.categories.map((item, index) => (
                                  <Flex
                                    key={index}
                                    center
                                    middle
                                    height={34}
                                    style={{
                                      borderTop: '1px solid rgb(195, 195, 195)',
                                      padding: '4px',
                                    }}
                                  >
                                    {Object.keys(item).map((key, subIndex) => (
                                      <Flex key={subIndex}>
                                        {`${item[key]}`}
                                      </Flex>
                                    ))}
                                  </Flex>
                                ))}
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
        )}
        <Addcandidatesmodal
          model={addmodel}
          openfunction={openaddmodel}
          Matching={Matching}
          select_candidate={select_candidate}
        />
      </Flex>
    </>
  );
};

export default ComparativeanalysisModal;
