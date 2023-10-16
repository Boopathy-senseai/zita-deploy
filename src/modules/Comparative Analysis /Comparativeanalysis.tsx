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
import SvgCSV from '../../icons/SvgCSV';
import SvgRight from '../../icons/SvgRight';
import SvgLocationicon from '../../icons/SvgLocationicon';
import SvgLeft from '../../icons/SvgLeft';
import Svgeditingnotes from '../../icons/editingnotes';
import SvgJobselection from '../../icons/SvgJobselection';
import SvgAngle from '../../icons/SvgAngle';
import SvgAdd from '../../icons/SvgAdd';
import Avatar from '../../uikit/Avatar';
import { isEmpty } from '../../uikit/helper';
import { AppDispatch } from '../../store';
import styles from './ComparativeAnalysis.module.css';
import Addcandidatesmodal from './addcandidatesmodel';
import {
  comparativeanalysismiddleware,
  comparativecsvdownloadmiddleware,
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
  const [iskey, setkey] = useState(0);
  const [selectedcriteria, setresponsibledateria] = useState<any>();
  const [isPros, setPros] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [verify, setverify] = useState(false);
  const [olddata, setolddata] = useState([]);
  const [errormsg, seterrormsg] = useState('');
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
    setolddata(Matching);
    dispatchcomparativeApi(Matching, isData);
  }, []);

  const dispatchcomparativeApi = (match, Data) => {
    setLoader(true);
    let candidateids = match.map((item) => item.candidate_id).join(',');
    let selectcriteria = Data.map((item) => item.label).join(',');
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
        setLoader(false);
        Toast(
          'Sorry, there was a problem connecting to the API. Please try again later.',
          'LONG',
          'error',
        );
      }
    });
  };
  const DownloadCsv = () => {
    dispatch(
      comparativecsvdownloadmiddleware({ response_json: selectedcriteria }),
    );
  };
  const remove_user = (val) => {
    var data = {
      candidate_id: val.candidateid,
    };
    select_candidate(data, 5);
    setverify(true);
  };

  const removeprofile = () => {
    if (Matching.length === 1) {
      seterrormsg('Please select at least two candidate to compare.');
    } else {
      // update_alysismodal(false);
      setverify(false);
      dispatchcomparativeApi(Matching, isData);
    }
  };

  const cancelverify = () => {
    setverify(false);
    select_candidate(olddata, 6);
  };
  let totalSum = 0;
  return (
    <>
      <Flex middle>
        {console.log('111111111111', Matching.length)}
        {isLoader ? (
          <Loader />
        ) : (
          <>
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
                  height={window.innerHeight - 100}
                  width={window.innerWidth - 100}
                >
                  <Card className={styles.card}>
                    <Flex className={styles.cardheader} center>
                      <Text style={{ color: 'white', paddingLeft: '10px' }}>
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
                            <Flex middle>
                              <Text style={{ padding: '2px 0px 0px 0px' }}>{`${
                                selectedcriteria.payload.analysis[0]?.first_name
                              }${
                                !isEmpty(
                                  selectedcriteria.payload.analysis[0]
                                    .last_name,
                                )
                                  ? selectedcriteria.payload.analysis[0]
                                      .last_name
                                  : ''
                              }`}</Text>
                            </Flex>
                          </Flex>
                        </Flex>
                        <Flex className={styles.part3}>
                          <Text>
                            {' '}
                            {selectedcriteria.payload.analysis[0]?.Pros}{' '}
                          </Text>
                        </Flex>
                      </Flex>
                    ) : (
                      ''
                    )}
                  </Card>
                  <Flex row between marginTop={20} marginBottom={13}>
                    <Flex row>
                      <Flex>
                        <Text>Comparative Analysis</Text>
                      </Flex>
                      <Flex
                        marginLeft={15}
                        onClick={DownloadCsv}
                        title="Download CSV"
                        style={{ cursor: 'pointer' }}
                      >
                        <SvgCSV height={16} width={16} />
                      </Flex>
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
                  <Flex row>
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
                          {selectedcriteria &&
                            selectedcriteria.payload.analysis.length > 0 &&
                            Object.keys(
                              selectedcriteria.payload.analysis[0].categories,
                            ).map((key, index) => (
                              <Flex
                                marginTop={6}
                                style={{
                                  borderBottom: '1px solid rgb(195, 195, 195)',
                                  paddingBottom: '6px',
                                }}
                                key={index}
                              >
                                {`${key}`}
                              </Flex>
                            ))}
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
                                        {Math.round(
                                          e.Total_matching_percentage,
                                        )}
                                      </Text>
                                    </Flex>
                                  </Flex>
                                  <Flex
                                    marginRight={10}
                                    marginTop={10}
                                    onClick={() => remove_user(e)}
                                  >
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
                                  <Flex key={indexnum}>
                                    {Object.keys(e.categories).map(
                                      (key, subIndex) => (
                                        <Flex
                                          center
                                          middle
                                          height={34}
                                          style={{
                                            borderTop:
                                              '1px solid rgb(195, 195, 195)',
                                            padding: '4px',
                                          }}
                                          key={subIndex}
                                        >
                                          {' '}
                                          {e.categories[key] <= 3 && (
                                            <Text>{`${e.categories[key]}/10(Low)`}</Text>
                                          )}
                                          {e.categories[key] > 7 && (
                                            <Text>{`${e.categories[key]}/10(High)`}</Text>
                                          )}
                                          {e.categories[key] > 3 &&
                                            e.categories[key] <= 7 && (
                                              <Text>{`${e.categories[key]}/10(Medium)`}</Text>
                                            )}
                                        </Flex>
                                      ),
                                    )}
                                  </Flex>
                                </Flex>
                              </Card>
                            </Flex>
                          );
                        })}
                    </Flex>
                  </Flex>
                  {selectedcriteria &&
                    selectedcriteria.payload.analysis.map((data, index) => {
                      if (iskey.toString().includes(index)) {
                        return (
                          <Flex key={index} marginBottom={15}>
                            <Flex row between>
                              <Flex row center>
                                <Flex
                                  style={{ fontsize: '14px', color: '#581845' }}
                                >
                                  Detailed Information
                                </Flex>
                                <Flex
                                  onClick={() => setPros(!isPros)}
                                  marginLeft={8}
                                >
                                  <SvgAngle
                                    width={12}
                                    height={12}
                                    fill="#581845"
                                    up={isPros}
                                  />
                                </Flex>
                              </Flex>
                              <Flex row end center>
                                <Flex
                                  onClick={() => setkey(iskey - 1)}
                                  disabled={iskey === 0}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <SvgLeft
                                    fill={'#581845'}
                                    height={14}
                                    width={14}
                                  />
                                </Flex>
                                <Flex marginLeft={7} marginRight={7}>
                                  {data.first_name}
                                </Flex>
                                <Flex
                                  onClick={() => setkey(iskey + 1)}
                                  style={{ cursor: 'pointer' }}
                                  disabled={
                                    selectedcriteria.payload.analysis.length -
                                      1 ===
                                    iskey
                                  }
                                >
                                  <SvgRight
                                    fill={'#581845'}
                                    height={14}
                                    width={14}
                                  />
                                </Flex>
                              </Flex>
                            </Flex>
                            {isPros && (
                              <Flex>
                                <Flex row between flex={12}>
                                  <Flex flex={4}>
                                    Overall Score based on the criteria :{' '}
                                    {data.Average_match_percentage <= 3 && (
                                      <Text color="error">
                                        {data.Average_match_percentage}/10
                                      </Text>
                                    )}
                                    {data.Average_match_percentage > 7 && (
                                      <Text color="success">
                                        {data.Average_match_percentage}/10
                                      </Text>
                                    )}
                                    {data.Average_match_percentage > 3 &&
                                      data.Average_match_percentage <= 7 && (
                                        <Text style={{ color: '#F29111' }}>
                                          {data.Average_match_percentage}/10
                                        </Text>
                                      )}
                                  </Flex>
                                  <Flex flex={3}>
                                    Recommended to Hire :{' '}
                                    {data.Average_match_percentage <= 3 && (
                                      <Text color="error">No</Text>
                                    )}
                                    {data.Average_match_percentage > 7 && (
                                      <Text color="success">Yes</Text>
                                    )}
                                    {data.Average_match_percentage > 3 &&
                                      data.Average_match_percentage <= 7 && (
                                        <Text style={{ color: '#F29111' }}>
                                          Neutral
                                        </Text>
                                      )}
                                  </Flex>
                                  <Flex flex={5}></Flex>
                                </Flex>
                                <Flex row flex={12}>
                                  <Flex flex={6}>
                                    <Flex
                                      className={styles.tableboarder}
                                      middle
                                    >
                                      Skills Evaluation
                                    </Flex>
                                    <Flex className={styles.tableboarders}>
                                      {data.Pros}
                                    </Flex>
                                  </Flex>
                                  <Flex flex={6} marginLeft={-0.5}>
                                    <Flex
                                      className={styles.tableboarder}
                                      middle
                                    >
                                      Enhancement Analysis
                                    </Flex>
                                    <Flex className={styles.tableboarders}>
                                      {data.Cons}
                                    </Flex>
                                  </Flex>
                                </Flex>
                              </Flex>
                            )}
                            <Flex></Flex>
                          </Flex>
                        );
                      }
                    })}
                </Flex>
              </Flex>
            </Modal>
            <Flex>
              <Modal open={verify}>
                <Flex
                  column
                  style={{
                    backgroundColor: 'white',
                    width: '500px',
                    height: '250px',
                    padding: '25px',
                  }}
                >
                  <Flex center>
                    <Text color="error">{errormsg}</Text>
                  </Flex>
                  <Flex
                    row
                    center
                    marginTop={10}
                    style={{ justifyContent: 'center' }}
                  >
                    This action will remove the candidate from the comparison.
                  </Flex>
                  <Flex row end>
                    <Button
                      onClick={cancelverify}
                      types="secondary"
                      style={{ marginRight: '20px' }}
                    >
                      cancel
                    </Button>
                    <Button onClick={removeprofile}>Remove</Button>
                  </Flex>
                </Flex>
              </Modal>
            </Flex>
          </>
        )}
        <Addcandidatesmodal
          model={addmodel}
          openfunction={openaddmodel}
          Matching={Matching}
          select_candidate={select_candidate}
          dispatchcomparativeApi={dispatchcomparativeApi}
          update_alysismodal={update_alysismodal}
          isData={isData}
        />
      </Flex>
    </>
  );
};

export default ComparativeanalysisModal;
