/**
 * Created by thomasrieder on 14.09.15.
 */
import React from 'react'
import PasswordPopup from './PasswordPopup'
import CredentialList from './CredentialList'
import $ from 'jquery'
import Combokeys from "combokeys"


export default class SearchBox extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            query: '',
            credCount: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateCredCount = this.updateCredCount.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.clearProps = this.clearProps.bind(this);
    }

    componentDidMount() {
        const combokeys = new Combokeys(document.documentElement);
        combokeys.bind('ctrl+f', function (e) {
            $("#searchBox").focus();
            return false;
        });
    }

    handleChange(event) {
        this.setState({
            query: event.target.value
        });
    }

    updateCredCount(count) {
        if (count) {
            this.setState({
                credCount: count
            });
        }
    }

    showPassword(id, user, pw, title, url, description) {
        this.setState({
            password: pw,
            username: user,
            title: title,
            url: url,
            description: description
        });
        // set display style of dim to block
        $('#dimmer').css('display', 'block');
        $(document.body).on('keydown', this.handleKeyDown);
    }

    clearProps() {
        this.setState({
            password: "",
            username: "",
            url: "",
            title: "",
            description: ""
        });
        $('#dimmer').css('display', 'none');
        $(document.body).off('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.keyCode === 27 /*esc*/) {
            this.clearProps();
        }
    }

    render() {
        let {query, credCount, username, password, title, url, description} = this.state;

        return (
            <div className="searchBox">
                <PasswordPopup username={username} password={password} title={title}
                               url={url} description={description}/>
                <div id="dimmer" onClick={this.clearProps}/>
                <div className="input-group" id="search-input">
                    <input type="text" className="form-control input-lg" id="searchBox" aria-describedby="cred-count"
                           placeholder="Type to search" value={query} onChange={this.handleChange}/>
                    <span className="input-group-addon" id="cred-count">{credCount} credentials loaded</span>
                </div>
                <CredentialList query={query} showPassword={this.showPassword} updateCredCount={this.updateCredCount}/>
            </div>
        );
    }
}


