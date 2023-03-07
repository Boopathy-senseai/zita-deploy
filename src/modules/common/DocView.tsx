import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';

const DocView = ({ file }: { file: string }) => {
  if (isEmpty(file)) {
    return (
      <Flex middle center>
        <Loader withOutOverlay />
      </Flex>
    );
  }
  const src = file;
  return (
    <div>
      <iframe
        src={'https://docs.google.com/viewer?url=' + src + '&embedded=true'}
        title="file"
        width="100%"
        height={window.innerHeight - 60}
        // onLoad={finishLoading}
      ></iframe>
    </div>
  );
};

export default DocView;
