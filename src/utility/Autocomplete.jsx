/* eslint-disable */
import { Component } from 'react';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.items = this.props.options;

    this.state = {
      suggestions: [],
      text: '',
    };
  }

  componentWillReceiveProps(value) {
    let getValue = value.getValue;
    let suggestions = [];
    if (getValue.length > 0) {
      const regex = new RegExp(`^${getValue}`, 'i');
      suggestions = this.items.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: getValue }));
  }

  // onTextChanged = (e) => {
  //     const value = e.target.value;
  //     let suggestions = [];
  //     if (value.length > 0) {
  //         const regex = new RegExp(`^${value}`, 'i');
  //         suggestions = this.items.sort().filter(v => regex.test(v));
  //     }
  //     this.setState(() => ({ suggestions, text: value }));
  // }

  suggestionSelected(value) {
    this.setState(() => ({
      // text: value,
      suggestions: [],
    }));
    this.props.parentCallback(value);
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions && suggestions?.length === 0) {
      return null;
    }
    return (
      <div className="srchList">
        <ul>
          {suggestions.map((item, i) => {
            console.log('item', item);
            return (
              <li key={i + item} onClick={() => this.suggestionSelected(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    // const { text } = this.state;
    // return (
    //     <div className="form-group mb-4 pb-2">
    //         <input value={text}  key={this.props.myref} onChange={this.onTextChanged} type="text"/>
    //         <span className="highlight"></span>
    //         <span className="bar"></span>
    //         <label>Department</label>
    //         <div className="renderSuggestions">
    //             {this.renderSuggestions()}
    //         </div>
    //     </div>
    // );
    return this.renderSuggestions();
  }
}

export default Autocomplete;
