import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import {
  BLACK,
  ERROR,
  ERROR_1,
  GARY_1,
  GARY_2,
  GARY_3,
  GARY_4,
  GARY_5,
  GARY_6,
  GARY_7,
  GARY_8,
  LINK_1,
  PRIMARY,
  SECONDARY,
  SUCCESS,
  WHITE,
} from './colors';
import styles from './colors.module.css';

type Props = {
  color: string;
  name: string;
};
const ColorBox = ({ color, name }: Props) => {
  return (
    <Flex className={styles.container}>
      <div className={styles.box} style={{ backgroundColor: color }} />
      <Text bold color="black" className={styles.textStyle}>
        {name}: {color.toString()}
      </Text>
    </Flex>
  );
};
export default {
  title: 'Component/Colors',
  component: ColorBox,
};

const Template = () => (
  <Flex row wrap center middle>
    <ColorBox color={WHITE} name={'WHITE'} />
    <ColorBox color={BLACK} name={'BLACK'} />
    <ColorBox color={GARY_1} name={'GARY_1'} />
    <ColorBox color={GARY_2} name={'GARY_2'} />
    <ColorBox color={GARY_3} name={'GARY_3'} />
    <ColorBox color={GARY_4} name={'GARY_4'} />
    <ColorBox color={GARY_5} name={'GARY_5'} />
    <ColorBox color={GARY_6} name={'GARY_6'} />
    <ColorBox color={GARY_7} name={'GARY_7'} />
    <ColorBox color={GARY_8} name={'GARY_8'} />
    <ColorBox color={ERROR} name={'ERROR'} />
    <ColorBox color={ERROR_1} name={'ERROR_1'} />
    <ColorBox color={PRIMARY} name={'PRIMARY'} />
    <ColorBox color={SECONDARY} name={'SECONDARY'} />
    <ColorBox color={LINK_1} name={'LINK_1'} />
    <ColorBox color={SUCCESS} name={'SUCCESS'} />
  </Flex>
);

export const Colors = Template.bind({});
