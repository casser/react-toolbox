import * as React from 'react';
import {AppBar} from '../../components';



export const AppBarTest: React.SFC<any> = () => (
  <section>
    <h5>AppBar</h5>
    <br />
    <AppBar title='Title' />
    <br />
    <AppBar leftIcon='menu' title='Title' />
    <br />
    <AppBar leftIcon='arrow_back' title='Title' rightIcon='close' />
    <br />
    <AppBar>
      Custom content
    </AppBar>
    <br/>
    <AppBar title='NamedAppBar' />
  </section>
);

