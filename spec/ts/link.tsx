import * as React from 'react';
import {Link} from '../../components';

export const LinkTest:React.SFC<any> = () => (
  <section>
    <h5>Links</h5>
    <p>lorem ipsum...</p>
    <Link label="Github" route="http://www.github.com" icon="bookmark" />
    <Link label="Inbox" route="http://mail.google.com" icon="inbox" />
  </section>
);
