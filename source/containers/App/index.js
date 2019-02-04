// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Feed from 'components/Feed';
import Catcher from 'components/Catcher';
import { Provider } from 'components/HOC/withProfile';


import avatar from 'theme/assets/homer';

const options = {
    avatar,
    currentUserFirstName: 'Сергей',
    currentUserLastName:  'Холодило',
};

@hot(module)

export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed  />
                </Provider>
            </Catcher>
        );
    }
}
