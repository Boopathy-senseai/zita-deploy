import { ComponentStory, ComponentMeta } from '@storybook/react';
import CenterView from '../../stories/CenterView';
import Status from './Status';

export default {
  title: 'Component/Status',
  component: Status,
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args) => (
  <CenterView>
    <Status {...args} />
  </CenterView>
);

export const StatusComponent = Template.bind({});
StatusComponent.args = {
  label: 'Status',
};
