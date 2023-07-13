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
  CustomStyle,
  customStylechanges,
  customStyletrue
} from './selectHelper';
import styles from './selecttag.module.css';

const cx = classNames.bind(styles);

export type list = {
  [key: string]: any;
};

// const CustomStyle = {
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isSelected ? 'red' : 'green',
//   }),
// };

type Props = {
  options: list[];
  isClearable?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  isMail?: boolean;
  isMulti?: boolean;
  className?: string;
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
  linechange?:boolean;
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
  stylechanges?:boolean;
};

const SelectTag = (
  {
    isLoading,
    options,
    isClearable,
    isDisabled,
    isSearchable = false,
    placeholder,
    isMail,
    isMulti,
    onChange,
    className,
    stylechanges,
    value,
    name,
    required,
    label,
    labelBold,
    selectContainerClass,
    defaultValue,
    components,
    lineStyle,
    linechange,
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
    console.log('weee', isMail);

    if (isMulti) {
      setSelectStyle(customStylesMulti);
    } 
    else if (stylechanges && !isMulti&& !lineStyle && linechange){
      setSelectStyle(customStylechanges);
    }
    else if (lineStyle) {
      setSelectStyle(customStylesLine);
    }else if(linechange && !isMulti && !lineStyle ){  
      setSelectStyle(customStyletrue);
    }
    
     else if (!isMulti && !lineStyle) {
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
            className={className}
            isLoading={isLoading}
            isDisabled={isDisabled}
            isSearchable={isSearchable}
            isClearable={isClearable}
            options={options}
            placeholder={placeholder}
            isMulti={isMulti}
            onChange={onChange}
            styles={CustomStyle}
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
