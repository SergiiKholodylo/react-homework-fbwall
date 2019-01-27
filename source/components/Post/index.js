import React, { Component } from 'react';
import { Consumer } from 'components/HOC/withProfile';
import PropTypes from 'prop-types';

import moment from 'moment';

import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
    };

    render() {
        const { comment, created } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post } >
                        <img src = { context.avatar } />
                        <a>{ `${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                        <time>{ moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{ comment }</p>
                    </section>
                )}
            </Consumer>

        );
    }
}
