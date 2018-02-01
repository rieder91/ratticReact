/**
 * Created by thomasrieder on 15.09.15.
 */
import React from 'react'
import Clipboard from 'clipboard'
import $ from 'jquery'

export default class PasswordPopup extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showPassword: false
        };

        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.openUrlInTab = this.openUrlInTab.bind(this);
    }

    componentDidMount() {
        const that = this;
        const clipboard = new Clipboard('.btn');
        clipboard.on('success', function (e) {
            that.toggleCopyButtonState($(e.trigger));
        });
    }

    componentWillReceiveProps() {
        this.setState({
            showPassword: false
        });
    }

    toggleShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    toggleCopyButtonState($button) {
        const $icon = $button.find(".glyphicon");

        $button.removeClass("btn-primary");
        $button.addClass("btn-success");

        $icon.removeClass("glyphicon-copy");
        $icon.addClass("glyphicon-ok");

        setTimeout(function () {
            $button.removeClass("btn-success");
            $button.addClass("btn-primary");

            $icon.removeClass("glyphicon-ok");
            $icon.addClass("glyphicon-copy");
        }, 5000);
    }

    openUrlInTab() {
        window.open(this.props.url);
    }

    render() {
        let {password, url, description, title, username} = this.props;
        let {showPassword} = this.state;

        let descriptionDisplay = <div/>;
        let urlDisplay = <div/>;

        if (password) {
            if (url) {
                urlDisplay = <div className="form-group">
                    <label htmlFor="url" className="col-sm-2 control-label">URL</label>

                    <div className="col-sm-10">
                        <div className="input-group input-group-lg" id="search-input">
                            <span className="input-group-btn" id="url-actions">
                                <button id="copy-url-btn" className="btn btn-primary" type="button"
                                        data-clipboard-target="#url-display-input">
                                    <span className="glyphicon glyphicon-copy"/>
                                </button>
                            </span>
                            <input type="text" className="form-control input-lg" aria-describedby="url-actions"
                                   id="url-display-input" value={url} onClick={this.openUrlInTab} readOnly/>
                            <span className="input-group-btn" id="url-actions-right">
                                <button id="open-url-btn" className="btn btn-default" type="button"
                                        onClick={this.openUrlInTab}>
                                        <span className="glyphicon glyphicon-share"/>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>;
            }

            if (description) {
                descriptionDisplay = <div className="form-group">
                    <label htmlFor="description" className="col-sm-2 control-label">Description</label>

                    <div className="col-sm-10">
                        <pre className="form-control" aria-describedby="description"
                             id="description-box">{description}</pre>
                    </div>
                </div>;
            }

            return (
                <div className="popup">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">{title}</h3>
                        </div>
                        <div className="panel-body">
                            <form className="form-horizontal">

                                {urlDisplay}

                                <div className="form-group">
                                    <label htmlFor="username" className="col-sm-2 control-label">Username</label>

                                    <div className="col-sm-10">
                                        <div className="input-group input-group-lg" id="search-input">
                                            <span className="input-group-btn" id="copy-user">
                                                <button id="copy-user-btn" className="btn btn-primary" type="button"
                                                        data-clipboard-target="#username">
                                                    <span className="glyphicon glyphicon-copy"/>

                                                </button>
                                            </span>
                                            <input type="text" className="form-control input-lg"
                                                   aria-describedby="copy-user" id="username"
                                                   value={username} readOnly/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="col-sm-2 control-label">Password</label>

                                    <div className="col-sm-10">
                                        <div className="input-group input-group-lg" id="search-input">
                                            <span className="input-group-btn" id="copy-password">
                                                <button id="copy-password-btn" className="btn btn-primary" type="button"
                                                        data-clipboard-text={password}>
                                                    <span className="glyphicon glyphicon-copy"/>
                                                </button>
                                            </span>
                                            <input type={showPassword ? "type" : "password"}
                                                   className="form-control input-lg" id="password"
                                                   aria-describedby="copy-password"
                                                   value={password} readOnly/>
                                            <span className="input-group-btn">
                                                <button id="show-password-btn" className="btn btn-default" type="button"
                                                        onClick={this.toggleShowPassword}>
                                                    <span
                                                        className={`glyphicon ${showPassword ? "glyphicon-eye-close" : "glyphicon-eye-open"}`}/>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {descriptionDisplay}

                            </form>
                        </div>
                    </div>

                </div>
            );
        } else {
            return (
                <div/>
            );
        }
    }
}