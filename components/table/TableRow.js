import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { TABLE } from '../identifiers';
import { Checkbox } from '../checkbox/Checkbox';
import { TableCell } from './TableCell';
import theme from './theme.css';

@themr(TABLE, theme)
export class TableRow extends Component {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   idx: PropTypes.number,
  //   onSelect: PropTypes.func,
  //   selectable: PropTypes.bool,
  //   selected: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     checkboxCell: PropTypes.string,
  //     row: PropTypes.string,
  //     selected: PropTypes.string,
  //   }),
  // };

  handleSelect = (value) => {
    const { idx, onSelect } = this.props;
    if (onSelect) onSelect(idx, value);
  };

  render() {
    const {children, className, selectable, idx, selected, theme, ...other} = this.props; // eslint-disable-line
    const _className = classnames(theme.row, {
      [theme.selected]: selectable && selected,
    }, className);
    return (
      <tr {...other} className={_className}>
        {selectable && <TableCell tagName={'td'} className={theme.checkboxCell}>
          <Checkbox theme={theme} checked={selected} onChange={this.handleSelect} />
        </TableCell>}
        {React.Children.map(children, (child, index) => {
          if (!child) return null;
          return React.cloneElement(child, {
            column: index,
            tagName: 'td',
          });
        })}
      </tr>
    );
  }
}

export default TableRow;
