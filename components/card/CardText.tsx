import * as React from "react";
import ReactToolbox from "../types";
import themr from '../utils/themr';
import classnames from '../utils/classnames';
import { CARD } from '../identifiers';
import theme from './theme.css';

export interface CardTextTheme {
  /**
   * Used for the main root element.
   */
  cardText?: string;
}

export interface CardTextProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTextTheme;
  /**
   * Additional properties passed to component root.
   */
  [ key: string ]: any;
}
@themr(CARD, theme)
export class CardText extends React.Component<CardTextProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   theme: PropTypes.shape({
  //     cardText: PropTypes.string,
  //   }),
  // };
  render() {
    const { children, className, theme, ...other } = this.props;
    return (<div className={classnames(theme.cardText, className)} {...other}>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>);
  }
}

export default CardText;

