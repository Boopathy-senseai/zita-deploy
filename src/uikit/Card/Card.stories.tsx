import { ComponentStory, ComponentMeta } from '@storybook/react';
import CenterView from '../../stories/CenterView';
import Text from '../Text/Text';
import Card from './Card';

export default {
  title: 'Component/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <CenterView>
    <Card {...args}>
      <Text>Card Style</Text>
    </Card>
  </CenterView>
);

export const CardComponent = Template.bind({});
