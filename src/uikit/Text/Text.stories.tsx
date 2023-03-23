import { ComponentStory, ComponentMeta } from '@storybook/react';
import CenterView from '../../stories/CenterView';
import Text from './Text';

export default {
  title: 'Component/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => (
  <CenterView>
    <Text {...args} />
  </CenterView>
);

export const TextComponent = Template.bind({});
TextComponent.args = {
  children: 'Text Style',
  size: 14,
};
