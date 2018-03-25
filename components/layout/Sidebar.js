import React from 'react';
//import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { Drawer } from '../drawer/Drawer';
import { LAYOUT } from '../identifiers';
import theme from './theme.css';

@themr(LAYOUT, theme)
export class Sidebar extends React.Component {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   clipped: PropTypes.bool,
  //   permanentAt: PropTypes.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
  //   pinned: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     clipped: PropTypes.string,
  //     pinned: PropTypes.string,
  //   }),
  //   width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 33, 50, 66, 75, 100]),
  // };
  static defaultProps = {
    className: '',
    pinned: false,
    right: false,
  };

  render() {
    const {
      active,
      className,
      clipped,
      permanentAt, // eslint-disable-line
      pinned,
      theme,
      ...rest
    } = this.props;
    const _className = classnames({
      [theme.pinned]: pinned,
      [theme.clipped]: clipped,
    }, className);

    return (
      <Drawer
        {...rest}
        active={active || pinned}
        className={_className}
        insideTree
        theme={theme}
        themeNamespace="sidebar"
        type="right"
        withOverlay={!pinned}
      />
    );
  }
}


export default Sidebar;
