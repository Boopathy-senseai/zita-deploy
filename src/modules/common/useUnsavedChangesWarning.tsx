import { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';

const useUnsavedChangesWarning = (
  message = 'Do you want to leave this site? Changes you made may not be saved.',
) => {
  const [isDirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    // Detecting browser closing
    window.onbeforeunload = isDirty ? () => isDirty && !!message : null;

    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, [isDirty, message]);

  const routerPrompt = <Prompt when={isDirty} message={message} />;
  const onDirty = () => setDirty(true);
  const onPristine = () => setDirty(false);

  return { routerPrompt, onDirty, onPristine };
};

export default useUnsavedChangesWarning;
