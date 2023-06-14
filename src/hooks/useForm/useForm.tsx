import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export type UseForm<T> = {
  values: T;
  errors: Partial<T>;
  isValid: boolean;
  isDirty: boolean;
  touched: Partial<{ [key: string]: boolean }>;
  handleChange: (field: string) => (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any) => void;
  resetForm: () => void;
  handleSubmit: () => void;
  handleBlur: (e: any) => void;
};

interface Props<T> {
  initialValues?: T;
  isTrim?: boolean;
  initialValidation?: boolean;
  validate?: (value: T) => Partial<T>;
  onSubmit?: (value: T) => void;
}

interface FormProps<T> {
  errors: Partial<T>;
  isValid: boolean;
  isDirty: boolean;
  touched: Partial<{ [key: string]: boolean }>;
}

export function useForm<
  T extends {
    [key: string]: any;
  },
>(opts: Props<T> = { initialValidation: false }): UseForm<T> {
  const { initialValues, initialValidation, validate, onSubmit } = opts;
  const [state, setState] = useState<T>(initialValues);
  const [formProps, setFormProps] = useState<FormProps<T>>({
    errors: {},
    isValid: true,
    isDirty: false,
    touched: {},
  });

  const initializeForm = useCallback(() => {
    setState(initialValues);
    if (initialValidation) {
      handleFormPropsUpdate('errors', validate(initialValues));
    }
  }, [JSON.stringify(initialValues)]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  useEffect(() => {
    const val = Object.values(formProps.errors);
    handleFormPropsUpdate('isValid', val.length === 0);
  }, [formProps.errors]);

  useEffect(() => {
    if (initialValues) {
      handleFormPropsUpdate('isDirty', isFormDirty(state, initialValues));
    }
    handleFormPropsUpdate('errors', validate(state));
  }, [state]);

  const handleFormPropsUpdate = (field: string, value: any) => {
    setFormProps((prev) => ({ ...prev, [field]: value }));
  };

  const resetFormProps = () => {
    setFormProps({
      errors: {},
      isValid: true,
      isDirty: false,
      touched: {},
    });
  };

  const setFieldValue = (field: string, value: any) => {
    setState((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<any>) => {
    setState((prevState) => {
      return { ...prevState, [field]: e.target.value };
    });
    handleTouched(e);
  };

  const handleBlur = (e: any) => {
    if (e.persist) {
      e.persist();
    }
    handleTouched(e);
  };

  const handleTouched = (e: any) => {
    const { name, id, outerHTML } = e.target;
    const field = name ? name : id;
    handleFormPropsUpdate('touched', {
      [field]: true,
    });
  };

  const handleSubmit = () => {
    if (onSubmit && formProps.isValid) {
      const newState = trimValue(state);
      setState(newState);
      onSubmit(newState);
    }
  };

  const trimValue = (values: T): T => {
    return Object.keys(values).reduce((o, key) => {
      return {
        ...o,
        [key]:
          typeof values[key] === 'string' ? values[key].trim() : values[key],
      } as T;
    }, {} as T);
  };

  const resetForm = () => {
    resetFormProps();
    initializeForm();
  };

  return {
    values: state,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    handleBlur,
    ...formProps,
  };
}

export function isFormDirty(
  form: { [key: string]: any },
  intial: { [key: string]: any } | null,
) {
  if (intial === null) return false;
  return Object.keys(form)
    .map((key) => {
      if (form[key] && typeof form[key] === 'object') {
        return isFormDirty(form[key], intial[key]);
      }
      return form[key] === intial[key];
    })
    .includes(false);
}
