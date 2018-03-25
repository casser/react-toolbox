import * as React from "react";
// import PropTypes from 'prop-types';
import themr  from '../utils/themr';
import { TABLE } from '../identifiers';
import { Checkbox } from '../checkbox/Checkbox';
import { TableCell } from './TableCell';
import theme from './theme.css';
import ReactToolbox from "../types";

export interface TableHeadTheme {
  /**
   * Modifier for cells that include a select checkbox.
   */
  checkboxCell?: string;
}

export interface TableHeadProps extends ReactToolbox.Props {
  /**
   * If true, a checkbox will be displayed to select every row. In case the table is not multi-selectable, it will be disabled though.
   * @default true
   */
  displaySelect?: boolean;
  /**
   * If true, the header and each row will display a checkbox to allow the user to select multiple rows.
   * @default true
   */
  multiSelectable?: boolean;
  /**
   * Handle the select state change of the checkbox in the header row.
   */
  onSelect?: Function;
  /**
   * If true, each row will display a checkbox to allow the user to select that one row.
   * @default true
   */
  selectable?: boolean;
  /**
   * If selectable, controls the selected state of the checkbox in the header row.
   */
  selected?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: TableHeadTheme;
}


@themr(TABLE, theme)
export class TableHead extends React.Component<TableHeadProps> {
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
        {React.Children.map(children, (child:React.ReactElement<any>, index) => {
          if (!child) return null;
          return React.cloneElement(child, {
            column: index,
            tagName: 'th',
          });
        })}
      </tr>
    );
  }
}
export default TableHead;
