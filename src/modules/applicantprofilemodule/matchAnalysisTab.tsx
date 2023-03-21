import SvgBlock from '../../icons/SvgBlock';
import SvgDone from '../../icons/SvgDone';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './matchinganalysistab.module.css';

type Props = {
  arrayValue: any[];
};

export const MatchArray = ({ arrayValue }: Props) => {
  return (
    <Flex className={styles.valueStyle}>
      {arrayValue.map((valueList: any, index: any) => {
        return (
          valueList?.status === 'FOUND' && (
            <Flex key={index} className={styles.valueListStyle} row center>
              <div className={styles.svgStyle}>
                <SvgDone />
              </div>
              {Array.isArray(valueList.value?.preferredLabels) ? (
                <Text bold>{valueList.value?.preferredLabels[0].label}</Text>
              ) : (
                <Text bold>{valueList.value?.preferredLabels?.label}</Text>
              )}
            </Flex>
          )
        );
      })}
      {arrayValue.map((valueList: any, index: any) => {
        return (
          valueList?.status !== 'FOUND' && (
            <Flex key={index} className={styles.valueListStyle} row center>
              <div className={styles.svgStyle}>
                <SvgBlock />
              </div>
              {Array.isArray(valueList.value?.preferredLabels) ? (
                <Text bold>{valueList.value?.preferredLabels[0].label}</Text>
              ) : (
                <Text bold>{valueList.value?.preferredLabels?.label}</Text>
              )}
            </Flex>
          )
        );
      })}
    </Flex>
  );
};

export const MatchJobArray = ({ arrayValue }: Props) => {
  return (
    <Flex className={styles.valueStyle}>
      {arrayValue.map((valueList: any, index: any) => {
        return (
          valueList?.status === 'FOUND' && (
            <Flex key={index} className={styles.valueListStyle} row center>
              <div className={styles.svgStyle}>
                <SvgDone />
              </div>
              {Array.isArray(valueList.value?.function?.preferredLabels) ? (
                <Text bold>
                  {valueList.value?.function?.preferredLabels[0].label}
                </Text>
              ) : (
                <Text bold>
                  {valueList.value?.function?.preferredLabels?.label}
                </Text>
              )}
            </Flex>
          )
        );
      })}
      {arrayValue.map((valueList: any, index: any) => {
        return (
          valueList?.status !== 'FOUND' && (
            <Flex key={index} className={styles.valueListStyle} row center>
              <div className={styles.svgStyle}>
                <SvgBlock />
              </div>
              {Array.isArray(valueList.value?.function?.preferredLabels) ? (
                <Text bold>
                  {valueList.value?.function?.preferredLabels[0].label}
                </Text>
              ) : (
                <Text bold>
                  {valueList.value?.function?.preferredLabels?.label}
                </Text>
              )}
            </Flex>
          )
        );
      })}
    </Flex>
  );
};

export const MatchLocationArray = ({ arrayValue }: Props) => {
  return (
    <Flex className={styles.valueStyle}>
      {arrayValue.map((valueList: any, index: any) => {
        return (
          valueList?.status === 'FOUND' && (
            <Flex key={index} className={styles.valueListStyle} row center>
              <div className={styles.svgStyle}>
                <SvgDone />
              </div>
              {Array.isArray(valueList.term?.preferredLabels) ? (
                <Text bold>{valueList.term?.preferredLabels[0].label}</Text>
              ) : (
                <Text bold>{valueList.term?.preferredLabels.label}</Text>
              )}
            </Flex>
          )
        );
      })}
      {arrayValue.map((valueList: any, index: any) => {
        return (
          valueList?.status !== 'FOUND' && (
            <Flex key={index} className={styles.valueListStyle} row center>
              <div className={styles.svgStyle}>
                <SvgBlock />
              </div>
              {Array.isArray(valueList.term?.preferredLabels) ? (
                <Text bold>{valueList.term?.preferredLabels[0].label}</Text>
              ) : (
                <Text bold>{valueList.term?.preferredLabels.label}</Text>
              )}
            </Flex>
          )
        );
      })}
    </Flex>
  );
};

type WithOutArrayProps = {
  objValue: any;
};

export const WithoutArray = ({ objValue }: WithOutArrayProps) => {
  return (
    <Flex className={styles.valueStyle}>
      <Flex className={styles.valueListStyle} row center>
        <div className={styles.svgStyle}>
          {objValue?.status === 'FOUND' ? <SvgDone /> : <SvgBlock />}
        </div>
        <Text bold>{objValue.value?.preferredLabels?.label}</Text>
      </Flex>
    </Flex>
  );
};

export const WithoutJobArray = ({ objValue }: WithOutArrayProps) => {
  return (
    <Flex className={styles.valueStyle}>
      <Flex className={styles.valueListStyle} row center>
        <div className={styles.svgStyle}>
          {objValue?.status === 'FOUND' ? <SvgDone /> : <SvgBlock />}
        </div>
        <Text bold>{objValue.value?.function?.preferredLabels?.label}</Text>
      </Flex>
    </Flex>
  );
};

export const WithoutLocationArray = ({ objValue }: WithOutArrayProps) => {
  return (
    <Flex className={styles.valueStyle}>
      <Flex className={styles.valueListStyle} row center>
        <div className={styles.svgStyle}>
          {objValue?.status === 'FOUND' ? <SvgDone /> : <SvgBlock />}
        </div>
        <Text bold>{objValue.term?.preferredLabels?.label}</Text>
      </Flex>
    </Flex>
  );
};
