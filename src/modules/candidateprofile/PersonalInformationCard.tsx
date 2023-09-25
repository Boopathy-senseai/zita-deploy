import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { CountryEntity } from '../createjdmodule/createJdTypes';
import { SvgEdit } from '../../icons';
import { AdditionalDetailEntity, Obj, Personal } from './candidateProfileTypes';
import MyJobPreferenceCard from './MyJobPreferenceCard';
import styles from './personalinformationcard.module.css';
import PersonalInformationEdit from './PersonalInformationEdit';

type Props = {
  personal?: Personal;
  additional_detail?: AdditionalDetailEntity;
  personal_obj?: Personal;
  obj?:Obj;
  Qualification?:string;
  isGetCountry: CountryEntity[];
  isProfileView?: boolean;
};
const PersonalInformationCard = ({
  personal,
  additional_detail,
  obj,
  Qualification,
  personal_obj,
  isGetCountry,
  isProfileView,
}: Props) => {
  const [isPersonalEdit, setPersonalEdit] = useState(false); 
  const address =
    !isEmpty(personal?.city__name) &&
    !isEmpty(personal?.state__name) &&
    !isEmpty(personal?.country__name)
      ? `${personal?.city__name}, ${personal?.state__name}, ${personal?.country__name} - ${personal?.zipcode}`
      : '';

  const expYears = isEmpty(additional_detail?.total_exp_year)
    ? ''
    : additional_detail?.total_exp_year === 0
    ? additional_detail.total_exp_month <= 0
      ? 'Fresher'
      : ''
    : additional_detail?.total_exp_year === 1
    ? `${additional_detail?.total_exp_year} Year`
    : `${additional_detail?.total_exp_year} Years`;

  const expMonth = isEmpty(additional_detail?.total_exp_month)
    ? ''
    : additional_detail?.total_exp_month === 0
    ? ''
    : additional_detail?.total_exp_month === 1
    ? '1 Month'
    : `${additional_detail?.total_exp_month} Months`;

  const data = [
    {
      title: 'Contact Number:',
      value: personal?.contact_no,
      right: 136,
    },
    { title: 'Email:', value: notSpecified(personal?.email), right: 202 },
    {
      title: 'Gender:',
      value: notSpecified(personal?.gender__label_name),
      right: 190,
    },
    {
      title: 'Birth Year:',
      value: notSpecified(personal?.Date_of_birth),
      right: 176,
    },
    { title: 'Address:', value: notSpecified(address), right: 186 },
    {
      title: 'LinkedIn:',
      value: notSpecified(personal?.linkedin_url),
      right: 185,
    },
    {
      title: 'Your Personal Code Repository:',
      value: notSpecified(personal?.code_repo),
      right: 44,
    },
    {
      title: 'Total Experience:',
      value:
        isEmpty(expYears) && isEmpty(expMonth)
          ? 'Not Specified'
          : `${expYears} ${expMonth}`,
      right: 136,
    },
    {
      title: 'Qualification:',
      value: notSpecified(Qualification),
      right: 161,
    },
  ];
  const handleOpenPersonalEdit = () => {
    setPersonalEdit(true);
  };
  return (
    <>
      {!isProfileView && (
        <PersonalInformationEdit
          open={isPersonalEdit}
          cancel={() => setPersonalEdit(false)}
          personal={personal}
          Qualification={Qualification}
          additional_detail={additional_detail}
          obj={obj}
          personal_obj={personal_obj}
          isGetCountry={isGetCountry}
        />
      )}
      <Flex columnFlex row>
        <div style={{ width: '50%', marginRight: 10 }}>
          <Text size={14} bold className={styles.titleStyle}>
            Personal Information
          </Text>
          <Card className={styles.overAll}>
            {!isProfileView && (
              <div
                className={styles.svgEdit}
                onClick={handleOpenPersonalEdit}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <SvgEdit fill={PRIMARY} width={14} height={14}/>
              </div>
            )}

            {data.map((list) => (
              <Flex key={list.title} row top className={styles.insideFlex}>
                <Text
                  bold
                  style={{ paddingRight: list.right, whiteSpace: 'nowrap' }}
                >
                  {list.title}
                </Text>
                {list.title === 'Contact Number:' ? (
                  <>
                    {!isEmpty(list.value) ? (
                      <div className={styles.phoneHide}>
                      <PhoneInput
                        inputClass={styles.phoneInput}
                        dropdownClass={styles.dropDownStyle}
                        value={list.value?.toString()}
                      /></div>
                    ) : (
                      <Text>{notSpecified(list.value)}</Text>
                    )}
                  </>
                ) : (
                  <Text>{list.value}</Text>
                )}
              </Flex>
            ))}
          </Card>
        </div>
        <div style={{ width: '50%', marginLeft: 10 }}>
          <Text size={14} bold className={styles.titleStyle}>
            My Job Preference
          </Text>
          <MyJobPreferenceCard
            personal={personal}
            personal_obj={personal_obj}
            isGetCountry={isGetCountry}
            isProfileView={isProfileView}
          />
        </div>
      </Flex>
    </>
  );
};

export default PersonalInformationCard;
