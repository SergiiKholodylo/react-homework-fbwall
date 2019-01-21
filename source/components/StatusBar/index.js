import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Styles from './styles.m.css';

import homer from 'theme/assets/homer';

export default class StatusBar extends Component {
    static defaultProps = {
        avatar:               homer,
        currentUserFirstName: 'James',
        currentUserLastName:  'Bond',
    };

    render() {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.statusBar } >
                <button>
                    <img src = { avatar } />
                    <span> { currentUserFirstName} </span>
                            &nbsp;
                    <span> { currentUserLastName } </span>
                </button>
            </section>
        );
    }
}

StatusBar.propTypes = {
    avatar:               PropTypes.string.isRequired,
    currentUserFirstName: PropTypes.string.isRequired,
    currentUserLastName:  PropTypes.string.isRequired,
};
