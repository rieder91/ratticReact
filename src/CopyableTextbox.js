import React from 'react'
import Clipboard from "clipboard";
import $ from "jquery";

export default class CredentialList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hidden: true
        };

        this.openUrlInTab = this.openUrlInTab.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }


    componentDidMount() {
        const that = this;
        const clipboard = new Clipboard('.btn');
        clipboard.on('success', function (e) {
            that.toggleCopyButtonState($(e.trigger));
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hidden: true
        });
    }

    openUrlInTab() {
        window.open(this.props.value);
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

    toggleVisibility() {
        this.setState({
            hidden: !this.state.hidden
        });
    }


    render() {
        let {label, value, secret, isLink, showIfEmpty} = this.props;
        let {hidden} = this.state;

        let prefix = label.toLowerCase().replace(" ", "-");

        if (value) {
            return (
                <div className="form-group">
                    <label htmlFor={label} className="col-sm-2 control-label">{label}</label>

                    <div className="col-sm-10">
                        <div className="input-group input-group-lg">

                            <span className="input-group-btn" id={`${prefix}-actions`}>
                                <button id={`copy-${prefix}-btn`} className="btn btn-primary" type="button" data-clipboard-text={value}>
                                    <span className="glyphicon glyphicon-copy"/>
                                </button>
                            </span>

                            <input className="form-control input-lg" aria-describedby={`${prefix}-actions`}
                                   id={`${prefix}-display-input`} value={value}
                                   onClick={isLink ? this.openUrlInTab : ""}
                                   type={secret && hidden ? "password" : "text"}
                                   style={secret ? {fontFamily: "monospace"} : {}}
                                   readOnly/>


                            {secret ?
                                <span className="input-group-btn">
                                <button id={`toggle-${prefix}-btn`} className="btn btn-default" type="button" onClick={this.toggleVisibility}>
                                    <span className={`glyphicon ${hidden ? "glyphicon-eye-open" : "glyphicon-eye-close"}`}/>
                                </button>
                            </span>
                                : null}
                        </div>
                    </div>
                </div>
            )
        } else if (showIfEmpty) {
            return (
                <div className="form-group">
                    <label htmlFor={label} className="col-sm-2 control-label">{label}</label>

                    <div className="col-sm-10">
                        <div style={{paddingTop: 7, fontSize: "100%"}}>
                            <code>empty</code>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div/>
        }
    }
}