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
  edit?: any;
  edit_function?: (val: any) => void;
  select_candidate?: (val: any, id: any) => void;
  selectedcriteria: any;
  update_riteria: (val: any) => void;
  newedit?: any;
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
  edit,
  edit_function,
  selectedcriteria,
  update_riteria,
  newedit,
}: Props) => {
  const [addmodel, setaddmodel] = useState(false);
  const { jdId } = useParams<ParamsType>();
  const [iskey, setkey] = useState(0);
  const [isDatastore, setDatastore] = useState<any>();
  const [isPros, setPros] = useState(false);
  const [isLoader, setLoader] = useState(true);
  const [verify, setverify] = useState(false);
  const [olddata, setolddata] = useState([]);
  const [errormsg, seterrormsg] = useState('');
  const [addcandidate, setaddcandidate] = useState(false);
  const [value, setval] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const openaddmodel = (val) => {
    setaddmodel(val);
  };
  const Edit = () => {
    edit_function(true);
    update_alysismodal(false);
  };

  const closemodel = () => {
    resetdata();
    updatemodel(false, 1);
    update_alysismodal(false);
  };

  useEffect(() => {
    setolddata(Matching);
    if (newedit === true) {
      setLoader(false);
      edit_function(false);
    } else {
      dispatchcomparativeApi(Matching, isData, value);
    }
  }, []);

  const dispatchcomparativeApi = (match, Data, values) => {
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
        update_riteria(response);
        setLoader(false);
        dispatch(comparativesearchingdatamiddleware({ jd_id: jdId }));
        if (edit === true) {
          Toast(
            'Criteria for the comparison updated successfully',
            'LONG',
            'success',
          );
        }
        if (values === true) {
          Toast(
            'Candidate list for the comparison updates successfully.',
            'LONG',
            'success',
          );
        }
        setaddcandidate(false);
        edit_function(false);
      } else {
        setLoader(false);
        closemodel();
        Toast(
          'Sorry, there was a problem connecting to the API. Please try again later.',
          'LONG',
          'error',
        );
        edit_function(false);
      }
    });
  };
  const DownloadCsv = () => {
    dispatch(
      comparativecsvdownloadmiddleware({
        response_json: JSON.stringify(selectedcriteria.payload),
        jd_id: jdId,
      }),
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
    setverify(false);
    dispatchcomparativeApi(Matching, isData, value);
  };
  const add_candidates = (val) => {
    setaddcandidate(val);
  };

  const cancelverify = () => {
    setverify(false);
    seterrormsg('');
    select_candidate(olddata, 6);
  };
  let totalSum = 0;

  return (
    <>
      <Flex middle>
        {isLoader && !newedit ? (
          <Loader />
        ) : (
          <>
            <Modal open={Comparative}>
              <Flex style={{ backgroundColor: 'white', borderRadius: '4px' }}>
                <Flex
                  center
                  row
                  between
                  style={{
                    backgroundColor: '#EEE8EC',
                    padding: '10px',
                    borderRadius: '4px 4px 0px 0px',
                  }}
                  flex={1}
                >
                  <Flex></Flex>
                  <Flex> <Text size={14} color='theme'>Comparative Analysis & AI Recommendation</Text></Flex>
                  <Flex end onClick={closemodel} marginRight={15}>
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
                      <Text
                        style={{ color: 'white', paddingLeft: '10px' }}
                        size={14}
                        bold
                      >
                        {' '}
                        AI Recommendation{' '}
                      </Text>
                    </Flex>
                    {selectedcriteria ? (
                      <>
                        {selectedcriteria.payload.analysis
                          .sort((data1, data2) => {
                            if (
                              data1.Total_matching_percentage <
                              data2.Total_matching_percentage
                            )
                              return -1;
                            if (
                              data1.Total_matching_percentage >
                              data2.Total_matching_percentage
                            )
                              return 1;
                            return 0;
                          })
                          .reverse()
                          .map(
                            (e, index) =>
                              index === 0 && (
                                <Flex row style={{ margin: '5px' }}>
                                  <Flex middle>
                                    <Avatar
                                      className={styles.profilehead}
                                      style={{
                                        fontSize: '22px',
                                        textTransform: 'uppercase',
                                        color:"white",
                                        fontWeight:"bold"
                                      }}
                                      avatar={
                                        e.image && e.image !== 'default.jpg'
                                          ? `${process.env.REACT_APP_HOME_URL}media/${e.image}`
                                          : undefined
                                      }
                                      initials={`${isEmpty(e.last_name) ? e?.first_name?.slice(0, 2) :e?.first_name?.charAt(0)}
                                     ${!isEmpty(e.last_name)
                                          ? e.last_name?.charAt(0)
                                          : ''
                                        }`}
                                    />
                                  </Flex>
                                  <Flex>
                                    <Flex marginLeft={15}>
                                      <Text
                                        bold
                                        size={14}
                                        style={{
                                          padding: '2px 0px 0px 0px',
                                          textTransform: 'capitalize',
                                        }}
                                      >{`${e?.first_name.toLowerCase()}${!isEmpty(e.last_name)
                                        ? e.last_name.toUpperCase()
                                        : ''
                                        }`}</Text>
                                    </Flex>
                                    <Flex
                                      className={styles.part3}
                                      center
                                      marginLeft={15}
                                      key={''}
                                    >
                                      <Text>{e?.Pros.join('. ')}</Text>
                                    </Flex>
                                  </Flex>
                                </Flex>
                              ),
                          )}
                      </>
                    ) : (
                      ''
                    )}
                  </Card>
                  <Flex row between marginTop={20} marginBottom={13}>
                    <Flex row center>
                      <Flex>
                        <Text bold size={14}>
                          Comparative Analysis
                        </Text>
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
                          bold
                        >
                          Add Candidate
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex row>
                    <Flex>
                      <Flex row marginTop={5} flex={4}>
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
                        marginTop={62.7}
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
                        margin: '5px 5px 5px 0px',
                      }}
                    >
                      {selectedcriteria &&
                        selectedcriteria.payload.analysis
                          .sort((data1, data2) => {
                            // Replace 'someProperty' with the property you want to sort by
                            if (
                              data1.Total_matching_percentage <
                              data2.Total_matching_percentage
                            )
                              return -1;
                            if (
                              data1.Total_matching_percentage >
                              data2.Total_matching_percentage
                            )
                              return 1;
                            return 0;
                          })
                          .reverse()
                          .map((e, indexnum) => {
                            return (
                              <Flex
                                key=""
                                row
                                marginBottom={2}
                                marginTop={2}
                                marginLeft={10}
                              >
                                <Card
                                  className={styles.cardstructureforprofile}
                                >
                                  <Flex row between>
                                    <Flex
                                      style={{
                                        backgroundColor: '#581845',
                                      }}
                                      width={20}
                                      height={37}
                                      marginLeft={16}
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
                                          color:"white",
                                          fontWeight:"bold"
                                        }}
                                        avatar={
                                          e.image && e.image !== 'default.jpg'
                                            ? `${process.env.REACT_APP_HOME_URL}media/${e.image}`
                                            : undefined
                                        }
                                        initials={`${isEmpty(e.last_name) ? e?.first_name?.slice(0, 2) : e?.first_name?.charAt(0)}${!isEmpty(e.last_name)
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
                                      width={12}
                                      title={e.stage_name}
                                      style={{
                                        backgroundColor: e.stage_color,
                                        borderRadius: '4px',
                                      }}
                                      height={12}
                                      marginRight={5}
                                      marginBottom={1}
                                    ></Flex>
                                    <Flex
                                      title={`${e.first_name.toUpperCase()} ${e.last_name
                                        ? e.last_name.toUpperCase()
                                        : ''
                                        }`}
                                    >
                                      <Text className={styles.changingtexts}>
                                        {e.first_name.toUpperCase()}{' '}
                                        {e.last_name
                                          ? e.last_name.toUpperCase()
                                          : ''}
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
                                  <Flex>
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
                                            {Math.round(e.categories[key]) <=
                                              3 && (
                                                <Text size={12}>{`${Math.round(
                                                  e.categories[key],
                                                )}/10 (Low)`}</Text>
                                              )}
                                            {Math.round(e.categories[key]) >
                                              7 && (
                                                <Text size={12}>{`${Math.round(
                                                  e.categories[key],
                                                )}/10 (High)`}</Text>
                                              )}
                                            {Math.round(e.categories[key]) >
                                              3 &&
                                              Math.round(e.categories[key]) <=
                                              7 && (
                                                <Text size={12}>{`${Math.round(
                                                  e.categories[key],
                                                )}/10 (Medium)`}</Text>
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
                    selectedcriteria.payload.analysis
                      .sort((data1, data2) => {
                        // Replace 'someProperty' with the property you want to sort by
                        if (
                          data1.Total_matching_percentage <
                          data2.Total_matching_percentage
                        )
                          return -1;
                        if (
                          data1.Total_matching_percentage >
                          data2.Total_matching_percentage
                        )
                          return 1;
                        return 0;
                      })
                      .reverse()
                      .map((data, index) => {
                        if (iskey.toString().includes(index)) {
                          return (
                            <Flex key={index} marginBottom={15}>
                              <Flex row between center>
                                <Flex row center>
                                  <Flex
                                    style={{
                                      fontsize: '14px',
                                      color: '#581845',
                                    }}
                                  >
                                    <Text size={14} bold color="theme">
                                      {' '}
                                      Detailed Information
                                    </Text>
                                  </Flex>
                                  <Flex
                                    onClick={() => setPros(!isPros)}
                                    marginLeft={8}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <SvgAngle
                                      width={12}
                                      height={12}
                                      fill="#581845"
                                      up={isPros}
                                    />
                                  </Flex>
                                </Flex>
                                {isPros && (
                                  <Flex row end center>
                                    <Flex
                                      onClick={() => setkey(iskey - 1)}
                                      disabled={iskey === 0}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <SvgLeft
                                        fill={
                                          iskey === 0 ? '#888888' : '#581845'
                                        }
                                        height={14}
                                        width={14}
                                      />
                                    </Flex>
                                    <Flex marginLeft={7} marginRight={7}>
                                      <Text color='theme' size={13}>
                                        {`${data?.first_name.toUpperCase()} ${!isEmpty(data.last_name)
                                          ? data.last_name.toUpperCase()
                                          : ''
                                          }`}
                                      </Text>
                                    </Flex>
                                    <Flex
                                      onClick={() => setkey(iskey + 1)}
                                      style={{ cursor: 'pointer' }}
                                      disabled={
                                        selectedcriteria.payload.analysis
                                          .length -
                                        1 ===
                                        iskey
                                      }
                                    >
                                      <SvgRight
                                        fill={
                                          selectedcriteria.payload.analysis
                                            .length -
                                            1 ===
                                            iskey
                                            ? '#888888'
                                            : '#581845'
                                        }
                                        height={14}
                                        width={14}
                                      />
                                    </Flex>
                                  </Flex>
                                )}
                              </Flex>
                              {isPros && (
                                <Flex>
                                  <Flex row between flex={12} marginBottom={8}>
                                    <Flex flex={3} row center>
                                      <Flex>
                                        Overall Score based on the criteria :{' '}
                                      </Flex>
                                      <Flex marginLeft={6}>
                                        {Math.round(
                                          data.Average_match_percentage,
                                        ) <= 3 && (
                                            <Text color="error" bold>
                                              {Math.round(
                                                data.Average_match_percentage,
                                              )}
                                              /10
                                            </Text>
                                          )}
                                        {Math.round(
                                          data.Average_match_percentage,
                                        ) > 7 && (
                                            <Text color="success" bold>
                                              {Math.round(
                                                data.Average_match_percentage,
                                              )}
                                              /10
                                            </Text>
                                          )}
                                        {Math.round(
                                          data.Average_match_percentage,
                                        ) > 3 &&
                                          Math.round(
                                            data.Average_match_percentage,
                                          ) <= 7 && (
                                            <Text style={{ color: '#F29111' }} bold>
                                              {Math.round(
                                                data.Average_match_percentage,
                                              )}
                                              /10
                                            </Text>
                                          )}
                                      </Flex>
                                    </Flex>
                                    <Flex flex={3} row center marginLeft={20}>
                                      <Flex>Recommended to Hire : </Flex>
                                      <Flex marginLeft={6} >
                                        {Math.round(
                                          data.Average_match_percentage,
                                        ) <= 3 && <Text color="error" bold>No</Text>}
                                        {Math.round(
                                          data.Average_match_percentage,
                                        ) > 7 && (
                                            <Text color="success" bold>Yes</Text>
                                          )}
                                        {Math.round(
                                          data.Average_match_percentage,
                                        ) > 3 &&
                                          Math.round(
                                            data.Average_match_percentage,
                                          ) <= 7 && (
                                            <Text style={{ color: '#F29111' }} bold>
                                              Neutral
                                            </Text>
                                          )}
                                      </Flex>
                                    </Flex>
                                    <Flex flex={6}></Flex>
                                  </Flex>
                                  <table className="parallel-columns-table">
                                    <colgroup>
                                      <col style={{ width: '50%' }} />
                                      <col style={{ width: '50%' }} />
                                    </colgroup>
                                    <thead style={{ border: '1px solid #A5889C' }}>
                                      <tr style={{ border: '1px solid #A5889C' }}>
                                        <th style={{ border: '1px solid #A5889C' }}>
                                          <Flex middle center style={{ padding: '3px' }}>
                                            Skills Evaluation
                                          </Flex>
                                        </th>
                                        <th style={{ border: '1px solid #A5889C', verticalAlign: 'top' }}>
                                          <Flex middle center style={{ padding: '3px' }}>
                                            Enhancement Analysis
                                          </Flex>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody style={{ border: '1px solid #A5889C' }}>
                                      <tr>
                                        {data.Pros.length !== 0 ? (
                                          <td className={styles.prosdata}>
                                            <Flex flex={1}>
                                              {data.Pros.map((Pros, indexno) => (
                                                <ul key={indexno}>
                                                  <li className="indented-list">{Pros}</li>
                                                </ul>
                                              ))}
                                            </Flex>
                                          </td>
                                        ) : (
                                          <td style={{ textAlign: 'center' }} className={styles.prosdatano}><Text size={12} color='gray'>No data found</Text></td>
                                        )}
                                        {data.Cons.length !== 0 ? (
                                          <td className={styles.Consdata}>
                                            <Flex flex={1}>
                                              {data.Cons.map((Cons, indexval) => (
                                                <ul key={indexval}>
                                                  <li className="indented-list">{Cons}</li>
                                                </ul>
                                              ))}
                                            </Flex>
                                          </td>
                                        ) : (
                                          <td style={{ textAlign: 'center' }} className={styles.Consdatano}><Text size={12} color='gray'>No data found</Text></td>
                                        )}
                                      </tr>
                                    </tbody>
                                  </table>

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
                    padding: '25px',
                    borderRadius:'4px'
                  }}
                >
                  {Matching.length === 1 ? (
                    <>
                      <Flex row>
                        You cannot eliminate the candidate because a comparison
                        requires at least two candidates
                      </Flex>
                      <Flex style={{ justifyContent: 'center' }}>
                        <Button
                          style={{ marginTop: '15px' }}
                          onClick={cancelverify}
                        >
                          ok
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex row center style={{ justifyContent: 'center' }}>
                        This action will remove the candidate from the
                        comparison.
                      </Flex>
                      <Flex row end marginTop={20}>
                        <Button
                          onClick={cancelverify}
                          types="close"
                          style={{ marginRight: '8px' }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={removeprofile}>Remove</Button>
                      </Flex>
                    </>
                  )}
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
          add_candidates={add_candidates}
          update_alysismodal={update_alysismodal}
          isData={isData}
        />
      </Flex>
    </>
  );
};

export default ComparativeanalysisModal;
