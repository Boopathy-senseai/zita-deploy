import { useState } from 'react';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { CountryEntity } from '../createjdmodule/createJdTypes';
import { Personal } from './candidateProfileTypes';
import styles from './myjobpreferencecard.module.css';
import MyJobPreferenceEdit from './MyJobPreferenceEdit';

type Props = {
  personal?: Personal;
  personal_obj?: Personal;
  isGetCountry: CountryEntity[];
};

const MyJobPreferenceCard = ({
  personal,
  isGetCountry,
  personal_obj,
}: Props) => {
  const [isMyjobEdit, setMyjobEdit] = useState(false);

  const data = [
    {
      title: 'Job Type:',
      value: notSpecified(personal?.type_of_job__label_name),
    },
    {
      title: 'Availability:',
      value: notSpecified(personal?.available_to_start__label_name),
    },
    {
      title: 'Preferred Work Location:',
      value: isEmpty(personal?.current_city__name)
        ? notSpecified(personal?.current_city__name)
        : `${personal?.current_city__name}, ${personal?.current_state__name}, ${personal?.current_country__name}`,
    },
    {
      title: 'Willing to Relocate:',
      value: personal?.relocate ? 'Yes' : 'No',
    },
    {
      title: 'Remote Availaibility:',
      value: personal?.remote_work ? 'Yes' : 'No',
    },
    {
      title: 'Industry Type:',
      value: notSpecified(personal?.industry_type__label_name),
    },
    {
      title: 'Current Gross Salary:',
      value: notSpecified(personal?.curr_gross),
    },
    {
      title: 'Expected Gross Salary:',
      value: notSpecified(personal?.exp_gross),
    },
  ];
  const handleOpenMyjobEdit = () => {
    setMyjobEdit(true);
  };
  return (
    <>
      <MyJobPreferenceEdit
        open={isMyjobEdit}
        cancel={() => setMyjobEdit(false)}
        personal={personal_obj}
        isGetCountry={isGetCountry}
      />
      <Card className={styles.overAll}>
        <div
          className={styles.svgEdit}
          onClick={handleOpenMyjobEdit}
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

export default MyJobPreferenceCard;
