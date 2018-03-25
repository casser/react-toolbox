import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import { ListItemText } from './ListItemText';
import theme from './theme.css';

const types = ['auto', 'normal', 'large'];

@themr(LIST, theme)
export class ListItemContent extends Component {
  // static propTypes = {
  //   caption: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.node,
  //   ]),
  //   children: PropTypes.node,
  //   legend: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.node,
  //   ]),
  //   theme: PropTypes.shape({
  //     auto: PropTypes.string,
  //     itemContentRoot: PropTypes.string,
  //     large: PropTypes.string,
  //     normal: PropTypes.string,
  //   }),
  //   type: PropTypes.oneOf(types),
  // };

  getType() {
    const { type, children, caption, legend } = this.props;

    let count = React.Children.count(children);
    [caption, legend].forEach((s) => { count += s ? 1 : 0; });
    const typeIndex = Math.min(count, types.length);

    return type || types[typeIndex];
  }

  render() {
    const { children, caption, legend, theme } = this.props;
    const contentType = this.getType();
    const className = classnames(theme.itemContentRoot, {
      [theme[contentType]]: theme[contentType],
    });

    return (
      <span className={className}>
        {caption && <ListItemText theme={theme} primary>{caption}</ListItemText>}
        {legend && <ListItemText theme={theme}>{legend}</ListItemText>}
        {children}
      </span>
    );
  }
}
export default ListItemContent;
