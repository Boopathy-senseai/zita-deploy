import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectTag from './SelectTag';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default {
  title: 'Component/SelectTag',
  component: SelectTag,
} as ComponentMeta<typeof SelectTag>;

const Template: ComponentStory<typeof SelectTag> = (args) => (
  <SelectTag {...args} />
);

export const SelectTagComponent = Template.bind({});
SelectTagComponent.args = {
  options,
};
