import * as React from "react";

// import PropTypes from 'prop-types';
import themr  from '../utils/themr';
import { MENU } from '../identifiers';
import theme from './theme.css';
import ReactToolbox from "components/index";
export interface MenuDividerTheme {
  /**
   *
   */
  menuDivider?: string;
}

export interface MenuDividerProps extends ReactToolbox.Props {
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuDividerTheme;
}


@themr(MENU, theme)
export class MenuDivider extends React.Component<MenuDividerProps> {
  // static propTypes = {
  //   theme: PropTypes.shape({
  //     menuDivider: PropTypes.string,
  //   }),
  // };

  render() {
    const { theme } = this.props;
    return <hr data-react-toolbox="menu-divider" className={theme.menuDivider} />;
  }
}

export default MenuDivider;

