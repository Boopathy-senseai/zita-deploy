import axios from 'axios';
import { useDispatch } from 'react-redux';
import SvgTrash from '../../icons/SvgTrash';
import { questionnaireForJdApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
import { GARY_4 } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { questionnaireForJdMiddleWare } from './store/middleware/createjdmiddleware';

type Props = {
  value: number;
  jdId: string;
};
const DeleteAction = ({ value, jdId }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = () => {
    axios.delete(questionnaireForJdApi(value.toString())).then((res) => {
      if (res.data.success === true) {
        dispatch(questionnaireForJdMiddleWare({ jd_id: jdId }));
      }
    });
  };
  return (
    <Flex middle onClick={handleDelete}>
      <div style={{ cursor: 'pointer' }}>
        <SvgTrash fill={GARY_4} width={18} height={18} />
      </div>
    </Flex>
  );
};

export default DeleteAction;
