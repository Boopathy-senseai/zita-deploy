import { ComponentStory, ComponentMeta } from '@storybook/react';
import CenterView from '../../stories/CenterView';
import Text from '../Text/Text';
import Modal from './Modal';

export default {
  title: 'Component/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <CenterView>
    <Text size={24} bold>
      Please Click Open Toggle Button
    </Text>
    <Modal {...args} />
  </CenterView>
);

export const ModalComponent = Template.bind({});
ModalComponent.args = {
  children: (
    <div style={{ backgroundColor: '#fff', borderRadius: 4, padding: 30 }}>
      <Text>Modal Style</Text>
    </div>
  ),
  onClose: () => console.log('Modal OnClick'),
};
