/* eslint-disable */
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FormikProps } from 'formik';
import Loader from '../../components/Loader';
import classNames from 'classnames/bind';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import SvgView from '../../icons/SvgView';
import SvgHeart from '../../icons/SvgHeart';
import { getDateString, isEmpty } from '../../uikit/helper';
import ProfileWithPercentage from '../common/ProfileWithPercentage';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { YES } from '../constValue';
import ZitaMatchCandidateDrawer from '../zitamatchcandidatemodule/ZitaMatchCandidateDrawer';
import ProfileView from '../applicantpipelinemodule/ProfileView';
import styles from './mydatabasecard.module.css';
import { DataEntity } from './myDataBaseTypes';
import SkillContainer from './SkillContainer';
import LocationContainer from './LocationContainer';
import InviteContainer from './InviteContainer';
import QualificationContainer from './QualificationContainer';
import { MyDataFormProps } from './MyDataBaseScreen';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { myDataBaseDataMiddleWare } from './store/middleware/mydatabasemiddleware';
import { MyDataBaseFavoriteMiddleWare } from './store/middleware/mydatabasemiddleware';
import { color } from 'highcharts';
import { red } from '@mui/material/colors';
const cx = classNames.bind(styles);

type Props = {
  dataList: DataEntity;
  index: number;
  filterFormik: FormikProps<MyDataFormProps>;
  qaValue: string;
  skillsOptionsList: any;
  tabKey: string;
  jobId: string | boolean;
  hanldeInvite: (arg: number) => void;
  isFav: boolean;
  isCheck: string[];
  handleCheckBoxClick: (e: {
    target: { id: string; checked: boolean };
  }) => void;
  isSortOptions: {
    value: string;
    label: string;
  };
  isPage: number;
  addFavFilter: string;
};

const MyDataBaseCard = ({
  dataList,
  index,
  filterFormik,
  qaValue,
  skillsOptionsList,
  tabKey,
  jobId,
  hanldeInvite,
  isCheck,
  handleCheckBoxClick,
  isSortOptions,
  isPage,
  addFavFilter,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isInvite, setInvite] = useState(false);
  const [isProfileView, setProfileView] = useState(false);
  const [isNotes, setNotes] = useState(false);
  const [isShowMatch, setShowMatch] = useState(false);
  const [isFavLoader, setFavLoader] = useState(false);
  const [isColor, setColor] = useState(false);
  const [isFav, setFavourite] = useState(false);

  const handleFavAction = (can_id: number, jd_id: any) => {
    setFavLoader(true);
    setFavourite(!isFav);

    dispatch(MyDataBaseFavoriteMiddleWare({ can_id, jd_id })).then(() => {

      dispatch(
        myDataBaseDataMiddleWare({
          applicant_only: filterFormik.values.applicantOnly,
          jobTitle: filterFormik.values.jobTitle,
          fav: addFavFilter,
          experience: filterFormik.values.experience.value,
          educationLevel: qaValue,
          typeofJob: filterFormik.values.jobType,
          location: filterFormik.values.locationSearch,
          skill_match: skillsOptionsList,
          relocate: filterFormik.values.reLocateValue,
          candidate: '',
          userType: tabKey,
          sort: isSortOptions.value,
          page: isPage + 1,
        }),
      );
      // }
    });
  };

  // inivite popup open
  const handleInviteView = () => {
    setInvite(true);
  };
  // inivite popup submit function
  const inviteSubmit = () => {
    setInvite(false);
    hanldeInvite(dataList.id);
  };

  const handleApplicantView = () => {
    localStorage.setItem('applied_view', 'true');
    localStorage.setItem('applied_can_id', dataList.id.toString());
    localStorage.setItem('applied_jd_id', jobId.toString());
  };

  const handleProfileView = () => {
    if (isEmpty(dataList.applicant)) {
      setProfileView(true);
    }
  };

  const checkWithJd: any = useMemo(() => (jobId === false ? '0' : jobId), []);
  const isTablet = useMediaQuery({ query: '(max-width: 1000px)' });
  const normal= useMediaQuery({ query: '(min-width: 1000px) and (max-width: 1411px)' });

  // close applicant and candidate view function
  const handleClose = () => {
    dispatch(
      myDataBaseDataMiddleWare({
        jobTitle: filterFormik.values.jobTitle,
        fav: addFavFilter,
        experience: filterFormik.values.experience.value,
        educationLevel: qaValue,
        typeofJob: filterFormik.values.jobType,
        location: filterFormik.values.locationSearch,
        skill_match: skillsOptionsList,
        relocate: filterFormik.values.reLocateValue,
        candidate: '',
        userType: tabKey,
        sort: isSortOptions.value,
        page: isPage + 1,
        applicant_only: filterFormik.values.applicantOnly,
      }),
    );
    setNotes(false);
    setShowMatch(false);
    setProfileView(false);
  };
  const sidebar = sessionStorage.getItem('EmpToggle');
  const size = sidebar === '1';
  return (
    <>
      <Flex className={styles.cardwrap}
      style={{
        width: isTablet ? '100%' : normal?'48%':'32%',
      }}
      >
        {isEmpty(dataList.candidate_id_id) && (
          <>
            <ZitaMatchCandidateDrawer
              activeState={jobId === false ? 1 : 1}
              open={isNotes}
              cancel={handleClose}
              jobId={checkWithJd}
              candidateId={dataList.id.toString()}
            />
            <ZitaMatchCandidateDrawer
              activeState={jobId === false ? 2 : 3}
              open={isShowMatch}
              cancel={handleClose}
              jobId={checkWithJd}
              candidateId={dataList.id.toString()}
            />
            <ZitaMatchCandidateDrawer
              activeState={0}
              open={isProfileView}
              cancel={handleClose}
              jobId={checkWithJd}
              candidateId={dataList.id.toString()}
            />
          </>
        )}
        {!isEmpty(dataList.candidate_id_id) && (
          <>
            <ProfileView
              open={isProfileView}
              cancel={handleClose}
              jobId={checkWithJd}
              candidateId={dataList.id.toString()}
              inviteIconNone={jobId === false ? true : false}
            />
            <ProfileView
              activeState={jobId === false ? 1 : 1}
              open={isNotes}
              cancel={handleClose}
              jobId={checkWithJd}
              candidateId={dataList.id.toString()}
              inviteIconNone={jobId === false ? true : false}
            />
            <ProfileView
              activeState={jobId === false ? 3 : 3}
              open={isShowMatch}
              cancel={handleClose}
              jobId={checkWithJd}
              candidateId={dataList.id.toString()}
              inviteIconNone={jobId === false ? true : false}
            />
          </>
        )}

        {isEmpty(dataList.invite) && (
          <CancelAndDeletePopup
            open={isInvite}
            title={
              isEmpty(dataList.last_name) ? (
                <Flex>
                  <Text>{`Invite will be sent as an email to ${dataList.first_name}.`}</Text>
                  <Text> Are you sure to proceed?</Text>
                </Flex>
              ) : (
                <Flex>
                  <Text>{`Invite will be sent as an email to ${dataList.first_name} ${dataList.last_name}.`}</Text>
                  <Text> Are you sure to proceed?</Text>
                </Flex>
              )
            }
            btnDelete={inviteSubmit}
            btnCancel={() => setInvite(false)}
            btnRight={YES}
          />
        )}

        {!isEmpty(dataList.invite) && (
          <CancelAndDeletePopup
            open={isInvite}
            title={
              <Flex className={styles.popTitle}>
                <Text>{`The candidate ${
                  !isEmpty(dataList.last_name)
                    ? `${dataList.first_name} ${dataList.last_name} `
                    : `${dataList.first_name}`
                } has already been invited for this job on ${getDateString(
                  dataList.invite,
                  'll',
                )}.`}</Text>
                <Text>Do you wish to invite again?</Text>
              </Flex>
            }
            btnDelete={inviteSubmit}
            btnCancel={() => setInvite(false)}
            btnRight={YES}
          />
        )}

        <Card className={styles.cardOverAll}>
          <Flex row columnFlex className={styles.cardHeight}>
            <Flex columnFlex top>
              <InputCheckBox
                onChange={handleCheckBoxClick}
                checked={isCheck.includes(dataList.id.toString())}
                key={dataList.id.toString()}
                name={dataList.first_name}
                id={dataList.id.toString()}
              />
            </Flex>
            <Flex flex={1} width={'100%'} row>
              <Flex row className={styles.profileFlex} width={'70%'}>
                <Flex row marginLeft={5}>
                <Flex>
                  <ProfileWithPercentage
                    isPercentage={!isEmpty(filterFormik.values.jobTitle)}
                    index={index}
                    dataList={dataList}
                  />
                </Flex>
                  <Flex className={styles.nameFlex}>
                    <Flex row style={{ overflow: 'hidden', width: '80%' }}>
                      <Text
                        bold
                        textStyle="ellipsis"
                        title={
                          !isEmpty(dataList.last_name)
                            ? `${dataList.first_name} ${dataList.last_name}`
                            : `${dataList.first_name}`
                        }
                        onClick={handleProfileView}
                        color={isEmpty(dataList.applicant) ? 'link' : 'gray'}
                        className={cx({
                          pointerEvet: !isEmpty(dataList.applicant),
                        })}
                      >
                        {dataList.first_name} {dataList.last_name}
                      </Text>
                      <div
                        className={styles.svgView}
                        title={
                          isEmpty(dataList.applicant_view)
                            ? 'Yet to View'
                            : 'Profile Viewed'
                        }
                      >
                        <SvgView
                          height={15}
                          width={15}
                          nonView={isEmpty(dataList.applicant_view)}
                        />
                      </div>
                    </Flex>
                    <LocationContainer
                      dataList={dataList}
                      filterFormik={filterFormik}
                      qaValue={qaValue}
                      skillsOptionsList={skillsOptionsList}
                      tabKey={tabKey}
                      isFav={isFav}
                      isSortOptions={isSortOptions}
                      isPage={isPage}
                    />
                    <QualificationContainer
                      dataList={dataList}
                      filterFormik={filterFormik}
                      qaValue={qaValue}
                      skillsOptionsList={skillsOptionsList}
                      tabKey={tabKey}
                      isFav={isFav}
                      isSortOptions={isSortOptions}
                      isPage={isPage}
                    />
                  <Flex marginTop={15}>
                    <Flex marginTop={5}>
                      <SkillContainer
                        dataList={dataList}
                        notesClick={() => setNotes(true)}
                        showMatchClick={() => setShowMatch(true)}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                  </Flex>
              </Flex>
              <Flex width="30%" style={{borderLeft: "1px solid #A5889C"}}>
              <Flex className={styles.svgHeartaddtofavourites}>
              {!isEmpty(filterFormik.values.jobTitle) && (
                <div
                  role={'button'}
                  onKeyPress={() => {}}
                  onClick={() =>
                    handleFavAction(dataList.id, filterFormik.values.jobTitle)
                  }
                  title={
                    isEmpty(dataList.fav)
                      ? 'Add to Favourites'
                      : 'Remove From Favourites'
                  }
                >
                  {dataList.id === dataList.fav ? (
                    <SvgHeart
                      height={15}
                      width={15}
                      filled={!isEmpty(dataList.fav)}
                    />
                  ) : (
                    <SvgHeart height={16} width={16} filled={isFav} />
                  )}
                </div>
              )}
              </Flex>
                <InviteContainer
                  inviteDisable={isEmpty(filterFormik.values.jobTitle)}
                  dataList={dataList}
                  jobId={jobId}
                  handleInviteView={handleInviteView}
                  handleApplicantView={handleApplicantView}
                />
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
export default MyDataBaseCard;
