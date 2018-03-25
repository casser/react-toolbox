import * as React from 'react';
// import PropTypes from 'prop-types';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import { ListItemAction } from './ListItemAction';
import theme from './theme.css';
import {ListItemActionTheme} from "components/list/ListItemAction";

export interface ListItemActionsTheme {
  /**
   * Added for the element that wraps left actions.
   */
  left?: string;
  /**
   * Added for the element that wraps right actions.
   */
  right?: string;
}

export interface ListItemActionsProps {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemActionsTheme & ListItemActionTheme;
  /**
   * List item action type.
   */
  type?: "left" | "right";
}

@themr(LIST, theme)
export class ListItemActions extends React.Component<ListItemActionsProps> {
  // static propTypes = {
  //   children: PropTypes.node,
  //   theme: PropTypes.shape({
  //     left: PropTypes.string,
  //     right: PropTypes.string,
  //   }),
  //   type: PropTypes.oneOf(['left', 'right']),
  // };
  render() {
    const { type, children, theme } = this.props;
    const validChildren = React.Children.toArray(children).filter(c => (
      React.isValidElement(c)
    ));
    return (
      <span className={theme[type]}>
        {validChildren.map((action, i) => (
        <ListItemAction key={i} theme={theme} action={action}/> // eslint-disable-line
      ))}
      </span>
    );
  }
}
export default ListItemActions;

