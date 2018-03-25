import * as React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import { Checkbox } from '../checkbox/Checkbox';
import { ListItemContent } from './ListItemContent';
import theme from './theme.css';
import ReactToolbox from "components/index";
export interface ListCheckboxTheme {
  /**
   * Used as a wrapper class for the subheader element.
   */
  checkbox?: string;
  /**
   * Added to the checkbox element.
   */
  checkboxItem?: string;
  /**
   * Added to the inner content if its a disabled item.
   */
  disabled?: string;
  /**
   * Used for the inner content of a list item.
   */
  item?: string;
}

export interface ListCheckboxProps extends ReactToolbox.Props {
  /**
   * Main text of the item. Required.
   */
  caption?: string;
  /**
   * If true the checkbox appears checked by default.
   * @default false
   */
  checked?: boolean;
  /**
   * If true, the item is displayed as disabled and it's not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Secondary text to display under the caption.
   */
  legend?: string;
  /**
   * Name for the checkbox input item.
   */
  name?: string;
  /**
   * Callback called when the input element is blurred.
   */
  onBlur?: React.ReactEventHandler<HTMLInputElement>;
  /**
   * Callback called when the input element is changed.
   */
  onChange?: Function;
  /**
   * Callback called when the input element is focused.
   */
  onFocus?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListCheckboxTheme;
}
@themr(LIST, theme)
export class ListCheckbox extends React.Component<ListCheckboxProps> {
  // static propTypes = {
  //   caption: PropTypes.string,
  //   checked: PropTypes.bool,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   legend: PropTypes.string,
  //   name: PropTypes.string,
  //   onBlur: PropTypes.func,
  //   onChange: PropTypes.func,
  //   onFocus: PropTypes.func,
  //   theme: PropTypes.shape({
  //     checkbox: PropTypes.string,
  //     checkboxItem: PropTypes.string,
  //     disabled: PropTypes.string,
  //     item: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    checked: false,
    disabled: false,
  };

  render() {
    const {
      caption,
      checked,
      className,
      disabled,
      legend,
      name,
      onBlur,
      onChange,
      onFocus,
      theme,
    } = this.props;
    const _className = classnames(theme.item, theme.checkboxItem, {
      [theme.disabled]: disabled,
    }, className);

    return (
      <li className={_className}>
        <Checkbox
          checked={checked}
          className={theme.checkbox}
          disabled={disabled}
          label={<ListItemContent caption={caption} legend={legend} />}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
        />
      </li>
    );
  }
}

export default ListCheckbox;
