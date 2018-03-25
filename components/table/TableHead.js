import React, { Component, cloneElement } from 'react';
// import PropTypes from 'prop-types';
import themr  from '../utils/themr';
import { TABLE } from '../identifiers';
import { Checkbox } from '../checkbox/Checkbox';
import { TableCell } from './TableCell';
import theme from './theme.css';

@themr(TABLE, theme)
export class TableHead extends Component {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   displaySelect: PropTypes.bool,
  //   multiSelectable: PropTypes.bool,
  //   onSelect: PropTypes.func,
  //   selectable: PropTypes.bool,
  //   selected: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     checkboxCell: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    displaySelect: true,
  };

  handleSelect = (value, event) => {
    this.props.onSelect(value, event);
  };

  render() {
    const {
      children,
      displaySelect,
      multiSelectable,
      onSelect,        // eslint-disable-line
      selectable,
      selected,
      theme,
      ...other
    } = this.props;
    return (
      <tr {...other}>
        {selectable && <TableCell className={theme.checkboxCell} tagName="th">
          {displaySelect && <Checkbox
            checked={selected}
            disabled={!multiSelectable}
            onChange={this.handleSelect}
          />}
        </TableCell>}
        {React.Children.map(children, (child, index) => {
          if (!child) return null;
          return cloneElement(child, {
            column: index,
            tagName: 'th',
          });
        })}
      </tr>
    );
  }
}
export default TableHead;
