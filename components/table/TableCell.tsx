import * as React from "react";
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { TABLE } from '../identifiers';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';
import ReactToolbox from "components/index";

const ASC = 'asc';
const DESC = 'desc';
export interface TableCellTheme {
  /**
   * Modifier for the icon in case the order is ascendent.
   */
  asc?: string;
  /**
   * Added to each cell displayed in the head.
   */
  headCell?: string;
  /**
   * Modifier for cells that are numeric.
   */
  numeric?: string;
  /**
   * Added to each cell displayed in the table body.
   */
  rowCell?: string;
  /**
   * Modifier for cells that are sorted asc or desc.
   */
  sorted?: string;
  /**
   * Used for the sort icon included in sorted cells.
   */
  sortIcon?: string;
  /**
   * Applied to the root element of the cell.
   */
  tableCell?: string;
}

export interface TableCellProps extends ReactToolbox.Props {
  /**
   * The column number of this cell.
   */
  column?: number;
  /**
   * If true the cell is considered as numeric and the content will be displayed aligned to right.
   * @default false
   */
  numeric?: boolean;
  /**
   * Called when the cell is clicked with the click event, column number and row number.
   */
  //onClick?: Function;
  /**
   * The row number of the cell.
   */
  row?: number;
  /**
   * If you provide a value the cell will show an arrow pointing down or up depending on the value to indicate it is a sorted element. Useful only for columns.
   */
  sorted?: 'asc' | 'desc';
  /**
   * The element tag, either `td` or `th`.
   * @default 'td'
   */
  tagName?: 'td' | 'th';
  /**
   * Classnames object defining the component style.
   */
  theme?: TableCellTheme;
}

@themr(TABLE, theme)
export class TableCell extends React.Component<TableCellProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   column: PropTypes.number,
  //   numeric: PropTypes.bool,
  //   onClick: PropTypes.func,
  //   row: PropTypes.number,
  //   sorted: PropTypes.oneOf([ASC, DESC]),
  //   tagName: PropTypes.oneOf(['td', 'th']),
  //   theme: PropTypes.shape({
  //     asc: PropTypes.string,
  //     headCell: PropTypes.string,
  //     numeric: PropTypes.string,
  //     rowCell: PropTypes.string,
  //     sorted: PropTypes.string,
  //     sortIcon: PropTypes.string,
  //     tableCell: PropTypes.string,
  //   }),
  // };
  // static defaultProps = {
  //   children: PropTypes.node,
  //   className: '',
  //   numeric: false,
  //   tagName: 'td',
  // };

  handleClick = (event) => {
    const { onClick, row, column } = this.props;
    //if (onClick) onClick(event, column, row);
    if (onClick) onClick(event);
  };

  render() {

    const {
      children,
      className,
      numeric,
      row,    // eslint-disable-line
      column, // eslint-disable-line
      sorted,
      tagName,
      theme,
      ...other
    } = this.props;

    const _className = cn(theme.tableCell, {
      [theme.headCell]: tagName === 'th',
      [theme.rowCell]: tagName === 'td',
      [theme.sorted]: sorted,
      [theme.numeric]: numeric,
    }, className);

    const props = {
      ...other,
      className: _className,
      onClick: this.handleClick,
    };

    return (
      React.createElement(tagName, props, [
        sorted && <FontIcon
          className={cn(theme.sortIcon, { [theme.asc]: sorted === ASC })}
          key="icon"
          value="arrow_downward"
        />,
        children,
      ])
    );
  }
}
export default TableCell;

