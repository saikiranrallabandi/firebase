import React from 'react';
import { Button, ButtonToolbar} from 'react-bootstrap';

const Header = () => (
  <div>
    <div className="container">
      <h2> </h2>
      <ButtonToolbar>
        <Button bsStyle="info" href="/">Home</Button>
        <Button bsStyle="info" href="/listpage">List</Button>
        <Button bsStyle="info" href="/createpage">Add</Button>
      </ButtonToolbar>
    </div>
    <hr/>
  </div>
);

export default Header;
