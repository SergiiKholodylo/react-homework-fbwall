import React, { Component } from 'react';
import { Consumer } from 'components/HOC/withProfile';
import { func, string, array, number } from 'prop-types';
import Like from 'components/Like';
import moment from 'moment';

import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        comment:   string.isRequired,
        created:   number.isRequired,
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     array.isRequired,
    };

    render() {
        const { comment, created, id, _likePost, likes } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post } >
                        <span className = { Styles.cross }></span>
                        <img src = { context.avatar } />
                        <a>{ `${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                        <time>{ moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{comment}</p>
                        <Like
                            _likePost = { _likePost }
                            id = { id }
                            likes = { likes }
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>

        );
    }
}
