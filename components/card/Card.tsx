import * as React from "react";
import ReactToolbox from "../types";
import themr from '../utils/themr';
import classnames from '../utils/classnames';
import { CARD } from '../identifiers';
import theme from './theme.css';

export interface CardTheme {
  /**
   * Class used for the root element.
   */
  card?: string;
  /**
   *Added to the root element in case the card is raised.
   */
  raised?: string;
}
export interface CardProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Increases the shadow depth to appear elevated.
   * @default false
   */
  raised?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: CardTheme;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any;
}

@themr(CARD, theme)
export class Card extends React.Component<CardProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   raised: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     card: PropTypes.string,
  //     raised: PropTypes.string,
  //   }),
  // };
  render() {
    const { children, className, raised, theme, ...other } = this.props;
    const classes = classnames(theme.card, {
      [theme.raised]: raised,
    }, className);

    return (
      <div data-react-toolbox="card" className={classes} {...other}>
        {children}
      </div>
    );
  }
}


export default Card;

