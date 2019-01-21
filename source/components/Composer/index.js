import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.m.css';

import homer from 'theme/assets/homer';

export default class Composer extends Component {
    static defaultProps = {
        avatar:               homer,
        currentUserFirstName: 'James',
    };

    render() {
        const {
            avatar,
            currentUserFirstName,
        } = this.props;

        return (

            <section className = { Styles.composer } >
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What's on your mind, ${ currentUserFirstName }` }/>
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}

Composer.propTypes = {
    avatar:               PropTypes.string.isRequired,
    currentUserFirstName: PropTypes.string.isRequired,
};
