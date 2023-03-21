import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { isEmpty } from '../../uikit/helper';
import { bulkImportMiddleWare } from './store/middleware/bulkImportMiddleware';
import styles from './logfile.module.css';

type Props = {
  getKey: string;
};
const LogFileTab = ({ getKey }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(bulkImportMiddleWare());
  }, [getKey]);

  const { txt_file } = useSelector(({ bulkImportReducers }: RootState) => {
    return {
      txt_file: bulkImportReducers.txt_file,
    };
  });

  return (
    <Flex className={styles.overAll}>
      {isEmpty(txt_file) ? (
        <Text color="gray" align="center" style={{ padding: '50px 0px' }}>
          No bulk import log available
        </Text>
      ) : (
        <>
          {txt_file?.map((list, index, row) => {
            const over = list.match('Overall Files Uploaded Log:')
              ? true
              : false;
            return (
              <Flex key={list + index} className={styles.logList}>
                <pre
                  style={{
                    fontWeight:
                      index === 0 || index + 1 === row.length || over
                        ? 'bold'
                        : 'normal',
                  }}
                  className={styles.pre}
                >
                  {list}
                </pre>
              </Flex>
            );
          })}
        </>
      )}
    </Flex>
  );
};

export default LogFileTab;
