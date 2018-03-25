import * as React from 'react';
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import theme from './theme.css';
import ReactToolbox from "../types";

export interface ListItemTextTheme {
  /**
   * Added to the text inside of the list item.
   */
  itemText?: string;
  /**
   * Added to the text inside of the list item if its primary.
   */
  primary?: string;
}

export interface ListItemTextProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Whether list item text should have 'primary' look.
   * @default
   */
  primary?: boolean;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemTextTheme;
  /**
   * Additional properties passed to root container.
   */
  [key: string]: any;
}

@themr(LIST, theme)
export class ListItemText extends React.Component<ListItemTextProps> {
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
