import { ReactChild, ReactFragment, ReactPortal, useState } from 'react';
import classNames from 'classnames/bind';
import AutoSuggest from 'react-autosuggest';
import { isEmpty, lowerCase } from '../../uikit/helper';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import Text from '../../uikit/Text/Text';
import styles from './inputsearch.module.css';

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
}: any) => {
  return (
    <input
      ref={ref}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onChange={onChange}
      value={lowerCase(value.replace(', usa', ', USA'))}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      className={cx('search', { errorBorder: error })}
      autoComplete={'off'}
      onKeyPress={onKeyPress}
      // style={{ textTransform: 'capitalize' }}
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
  onkeyPress,
}: Props) => {
  const [currentsuggestion, setSuggestion] = useState<any[]>([]);
  const [currentvalue, setValue] = useState(initialValue);
  const [isErrorFocus, setErrorFocus] = useState(false);

  const lowerCasedCompanies =
    options &&
    options.map((company) => {
      return company.toLowerCase();
    });

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

    // if (typeof callback === 'function') {
    //   callback(suggestion[`${labelKey}`]);
    // }
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
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setValue(value);
    const requiredSuggestions: any = getSuggestions(value);
    setSuggestion(requiredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
  };
  return (
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
  );
};

InputSearch.defaultProps = defaultProps;

export default InputSearch;
