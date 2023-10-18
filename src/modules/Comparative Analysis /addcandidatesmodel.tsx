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
  const [sample, setsample] = useState(true);
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
      return item['first_name']
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });

  const close = () => {
    select_candidate(olddata, 6);
    add_candidates(false)
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
    if (!(Matching.length > 5)) {
      // update_alysismodal(false);
      add_candidates(true)
      openfunction(false);
      dispatchcomparativeApi(Matching, isData, sample);
    } else {
      console.log('no');
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    center
                  >
                    <Flex>
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
                          >
                            {`${e.first_name?.charAt(0)}${e?.last_name ? e?.last_name?.charAt(0) : ''
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
                          borderRadius: '50%',
                        }}
                        height={12}
                        marginRight={5}
                        marginTop={5.2}
                        title={e.stage_name}
                      ></Flex>
                      <Flex title={`${e.first_name} ${e?.last_name ? e?.last_name : ''}`}>
                        <Flex>{`${e.first_name} ${e?.last_name ? e?.last_name : ''}`}
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
            <Text color="error"> select only 5 candidate </Text>
          ) : (
            ''
          )}
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
              <Button types='close' onClick={() => close()}>
                Cancel
              </Button>
            </Flex>
            <Flex center marginTop={10} className={styles.centerali}>
              <Button onClick={Compare_candidate}>Compare</Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default AddcandidatesModal;
