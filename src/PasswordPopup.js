/**
 * Created by thomasrieder on 15.09.15.
 */
import React from 'react'

export default React.createClass({

    componentDidMount: function () {
        var that = this;
        var clipboard = new Clipboard('.btn');
        clipboard.on('success', function(e) {
            that.toggleCopyButtonState($(e.trigger));
        });
    },

    toggleCopyButtonState: function ($button) {
        var $icon = $button.find(".glyphicon");

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
    },

    openUrlInTab: function (e) {
        window.open(this.props.url);
    },

    render: function () {
        if (this.props.password) {

            var urlDisplay;
            if (this.props.url) {
                urlDisplay = <div className="form-group">
                    <label htmlFor="url" className="col-sm-2 control-label">URL</label>

                    <div className="col-sm-10">
                        <div className="input-group input-group-lg" id="search-input">
                            <span className="input-group-btn" id="url-actions">
                                <button id="copy-url-btn" className="btn btn-primary" type="button" data-clipboard-target="#url-display-input">
                                    <span className="glyphicon glyphicon-copy"></span>
                                </button>
                            </span>
                            <input type="text" className="form-control input-lg" aria-describedby="url-actions" id="url-display-input" value={this.props.url} onClick={this.openUrlInTab} readOnly/>
                        </div>
                    </div>
                </div>;
            } else {
                urlDisplay = <div/>;
            }

            var descriptionDisplay;
            if (this.props.description) {
                descriptionDisplay = <div className="form-group">
                    <label htmlFor="description" className="col-sm-2 control-label">Description</label>

                    <div className="col-sm-10">
                        <pre className="form-control" aria-describedby="description" id="description-box">{this.props.description}</pre>
                    </div>
                </div>;
             }else {
                descriptionDisplay = <div/>;
            }

            return (
                <div className="popup">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">{this.props.title}</h3>
                        </div>
                        <div className="panel-body">
                            <form className="form-horizontal">

                                {urlDisplay}

                                <div className="form-group">
                                    <label htmlFor="username" className="col-sm-2 control-label">Username</label>

                                    <div className="col-sm-10">
                                        <div className="input-group input-group-lg" id="search-input">
                                            <span className="input-group-btn" id="copy-user">
                                                <button id="copy-user-btn" className="btn btn-primary" type="button" data-clipboard-target="#username">
                                                    <span className="glyphicon glyphicon-copy"></span>
                                                </button>
                                            </span>
                                            <input type="text" className="form-control input-lg" aria-describedby="copy-user" id="username" value={this.props.username} readOnly/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="col-sm-2 control-label">Password</label>

                                    <div className="col-sm-10">
                                        <div className="input-group input-group-lg" id="search-input">
                                            <span className="input-group-btn" id="copy-password">
                                                <button id="copy-password-btn" className="btn btn-primary" type="button" data-clipboard-target="#password">
                                                    <span className="glyphicon glyphicon-copy"></span>
                                                </button>
                                            </span>
                                            <input type="text" className="form-control input-lg" id="password" aria-describedby="copy-password"
                                        value={this.props.password} readOnly/>
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
});
