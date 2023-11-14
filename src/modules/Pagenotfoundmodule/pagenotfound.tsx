import { useEffect, useMemo, useState } from 'react';
import Flex from '../../uikit/Flex/Flex';
import Link from '../../uikit/Link';
import Text from '../../uikit/Text';
// const height = window.innerHeight - 1a50;
const Pagenotfount = () => {
  return (
    <>
      <Flex>
        <Text>page not fount </Text>

        <Link to="/">Home</Link>
      </Flex>
    </>
  );
};

export default Pagenotfount;
