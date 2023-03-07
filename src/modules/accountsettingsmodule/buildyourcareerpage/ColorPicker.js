import { ChromePicker } from 'react-color';
import { any } from 'prop-types';

const ColorPicker = (props) => {
  return (
    <ChromePicker
      color={props.colors !== null && props.colors.hex}
      onChange={(e) => props.onChange(e)}
      disableAlpha
      renderers={false}
    />
  );
};

ColorPicker.propTypes = {
  onChange: any.isRequired,
  colors: any.isRequired,
};
export default ColorPicker;
