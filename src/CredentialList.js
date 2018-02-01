/**
 * Created by thomasrieder on 14.09.15.
 */
import React from 'react'
import Credential from './Credential'
import getRatticService from './service/RatticServiceBuilder';

export default class CredentialList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.ratticService = getRatticService();
        this.state = {
            data: []
        };

        this.loadCredsFromUrl = this.loadCredsFromUrl.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    loadCredsFromUrl(page = 0) {
        const self = this;

        function sortStr(a, b) {
            if (a.title && b.title) {
                if (a.title.toLowerCase() < b.title.toLowerCase())
                    return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase())
                    return 1;
            }
            return 0;
        }

        this.ratticService.getCredentialList(page)
            .then(data => {
                console.log(data);
                if (data && data.objects) {
                    self.setState(function (previousState) {
                        return {
                            data: previousState.data.concat(data.objects)
                        };
                    });
                    self.props.updateCredCount(self.state.data.length);
                }

                if (data.objects.length === self.ratticService.getPageSize()) {
                    self.loadCredsFromUrl(page + 1);
                } else {
                    console.log("got no next page");
                    self.setState(function (previousState) {
                        previousState.data.sort(sortStr);
                        return {
                            data: previousState.data
                        };
                    });
                }
            })
            .catch(err => {
                console.error(err.toString());
            });
    }

    componentDidMount() {
        this.loadCredsFromUrl();
    }

    componentWillReceiveProps(nextProps) {
        let query = nextProps.query;
        let filteredData = [];

        if (!query) {
            filteredData = this.state.data;
        } else {
            const that = this;
            query.split(" ").forEach(function (item) {
                item = item.trim();
                if (item) {

                    function matcher(cred) {
                        let term = cred.title + " " + cred.url + " " + cred.username;
                        return term.toLowerCase().indexOf(item.toLowerCase()) !== -1;
                    }

                    if (filteredData.length === 0) {
                        filteredData = that.state.data.filter(matcher);
                    } else {
                        filteredData = filteredData.filter(matcher);
                    }
                }
            });
        }

        this.setState(function (previousState) {
            return {
                data: previousState.data,
                filteredData: filteredData
            };
        });
    }

    render() {
        let {data, filteredData} = this.state;
        if (filteredData) {
            data = filteredData;
        }

        let credentials;
        if (data) {
            const that = this;
            credentials = data.map((cred, i) => {
                return (
                    <Credential
                        key={cred.id}
                        name={cred.title}
                        url={cred.url}
                        credId={cred.id}
                        username={cred.username}
                        showPassword={that.props.showPassword.bind(null, i)}/>
                );
            });
        }

        return (
            <div className="credentialList">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Username</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {credentials}
                    </tbody>
                </table>
            </div>
        );
    }
}