/**
 * Created by thomasrieder on 14.09.15.
 */
import React from 'react'
import PasswordPopup from './PasswordPopup'
import CredentialList from './CredentialList'


export default React.createClass({

    getInitialState: function() {
        return {
            query: '',
            credCount: 0
        };
    },

    handleChange: function(event) {
        this.setState({
            query: event.target.value
        });
    },

    updateCredCount: function (count) {
        if (count) {
            this.setState({
                credCount: count
            });
        }
    },

    showPassword: function(id, user, pw, title, url, description) {
        this.setState({
            password: pw,
            username: user,
            title: title,
            url: url,
            description: description
        });
        // set display style of dim to block
        $('#dimmer').css('display','block');
        $(document.body).on('keydown', this.handleKeyDown);
    },

    clearProps: function() {
        this.setState({
            password: "",
            username: "",
            url: "",
            title: "",
            description: ""
        });
        $('#dimmer').css('display','none');
        $(document.body).off('keydown', this.handleKeyDown);
    },

    handleKeyDown: function (event) {
        if (event.keyCode == 27 /*esc*/) {
            this.clearProps();
        }
    },


    render: function () {

        var query = this.state.query;
        var credCount = this.state.credCount;

        return (
            <div className="searchBox">
                <PasswordPopup username={this.state.username} password={this.state.password} title={this.state.title} url={this.state.url} description={this.state.description} />
                <div id="dimmer" onClick={this.clearProps}></div>
                <div className="input-group" id="search-input">
                    <input type="text" className="form-control input-lg" id="searchBox" aria-describedby="cred-count" placeholder="Type to search" value={query} onChange={this.handleChange} />
                    <span className="input-group-addon" id="cred-count">{credCount} credentials loaded</span>
                </div>
                <CredentialList query={query} showPassword={this.showPassword} updateCredCount={this.updateCredCount} />
            </div>
        );
    }
});


