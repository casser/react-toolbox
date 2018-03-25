/* eslint-disable */
import * as React from 'react';
//import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { isValuePresent } from '../utils/utils';
import { AUTOCOMPLETE } from '../identifiers';
import {Chip} from '../chip/Chip';
import {Input} from '../input/Input';
import events from '../utils/events';
import theme from './theme.css';

import { InputTheme,InputProps } from 'components/input/Input';
export interface AutocompleteTheme {
  /**
   * Used for a suggestion when it's active.
   */
  active?: string;
  /**
   * Used for the root element.
   */
  autocomplete?: string;
  /**
   * Used when the input is focused.
   */
  focus?: string;
  /**
   * Used to style the Input component.
   */
  input?: string;
  /**
   * Used to style each suggestion.
   */
  suggestion?: string;
  /**
   * Used to style the suggestions container.
   */
  suggestions?: string;
  /**
   * Used for the suggestions when it's opening to the top.
   */
  up?: string;
  /**
   * Classname used for a single value.
   */
  value?: string;
  /**
   * Classname used for the values container.
   */
  values?: string;
}
export interface AutocompleteProps extends InputProps {
  /**
   * Determines if user can create a new option with the current typed value.
   * @default false
   */
  allowCreate?: boolean;
  /**
   * Determines the opening direction. It can be auto, up or down.
   * @default auto
   */
  direction?: "auto" | "up" | "down";
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Sets the error string for the internal input element.
   * @default false
   */
  error?: React.ReactNode;
  /**
   * Whether component should keep focus after value change.
   * @default false
   */
  keepFocusOnChange?: boolean;
  /**
   * The text string to use for the floating label element.
   */
  label?: React.ReactNode;
  /**
   * If true, component can hold multiple values.
   * @default true
   */
  multiple?: boolean;
  /**
   * Callback function that is fired when component is blurred.
   */
  onBlur?: Function;
  /**
   * Callback function that is fired when the components's value changes.
   */
  onChange?: Function;
  /**
   * Callback function that is fired when component is focused.
   */
  onFocus?: Function;
  /**
   * Callback function that is fired when a key is pressed down.
   */
  onKeyDown?: Function;
  /**
   * Callback function that is fired when a key is lifted up.
   */
  onKeyUp?: Function;
  /**
   * Callback function that is fired when the components's query value changes.
   */
  onQueryChange?: Function;
  /**
   * Determines if the selected list is shown above or below input. It can be above or below.
   * @default above
   */
  selectedPosition?: "above" | "below" | "none";
  /**
   * Determines if the selected list is shown if the `value` keys don't exist in the source. Only works if passing the `value` prop as an Object.
   * @default false
   */
  showSelectedWhenNotInSource?: boolean;
  /**
   * If true, the list of suggestions will not be filtered when a value is selected.
   * @default false
   */
  showSuggestionsWhenValueIsSet?: boolean;
  /**
   * Object of key/values or array representing all items suggested.
   */
  source?: any;
  /**
   * Determines how suggestions are supplied.
   * @default start
   */
  suggestionMatch?: "disabled" | "start" | "anywhere" | "word";
  /**
   * Classnames object defining the component style.
   */
  theme?: AutocompleteTheme & InputTheme;
  /**
   * Value or array of values currently selected component.
   */
  value?: any;
  /**
   * Additional properties passed to inner Input component.
   */
  [key: string]: any;
}

const POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up',
};

@themr(AUTOCOMPLETE, theme, { withRef: true })
export class Autocomplete extends React.Component<AutocompleteProps> {
  /*static propTypes = {
    allowCreate: PropTypes.bool,
    className: PropTypes.string,
    direction: PropTypes.oneOf(['auto', 'up', 'down']),
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    keepFocusOnChange: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    multiple: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onQueryChange: PropTypes.func,
    query: PropTypes.string,
    selectedPosition: PropTypes.oneOf(['above', 'below', 'none']),
    showSelectedWhenNotInSource: PropTypes.bool,
    showSuggestionsWhenValueIsSet: PropTypes.bool,
    source: PropTypes.any,
    suggestionMatch: PropTypes.oneOf(['disabled', 'start', 'anywhere', 'word', 'none']),
    theme: PropTypes.shape({
      active: PropTypes.string,
      autocomplete: PropTypes.string,
      focus: PropTypes.string,
      input: PropTypes.string,
      suggestion: PropTypes.string,
      suggestions: PropTypes.string,
      up: PropTypes.string,
      value: PropTypes.string,
      values: PropTypes.string,
    }),
    value: PropTypes.any,
  };*/

  static defaultProps = {
    allowCreate: false,
    className: '',
    direction: 'auto',
    keepFocusOnChange: false,
    multiple: true,
    selectedPosition: 'above',
    showSelectedWhenNotInSource: false,
    showSuggestionsWhenValueIsSet: false,
    source: {},
    suggestionMatch: 'start',
  };

  state = {
    direction: this.props.direction,
    focus: false,
    showAllSuggestions: this.props.showSuggestionsWhenValueIsSet,
    query: this.props.query ? this.props.query : this.query(this.props.value),
    isValueAnObject: false,
    active:false
  };

  private clearQuery:boolean;
  private inputNode:Input;

  componentWillReceiveProps(nextProps) {
    if (!this.props.multiple) {
      const query = nextProps.query ? nextProps.query : this.query(nextProps.value);
      this.updateQuery(query, false);
    }
  }

  shouldComponentUpdate(nextProps:this['props'], nextState:this['state']) {
    if (!this.state.focus && nextState.focus && this.props.direction === POSITION.AUTO) {
      const direction = this.calculateDirection();
      if (this.state.direction !== direction) {
        this.setState({ direction });
      }
    }
    return true;
  }

  handleChange = (values:any, event) => {
    const value = this.props.multiple ? values : values[0];
    const { showSuggestionsWhenValueIsSet: showAllSuggestions } = this.props;
    const query = this.query(value);
    if (this.props.onChange) this.props.onChange(value, event);
    if (this.props.keepFocusOnChange) {
      this.setState({ query, showAllSuggestions });
    } else {
      this.setState({ focus: false, query, showAllSuggestions }, () => {
        ReactDOM.findDOMNode(this).querySelector('input').blur();
      });
    }
    this.updateQuery(query, this.props.query);
  };

  handleMouseDown = (event) => {
    this.selectOrCreateActiveItem(event);
  };

  handleQueryBlur = (event) => {
    if (this.state.focus) this.setState({ focus: false });
    if (this.props.onBlur) this.props.onBlur(event, this.state.active);
  };

  updateQuery = (query:any, notify:any) => {
    if (notify && this.props.onQueryChange) this.props.onQueryChange(query);
    this.setState({ query });
  };

  handleQueryChange = (value:any) => {
    const query = this.clearQuery ? '' : value;
    this.clearQuery = false;

    this.updateQuery(query, true);
    this.setState({ showAllSuggestions: query ? false : this.props.showSuggestionsWhenValueIsSet, active: null });
  };

  handleQueryFocus = (event) => {
    event.target.scrollTop = 0;
    this.setState({ active: '', focus: true });
    if (this.props.onFocus) this.props.onFocus(event);
  };

  handleQueryKeyDown = (event) => {
    // Mark query for clearing in handleQueryChange when pressing backspace and showing all suggestions.
    this.clearQuery = (
      event.which === 8
      && this.props.showSuggestionsWhenValueIsSet
      && this.state.showAllSuggestions
    );

    if (event.which === 13) {
      this.selectOrCreateActiveItem(event);
    }

    if(this.props.onKeyDown) this.props.onKeyDown(event);
  };

  handleQueryKeyUp = (event) => {
    if (event.which === 27) ReactDOM.findDOMNode(this).querySelector('input').blur();

    if ([40, 38].indexOf(event.which) !== -1) {
      const suggestionsKeys = [...this.suggestions().keys()];
      let index = suggestionsKeys.indexOf(this.state.active) + (event.which === 40 ? +1 : -1);
      if (index < 0) index = suggestionsKeys.length - 1;
      if (index >= suggestionsKeys.length) index = 0;
      this.setState({ active: suggestionsKeys[index] });
    }

    if(this.props.onKeyUp) this.props.onKeyUp(event);
  };

  handleSuggestionHover = (event) => {
    this.setState({ active: event.target.id });
  };

  calculateDirection() {
    if (this.props.direction === 'auto') {
      const client = ReactDOM.findDOMNode(this.inputNode).getBoundingClientRect();
      const screen_height = window.innerHeight || document.documentElement.offsetHeight;
      const up = client.top > ((screen_height / 2) + client.height);
      return up ? 'up' : 'down';
    }
    return this.props.direction;
  }

  query(key) {
    let query_value = '';
    if (!this.props.multiple && isValuePresent(key)) {
      const source_value = this.source().get(`${key}`);
      query_value = source_value || key;
    }
    return query_value;
  }

  selectOrCreateActiveItem(event) {
    let target = this.state.active;
    if (!target) {
      target = this.props.allowCreate
        ? this.state.query
        : [...this.suggestions().keys()][0];
      this.setState({ active: target });
    }
    this.select(event, target);
  }

  normalise(value) {
    const sdiak = 'áâäąáâäąččććççĉĉďđďđééěëēėęéěëēėęĝĝğğġġģģĥĥħħíîíîĩĩīīĭĭįįi̇ıĵĵķķĸĺĺļļŀŀłłĺľĺľňńņŋŋņňńŉóöôőøōōóöőôøřřŕŕŗŗššśśŝŝşşţţťťŧŧũũūūŭŭůůűűúüúüűųųŵŵýyŷŷýyžžźźżżß';
    const bdiak = 'AAAAAAAACCCCCCCCDDDDEEEEEEEEEEEEEGGGGGGGGHHHHIIIIIIIIIIIIIIJJKKKLLLLLLLLLLLLNNNNNNNNNOOOOOOOOOOOORRRRRRSSSSSSSSTTTTTTUUUUUUUUUUUUUUUUUWWYYYYYYZZZZZZS';

    let normalised = '';
    for (let p = 0; p < value.length; p++) {
      if (sdiak.indexOf(value.charAt(p)) !== -1) {
        normalised += bdiak.charAt(sdiak.indexOf(value.charAt(p)));
      } else {
        normalised += value.charAt(p);
      }
    }

    return normalised.toLowerCase().trim();
  }

  suggestions() {
    let suggest = new Map();
    const rawQuery = this.state.query || (this.props.multiple ? '' : this.props.value);
    const query = this.normalise((`${rawQuery}`));
    const values = this.values();
    const source = this.source();

    // Suggest any non-set value which matches the query
    if (this.props.multiple) {
      for (const [key, value] of source) {
        if (!values.has(key) && this.matches(this.normalise(value), query)) {
          suggest.set(key, value);
        }
      }

      // When multiple is false, suggest any value which matches the query if showAllSuggestions is false
    } else if (query && !this.state.showAllSuggestions) {
      for (const [key, value] of source) {
        if (this.matches(this.normalise(value), query)) {
          suggest.set(key, value);
        }
      }

      // When multiple is false, suggest all values when showAllSuggestions is true
    } else {
      suggest = source;
    }

    return suggest;
  }

  matches(value, query) {
    const { suggestionMatch } = this.props;

    if (suggestionMatch === 'disabled') {
      return true;
    } else if (suggestionMatch === 'start') {
      return value.startsWith(query);
    } else if (suggestionMatch === 'anywhere') {
      return value.includes(query);
    } else if (suggestionMatch === 'word') {
      const re = new RegExp(`\\b${query}`, 'g');
      return re.test(value);
    }else if(suggestionMatch === 'none'){
      return value
    }

    return false;
  }

  source() {
    const { source: src } = this.props;
    if (src.hasOwnProperty('length')) {
      return new Map(src.map(item => Array.isArray(item) ? [...item] : [item, item]));
    }
    return new Map(Object.keys(src).map(key => [`${key}`, src[key]] as [string,string]));
  }

  values(v?) {
    let vals = this.props.multiple ? this.props.value : [this.props.value];

    if (!vals) vals = [];

    if (this.props.showSelectedWhenNotInSource && this.isValueAnObject()) {
      return new Map(Object.entries(vals));
    }

    const valueMap = new Map();

    const stringVals = vals.map(v => `${v}`);
    for (const [k, v] of this.source()) {
      if (stringVals.indexOf(k) !== -1) valueMap.set(k, v);
    }

    return valueMap;
  }

  select = (event, target) => {
    events.pauseEvent(event);
    const values = this.values(this.props.value);
    const source = this.source();
    const newValue = target === void 0 ? event.target.id : target;

    if (this.isValueAnObject()) {
      const newItem = Array.from(source).reduce((obj, [k, value]:[string,any]) => {
        if (k === newValue) {
          obj[k] = value;
        }
        return obj;
      }, {});

      if (Object.keys(newItem).length === 0 && newValue) {
        newItem[newValue] = newValue;
      }

      return this.handleChange(Object.assign(this.mapToObject(values), newItem), event);
    }

    this.handleChange([newValue, ...values.keys()], event);
  };

  unselect(key, event) {
    if (!this.props.disabled) {
      const values = this.values(this.props.value);

      values.delete(key);

      if (this.isValueAnObject()) {
        return this.handleChange(this.mapToObject(values), event);
      }

      this.handleChange([...values.keys()], event);
    }
  }

  isValueAnObject() {
    return !Array.isArray(this.props.value) && typeof this.props.value === 'object';
  }

  mapToObject(map) {
    return Array.from(map).reduce((obj, [k, value]) => {
      obj[k] = value;
      return obj;
    }, {});
  }

  renderSelected() {
    if (this.props.multiple) {
      const selectedItems = [...this.values()].map(([key, value]) => (
        <Chip
          key={key}
          className={this.props.theme.value}
          deletable
          onDeleteClick={this.unselect.bind(this, key)}
        >
          {value}
        </Chip>
      ));

      return <ul className={this.props.theme.values}>{selectedItems}</ul>;
    }
  }

  renderSuggestions() {
    const { theme } = this.props;
    const suggestions = [...this.suggestions()].map(([key, value]) => {
      const className = classnames(theme.suggestion, { [theme.active]: this.state.active === key });
      return (
        <li
          id={key}
          key={key}
          className={className}
          onMouseDown={this.handleMouseDown}
          onMouseOver={this.handleSuggestionHover}
        >
          {value}
        </li>
      );
    });

    return (
      <ul
        className={classnames(theme.suggestions, { [theme.up]: this.state.direction === 'up' })}
      >
        {suggestions}
      </ul>
    );
  }

  render() {
    const {
      allowCreate, error, label, source, suggestionMatch, query, // eslint-disable-line no-unused-vars
      selectedPosition, keepFocusOnChange, showSuggestionsWhenValueIsSet, showSelectedWhenNotInSource, onQueryChange,   // eslint-disable-line no-unused-vars
      theme, ...other
    } = this.props;
    const className = classnames(theme.autocomplete, {
      [theme.focus]: this.state.focus,
    }, this.props.className);

    return (
      <div data-react-toolbox="autocomplete" className={className}>
        {this.props.selectedPosition === 'above' ? this.renderSelected() : null}
        <Input
          {...other}
          ref={(node) => { this.inputNode = node; }}
          autoComplete="off"
          className={theme.input}
          error={error}
          label={label}
          onBlur={this.handleQueryBlur}
          onChange={this.handleQueryChange}
          onFocus={this.handleQueryFocus}
          onKeyDown={this.handleQueryKeyDown}
          onKeyUp={this.handleQueryKeyUp}
          theme={theme}
          themeNamespace="input"
          value={this.state.query}
        />
        {this.renderSuggestions()}
        {this.props.selectedPosition === 'below' ? this.renderSelected() : null}
      </div>
    );
  }
}
