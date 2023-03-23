import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import CenterView from '../../stories/CenterView';
import CheckBox from './CheckBox';

export default {
  title: 'Component/CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => {
  const [isCheck, setCheck] = useState(false);
  return (
    <CenterView>
      <CheckBox
        {...args}
        checked={isCheck}
        onClick={() => setCheck(!isCheck)}
      />
    </CenterView>
  );
};

export const CheckBoxComponent = Template.bind({});
