import React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import theme from './theme.css';

@themr(LIST, theme)
export class ListSubHeader extends React.Component {
  // static propTypes = {
  //   caption: PropTypes.string,
  //   className: PropTypes.string,
  //   theme: PropTypes.object, // eslint-disable-line
  // };
  static defaultProps = {
    className: '',
  };

  render() {
    const { caption, className, theme } = this.props;
    return <h5 className={classnames(theme.subheader, className)}>{caption}</h5>;
  }
}


export default ListSubHeader;

