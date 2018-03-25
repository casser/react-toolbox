import React from 'react';
//import PropTypes from 'prop-types';
import themr from '../utils/themr';
import classnames from '../utils/classnames';
import Portal from '../hoc/Portal';
import { DRAWER } from '../identifiers';
import { ActivableRenderer } from '../hoc/ActivableRenderer';
import { Overlay } from '../overlay/Overlay';
import theme from './theme.css';

@ActivableRenderer()
@themr(DRAWER, theme)
export class Drawer extends React.Component {
  // static propTypes = {
  //   active: PropTypes.bool,
  //   children: PropTypes.node,
  //   className: PropTypes.string,
  //   insideTree: PropTypes.bool,
  //   onEscKeyDown: PropTypes.func,
  //   onOverlayClick: PropTypes.func,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     drawer: PropTypes.string,
  //     left: PropTypes.string,
  //     right: PropTypes.string,
  //   }),
  //   type: PropTypes.oneOf([
  //     'left', 'right',
  //   ]),
  //   withOverlay: PropTypes.bool,
  // };
  static defaultProps = {
    active: false,
    className: '',
    insideTree: false,
    type: 'left',
    withOverlay: true,
  };

  render() {
    const {
      active,
      children,
      className,
      insideTree,
      onOverlayClick,
      onEscKeyDown,
      theme,
      type,
      withOverlay,
    } = this.props;
    const _className = classnames([theme.drawer, theme[type]], {
      [theme.active]: active,
    }, className);

    const content = (
      <aside data-react-toolbox="drawer" className={_className}>
        {children}
      </aside>
    );

    return React.createElement(
      insideTree ? 'div' : Portal,
      { className: theme.wrapper },
      withOverlay && (
        <Overlay
          active={active}
          onClick={onOverlayClick}
          onEscKeyDown={onEscKeyDown}
          theme={theme}
          themeNamespace="overlay"
        />
      ),
      content,
    );
  }
}


export default Drawer;

