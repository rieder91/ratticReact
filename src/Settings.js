/**
 * Created by trieder on 15.09.2015.
 */
import React from 'react'
import {ratticURL} from './Globals'

export default class Settings extends React.Component {

    constructor(props, context) {
        super(props, context);

        // load from local storage
        this.state = {
            username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
            apikey: localStorage.getItem("apikey") ? localStorage.getItem("apikey") : "",
            visible: false
        };

        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
        this.saveUsername = this.saveUsername.bind(this);
        this.saveAPIKey = this.saveAPIKey.bind(this);
    }

    showSettings() {
        this.setState({
            visible: true
        });
    }

    hideSettings() {
        this.setState({
            visible: false
        });
    }

    saveUsername(event) {
        // save to local storage
        this.setState({
            username: event.target.value
        });
        localStorage.setItem("username", event.target.value);
    }

    saveAPIKey(event) {
        // save to local storage
        this.setState({
            apikey: event.target.value
        });
        localStorage.setItem("apikey", event.target.value);
    }

    reloadPage() {
        location.reload();
    }

    render() {
        let {visible, apikey, username} = this.state;

        const inputStyle = {"marginRight": "15px"};

        if (visible) {
            return (
                <form className="navbar-form navbar-right">
                    <button id="toggle-settings-btn" className="btn btn-link" type="button" onClick={this.hideSettings}>
                        <span className="glyphicon glyphicon-cog"/>
                    </button>
                    <button className="btn btn-link" onClick={this.reloadPage}>
                        <span className="glyphicon glyphicon-refresh"/>
                    </button>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" value={username}
                               onChange={this.saveUsername} style={inputStyle}/>
                        <input type="text" className="form-control" placeholder="API Key" size="10"
                               value={apikey} onChange={this.saveAPIKey}/>
                    </div>
                </form>
            );
        } else {
            return (
                <form className="navbar-form navbar-right">
                    <a className="btn btn-link" href={ratticURL + "/cred/add/"} target="_blank">
                        <span className="glyphicon glyphicon-plus"/>
                    </a>
                    <button className="btn btn-link" onClick={this.reloadPage}>
                        <span className="glyphicon glyphicon-refresh"/>
                    </button>
                    <button id="toggle-settings-btn" className="btn btn-link" type="button" onClick={this.showSettings}>
                        <span className="glyphicon glyphicon-cog"/>
                    </button>
                </form>
            );
        }
    }
}
