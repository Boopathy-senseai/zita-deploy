import { FixedSizeList as List } from 'react-window';
import { Component } from 'react';

type MyProps = {
  options: any;
  maxHeight: any;
  getValue: any;
  children: any;
};
const height = 35;

class MenuLists extends Component<MyProps> {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        width={'100%'}
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

export default MenuLists;
