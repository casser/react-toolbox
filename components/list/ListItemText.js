import React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import theme from './theme.css';

@themr(LIST, theme)
export class ListItemText extends React.Component {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   primary: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     itemText: PropTypes.string,
  //     primary: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    primary: false,
  };

  render() {
    const { className, primary, children, theme, ...other } = this.props;
    const _className = classnames(theme.itemText, { [theme.primary]: primary }, className);
    return (
      <span data-react-toolbox="list-item-text" className={_className} {...other}>
        {children}
      </span>
    );
  }
}

export default ListItemText;
