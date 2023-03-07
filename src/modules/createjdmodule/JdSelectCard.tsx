import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import styles from './jdselectcard.module.css';

type Props = {
  title: string;
  des: string;
  buttonTitle: string;
  exTitle: string;
  path: string;
  onClick: () => void;
};
const JdSelectCard = ({
  title,
  des,
  buttonTitle,
  exTitle,
  path,
  onClick,
}: Props) => {
  return (
    <Card className={styles.cardOverAll}>
      <Flex columnFlex>
        <Text bold color="black" className={styles.titleStyle}>
          {title}
        </Text>
        <Text className={styles.desText}>{des}</Text>
        <Text className={styles.exStyle}>{exTitle} </Text>
        <Flex middle>
          <LinkWrapper target={'_parent'} to={path} onClick={onClick}>
            <Button>{buttonTitle}</Button>
          </LinkWrapper>
        </Flex>
      </Flex>
    </Card>
  );
};

export default JdSelectCard;
