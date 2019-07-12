/**
 * Created by thomasrieder on 15.09.15.
 */
import React from 'react'
import CopyableTextbox from './CopyableTextbox'

export default class PasswordPopup extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {password, url, description, title, username} = this.props;

        let descriptionDisplay = <div/>;

        if (description) {
            descriptionDisplay = <div className="form-group">
                <label htmlFor="description" className="col-sm-2 control-label">Description</label>

                <div className="col-sm-10">
                        <pre className="form-control" aria-describedby="description"
                             id="description-box">{description}</pre>
                </div>
            </div>;
        }

        if (password || url || description || username) {
            return (
                <div className="popup">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">{title}</h3>
                        </div>
                        <div className="panel-body">
                            <form className="form-horizontal">

                                <CopyableTextbox label="URL" value={url} secret={false} isLink={true}/>
                                <CopyableTextbox label="Username" value={username} secret={false} isLink={false}/>
                                <CopyableTextbox label="Password" value={password} secret={true} isLink={false}/>

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