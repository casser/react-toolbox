import * as React from 'react';
// import PropTypes from 'prop-types';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import theme from './theme.css';
import ReactToolbox from "components/index";

export interface ListDividerTheme {
  /**
   * Added to the root element.
   */
  divider?: string;
  /**
   * Added to root element if inset is true.
   */
  inset?: string;
}

export interface ListDividerProps extends ReactToolbox.Props {
  /**
   * If true, will leave a space at the left side.
   */
  inset?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListDividerTheme;
}

@themr(LIST, theme)
export class ListDivider extends React.Component<ListDividerProps> {
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

