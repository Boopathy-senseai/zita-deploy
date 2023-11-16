import React from 'react';
import { SECONDARY } from '../Colors/colors';
import Text from '../Text/Text';

type Props = {
  higlight?: string;
  value?: string;
  className?: string;
  tag?: string;
  user?: string;
};
export const HighlightText = ({
  higlight,
  value,
  className,
  tag,
  user,
}: Props) => {
  return (
    <Text className={className} tag={tag}>
      {getHighlightedText(value, higlight)}
    </Text>
  );
};

const getHighlightedText = (text: string, higlight: string) => {
  var parts = text?.split(new RegExp(`(${higlight})`, 'gi'));
  return parts?.map((part, index) => (
    <React.Fragment key={index}>
      {part.toLowerCase() === higlight.toLowerCase() ? (
        <Text style={{ backgroundColor: SECONDARY, fontSize: '13px' }} bold>
          {part}
        </Text>
      ) : (
        <Text style={{ fontSize: '13px' }}>{part}</Text>
      )}
    </React.Fragment>
  ));
};
