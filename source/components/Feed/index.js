import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';
import Postman from 'components/Postman';

import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';
import Styles from './styles.m.css';

import { delay } from 'instruments';
import moment from 'moment';


@withProfile
export default class Feed extends Component {
    state = {
        posts:          [],
        isPostFetching: false,
    }

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._fetchPosts();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);
            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });

        socket.on('delete', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);
            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if (
                `${currentUserFirstName} ${currentUserLastName}`
                !== `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === likedPost.id ? likedPost : post),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('delete');
        socket.removeListener('like');
    }

    _setPostFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    }

    _fetchPosts = async () => {
        this._setPostFetchingState(true);

        console.log('API', typeof api);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isPostFetching: false,
        });
    }

    _createPost = async (comment) => {
        this._setPostFetchingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({comment}),
        });

        const { data: post } = await response.json();

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:          [ post, ...posts ],
            isPostFetching: false,
        }));
    }

    _likePost = async (id) => {
        this._setPostFetchingState(true);
        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data: likedPost } = await response.json();
        await delay(1200);

        this.setState(({ posts }) => ({
            posts:          posts.map((post) => post.id === likedPost.id ? likedPost : post),
            isPostFetching: false,
        }));
    };

    _removePost = async (id) => {
        this._setPostFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => ({
            posts:          posts.filter((post) => post.id !== id),
            isPostFetching: false,
        }));
    }

    _animateComposerEnter = (composer) => {
        fromTo(composer,
            1,
            { opacity: 0, rotationX: 50 },
            { opacity: 1, rotationX: 0 });
    }

    _animatePostman = (postman) => {
        console.log('_animatePostman', postman, this._getCurrentTime());
        fromTo(postman,
            4,
            { x: 400 },
            {
                x: 0,
                // onComplete: async () => {
                //     await delay(4000);
                //     this._hidePostman(postman);
                // }
            });
    }

    _hidePostman = (postman) => {
        fromTo(postman,
            4,
            { x: 0 },
            { x: 400 });
    };

    _getCurrentTime = () => moment().format('HH:mm:ss');

    _onEntering = (postman) => {
        console.log('_onEntering', postman,  this._getCurrentTime());
    }

    _onEntered = (postman) => {
        console.log('_onEntered', postman,  this._getCurrentTime());
        this._hidePostman(postman);
    };


    render () {
        const { posts, isPostFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>

            );
        });

        return (
            <section className = { Styles.feed } >
                <Spinner isSpinning = { isPostFetching } />
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._animateComposerEnter }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                { postsJSX }
                <Transition
                    appear
                    in
                    timeout = { 10000 }
                    onEnter = { this._animatePostman }
                    onEntered = { this._onEntered }
                    onEntering = { this._onEntering }>
                    <Postman />
                </Transition>
            </section>
        );
    }
}
