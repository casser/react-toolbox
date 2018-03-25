import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { LIST } from '../identifiers';
import { ListItem } from './ListItem';
import theme from './theme.css';

const mergeProp = (propName, child, parent) => (
  child[propName] !== undefined
  ? child[propName]
  : parent[propName]
);

@themr(LIST, theme)
export class List extends Component {
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
      } else if (item.type === ListItem) {
        const selectable = mergeProp('selectable', item.props, this.props);
        const ripple = mergeProp('ripple', item.props, this.props);
        return React.cloneElement(item, { selectable, ripple });
      }
      return React.cloneElement(item);
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

