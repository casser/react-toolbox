import React from 'react';
// import PropTypes from 'prop-types';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import theme from './theme.css';

@themr(LIST, theme)
export class ListDivider extends React.Component {
  // static propTypes = {
  //   inset: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     divider: PropTypes.string,
  //     inset: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    inset: false,
  };

  render() {
    const { inset, theme } = this.props;
    return <hr className={inset ? `${theme.divider} ${theme.inset}` : theme.divider} />;
  }
}
export default ListDivider;

