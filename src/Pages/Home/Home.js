import React, {Component} from 'react';
import Header from '../../Components/Header';
import './Home.css';

export default class Homepage extends Component{
    render() {
        return (
            <div>
                <Header/>
                <div class="splash">
                    <h1>Web Chat</h1>
                </div>
            </div>
        )
    }
}