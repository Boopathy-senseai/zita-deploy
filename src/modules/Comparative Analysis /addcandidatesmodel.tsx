import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button, Card, InputCheckBox, InputText, Modal } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgClose from '../../icons/SvgClose';

import SvgSearch from '../../icons/SvgSearch';
import { isEmpty } from '../../uikit/helper';
import { mediaPath } from '../constValue';
import { AppDispatch, RootState } from '../../store';
import { Comparativeanalysis } from './mock';
import styles from './addcandidates.module.css';
import { comparativesearchingdatamiddleware } from './store/middleware/comparativemiddleware';
const cx = classNames.bind(styles);
type Props = {
  model?: any;
  openfunction?: any;
  Matching: any;
  select_candidate?: (val: any, id: any) => void;
  dispatchcomparativeApi?: (val: any, id: any, value: any) => void;
  update_alysismodal?: (val: any) => void;
  add_candidates?: (val: any) => void;
  isData?: any;
};
type ParamsType = {
  jdId: string;
};
const AddcandidatesModal = ({
  model,
  openfunction,
  Matching,
  select_candidate,
  dispatchcomparativeApi,
  update_alysismodal,
  add_candidates,
  isData,
}: Props) => {
  const { jdId } = useParams<ParamsType>();
  const [searchQuery, setSearchQuery] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [isColor, setColor] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any>();
  const [sample, setsample] = useState('add');
  const [olddata, setolddata] = useState([]);

  const dispatch: AppDispatch = useDispatch();

  //dispatching the searchdata middleware
  useEffect(() => {
    dispatch(comparativesearchingdatamiddleware({ jd_id: jdId }));
    setolddata(Matching);
  }, []);

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

  const { data } = useSelector(
    ({ ComparativesearchingdataReducers }: RootState) => {
      return {
        data: ComparativesearchingdataReducers.data,
      };
    },
  );
  //setting the data in setstate
  useEffect(() => {
    setSearchResults(data);
  }, [data, model]);

  const filteredData =
  data &&
  data.filter((item) => {
    const firstNameMatch = item['first_name']
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const emailMatch = item['email']
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return firstNameMatch || emailMatch;
  });

  const close = () => {
    setSearchQuery('');
    select_candidate(olddata, 6);
    add_candidates(false);
    openfunction(false);
  };

  const handleInputChangepass = (val) => {
    const Exist = Matching.some(
      (item) => item.candidate_id === val.candidate_id,
    );
    if (!Exist) {
      select_candidate(val, 4);
    } else {
      select_candidate(val, 5);
    }
  };

  const Compare_candidate = () => {
    if (
      !(Matching.length > 5) &&
      Matching.length !== 1 &&
      Matching.length !== 0
    ) {
      // update_alysismodal(false);
      add_candidates(true);
      openfunction(false);
      select_candidate(Matching,6)
      setolddata(Matching)
      dispatchcomparativeApi(Matching, isData, sample); 
      
    } else {
      console.log('no');
    }
  };

  const handlechange = (e) => {
    var test1 = e.target.value.trim();
    if (test1.length !== 0) {
      setSearchQuery(e.target.value);
    } else {
      setSearchQuery(e.target.value.trim());
    }
  };

  return (
    <Flex>
      <Modal open={model}>
        <Flex
          width={750}
          height={680}
          className={styles.candidatesellectoverall}
        >
          <Flex
            style={{
              borderBottom: '1px solid rgb(195, 195, 195)',
              paddingBottom: '5px',
            }}
          >
            <Text size={14} bold>
              Add Candidate
            </Text>
          </Flex>
          <Flex row between center marginTop={5}>
            <Flex>
              <Text size={14}>Recommended candidates</Text>
            </Flex>
            <Flex row center>
              <InputText
                placeholder="search candidates by name or email"
                className={styles.inputchanges}
                onChange={(e) => handlechange(e)}
                value={searchQuery}
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
          <Flex
            row
            center
            wrap
            marginTop={10}
            height={500}
            className={styles.fixingsearchdata}
          >
            {filteredData && filteredData.length === 0 ? (
              <Flex middle center flex={1} height={window.innerHeight - 303}>
                <Text color="gray">No data found</Text>
              </Flex>
            ) : (
              filteredData &&
              filteredData.map((e, index) => {
                return (
                  <Flex
                    key={index}
                    row
                    width={340}
                    style={{ padding: '7px 0px' }} 
                  >
                    <Flex marginTop={5}>
                      <InputCheckBox
                        checked={Matching.some(
                          (item) => item.candidate_id === e.candidate_id,
                        )}
                        onChange={() => handleInputChangepass(e)}
                      />
                    </Flex>
                    <Flex marginLeft={10}>
                      {isEmpty(e.profile_image) ||
                      e.profile_image === 'default.jpg' ? (
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
                            bold
                          >
                            {`${isEmpty(e.last_name) ? e?.first_name?.slice(0, 2) :e.first_name?.charAt(0)}${
                              e?.last_name ? e?.last_name?.charAt(0) : ''
                            }`}
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
                          src={mediaPath + e.profile_image}
                        />
                      )}
                    </Flex>
                    <Flex marginLeft={10} row>
                      <Flex
                        width={12}
                        style={{
                          backgroundColor: e.stage_color,
                          borderRadius: '2px',
                        }}
                        height={12}
                        marginRight={5}
                        marginTop={5.2}
                        title={e.stage_name}
                      ></Flex>
                      <Flex
                        style={{ textTransform: 'capitalize' }}
                        title={`${e.first_name} ${
                          e?.last_name ? e?.last_name : ''
                        }`}
                      >
                        <Flex>
                          {`${e.first_name.toLowerCase()} ${
                            e?.last_name ? e?.last_name.toLowerCase() : ''
                          }`}
                        </Flex>
                        <Flex>
                          <Text
                            className={styles.changingtexts}
                            title={e.email}
                          >
                            {e.email}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                );
              })
            )}
          </Flex>

          {Matching.length > 5 ? (
            <Flex marginBottom={5}>
              <Text color="error">
                You have the option to choose up to five candidates for the
                Comparative Analysis.
              </Text>
            </Flex>
          ) : (
            ''
          )}
          {Matching.length === 1 || Matching.length === 0 ? (
            <Flex marginBottom={5}>
              <Text color="error">
                You cannot eliminate the candidate because a comparison requires
                at least two candidates.
              </Text>
            </Flex>
          ) : (
            ''
          )}
          <Flex
            style={{
              borderBottom: '1px solid rgb(195, 195, 195)',
            }}
          ></Flex>
          <Flex row end>
            <Flex
              center
              marginRight={10}
              marginTop={10}
              className={styles.centerali}
            >
              <Button types="close" onClick={() => close()} width="80px">
                Cancel
              </Button>
            </Flex>
            <Flex center marginTop={10} className={styles.centerali}>
              <Button onClick={Compare_candidate} width="80px">
                Update
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default AddcandidatesModal;
