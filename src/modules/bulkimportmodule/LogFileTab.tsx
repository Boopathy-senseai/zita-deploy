import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileX } from 'react-bootstrap-icons';
import { AppDispatch, RootState } from '../../store';
import SvgNoDataIcon from '../../icons/SvgNoDataIcon';
import SvgNoData from '../../icons/SvgNoData';
import SvgNomessage from '../../icons/SvgNomessage';
import SvgRefresh from '../../icons/SvgRefresh';
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
    <Flex className={styles.overAll} height={window.innerHeight - 200}>
      {isEmpty(txt_file) ? (
        <Flex style={{ marginTop: '12%' }}>
          <Flex style={{ justifyContent: 'center', marginBotto: '2px' }}>
            <SvgNoDataIcon width={16} height={16} fill={'#888'} />
          </Flex>

          <Text color="gray" align="center">
            No bulk import log available
          </Text>
        </Flex>
      ) : (
        <>
          {txt_file?.map((list, index, row) => {
            const over = list.match('Overall Files Uploaded Log:')
              ? true
              : false;
            const color = list.includes('ERROR') ? true : false;
            const color1 = list.includes('INFO') ? true : false;
            const line = list.includes('Import ') ? true : false;
            const boldhead = list.includes('Overall') ? true : false;
            const index1 = index === 0 || index + 1 === row.length || over;
            const themecolor = list.includes('File imported') ? true : false;
            const themecolor1 = list.includes('Successful') ? true : false;
            const themecolor2 = list.includes('Failed') ? true : false;
            const theme = themecolor || themecolor1 || themecolor2;

            return (
              <Flex key={list + index} className={styles.logList}>
                <pre
                  style={{
                    fontWeight: index1 || boldhead || theme ? 'bold' : 'normal',
                    color: color
                      ? 'red'
                      : color1
                      ? 'green'
                      : theme
                      ? '#333333'
                      : null,
                    borderBottom: line ? '1px dashed' : null,
                    borderTop: line ? '1px dashed' : null,
                    width: line ? 'fit-content' : null,
                    padding: line ? '5px 0px 5px 0px' : null,
                    marginBottom: '10px',
                  }}
                  className={styles.pre}
                >
                  {list}
                  {console.log(list,'ggggggggggggggggggggggggggggggggg')}
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
