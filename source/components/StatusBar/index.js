import React, { Component } from 'react';
import cx from 'classnames';
import { withProfile } from 'components/HOC/withProfile';
import { socket } from 'socket/init';

import Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount() {
        socket.on('connect', () => {
            console.log('connect ON 😇');
            this.setState({
                online: true,
            });
        });
        socket.on('disconnect', () => {
            console.log('connect OFF 🤮');
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount() {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <section className = { Styles.statusBar } >
                <div className = { statusStyle }>
                    <div>{ statusMessage }</div>
                    <span />
                </div>
                <button>
                    <img src = { avatar } />
                    <span>{currentUserFirstName}</span>
                            &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>
        );
    }
}

