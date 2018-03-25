import * as React from "react";
// import PropTypes from 'prop-types';
import classnames from '../utils/classnames';
import themr  from '../utils/themr';
import { SNACKBAR } from '../identifiers';
import { ActivableRenderer } from '../hoc/ActivableRenderer';
import { Button } from '../button/Button';
import { Portal } from '../hoc/Portal';
import theme from './theme.css';
import ReactToolbox from "../types";
import Timer = NodeJS.Timer;

export interface SnackbarTheme {
  /**
   * Added to the root element in case it's accept type.
   */
  accept?: string;
  /**
   * Added to the root element when its active.
   */
  active?: string;
  /**
   * Used for the button inside the component.
   */
  button?: string;
  /**
   * Added to the root element in case it's cancel type.
   */
  cancel?: string;
  /**
   * Used for the label element.
   */
  label?: string;
  /**
   * Used as the className for the root element of the component.
   */
  snackbar?: string;
  /**
   * Added to the root element in case it's warning type.
   */
  warning?: string;

  portal?:string;

}

export interface SnackbarProps extends ReactToolbox.Props {
  /**
   * Label for the action component inside the Snackbar.
   */
  action?: string;
  /**
   * If true, the snackbar will be active.
   * @default true
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Text to display in the content.
   */
  label?: string | JSX.Element;
  /**
   * Callback function that will be called when the button action is clicked.
   */
  //onClick?: Function;
  /**
   * Callback function when finish the set timeout.
   */
  onTimeout?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: SnackbarTheme;
  /**
   * Amount of time in milliseconds after the Snackbar will be automatically hidden.
   */
  timeout?: number;
  /**
   * Indicates the action type. Can be accept, warning or cancel
   */
  type?: "accept" | "cancel" | "warning";
}


@ActivableRenderer()
@themr(SNACKBAR, theme)
export class Snackbar extends React.Component<SnackbarProps> {
  // static propTypes = {
  //   action: PropTypes.string,
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   label: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.element,
  //   ]),
  //   onClick: PropTypes.func,
  //   onTimeout: PropTypes.func, // eslint-disable-line
  //   theme: PropTypes.shape({
  //     accept: PropTypes.string,
  //     active: PropTypes.string,
  //     button: PropTypes.string,
  //     cancel: PropTypes.string,
  //     label: PropTypes.string,
  //     snackbar: PropTypes.string,
  //     warning: PropTypes.string,
  //   }),
  //   timeout: PropTypes.number,
  //   type: PropTypes.oneOf(['accept', 'cancel', 'warning']),
  // };

  private curTimeout:number;

  componentDidMount() {
    if (this.props.active && this.props.timeout) {
      this.scheduleTimeout(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active && nextProps.timeout) {
      this.scheduleTimeout(nextProps);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.curTimeout);
  }

  scheduleTimeout = (props) => {
    const { onTimeout, timeout } = props;
    if (this.curTimeout) clearTimeout(this.curTimeout);
    this.curTimeout = setTimeout(() => {
      if (onTimeout) onTimeout();
      this.curTimeout = null;
    }, timeout);
  };

  render() {
    const { action, active, children, label, onClick, theme, type } = this.props;
    const className = classnames([theme.snackbar, theme[type]], {
      [theme.active]: active,
    }, this.props.className);

    return (
      <Portal className={theme.portal}>
        <div data-react-toolbox="snackbar" className={className}>
          <span className={theme.label}>
            {label}
            {children}
          </span>
          {action ? <Button className={theme.button} label={action} onClick={onClick} /> : null}
        </div>
      </Portal>
    );
  }
}
export default Snackbar;

