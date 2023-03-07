/* eslint-disable */
import { Component } from 'react';
import styles from './collapse.module.css';

class Collapse extends Component {
  state = { childHeight: 0 };

  componentDidMount() {
    const childHeightRaw = this.content.clientHeight;
    const childHeight = `${childHeightRaw / 16}rem`;

    this.setState({ childHeight });
  }

  render() {
    const { children, isOpen, noText } = this.props;
    const { childHeight } = this.state;

    return noText ? (
      <div
        className={styles.collapse}
        style={{
          height: isOpen ? 100 : 0,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div ref={(content) => (this.content = content)}>{children}</div>
      </div>
    ) : (
      <div
        className={styles.collapse}
        style={{
          maxHeight: isOpen ? childHeight : 0,
        }}
      >
        <div ref={(content) => (this.content = content)}>{children}</div>
      </div>
    );
  }
}

Collapse.defaultProps = {
  isOpen: false,
};

export default Collapse;
