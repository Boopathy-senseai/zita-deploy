import { useEffect, useState } from 'react';
import Flex from '../../../uikit/Flex/Flex';
import Slotter1 from './Slotter';

const PreviewTab = () => {
  const [userpreview, setuserPreview] = useState(true);
  useEffect(()=>{
    setuserPreview(true);
  },[])


  return (
    <>
    <Flex>
        <Slotter1
        userpreview ={userpreview}
        setuserPreview ={setuserPreview}
        />
    </Flex>
  
    </>
  );
};

export default PreviewTab;
