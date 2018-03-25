import * as React from "react";

// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { TABLE } from '../identifiers';
import { Checkbox } from '../checkbox/Checkbox';
import { TableCell } from './TableCell';
import theme from './theme.css';
import ReactToolbox from "../types";

export interface TableRowTheme {
  /**
   * Modifier for cells that include a select checkbox.
   */
  checkboxCell?: string;
  /**
   * Added to each row in the table except for the header.
   */
  row?: string;
  /**
   * Modifier for rows that are selected.
   */
  selected?: string;
  check?:string,
  checked?:string,
}

export interface TableRowProps extends ReactToolbox.Props {
  /**
   * The index of the row.
   */
  idx?: number;
  /**
   * Handle the select state change of the checkbox in the ow.
   */
  onSelect?: Function;
  /**
   * If true, each row will display a checkbox to allow the user to select that one row.
   * @default true
   */
  selectable?: boolean;
  /**
   * If true, the row will be considered as selected so the row will display a selected style with the selection control activated. This property is used by `Table` to figure out the selection when you interact with the Table.
   */
  selected?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: TableRowTheme;
}


@themr(TABLE, theme)
export class TableRow extends React.Component<TableRowProps> {
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
    const {children, className, selectable, idx, selected, theme, onSelect, ...other} = this.props; // eslint-disable-line
    const _className = cn(theme.row, {
      [theme.selected]: selectable && selected,
    }, className);
    return (
      <tr {...other} className={_className}>
        {selectable && <TableCell tagName={'td'} className={theme.checkboxCell}>
          <Checkbox theme={theme} checked={selected} onChange={this.handleSelect} />
        </TableCell>}
        {React.Children.map(children, (child:React.ReactElement<any>, index) => {
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
