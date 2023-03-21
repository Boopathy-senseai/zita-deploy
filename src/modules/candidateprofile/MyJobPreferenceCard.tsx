import { useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
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
  isProfileView?: boolean;
};

const MyJobPreferenceCard = ({
  personal,
  isGetCountry,
  personal_obj,
  isProfileView,
}: Props) => {
  const [isMyjobEdit, setMyjobEdit] = useState(false);

  const currentCurrency: any = personal && personal?.current_currency;

  const data = [
    {
      title: 'Job Type:',
      value: notSpecified(personal?.type_of_job__label_name),
      right: 166,
    },
    {
      title: 'Availability:',
      value: notSpecified(personal?.available_to_start__label_name),
      right: 153,
    },
    {
      title: 'Preferred Work Location:',
      value: isEmpty(personal?.current_city__name)
        ? notSpecified(personal?.current_city__name)
        : `${personal?.current_city__name}, ${personal?.current_state__name}, ${personal?.current_country__name}`,
      right: 64,
    },
    {
      title: 'Willing to Relocate:',
      value: personal?.relocate ? 'Yes' : 'No',
      right: 103,
    },
    {
      title: 'Industry Type:',
      value: notSpecified(personal?.industry_type__label_name),
      right: 137,
    },
    {
      title: 'Current Gross Salary:',
      value: isEmpty(personal?.curr_gross)
        ? notSpecified(personal?.curr_gross)
        : `${getSymbolFromCurrency(currentCurrency)} ${personal?.curr_gross}`,
      right: 88,
    },
    {
      title: 'Expected Gross Salary:',
      value: isEmpty(personal?.exp_gross)
        ? notSpecified(personal?.exp_gross)
        : `${getSymbolFromCurrency(currentCurrency)} ${personal?.exp_gross}`,
      right: 76,
    },
  ];
  const handleOpenMyjobEdit = () => {
    setMyjobEdit(true);
  };
  return (
    <>
      {!isProfileView && (
        <MyJobPreferenceEdit
          open={isMyjobEdit}
          cancel={() => setMyjobEdit(false)}
          personal={personal_obj}
          isGetCountry={isGetCountry}
        />
      )}

      <Card className={styles.overAll}>
        {!isProfileView && (
          <div
            className={styles.svgEdit}
            onClick={handleOpenMyjobEdit}
            tabIndex={-1}
            role="button"
            onKeyDown={() => { }}
          >
            <SvgBoxEdit fill={PRIMARY} />
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
            <Text>{list.value}</Text>
          </Flex>
        ))}
      </Card>
    </>
  );
};

export default MyJobPreferenceCard;
