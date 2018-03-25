import React from 'react';
//import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr from '../utils/themr';
import { Drawer } from '../drawer/Drawer';
import { LAYOUT } from '../identifiers';
import theme from './theme.css';

@themr(LAYOUT, theme)
export class NavDrawer extends React.Component {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   clipped: PropTypes.bool,
  //   permanentAt: PropTypes.oneOf(['sm', 'smTablet', 'md', 'lg', 'lgTablet', 'xl', 'xxl', 'xxxl']),
  //   pinned: PropTypes.bool,
  //   right: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     clipped: PropTypes.string,
  //     pinned: PropTypes.string,
  //   }),
  // };
  static defaultProps = {
    className: '',
    pinned: false,
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
        themeNamespace="navDrawer"
        withOverlay={!pinned}
      />
    );
  }
}


export default NavDrawer;

