import React, { useState } from 'react';
import parse from 'html-react-parser';
import { Flex, Card, CheckBox, Text } from '../../uikit';

type Props = {
  message: any;
};
const Inbox = ({ message }: Props) => {
  const [view, setview] = useState(true);

  const selectinbox = () => {
    setview(!view);
  };
  return (
    <div>
      <Flex
        row
        style={{
          marginLeft: '2px',
          marginTop: '10px',
          marginRight: '10px',
          with: '100%',
        }}
      >
        {message !== '' ? <>{parse(message.body.content)} </> : '2'}
      </Flex>
    </div>
  );
};

export default Inbox;
