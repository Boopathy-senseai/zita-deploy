import { ComponentStory, ComponentMeta } from '@storybook/react';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import Loader from './Loader';

export default {
  title: 'Component/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => (
  <Flex center middle>
    <Text color="black" size={18}>
      Continuous spinners are used when the loading progress cannot be
      determined. They indicate to the user by means of a continuous movement
      that the system is processing the entry.
    </Text>
    <Loader {...args} />
  </Flex>
);

export const LoaderComponent = Template.bind({});
