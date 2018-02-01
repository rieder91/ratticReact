/**
 * Created by thomasrieder on 11.02.16.
 */

/* static resources */
require('./css/bootstrap.css');
require('./css/bootstrap-theme.css');
require('./css/style.css');

import React from 'react'
import { render } from 'react-dom'

import SearchBox from './src/SearchBox'
import Settings from './src/Settings'

render(
    <SearchBox />,
    document.getElementById('content')
);

render(
    <Settings />,
    document.getElementById('settings')
);


