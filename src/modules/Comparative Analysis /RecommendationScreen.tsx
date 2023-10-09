import { useEffect, useRef, useState } from 'react';

import { Card, Modal } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgClose from '../../icons/SvgClose';
import Matchingmodal from './matchingcriteriaModal';
import Addcandidatesmodal from './addcandidatesmodel';
import Comparativeanalysismodal from './Comparativeanalysis';

import styles from './Recommendationscreen.module.css';
const RecommendationScreen = () => {
  return (
    <Flex>
      <Matchingmodal />
      <Addcandidatesmodal />
      <Comparativeanalysismodal />
    </Flex>
  );
};

export default RecommendationScreen;
