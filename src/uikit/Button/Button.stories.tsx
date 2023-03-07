import { ComponentStory, ComponentMeta } from '@storybook/react';
import CenterView from '../../stories/CenterView';
import Button from './Button';

export default {
  title: 'Component/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <CenterView>
    <Button {...args} />
  </CenterView>
);

export const ButtonComponent = Template.bind({});
ButtonComponent.args = {
  children: 'Button Style',
  onClick: () => console.log('Test Button Click'),
};
