import React from 'react';
import {
  Menu, Container
} from 'semantic-ui-react';


const FixedMenu = () => (
  <div>
    <Menu fixed="top">
      <Container>
        <Menu.Item header>
          Keyword Manager
        </Menu.Item>
      </Container>
    </Menu>
  </div>
)

export default FixedMenu;