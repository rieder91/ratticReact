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

        this.showPopup = this.showPopup.bind(this);
        this.cacheCredential = this.cacheCredential.bind(this);
    }

    showPopup() {
        const self = this;
        this.ratticService.getCredential(self.props.credId)
            .then(data => {
                if (data && data.id) {
                    self.props.showPassword(data.username, data.password, self.props.name, data.url, data.description);
                }
            })
            .catch(err => {
                console.error(err.toString());
            });
    }

    cacheCredential(e, credId) {
        e.stopPropagation();
        // this caches the credential
        this.ratticService.getCredential(credId, true).then(() => {
            // Force a render with a simulated state change
            this.setState({ state: this.state });
        });
    }

    render() {
        let {name, url, username, credId} = this.props;
        const isCached = this.ratticService.isCached(credId);

        return (
            <tr className="credential noselect" onClick={this.showPopup}>
                <td onClick={(e) => this.cacheCredential(e, credId)}>
                    <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true" style={isCached ? {color: "green"} : {color: "gray"}} />
                </td>
                <td>
                    {name}
                </td>
                <td>
                    <a href={url} target="_blank">
                        {url ? url : <code>empty</code>}
                    </a>
                </td>
                <td>
                    {username ? username : <code>empty</code>}
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