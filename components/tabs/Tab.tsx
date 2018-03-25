import * as React from 'react';
// import PropTypes from 'prop-types';
import cn from '../utils/classnames';
import themr  from '../utils/themr';
import { TABS } from '../identifiers';
import { ripple } from '../ripple/Ripple';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';
import ReactToolbox from "../index";


export interface TabTheme {
  /**
   * Added to the navigation tab element in case it's active.
   */
  active?: string;
  /**
   * Added to the navigation tab element in case it's disabled.
   */
  disabled?: string;
  /**
   * Added to the navigation tab element in case it's hidden.
   */
  hidden?: string;
  /**
   * Added to the navigation tab element in case it's active.
   */
  label?: string;
  /**
   * Class added when icon is set.
   */
  withIcon?: string;
  /**
   * Class added when label is set.
   */
  withText?: string;

  /**
   * TODO : check why it was not defined in original
   */
  icon?: string;
}

export interface TabProps extends ReactToolbox.Props {
  /**
   * If true, the current component is visible.
   */
  active?: boolean;
  /**
   * Additional class name to provide custom styling for the active tab.
   */
  activeClassName?: string;
  /**
   * If true, the current component is not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the current component is not visible.
   * @default false
   */
  hidden?: boolean;
  /**
   * Icon to be used in inner FontIcon.
   */
  icon?: React.ReactNode;
  /**
   * Label text for navigation header.
   */
  label?: string;
  /**
   * Callback function that is fired when the tab is activated.
   */
  onActive?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TabTheme;
  /**
   * Additional properties passed to Tab root container.
   */
  [key: string]: any;
}


@themr(TABS, theme)
@ripple({ centered: false })
export class Tab extends React.Component<TabProps> {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   activeClassName: PropTypes.string,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   disabled: PropTypes.bool,
  //   hidden: PropTypes.bool,
  //   icon: PropTypes.node,
  //   index: PropTypes.number,
  //   label: PropTypes.node,
  //   onActive: PropTypes.func,
  //   onClick: PropTypes.func,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     disabled: PropTypes.string,
  //     hidden: PropTypes.string,
  //     label: PropTypes.string,
  //     rippleWrapper: PropTypes.string,
  //     withIcon: PropTypes.string,
  //     withText: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    hidden: false,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      console.info(event);
      event.index = this.props.index;
      //this.props.onClick(event, this.props.index);
      this.props.onClick(event);
    }
  };

  render() {
    const {
      index, onActive, // eslint-disable-line
      active, activeClassName, children, className, disabled, hidden, label, icon, theme, ...other
    } = this.props;
    const _className = cn(theme.label, {
      [theme.active]: active,
      [theme.hidden]: hidden,
      [theme.withText]: label,
      [theme.withIcon]: icon,
      [theme.disabled]: disabled,
      [activeClassName]: active,
    }, className);

    return (
      // tabIndex="0"
      <div {...other} data-react-toolbox="tab" role="tab" tabIndex={0} className={_className} onClick={this.handleClick}>
        {icon && <FontIcon className={theme.icon} value={icon} />}
        {label}
        {children}
      </div>
    );
  }
}
export default Tab;

