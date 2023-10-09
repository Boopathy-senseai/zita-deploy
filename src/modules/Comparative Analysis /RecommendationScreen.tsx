import { useEffect, useRef, useState } from 'react';

import { Card, Modal } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgClose from '../../icons/SvgClose';
import Matchingmodal from './matchingcriteriaModal';
import Comparativeanalysismodal from './Comparativeanalysis';

import styles from './Recommendationscreen.module.css';
const RecommendationScreen = () => {
  const [model, setmodel] = useState(0);
  useEffect(() => {}, []);

  return (
    <Flex>
      <Matchingmodal />
      <Comparativeanalysismodal />
    </Flex>
  );
};

export default RecommendationScreen;
