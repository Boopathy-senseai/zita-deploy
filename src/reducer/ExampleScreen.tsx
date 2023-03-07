import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Text from '../uikit/Text/Text';
import { exampleMiddleWare } from './exampleMidleWare';

const Counter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(exampleMiddleWare());
  }, []);

  const { example } = useSelector(({ exampleReducers }: RootState) => {
    return {
      example: exampleReducers.data,
    };
  });
  return (
    <div>
      <Text>{example.title}</Text>
    </div>
  );
};
export default Counter;
