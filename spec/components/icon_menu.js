import React from 'react';
import {MenuItem} from '../../components/menu/MenuItem';
import {IconMenu} from '../../components/menu/IconMenu';
import {MenuDivider} from '../../components/menu/MenuDivider';

class IconMenuTest extends React.Component {
  state = {
    selected: undefined,
  };

  handleShow = () => {
    console.log('Showing menu...');
  };

  handleHide = () => {
    console.log('Hiding menu...');
  };

  handleSelect = (value) => {
    console.log('Option selected', value);
    this.setState({selected: value});
  };

  handleItem = () => {
    console.log('Refresh clicked');
  };

  render() {
    return (
      <section>
        <h5>Icon Menus</h5>
        <p>Although a menu can be used indepently with any component, we are providing a common use case with the icon
          menu.</p>
        <IconMenu
          icon="more_vert"
          position="auto"
          iconRipple
          menuRipple
          onShow={this.handleShow}
          onHide={this.handleHide}
          onSelect={this.handleSelect}
          selectable
          selected={this.state.selected}
        >
          <MenuItem onClick={this.handleItem} value="refresh" caption="Refresh"/>
          <MenuItem value="help" caption="Help & Feedback"/>
          <MenuItem value="settings" caption="Settings"/>
          <MenuDivider/>
          <MenuItem value="signout" caption="Sign out" disabled/>
        </IconMenu>
      </section>
    );
  }
}

export default IconMenuTest;
