/**
 * Created by thomasrieder on 11.02.16.
 */

/* global libs */
require('expose?$!expose?jQuery!jquery');
require('expose?Clipboard!clipboard');

/* static resources */
require('./css/bootstrap.min.css');
require('./css/bootstrap-theme.min.css');
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


