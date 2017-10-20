import React from 'react';
import { Link } from 'react-router-dom';

const AppHeader = () =>
  <div>
    <Link to='/'>
      <h1>CalReact</h1>
    </Link>
  </div>

export default AppHeader;