import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { SkillsEntityOne } from '../../modules/createjdmodule/createJdTypes';
import LabelWrapper from '../Label/LabelWrapper';
import Toast from '../Toast/Toast';
import CrossAreaCol, { FromProps } from './CrossAreaCol';
import styles from './crossareatagediter.module.css';
import { tagColorType } from './DragList';

const cx = classNames.bind(styles);

type Props = {
  tagColor: tagColorType;
  inputId: number;
  label?: string;
  labelBold?: boolean;
  required?: boolean;
  setColumns?: any;
  columns?: any;
  name?: string;
  duplicate?: {
    dataBaseTags: SkillsEntityOne[];
    toolsTags: SkillsEntityOne[];
    platformsTags: SkillsEntityOne[];
    othersTags: SkillsEntityOne[];
    programTags: SkillsEntityOne[];
  };
  onDirty: () => void;
};
const initial: FromProps = {
  tagValue: '',
};
const CrossAreaTagEditer = ({
  tagColor,
  inputId,
  label,
  labelBold,
  required,
  columns,
  setColumns,
  name,
  duplicate,
  onDirty,
}: Props) => {
  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => handleClickAddRight(values),
  });

  const handleClickDelete = (tag: any) => {
    const rightDeletTag = columns['column-2'].items.filter(
      (t: any) => Number(tag) !== Number(t.id),
    );
    setColumns({
      ['column-1']: {
        items: columns['column-1'].items,
      },
      ['column-2']: {
        items: rightDeletTag,
      },
    });
  };
  var found = columns['column-2'].items.filter(
    (e: any) => e.skill.toLowerCase() === formik.values.tagValue.toLowerCase(),
  );
  var duplicateDataBseFound = duplicate?.dataBaseTags.filter(
    (val) =>
      val.skill.toLocaleLowerCase() ===
      formik.values.tagValue.toLocaleLowerCase(),
  );
  var duplicateToolFound = duplicate?.toolsTags.filter(
    (val) =>
      val.skill.toLocaleLowerCase() ===
      formik.values.tagValue.toLocaleLowerCase(),
  );
  var duplicateProgarmFound = duplicate?.programTags.filter(
    (val) =>
      val.skill.toLocaleLowerCase() ===
      formik.values.tagValue.toLocaleLowerCase(),
  );
  var duplicatePlatFound = duplicate?.platformsTags.filter(
    (val) =>
      val.skill.toLocaleLowerCase() ===
      formik.values.tagValue.toLocaleLowerCase(),
  );
  var duplicateOtherFound = duplicate?.othersTags.filter(
    (val) =>
      val.skill.toLocaleLowerCase() ===
      formik.values.tagValue.toLocaleLowerCase(),
  );

  const handleClickAddRight = (values: any) => {
    if (found.length !== 0) {
      Toast(`${formik.values.tagValue} already available`, 'SHORT', 'error');
      formik.setFieldValue('tagValue', '');
    }
    if (duplicateDataBseFound?.length !== 0) {
      Toast(
        `${formik.values.tagValue} already available in Database Section`,
        'SHORT',
        'error',
      );
      formik.setFieldValue('tagValue', '');
    }
    if (duplicateProgarmFound?.length !== 0) {
      Toast(
        `${formik.values.tagValue} already available in Programming Section`,
        'SHORT',
        'error',
      );
      formik.setFieldValue('tagValue', '');
    }
    if (duplicateToolFound?.length !== 0) {
      Toast(
        `${formik.values.tagValue} already available in Tools/Frameworks Section`,
        'SHORT',
        'error',
      );
      formik.setFieldValue('tagValue', '');
    }
    if (duplicatePlatFound?.length !== 0) {
      Toast(
        `${formik.values.tagValue} already available in Platforms Section`,
        'SHORT',
        'error',
      );
      formik.setFieldValue('tagValue', '');
    }
    if (duplicateOtherFound?.length !== 0) {
      Toast(
        `${formik.values.tagValue} already available in Others Section`,
        'SHORT',
        'error',
      );
      formik.setFieldValue('tagValue', '');
    }
    if (
      found.length === 0 &&
      duplicateDataBseFound?.length === 0 &&
      duplicateOtherFound?.length === 0 &&
      duplicatePlatFound?.length === 0 &&
      duplicateToolFound?.length === 0 &&
      duplicateProgarmFound?.length === 0
    ) {
      if (found.length === 0) {
        onDirty();
        const tagsValue = columns['column-2'].items.slice();

        var tagArr = values.tagValue.split(',');

        tagArr.map((list: string, index: number) => {
          var copyDataBase = duplicate?.dataBaseTags.filter(
            (val) =>
              val.skill.replace(/\s+/g, '').toLocaleLowerCase() ===
              list.replace(/\s+/g, '').toLocaleLowerCase(),
          );

          var copyToolFound = duplicate?.toolsTags.filter(
            (val) =>
              val.skill.replace(/\s+/g, '').toLocaleLowerCase() ===
              list.replace(/\s+/g, '').toLocaleLowerCase(),
          );
          var copyProgarmFound = duplicate?.programTags.filter(
            (val) =>
              val.skill.replace(/\s+/g, '').toLocaleLowerCase() ===
              list.replace(/\s+/g, '').toLocaleLowerCase(),
          );
          var copyPlatFound = duplicate?.platformsTags.filter(
            (val) =>
              val.skill.replace(/\s+/g, '').toLocaleLowerCase() ===
              list.replace(/\s+/g, '').toLocaleLowerCase(),
          );
          var copyOtherFound = duplicate?.othersTags.filter(
            (val) =>
              val.skill.replace(/\s+/g, '').toLocaleLowerCase() ===
              list.replace(/\s+/g, '').toLocaleLowerCase(),
          );
          return (
            copyDataBase?.length === 0 &&
            copyToolFound?.length === 0 &&
            copyOtherFound?.length === 0 &&
            copyPlatFound?.length === 0 &&
            copyProgarmFound?.length === 0 &&
            tagsValue.push({
              id: columns['column-2'].items.length + 1 + index + 1525,
              skill: list,
              exp: 0,
            })
          );
        });
        const tagsValueFind =
          tagsValue &&
          tagsValue.filter(
            (value: { skill: string }, index: any, self: any[]) =>
              index ===
              self.findIndex(
                (t) =>
                  t.skill.replace(/\s+/g, '').toLowerCase() ===
                  value.skill.replace(/\s+/g, '').toLowerCase(),
              ),
          );

        setColumns({
          ['column-1']: {
            items: columns['column-1'].items,
          },
          ['column-2']: {
            items: tagsValueFind,
          },
        });
        formik.setFieldValue('tagValue', '');
      }
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      var fouUpdate = columns['column-2'].items.filter(
        (e: any) =>
          e.skill.toLowerCase() ===
          destItems[destination.index].skill.toLowerCase(),
      );

      if (fouUpdate.length !== 0) {
        Toast(
          `${destItems[destination.index].skill} already available`,
          'SHORT',
          'error',
        );
        Toast('already available', 'SHORT', 'error');
      }

      var duplicateDataBseFoundDrg = duplicate?.dataBaseTags.filter(
        (val) =>
          val.skill.toLocaleLowerCase() ===
          destItems[destination.index].skill.toLocaleLowerCase(),
      );

      var duplicateToolFoundDrag = duplicate?.toolsTags.filter(
        (val) =>
          val.skill.toLocaleLowerCase() ===
          destItems[destination.index].skill.toLocaleLowerCase(),
      );
      var duplicateProgarmFoundDrag = duplicate?.programTags.filter(
        (val) =>
          val.skill.toLocaleLowerCase() ===
          destItems[destination.index].skill.toLocaleLowerCase(),
      );
      var duplicatePlatFoundDrag = duplicate?.platformsTags.filter(
        (val) =>
          val.skill.toLocaleLowerCase() ===
          destItems[destination.index].skill.toLocaleLowerCase(),
      );
      var duplicateOtherFoundDrag = duplicate?.othersTags.filter(
        (val) =>
          val.skill.toLocaleLowerCase() ===
          destItems[destination.index].skill.toLocaleLowerCase(),
      );

      if (duplicateDataBseFoundDrg?.length !== 0) {
        Toast(
          `${
            destItems[destination.index].skill
          } already available in Database Section`,
          'SHORT',
          'error',
        );
        formik.setFieldValue('tagValue', '');
      }
      if (duplicateProgarmFoundDrag?.length !== 0) {
        Toast(
          `${
            destItems[destination.index].skill
          } already available in Programming Section`,
          'SHORT',
          'error',
        );
        formik.setFieldValue('tagValue', '');
      }
      if (duplicateToolFoundDrag?.length !== 0) {
        Toast(
          `${
            destItems[destination.index].skill
          } already available in Tools/Frameworks Section`,
          'SHORT',
          'error',
        );
        formik.setFieldValue('tagValue', '');
      }
      if (duplicatePlatFoundDrag?.length !== 0) {
        Toast(
          `${
            destItems[destination.index].skill
          } already available in Platforms Section`,
          'SHORT',
          'error',
        );
        formik.setFieldValue('tagValue', '');
      }
      if (duplicateOtherFoundDrag?.length !== 0) {
        Toast(
          `${
            destItems[destination.index].skill
          } already available in Others Section`,
          'SHORT',
          'error',
        );
        formik.setFieldValue('tagValue', '');
      }
      if (
        fouUpdate.length === 0 &&
        duplicateDataBseFoundDrg?.length === 0 &&
        duplicateOtherFoundDrag?.length === 0 &&
        duplicatePlatFoundDrag?.length === 0 &&
        duplicateToolFoundDrag?.length === 0 &&
        duplicateProgarmFoundDrag?.length === 0
      ) {
        if (fouUpdate.length === 0) {
          onDirty();
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems,
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems,
            },
          });
        }
      }
    }
  };

  return (
    <LabelWrapper label={label} bold={labelBold} required={required}>
      <div className={cx('overAll')}>
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result);
          }}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <CrossAreaCol
                key={columnId}
                columnId={columnId}
                tasks={column}
                formik={formik}
                tagColor={tagColor}
                handleClickDelete={handleClickDelete}
                inputId={inputId}
                name={name}
              />
            );
          })}
        </DragDropContext>
      </div>
    </LabelWrapper>
  );
};

CrossAreaTagEditer.defaultProps = {
  tagColor: 'sky',
};
export default CrossAreaTagEditer;
