import React, { useState } from 'react';
import { Flex, Text } from '../../uikit';
type Props = {
  previousfun: () => void;
  nextfun: () => void;
  range: any;
  previous: any;
  previous1: any;
  total: any;
};

const Pagination = ({
  previousfun,
  nextfun,
  range,
  previous,
  previous1,
  total,
}: Props) => {
  const Previousdata = () => {
    previousfun();
  };

  const Nextdata = () => {
    nextfun();
  };

  return (
    <>
      <Flex row between>
        {range < previous ? <Text onClick={Previousdata}>previous</Text> : ''}

        <Text>
          {previous1}-{previous} of {total}
        </Text>
        {previous !== total ? <Text onClick={Nextdata}>Next</Text> : ''}
      </Flex>
    </>
  );
};

export default Pagination;
