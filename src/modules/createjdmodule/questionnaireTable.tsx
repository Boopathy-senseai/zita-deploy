import { FormikProps } from 'formik';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import { QuestionnaireForJdEntity, TemplateEntity } from './createJdTypes';
import { fieldTypeHelper } from './jdHelpers';
import DeleteAction from './DeleteAction';
import RequiredSwitch from './RequiredSwitch';
import QuestionSelect from './QuestionSelect';
import QuestionTable from './QuestionTable';

export const questionTitle = (jdId: string) => [
  {
    title: 'S.No',
    dataIndex: 'arul',
    key: 'arul',
    // align: 'center',
    render: (_a: number, _b: any, index: number) => {
      return (
        <Text style={{paddingLeft:12}} size={12}>
          {index + 1}
        </Text>
      );
    },
    flex: 0.5,
  },
  {
    title: 'Questions',
    dataIndex: 'question',
    key: 'question',
    flex: 5,
  },
  {
    title: 'Field Type',
    dataIndex: 'field_type_id',
    key: 'field_type_id',
    render: (field: number) => {
      return (
        <Text size={13} style={{ lineHeight: 3 }}>
          {fieldTypeHelper(field)}
        </Text>
      );
    },
    flex: 1,
  },
  {
    title: 'Is Required',
    dataIndex: 'is_required',
    key: 'is_required',
    // align: 'center',
    render: (value: boolean) => {
      return (
        <Flex>
          <Text size={13}>{value === true ? 'Yes' : 'No'}</Text>
        </Flex>
      );
    },
    flex: 1,
  },
  {
    title: 'Delete',
    dataIndex: 'id',
    key: 'id',
    // align: 'center',
    render: (value: number) => {
      return <DeleteAction value={value} jdId={jdId} />;
    },
    flex: 1,
  },
];

export const templateTitle = (
  handleCheckBoxClick: (e: {
    target: { id: string; checked: boolean };
  }) => void,
  isCheck: string[],
  formik: FormikProps<any>,
) => [
  {
    title: 'S.No',
    dataIndex: 'id',
    key: 'id',
    render: (_a: number, _b: any, index: number) => {
      return (
        <Text align="center" size={13}>
          {index + 1}
        </Text>
      );
    },
    align: 'center',
    flex: 2,
  },
  {
    title: 'Questions',
    dataIndex: 'question',
    key: 'question',
    flex: 5,
  },
  {
    title: 'Field Type',
    dataIndex: 'field_type_id',
    key: 'field_type_id',
    render: (field: number) => {
      return (
        <Text size={13} style={{ lineHeight: 3 }}>
          {fieldTypeHelper(field)}
        </Text>
      );
    },
    flex: 2,
  },
  {
    title: 'Is Required',
    dataIndex: 'is_required',
    key: 'is_required',
    align: 'center',
    render: (value: boolean, _a: any, index: number) => {
      return <RequiredSwitch value={value} formik={formik} index={index} />;
    },
    flex: 2,
  },
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
    align: 'center',
    render: (_a: any, value: TemplateEntity) => {
      return (
        <QuestionSelect
          value={value}
          isCheck={isCheck}
          handleCheckBoxClick={handleCheckBoxClick}
        />
      );
    },
    flex: 2,
  },
];

export const resultTitle = () => [
  {
    title: 'Questions',
    renderTitle: (_a: string) => (
      <Flex row center>
        <Text color="primary" bold style={{ borderRight:"1px solid #b3b3b3", width: 70 }}>
          S.No
        </Text>
        <Text color="primary" bold style={{ paddingLeft: 8 }}>
          Questions
        </Text>
      </Flex>
    ),
    dataIndex: 'question',
    key: 'question',
    flex: 12,
    render: (_a: string, value: QuestionnaireForJdEntity, index: number) => {
      return <QuestionTable value={value} index={index} />;
    },
  },
];
