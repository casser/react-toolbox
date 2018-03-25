/* global VERSION */
import 'normalize.css';
import '../components/checkbox/theme.css';
import '../components/list/theme.css';

import React, {Component} from 'react';

import {Layout} from '../components/layout/Layout';
import {Panel} from '../components/layout/Panel';
import {NavDrawer} from '../components/layout/NavDrawer';

import {List} from '../components/list/List';
import {ListSubHeader} from '../components/list/ListSubHeader';
import {ListItem} from '../components/list/ListItem';
import {AppBar} from '../components/app_bar/AppBar';
import {Button} from '../components/button/Button';

import Autocomplete from './components/autocomplete';
import AppBarTest from './components/app_bar';
import Avatar from './components/avatar';
import FontIcon from './components/font_icon';
import Buttons from './components/button';
import Card from './components/card';
import Lists from './components/list';
import Checkbox from './components/checkbox';
import Chip from './components/chip';
import Dialog from './components/dialog';
import Drawer from './components/drawer';
import Dropdown from './components/dropdown';
import IconMenu from './components/icon_menu';
import InputTest from './components/input';

import Menu from './components/menu';
import Pickers from './components/pickers';
import Progress from './components/progress';
import Radio from './components/radio';
import Slider from './components/slider';
import Snackbar from './components/snackbar';
import Switch from './components/switch';
import Table from './components/table';
import Tabs from './components/tabs';
import LinkTest from './components/link';
import Tooltip from './components/tooltip';
import style from './style.css';

class Root extends Component {
  state = {pinned: false};

  handleSideBarToggle = () => {
    this.setState({pinned: !this.state.pinned});
  };

  render() {
    return (
      <Layout>
        <AppBar
          title={`React Toolbox Spec ${VERSION}`}
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
          <Autocomplete/>
          <AppBarTest/>
          <Avatar/>
          <FontIcon/>
          <Buttons/>
          <Card/>
          <Checkbox/>
          <Chip/>
          <Dialog/>
          <Drawer/>
          <Dropdown/>
          <IconMenu/>
          <InputTest/>
          <Lists/>
          <Menu/>
          <Pickers/>
          <Progress/>
          <Radio/>
          <Slider/>
          <Snackbar/>
          <Switch/>
          <Table/>
          <Tabs/>
          <Tooltip/>
        </Panel>
      </Layout>
    );
  }
}

export default Root;
