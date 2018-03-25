import * as React from 'react';
// import PropTypes from 'prop-types';
import themr  from '../utils/themr';
import { LIST } from '../identifiers';
import theme from './theme.css';
export interface ListItemActionTheme {
  /**
   * Used for each action element (left/right).
   */
  itemAction?: string;
}

export interface ListItemActionProps {
  /**
   * List item action.
   */
  action?: React.ReactNode;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemActionTheme;
}

@themr(LIST, theme)
export class ListItemAction extends React.Component<ListItemActionProps> {
  // static propTypes = {
  //   action: PropTypes.node,
  //   theme: PropTypes.shape({
  //     itemAction: PropTypes.string,
  //   }),
  // };
  render() {
    const { action, theme } = this.props;
    const { onClick, onMouseDown } = (action as React.ReactElement<any>).props;
    const stopRipple = onClick && !onMouseDown;
    const stop = e => e.stopPropagation();
    return (
      <span className={theme.itemAction} onMouseDown={stopRipple ? stop : undefined} onClick={onClick && stop}>
        {action}
      </span>
    );
  }
}

export default ListItemAction;

