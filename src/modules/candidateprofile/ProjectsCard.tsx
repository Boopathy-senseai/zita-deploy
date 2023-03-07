/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import classNames from 'classnames/bind';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgTrash from '../../icons/SvgTrash';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { Obj } from './candidateProfileTypes';
import styles from './workexperienceaddandcard.module.css';
const cx = classNames.bind(styles);

type Props = {
  obj?: Obj;
};
const ProjectsCard = ({ obj }: Props) => {
  return (
    <Card className={styles.overAll}>
      {Array.isArray(obj?.projects) && obj?.projects.length !== 0 ? (
        obj?.projects.map((list, index) => (
          <Text key={index}>s</Text>
          //   <Flex
          //     row
          //     key={list.domain + index}
          //     className={cx('borderFlex', {
          //       borderBottom: index + 1 !== obj?.exp?.length,
          //     })}
          //   >
          //     <div style={{ alignSelf: 'center' }}>
          //       <Flex columnFlex className={styles.leftConatiner}>
          //         <Text color="theme" bold>
          //           {notSpecified(list.org)}
          //         </Text>
          //         {!isEmpty(list.from_exp) ? (
          //           <Text color="theme" className={styles.yearText}>
          //             {list.from_exp} - {list.to_exp}
          //           </Text>
          //         ) : (
          //           <Text color="theme" className={styles.yearText}>
          //             {notSpecified(list.from_exp)}
          //           </Text>
          //         )}

          //         <Text color="theme" className={styles.yearText}>
          //           {notSpecified(list.loc)}
          //         </Text>
          //       </Flex>
          //     </div>
          //     <Flex columnFlex className={styles.rightConatiner} flex={1}>
          //       <Flex row center between>
          //         <Text bold>{notSpecified(list.domain)}</Text>
          //         <Flex row center>
          //           <div
          //             className={styles.svgTrash}
          //             onClick={handleWorkUdateOpen}
          //             tabIndex={-1}
          //             role="button"
          //             onKeyDown={() => {}}
          //           >
          //             <SvgBoxEdit fill={PRIMARY} />
          //           </div>

          //           <div
          //             className={styles.svgTrash}
          //             tabIndex={-1}
          //             role="button"
          //             onKeyDown={() => {}}
          //           >
          //             <SvgTrash width={16} height={16} />
          //           </div>
          //         </Flex>
          //       </Flex>
          //       <Text className={styles.roleText} bold>
          //         {notSpecified(list.des)}
          //       </Text>
          //       <ul className={styles.listStyle}>
          //         {list.roles?.map(
          //           (roleList) =>
          //             !isEmpty(roleList) && (
          //               <li key={roleList}>
          //                 <Text align="justify" className={styles.techText}>
          //                   {roleList}
          //                 </Text>
          //               </li>
          //             ),
          //         )}
          //       </ul>

          //       <Flex row className={styles.toolsText}>
          //         <Text bold style={{ whiteSpace: 'nowrap' }}>
          //           Tools and Programming Languages:
          //         </Text>
          //         <Text style={{ marginLeft: 8 }}>
          //           {notSpecified(list.exp_tools)}
          //         </Text>
          //       </Flex>
          //     </Flex>
          //   </Flex>
        ))
      ) : (
        <Flex center middle className={styles.noValues}>
          <Text size={18} bold>
            Add Projects
          </Text>
        </Flex>
      )}
    </Card>
  );
};

export default ProjectsCard;
