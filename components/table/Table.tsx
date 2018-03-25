import * as React from "react";
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import filterReactChildren from '../utils/filter-react-children';
import isComponentOfType from '../utils/is-component-of-type';
import { TABLE } from '../identifiers';
import { TableHead } from './TableHead';
import { TableRow } from './TableRow';



export interface TableTheme {
  /**
   * Used for the `thead` element.
   */
  head?: string;
  /**
   * Used for the root element of the component (`table`).
   */
  table?: string;
}

export interface TableProps extends ReactToolbox.Props {
  /**
   * If true, the header and each row will display a checkbox to allow the user to select multiple rows.
   * @default true
   */
  multiSelectable?: boolean;
  /**
   * Will be called when the row selection changes. It passes an array of selected indexes as first parameter so you can figure out changes in your local state.
   */
  onRowSelect?: Function;
  /**
   * If true, each row will display a checkbox to allow the user to select that one row.
   * @default true
   */
  selectable?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: TableTheme;
}


const isTableHead = child => isComponentOfType(TableHead, child);
const isTableRow = child => isComponentOfType(TableRow, child);
import theme from './theme.css';
import ReactToolbox from "components/index";

@themr(TABLE, theme)
export class Table extends React.Component<TableProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   multiSelectable: PropTypes.bool,
  //   onRowSelect: PropTypes.func,
  //   selectable: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     head: PropTypes.string,
  //     table: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    className: '',
    multiSelectable: false,
    selectable: true,
  };

  getRowTuples = () => React.Children
    .toArray(filterReactChildren(this.props.children, isTableRow))
    .map((child:React.ReactElement<any>, index) => [index, Boolean(child.props.selected)]);

  handleHeadSelect = (value) => {
    if (this.props.onRowSelect) {
      this.props.onRowSelect(value
        ? this.getRowTuples().map(item => item[0])
        : []);
    }
  };

  handleRowSelect = (idx) => {
    if (this.props.onRowSelect) {
      if (this.props.multiSelectable) {
        const current = this.getRowTuples().filter(item => item[1]).map(item => item[0]);
        const rowIndex = current.indexOf(idx);
        const indexes = rowIndex !== -1
          ? [...current.slice(0, rowIndex), ...current.slice(rowIndex + 1)]
          : [...current, idx];
        this.props.onRowSelect(indexes);
      } else {
        this.props.onRowSelect([idx]);
      }
    }
  };

  renderHead = () => {
    const tuples = this.getRowTuples();
    const selected = tuples.filter(item => item[1]).length === tuples.length;
    return React.Children.map(
      filterReactChildren(this.props.children, isTableHead),
      (child:React.ReactElement<any>) => React.cloneElement(child, {
        selected,
        multiSelectable: this.props.multiSelectable,
        onSelect: this.handleHeadSelect,
        selectable: this.props.selectable,
      }),
    );
  };

  renderRows = () => React.Children.map(
    filterReactChildren(this.props.children, isTableRow),
    (child:React.ReactElement<any>, idx) => React.cloneElement(child, {
      idx,
      onSelect: this.handleRowSelect,
      selectable: this.props.selectable,
    }),
  );

  render() {
    const {
      className,
      multiSelectable, // eslint-disable-line
      onRowSelect,     // eslint-disable-line
      selectable,      // eslint-disable-line
      theme,
      ...rest
    } = this.props;
    return (
      <table {...rest} className={cn(theme.table, className)}>
        <thead className={theme.head}>{this.renderHead()}</thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
}

export default Table;

