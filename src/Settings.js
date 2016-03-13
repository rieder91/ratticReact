/**
 * Created by trieder on 15.09.2015.
 */
import React from 'react'
import ratticURL from './Globals'

export default React.createClass({

    getInitialState: function () {
        // load from local storage
        return {
            username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
            apikey: localStorage.getItem("apikey") ? localStorage.getItem("apikey") : "",
            visible: false
        };
    },

    showSettings: function () {
        this.setState({
            visible: true
        });
    },

    hideSettings: function () {
        this.setState({
            visible: false
        });
    },

    saveUsername: function (event) {
        // save to local storage
        this.setState({
            username: event.target.value
        });
        localStorage.setItem("username", event.target.value);

    },

    saveAPIKey: function (event) {
        // save to local storage
        this.setState({
            apikey: event.target.value
        });
        localStorage.setItem("apikey", event.target.value);
    },

    reloadPage: function () {
        location.reload();
    },

    render: function () {

        var inputStyle = {"marginRight": "15px"};

        if (this.state.visible) {
            return (
                <form className="navbar-form navbar-right">
                    <button id="toggle-settings-btn" className="btn btn-link" type="button" onClick={this.hideSettings}>
                        <span className="glyphicon glyphicon-cog"></span>
                    </button>
                    <button className="btn btn-link" onClick={this.reloadPage}>
                        <span className="glyphicon glyphicon-refresh"></span>
                    </button>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={this.saveUsername} style={inputStyle}/>
                        <input type="text" className="form-control" placeholder="API Key" size="10" value={this.state.apikey} onChange={this.saveAPIKey}/>
                    </div>
                </form>
                );
        } else {
            return (
                <form className="navbar-form navbar-right">
                    <a className="btn btn-link" href={ ratticURL + "/cred/add/" } target="_blank">
                        <span className="glyphicon glyphicon-plus"></span>
                    </a>
                    <button className="btn btn-link" onClick={this.reloadPage}>
                        <span className="glyphicon glyphicon-refresh"></span>
                    </button>
                    <button id="toggle-settings-btn" className="btn btn-link" type="button" onClick={this.showSettings}>
                        <span className="glyphicon glyphicon-cog"></span>
                    </button>
                </form>
                );
        }
    }
});

