import React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import { Checkbox } from '../checkbox/Checkbox';
import { ListItemContent } from './ListItemContent';
import theme from './theme.css';

@themr(LIST, theme)
export class ListCheckbox extends React.Component {
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
