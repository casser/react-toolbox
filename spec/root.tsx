import 'normalize.css';
import '../components/checkbox/theme.css';
import '../components/list/theme.css';

import * as React from 'react';

import { Layout, NavDrawer, Panel } from '../components';

import { List } from '../components';
import { ListSubHeader } from '../components';
import { ListItem } from '../components';
import { AppBar } from '../components';
import { Button } from '../components';

import { AutocompleteTest } from './ts/autocomplete';
import { AppBarTest } from './ts/app_bar';
import { AvatarTest } from './ts/avatar';
import { FontIconTest } from './ts/font_icon';
import { ButtonTest } from './ts/button';
import { CardTest } from './ts/card';
import { ListTest } from './ts/list';
import { CheckboxTest } from './ts/checkbox';
import { ChipTest } from './ts/chip';
import { DialogTest } from './ts/dialog';
import { DrawerTest } from './ts/drawer';
import { DropdownTest } from './ts/dropdown';
import { IconMenuTest } from './ts/icon_menu';
import { InputTest } from './ts/input';
import { MenuTest } from './ts/menu';
import { PickersTest } from './ts/pickers';
import { ProgressBarTest } from './ts/progress';
import { RadioGroupTest } from './ts/radio';
import { SliderTest } from './ts/slider';
import { SnackbarTest } from './ts/snackbar';
import { SwitchTest } from './ts/switch';
import { TableTest } from './ts/table';
import { TabsTest } from './ts/tabs';
import { LinkTest } from './ts/link';
import { TooltipTest } from './ts/tooltip';
import style from './style.css';

export class Root extends React.Component {
  state = { pinned: false };

  handleSideBarToggle = () => {
    this.setState({ pinned: !this.state.pinned });
  };

  render() {
    return (
      <Layout>
        <AppBar
          title={`React Toolbox Spec`}
          onLeftIconClick={this.handleSideBarToggle}
          className={style.appbar}
          leftIcon="menu"
          fixed
          flat
        >
          <Button
            className={style.github}
            href="http://react-toolbox.io/#/"
            target="_blank"
            icon="web"
            floating
            accent
          />

        </AppBar>

        <NavDrawer
          active={this.state.pinned}
          onEscKeyDown={this.handleSideBarToggle}
          onOverlayClick={this.handleSideBarToggle}
        >
          <List selectable ripple>
            <ListSubHeader caption="Contacts"/>
            <ListItem caption="Autocomplete" leftIcon="inbox"/>
            <ListItem caption="AppBar" leftIcon="send"/>
            <ListItem caption="Avatars" leftIcon="delete"/>
            <ListItem caption="Buttons" leftIcon="report"/>
          </List>
        </NavDrawer>

        <Panel className={style.app}>
          <LinkTest/>
          <AutocompleteTest/>
          <AppBarTest/>
          <AvatarTest/>
          <FontIconTest/>
          <ButtonTest/>
          <CardTest/>
          <CheckboxTest/>
          <ChipTest/>
          <DialogTest/>
          <DrawerTest/>
          <DropdownTest/>
          <IconMenuTest/>
          <InputTest/>
          <ListTest/>
          <MenuTest/>
          <PickersTest/>
          <ProgressBarTest/>
          <RadioGroupTest/>
          <SliderTest/>
          <SnackbarTest/>
          <SwitchTest/>
          <TableTest/>
          <TabsTest/>
          <TooltipTest/>
        </Panel>
      </Layout>
    );
  }
}
