import { ComponentStory, ComponentMeta } from '@storybook/react';
import CenterView from '../../stories/CenterView';
import InputText from './InputText';

export default {
  title: 'Component/InputText',
  component: InputText,
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args) => (
  <CenterView>
    <InputText {...args} />
  </CenterView>
);

export const InputTextComponent = Template.bind({});
InputTextComponent.args = {
  placeholder: 'Placeholder',
  onChange: () => {},
  onKeyPress: () => {},
};
