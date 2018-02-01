/**
 * Created by thomasrieder on 14.09.15.
 */
import React from 'react'
import {ratticURL} from './Globals'
import getRatticService from './service/RatticServiceBuilder';

export default class Credential extends React.Component {

    constructor() {
        super();
        this.ratticService = getRatticService();

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const self = this;
        this.ratticService.getCredential(self.props.credId)
            .then(data => {
                if (data && data.password) {
                    self.props.showPassword(data.username, data.password, self.props.name, data.url, data.description);
                }
            })
            .catch(err => {
                console.error(err.toString());
            });
    }

    render() {
        let {name, url, username, credId} = this.props;
        return (
            <tr className="credential noselect" onClick={this.onClick}>
                <td>
                    {name}
                </td>
                <td>
                    <a href={url} target="_blank">{url}</a>
                </td>
                <td>
                    {username}
                </td>
                <td>
                    <a href={ratticURL + "/cred/detail/" + credId + "/"} target="_blank">
                        <span className="glyphicon glyphicon-new-window"/>
                    </a>
                </td>
            </tr>
        );
    }
}