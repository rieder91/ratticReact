/**
 * Created by thomasrieder on 14.09.15.
 */
import React from 'react'
import ratticURL from './Globals'

export default React.createClass({

    onClick: function () {

        var that = this;
        $.ajax({
            url: ratticURL + "/api/v1/cred/" + this.props.credId + "?format=json",
            dataType: 'json',
            cache: false,
            headers: {
                "Authorization": "ApiKey " + localStorage.getItem("username") + ":" + localStorage.getItem("apikey")
            },
            success: function (data) {
                if (data && data.password) {
                    that.props.showPassword(data.username, data.password, that.props.name, data.url, data.description);
                }

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },

    render: function () {
        return (
            <tr className="credential noselect" onClick={this.onClick}>
                <td>
                    {this.props.name}
                </td>
                <td>
                    <a href={this.props.url} target="_blank">{this.props.url}</a>
                </td>
                <td>
                    {this.props.username}
                </td>
                <td>
                    <a href={ratticURL + "/cred/detail/" + this.props.credId + "/"} target="_blank">
                        <span className="glyphicon glyphicon-new-window"></span>
                    </a>
                </td>
            </tr>
        );
    }
});
