import { useState } from 'react';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { CountryEntity } from '../createjdmodule/createJdTypes';
import { AdditionalDetailEntity, Personal } from './candidateProfileTypes';
import styles from './personalinformationcard.module.css';
import PersonalInformationEdit from './PersonalInformationEdit';

type Props = {
  personal?: Personal;
  additional_detail?: AdditionalDetailEntity;
  personal_obj?: Personal;
  isGetCountry: CountryEntity[];
};
const PersonalInformationCard = ({
  personal,
  additional_detail,
  personal_obj,
  isGetCountry,
}: Props) => {
  const [isPersonalEdit, setPersonalEdit] = useState(false);

  const address =
    !isEmpty(personal?.city__name) &&
    !isEmpty(personal?.state__name) &&
    !isEmpty(personal?.country__name)
      ? `${personal?.city__name}, ${personal?.state__name}, ${personal?.country__name}`
      : '';
  const data = [
    { title: 'Contact Number:', value: notSpecified(personal?.contact_no) },
    { title: 'Email:', value: notSpecified(personal?.email) },
    { title: 'Gender:', value: notSpecified(personal?.gender__label_name) },
    { title: 'Birth Year:', value: notSpecified(personal?.Date_of_birth) },
    { title: 'Address:', value: notSpecified(address) },
    { title: 'LinkedIn:', value: notSpecified(personal?.linkedin_url) },
    {
      title: 'Your Personal Code Repository:',
      value: notSpecified(personal?.code_repo),
    },
    {
      title: 'Total Experience:',
      value: notSpecified(additional_detail?.total_exp_year),
    },
  ];
  const handleOpenPersonalEdit = () => {
    setPersonalEdit(true);
  };
  return (
    <>
      <PersonalInformationEdit
        open={isPersonalEdit}
        cancel={() => setPersonalEdit(false)}
        personal={personal}
        additional_detail={additional_detail}
        personal_obj={personal_obj}
        isGetCountry={isGetCountry}
      />
      <Card className={styles.overAll}>
        <div
          className={styles.svgEdit}
          onClick={handleOpenPersonalEdit}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgBoxEdit fill={PRIMARY} />
        </div>
        {data.map((list) => (
          <Flex key={list.title} row center className={styles.insideFlex}>
            <Text bold style={{ width: 230 }}>
              {list.title}
            </Text>
            <Text>{list.value}</Text>
          </Flex>
        ))}
      </Card>
    </>
  );
};

export default PersonalInformationCard;
