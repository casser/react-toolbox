import * as React from 'react';
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import theme from './theme.css';
import ReactToolbox from "components/index";


export interface ListSubHeaderTheme {
  /**
   * Used as a wrapper class for the subheader element.
   */
  subheader?: string;
}

export interface ListSubHeaderProps extends ReactToolbox.Props {
  /**
   * Text that will be displayed.
   */
  caption?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListSubHeaderTheme;
  subheader?: string;
}

@themr(LIST, theme)
export class ListSubHeader extends React.Component<ListSubHeaderProps> {
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
    return <h5 className={cn(theme.subheader, className)}>{caption}</h5>;
  }
}


export default ListSubHeader;

