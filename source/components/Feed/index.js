import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

import homer from 'theme/assets/homer';

import Styles from './styles.m.css';

export default class Feed extends Component {
    static defaultProps = {
        avatar:               homer,
        currentUserFirstName: 'James',
    };

    render() {
        const {
            avatar,
            currentUserFirstName,
        } = this.props;

        console.log(typeof avatar);

        return (
            <section className = { Styles.feed } >
                <StatusBar { ...this.props }/>
                <Composer
                    avatar = { avatar }
                    currentUserFirstName = { currentUserFirstName }
                />
                <Post { ...this.props }/>
            </section>
        );
    }
}

Feed.propTypes = {
    avatar:               PropTypes.string.isRequired,
    currentUserFirstName: PropTypes.string.isRequired,
};
