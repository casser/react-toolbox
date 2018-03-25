import * as React from "react";
import ReactToolbox from "../types";
import { ButtonProps } from "../button/Button";
import themr from '../utils/themr';
import classnames from '../utils/classnames';
import { DIALOG } from '../identifiers';
import { Portal } from '../hoc/Portal';
import { ActivableRenderer } from '../hoc/ActivableRenderer';
import { Button } from '../button/Button';
import { Overlay } from '../overlay/Overlay';
import theme from './theme.css';

export interface DialogTheme {
  /**
   * Used for the root when the dialog is active.
   */
  active?: string;
  /**
   * Used to wrap the dialog body.
   */
  body?: string;
  /**
   * Used in buttons when the dialog implements actions.
   */
  button?: string;
  /**
   * Used for the root element.
   */
  dialog?: string;
  /**
   * Used for the navigation element when it implements actions.
   */
  navigation?: string;
  /**
   * Used for the title element of the dialog.
   */
  title?: string;
  overlay?: string;
  wrapper?: string;
}
export interface DialogActionProps extends ButtonProps {
  /**
   * The text string to use for the name of the button.
   */
  label?: string;

}
export interface DialogProps extends ReactToolbox.Props {
  /**
   * A array of objects representing the buttons for the dialog navigation area. The properties will be transferred to the buttons.
   */
  actions?: DialogActionProps[];
  /**
   * If true, the dialog will be active.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Callback called when the ESC key is pressed with the overlay active.
   */
  onEscKeyDown?:React.MouseEventHandler<HTMLElement>;
  /**
   * Callback to be invoked when the dialog overlay is clicked.
   */
  onOverlayClick?:React.MouseEventHandler<HTMLElement>;
  /**
   * Callback called when the mouse button is pressed on the overlay.
   */
  onOverlayMouseDown?:React.MouseEventHandler<HTMLElement>;
  /**
   * Callback called when the mouse is moving over the overlay.
   */
  onOverlayMouseMove?:React.MouseEventHandler<HTMLElement>;
  /**
   * Callback called when the mouse button is released over the overlay.
   */
  onOverlayMouseUp?:React.MouseEventHandler<HTMLElement>;
  /**
   * Classnames object defining the component style.
   */
  theme?: DialogTheme;
  /**
   * The text string to use as standar title of the dialog.
   */
  title?: string;
  /**
   * Used to determine the size of the dialog. It can be small, normal or large.
   * @default "normal"
   */
  type?: "small" | "normal" | "large" | string;
}

@ActivableRenderer()
@themr(DIALOG, theme)
export class Dialog extends React.Component<DialogProps> {
  // static propTypes = {
  //   actions: PropTypes.arrayOf(PropTypes.shape({
  //     className: PropTypes.string,
  //     label: PropTypes.string,
  //     children: PropTypes.node,
  //   })),
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   onEscKeyDown: PropTypes.func,
  //   onOverlayClick: PropTypes.func,
  //   onOverlayMouseDown: PropTypes.func,
  //   onOverlayMouseMove: PropTypes.func,
  //   onOverlayMouseUp: PropTypes.func,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     body: PropTypes.string,
  //     button: PropTypes.string,
  //     dialog: PropTypes.string,
  //     navigation: PropTypes.string,
  //     overflow: PropTypes.string,
  //     overlay: PropTypes.string,
  //     title: PropTypes.string,
  //     wrapper: PropTypes.string,
  //   }),
  //   title: PropTypes.string,
  //   type: PropTypes.string,
  // };
  static defaultProps = {
    actions: [],
    active: false,
    type: 'normal',
  };

  render() {
    const props = this.props;
    const actions = props.actions.map((action, idx) => {
      const className = classnames(props.theme.button, { [action.className]: action.className });
      return <Button key={idx} {...action} className={className}/>; // eslint-disable-line
    });

    const className = classnames([props.theme.dialog, props.theme[props.type]], {
      [props.theme.active]: props.active,
    }, props.className);

    return (
      <Portal className={props.theme.wrapper}>
        <Overlay
          active={props.active}
          className={props.theme.overlay}
          onClick={props.onOverlayClick}
          onEscKeyDown={props.onEscKeyDown}
          onMouseDown={props.onOverlayMouseDown}
          onMouseMove={props.onOverlayMouseMove}
          onMouseUp={props.onOverlayMouseUp}
          theme={props.theme}
          themeNamespace="overlay"
        />
        <div data-react-toolbox="dialog" className={className}>
          <section role="body" className={props.theme.body}>
            {props.title ? <h6 className={props.theme.title}>{props.title}</h6> : null}
            {props.children}
          </section>
          {actions.length
            ? <nav className={props.theme.navigation}>
              {actions}
            </nav>
            : null
          }
        </div>
      </Portal>
    );
  }
}

export default Dialog;

