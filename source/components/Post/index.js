import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import Styles from './styles.m.css';

import homer from 'theme/assets/homer';

export default class Post extends Component {
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
            <section className = { Styles.post } >
                <img src = { avatar } />
                <a>{ `${currentUserFirstName} ${currentUserLastName}`}</a>
                <time>{ moment().format('MMMM D h:mm:ss a')}</time>
                <p>Howdy!</p>
            </section>
        );
    }
}

Post.propTypes = {
    avatar:               PropTypes.string.isRequired,
    currentUserFirstName: PropTypes.string.isRequired,
    currentUserLastName:  PropTypes.string.isRequired,
};
