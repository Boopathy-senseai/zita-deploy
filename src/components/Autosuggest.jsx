import { Component } from 'react';
import axios from 'axios';
class Autosuggest extends Component {
  getautoSearch() {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };
    let options = [];
    axios
      .get('permissions', config)
      .then((res) => {
        res.data.map((d) =>
          options.push({
            id: d.id,
            name: d.name,
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.getautoSearch.options.filter(
          (lang) =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue,
        );
  }

  getSuggestionValue = (suggestion) => suggestion.name;

  renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;
}

export default Autosuggest;
