import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import AutoSuggest from 'react-autosuggest';
import { enterKeyPress, isEmpty, lowerCase } from '../../uikit/helper';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Text from '../../uikit/Text/Text';
import styles from './inputsearch.module.css';
import { KeyObject } from 'crypto';
import { Key } from 'react-bootstrap-icons';

const cx = classNames.bind(styles);

const defaultProps = {
  name: '',
  placeholder: '',
  initialValue: '',
  disabled: false,
  onSubmit: null,
};

type Props = {
  options?: any[];
  nooptin?:number;
  setFieldValue: Function;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  initialValue?: string;
  onKeyDown?: (arg: any) => void;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  error?: boolean;
  labelBold?: boolean;
  onkeyPress?: (a: any) => void;
  style?: string;
  autoFocus?: boolean;
  
};

const renderInputComponent = ({
  ref,
  onSubmit,
  onBlur,
  onChange,
  value,
  placeholder,
  disabled,
  type,
  onKeyDown,
  onFocus,
  error,
  onKeyPress,
  style,
  autoFocus,
  
  
}: any) => {
  const getValue=value.includes(', usa')


  return (
    <input
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      ref={ref}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onChange={onChange}
      value={getValue ? lowerCase(value.replace(', usa', ', USA')): value}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
       
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      className={cx('search', style, { errorBorder: error })}
      autoComplete={'off'}
      onKeyPress={onKeyPress}
     
    />
  );
};

const InputSearch = ({
  initialValue,
  setFieldValue,
  name,
  placeholder,
  disabled,
  options,
  onKeyDown,
  label,
  required,
  errorMessage,
  error,
  labelBold,
  style,
  autoFocus,
  
}: Props) => {
  const [currentsuggestion, setSuggestion] = useState<any[]>([]);
  const [currentvalue, setValue] = useState(initialValue);
  const [isErrorFocus, setErrorFocus] = useState(false);
  const [isNoOptions, setNoOptions] = useState(false);
  const [isNovalue ,setNovalue]=useState(false);
  const lowerCasedCompanies =
    options &&
    options.map((company) => {
      return company.toLowerCase();
    });
    useEffect(()=>{
      setValue(initialValue)
    },[initialValue])
    useEffect(()=>{
      if(isEmpty(currentvalue)){
        setNoOptions(false);
      }
    },[currentvalue])
  const getSuggestions = (value: string) => {
    return (
      lowerCasedCompanies &&
      lowerCasedCompanies.filter((company) =>
        company.includes(value.trim().toLowerCase()),
      )
    );
  };

  const getSuggestionValue = (suggestion: any) => suggestion;

  const renderSuggestion = (
    suggestion:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined,
  ) => (
    <div style={{ textTransform: 'capitalize' }}>
      {typeof suggestion === 'string'
        ? suggestion.replace(', usa', ', USA')
        : suggestion}
    </div>
  );

  const onSuggestionSelected = (_event: any, { suggestion }: any) => {
    let requiredValue = '';
    if (suggestion) {
      requiredValue = `${suggestion}`;
    }
    setFieldValue(name, requiredValue);
  };

  const onChange = (_event: object, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const handleFocus = () => {
    setErrorFocus(true);
  };

  const handleBlur = () => {
    setErrorFocus(false);
  };

  const onkeyPress =(event)=>{
    if(event.key === "Enter"){
      setNovalue(true)
    }
    else{
      setNovalue(false)
    }
  }

  const inputProps: any = {
    placeholder,
    value: currentvalue,
    onChange,
    disabled,
    id: name,
    onkeydown: onKeyDown,
    error: error && isEmpty(currentvalue),
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyPress: onkeyPress,
    style,
    autoFocus,
   
  };




  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setValue(value);
    const requiredSuggestions: any = getSuggestions(value);
   
    setSuggestion(requiredSuggestions);    
    if (requiredSuggestions && requiredSuggestions.length === 0 && !isEmpty(value) && !isNovalue ) {
 
      
      setNoOptions(true);
    } 
     else {
      setNoOptions(false);
    }
  };
// const onSuggestionSelected=()=>{
  
// }
  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
  };
   
  return (
    <div style={{ position: 'relative' }}>
      <LabelWrapper label={label} required={required} bold={labelBold}>
        <AutoSuggest
          suggestions={currentsuggestion}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          
          highlightFirstSuggestion={true}
          renderInputComponent={renderInputComponent}
        />
        {!isEmpty(errorMessage) && error && (
          <Text
            size={12}
            color={'error'}
            className={cx('errorMessageStyle', { errorFocus: isErrorFocus })}
          >
            {errorMessage}
          </Text>
        )}
      </LabelWrapper>
      {isNoOptions && (
<>
        {console.log("df",isNoOptions)}
        <div className={styles.noOptionsDivStyle}  
         >
          <Text color="gray">No search found</Text>
        </div>
        </>
      ) }
      
    
    </div>
  );
};

InputSearch.defaultProps = defaultProps;

export default InputSearch;

 