import { useEffect, useRef, useState } from 'react';

import { Card, Modal } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgClose from '../../icons/SvgClose';
import Matchingmodal from './matchingcriteriaModal';
import Comparativeanalysismodal from './Comparativeanalysis';

import styles from './Recommendationscreen.module.css';

type Props = {
  Comparmodel?: any;
  updatemodel?: (val: any, id: any) => void;
  Matching: any;
};

const RecommendationScreen = ({
  Comparmodel,
  updatemodel,
  Matching,
}: Props) => {
  return (
    <Flex>
      <Matchingmodal
        matchmodel={Comparmodel}
        updatemodel={updatemodel}
        Matching={Matching}
      />
    </Flex>
  );
};

export default RecommendationScreen;
