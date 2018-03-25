import * as React from "react";
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { LIST } from '../identifiers';
import { ListItem } from './ListItem';
import theme from './theme.css';
import ReactToolbox from "../types";

const mergeProp = (propName, child, parent) => (
  child[propName] !== undefined
  ? child[propName]
  : parent[propName]
);

export interface ListTheme {
  /**
   * Used for the root element of the list.
   */
  list?: string;
}

export interface ListProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, each element in the list will have a ripple effect on click
   * @default false
   */
  ripple?: boolean;
  /**
   * If true, the elements in the list will display a hover effect and a pointer cursor.
   * @default false
   */
  selectable?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListTheme;
}


@themr(LIST, theme)
export class List extends React.Component<ListProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   theme: PropTypes.shape({
  //     list: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    className: '',
    ripple: false,
    selectable: false,
  };

  renderItems() {
    return React.Children.map(this.props.children, (item) => {
      if (item === null || item === undefined) {
        return item;
      } else if (typeof item=='object' && item.type === ListItem) {
        const selectable = mergeProp('selectable', item.props, this.props);
        const ripple = mergeProp('ripple', item.props, this.props);
        return React.cloneElement(item, { selectable, ripple });
      }
      return React.cloneElement(item as React.ReactElement<any>);
    });
  }

  render() {
    return (
      <ul data-react-toolbox="list" className={classnames(this.props.theme.list, this.props.className)}>
        {this.renderItems()}
      </ul>
    );
  }
}

export default List;

