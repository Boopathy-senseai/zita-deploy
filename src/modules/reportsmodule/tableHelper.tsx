import Text from '../../uikit/Text/Text';
import { isEmpty } from '../../uikit/helper';
import styles from './reports.module.css';
export const tableFun = () => [
  {
    title: 'Channels',
    dataIndex: 'source',
    key: 'source',
    render: (source: string) => {
      // console.log(total);
      return <Text size={12} bold>{source}</Text>
      
    },
  },
  {
    title: 'Job Views',
    dataIndex: 'total',
    key: 'total',
    render: (total: string) => {
      // console.log(total);
      return !isEmpty(total) ? (
        <Text size={12}>{total}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Applicants',
    dataIndex: 'applicant',
    key: 'applicant',
    render: (applicant: string) => {
      // console.log(applicant);
      return !isEmpty(applicant) ? (
        <Text size={12}>{applicant}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Shortlisted',
    dataIndex: 'shortlisted',
    key: 'shortlisted',
    render: (shortlisted: string) => {
      // console.log(shortlisted);
      return !isEmpty(shortlisted) ? (
        <Text size={12}>{shortlisted}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Offered',
    dataIndex: 'hired',
    key: 'hired',
    render: (hired: string) => {
      // console.log(hired);
      return !isEmpty(hired) ? (
        <Text size={12}>{hired}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Rejected',
    dataIndex: 'rejected',
    key: 'rejected',
    render: (rejected: string) => {
       return !isEmpty(rejected) ? (
        <Text size={12}>{rejected}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
];

export const passiveCandidate = () => [
  {
    title: 'Duration',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Contact Credits',
    dataIndex: 'purchased_count',
    key: 'purchased_count',
    render: (total: string) => {
      // console.log(total);
      return !isEmpty(total) ? (
        <Text size={12}>{total}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Amount Spent',
    dataIndex: 'purchased_count',
    // align: 'center',
    key: 'purchased_count',
    render: (count: string) => {
      // console.log(applicant);
      return !isEmpty(count) ? (
        <Text size={12}>${Number(count) * 2}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Unlocked',
    dataIndex: 'unlock',
    key: 'unlock',
    render: (shortlisted: string) => {
      // console.log(shortlisted);
      return !isEmpty(shortlisted) ? (
        <Text size={12}>{shortlisted}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Invited',
    dataIndex: 'invited',
    key: 'invited',
    render: (hired: string) => {
      // console.log(hired);
      return !isEmpty(hired) ? (
        <Text size={12}>{hired}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Applicants',
    dataIndex: 'applicant',
    key: 'applicant',
    render: (rejected: string) => {
      // console.log(rejected);
      return !isEmpty(rejected) ? (
        <Text size={12}>{rejected}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
];

export const jobMetrics = (
  hanldeJobform: (b: string) => void,
  setRowIndex: (arg: number) => void,
) => [
  {
    title: 'Job Title',
    dataIndex: 'job_title',
    flex: 2,
    key: 'job_title',
    render: (job_title: string, values: any, index: number) => {
      return (
        <Text bold
        className={styles.table}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {job_title} - {values.job_id}
        </Text>
      );
    },
  },
  {
    title: 'No. of vacancies',
    dataIndex: 'no_of_vacancies',
    align: 'center',
    key: 'no_of_vacancies',
    render: (no_of_vacancies: string, values: any, index: number) => {
      return !isEmpty(no_of_vacancies) ? (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {no_of_vacancies}
        </Text>
      ) : (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          0
        </Text>
      );
    },
  },
  {
    title: 'Zita Match',
    dataIndex: 'zita_match',
    align: 'center',
    key: 'zita_match',
    render: (zita_match: string, values: any, index: number) => {
      return !isEmpty(zita_match) ? (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {zita_match}
        </Text>
      ) : (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          0
        </Text>
      );
    },
  },
  {
    title: 'Invited to Apply',
    dataIndex: 'invite_to_apply',
    align: 'center',
    key: 'invite_to_apply',
    render: (invite_to_apply: string, values: any, index: number) => {
      return !isEmpty(invite_to_apply) ? (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {invite_to_apply}
        </Text>
      ) : (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          0
        </Text>
      );
    },
  },
  {
    title: 'Not Interested',
    dataIndex: 'not_interested',
    align: 'center',
    key: 'not_interested',
    render: (not_interested: string, values: any, index: number) => {
      return !isEmpty(not_interested) ? (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {not_interested}
        </Text>
      ) : (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          0
        </Text>
      );
    },
  },
  {
    title: 'Applicants',
    dataIndex: 'applicant',
    align: 'center',
    key: 'applicant',
    render: (applicant: string, values: any, index: number) => {
      return !isEmpty(applicant) ? (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {applicant}
        </Text>
      ) : (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          0
        </Text>
      );
    },
  },
  {
    title: 'Shortlisted',
    dataIndex: 'shortlisted',
    align: 'center',
    key: 'shortlisted',
    render: (shortlisted: string, values: any, index: number) => {
      return !isEmpty(shortlisted) ? (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {shortlisted}
        </Text>
      ) : (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => hanldeJobform(values.id)}
        >
          0
        </Text>
      );
    },
  },
  {
    title: 'Offered',
    dataIndex: 'hired',
    align: 'center',
    key: 'hired',
    render: (hired: string, values: any, index: number) => {
      return !isEmpty(hired) ? (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {hired}
        </Text>
      ) : (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          0
        </Text>
      );
    },
  },
  {
    title: 'Rejected',
    dataIndex: 'rejected',
    align: 'center',
    key: 'rejected',
    render: (rejected: string, values: any, index: number) => {
      return !isEmpty(rejected) ? (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          {rejected}
        </Text>
      ) : (
        <Text className={styles.table}
          align={'center'}
          size={12}
          onClick={() => {
            hanldeJobform(values.id);
            setRowIndex(index);
          }}
        >
          0
        </Text>
      );
    },
  },
];


export const sourcingPerformance = () => [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Job Views',
    dataIndex: 'view_count',
    key: 'view_count',
    render: (view_count: string) => {
 
      return !isEmpty(view_count) ? (
        <Text size={12}>{view_count}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Applicants',
    dataIndex: 'applicants',
    key: 'applicants',
    render: (applicants: string) => {
 
      return !isEmpty(applicants) ? (
        <Text size={12}>{applicants}</Text>
      ) : (
        <Text size={12}>0</Text>
      );
    },
  },
  {
    title: 'Percentage of Conversion',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (percentage: string) => {
      // console.log(shortlisted);
      return !isEmpty(percentage) ? (
        <Text size={12}>{percentage}%</Text>
      ) : (
        <Text size={12}>0%</Text>
      );
    },
  },
 
  
];