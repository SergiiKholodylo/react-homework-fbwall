import React, { Component } from 'react';
import { withProfile } from 'components/HOC/withProfile';
import { func, string, array, number } from 'prop-types';
import Like from 'components/Like';
import moment from 'moment';

import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        comment:     string.isRequired,
        created:     number.isRequired,
        _likePost:   func.isRequired,
        _removePost: func.isRequired,
        id:          string.isRequired,
        likes:       array.isRequired,
        firstName:   string.isRequired,
        lastName:    string.isRequired,
        avatar:      string.isRequired,

    };

    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    }

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` ? (
            <span
                className = { Styles.cross }
                onClick = { this._removePost }
            />) : null;
    };

    render() {
        const { comment,
            created,
            id,
            _likePost,
            likes,
            avatar,
            firstName,
            lastName,
        } = this.props;

        const cross = this._getCross();

        return (
            <section className = { Styles.post } >
                { cross }
                <img src = { avatar } />
                <a>{ `${firstName} ${lastName}`}</a>
                <time>{ moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}
