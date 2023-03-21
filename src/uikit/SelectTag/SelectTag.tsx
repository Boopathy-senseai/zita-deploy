import { useState, useEffect, Ref, forwardRef } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select, {
  GetOptionLabel,
  GetOptionValue,
  GroupBase,
  InputActionMeta,
  Options,
} from 'react-select';
import classNames from 'classnames/bind';
import { SelectComponents } from 'react-select/dist/declarations/src/components';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import LabelWrapper from '../Label/LabelWrapper';
import { isEmpty } from '../helper';
import {
  customStyles,
  customStylesLine,
  customStylesMulti,
  selectTagTheme,
} from './selectHelper';
import styles from './selecttag.module.css';

const cx = classNames.bind(styles);

export type list = {
  [key: string]: any;
};

type Props = {
  options: list[];
  isClearable?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  isMulti?: boolean;
  onChange?: (a: any, b?: any) => void;
  value?: string | number | any;
  name?: string;
  required?: boolean;
  label?: string;
  labelBold?: boolean;
  selectContainerClass?: string;
  defaultValue?: { label: string; value: string | number | any };
  components?: Partial<SelectComponents<any, boolean, GroupBase<any>>>;
  lineStyle?: boolean;
  id?: string;
  isOptionSelected?: (option: any, selectValue: Options<any>) => boolean;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  getOptionLabel?: GetOptionLabel<any>;
  getOptionValue?: GetOptionValue<any>;
  noOptionsMessage?: (obj: { inputValue: string }) => React.ReactNode;
  filterOption?:
    | ((option: FilterOptionOption<any>, inputValue: string) => boolean)
    | null
    | undefined;
  isCreate?: boolean;
  error?: boolean;
  errorMessage?: string;
  menuIsOpen?: boolean;
  autoFocus?: boolean;
  inputId?: string;
};

const SelectTag = (
  {
    isLoading,
    options,
    isClearable,
    isDisabled,
    isSearchable = false,
    placeholder,
    isMulti,
    onChange,
    value,
    name,
    required,
    label,
    labelBold,
    selectContainerClass,
    defaultValue,
    components,
    lineStyle,
    id,
    isOptionSelected,
    onInputChange,
    getOptionLabel,
    getOptionValue,
    noOptionsMessage,
    filterOption,
    isCreate,
    error,
    errorMessage,
    menuIsOpen,
    autoFocus,
    inputId,
  }: Props,
  ref: Ref<any> | undefined,
) => {
  const [isSelectStyle, setSelectStyle] = useState(customStyles);
  useEffect(() => {
    if (isMulti) {
      setSelectStyle(customStylesMulti);
    } else if (lineStyle) {
      setSelectStyle(customStylesLine);
    } else if (!isMulti && !lineStyle) {
      setSelectStyle(customStyles);
    }
  }, []);

  return (
    <Flex className={selectContainerClass}>
      <LabelWrapper required={required} label={label} bold={labelBold}>
        {isCreate ? (
          <CreatableSelect
            inputId={inputId}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
            ref={ref}
            id={id}
            defaultValue={defaultValue}
            value={value}
            name={name}
            isLoading={isLoading}
            isDisabled={isDisabled}
            isSearchable={isSearchable}
            isClearable={isClearable}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            onChange={onChange}
            styles={isSelectStyle}
            theme={(theme) => selectTagTheme(theme)}
            components={components}
            isOptionSelected={isOptionSelected}
            onInputChange={onInputChange}
            filterOption={filterOption}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            noOptionsMessage={noOptionsMessage}
            menuIsOpen={menuIsOpen}
          />
        ) : (
          <Select
            inputId={inputId}
            ref={ref}
            id={id}
            defaultValue={defaultValue}
            value={value}
            name={name}
            isLoading={isLoading}
            isDisabled={isDisabled}
            isSearchable={isSearchable}
            isClearable={isClearable}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            onChange={onChange}
            styles={isSelectStyle}
            theme={(theme) => selectTagTheme(theme, error, errorMessage)}
            components={components}
            isOptionSelected={isOptionSelected}
            onInputChange={onInputChange}
            filterOption={filterOption}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            noOptionsMessage={noOptionsMessage}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={autoFocus}
          />
        )}
        {!isEmpty(errorMessage) && error && (
          <Text size={12} color={'error'} className={cx('errorMessageStyle')}>
            {errorMessage}
          </Text>
        )}
      </LabelWrapper>
    </Flex>
  );
};

export default forwardRef(SelectTag);
