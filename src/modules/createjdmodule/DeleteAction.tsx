import axios from 'axios';
import { useDispatch } from 'react-redux';
import SvgTrash from '../../icons/SvgTrash';
import { questionnaireForJdApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
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
    <Flex onClick={handleDelete}>
      <div style={{ cursor: 'pointer' , paddingLeft:12}}>
        <SvgTrash fill={PRIMARY} width={18} height={18} />
      </div>
    </Flex>
  );
};

export default DeleteAction;
