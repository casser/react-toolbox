import * as React from "react";
import ReactToolbox from "../index";
import themr from '../utils/themr';
import classnames from '../utils/classnames';
import { CARD } from '../identifiers';
import theme from './theme.css';

export interface CardActionsTheme {
  /**
   * Used for a wrapper around actions as the root element.
   */
  cardActions?: string;
}
export interface CardActionsProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardActionsTheme;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any;
}

@themr(CARD, theme)
export class CardActions extends React.Component<CardActionsProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   theme: PropTypes.shape({
  //     cardActions: PropTypes.string,
  //   }),
  // };
  render() {
    const { children, className, theme, ...other } = this.props;
    return (<div className={classnames(theme.cardActions, className)} {...other}>
      {children}
    </div>);
  }
}

export default CardActions;

