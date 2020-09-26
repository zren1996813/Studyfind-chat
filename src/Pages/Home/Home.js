import React, {Component} from 'react';
import Header from '../../Components/Header';
import './Home.css';

export default class Homepage extends Component{
    render() {
        return (
            <div>
                <Header/>
                <div class="splash">
                    <h1>You are using a Web Chat</h1>
                    <p>This Web Chat is developed by StudyFind. LOL</p>
                </div>
            </div>
        )
    }
}