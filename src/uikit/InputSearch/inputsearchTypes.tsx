import {
  ChangeEventHandler,
  FocusEventHandler,
  LegacyRef,
  KeyboardEventHandler,
} from 'react';

export type InputPropsType = {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>; // called every time the input value changes
  onBlur?: FocusEventHandler<HTMLInputElement>; // called when the input loses focus, e.g. when user presses Tab
  type: string;
  placeholder: string;
  id: string;
  autoComplete: string;
  ref: LegacyRef<HTMLInputElement> | undefined;
  onSubmit: () => void;
  disabled?: boolean;
  key: string;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onFocus: FocusEventHandler<HTMLInputElement>;
};
