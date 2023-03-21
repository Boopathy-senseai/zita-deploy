import React from 'react';
import { SECONDARY } from '../Colors/colors';
import Text from '../Text/Text';

type Props = {
  higlight: string;
  value: string;
  className?: string;
  tag?: string;
};
export const HighlightText = ({ higlight, value, className, tag }: Props) => {
  return (
    <Text className={className} tag={tag}>
      {getHighlightedText(value, higlight)}
    </Text>
  );
};

const getHighlightedText = (text: string, higlight: string) => {
  var parts = text.split(new RegExp(`(${higlight})`, 'gi'));
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part.toLowerCase() === higlight.toLowerCase() ? (
        <Text style={{ backgroundColor: SECONDARY }} bold>
          {part}
        </Text>
      ) : (
        <Text>{part}</Text>
      )}
    </React.Fragment>
  ));
};
