/**
 * Created by thomasrieder on 14.09.15.
 */
import React from 'react'
import Credential from './Credential'
import ratticURL from './Globals'

export default React.createClass({

    getInitialState: function () {
        return {
            data: []
        };
    },

    loadCredsFromUrl: function (url) {

        function sortStr(a, b) {
            if (a.title && b.title) {
                if (a.title.toLowerCase() < b.title.toLowerCase())
                    return -1;
                if (a.title.toLowerCase() > b.title.toLowerCase())
                    return 1;
            }
            return 0;
        }

        $.ajax({
            url: url,
            dataType: 'json',
            cache: false,
            headers: {
                "Authorization": "ApiKey " + localStorage.getItem("username") + ":" + localStorage.getItem("apikey")
            },
            method: 'GET',
            success: function (data) {
                if (data && data.objects) {
                    this.setState(function (previousState) {
                        var newData = previousState.data.concat(data.objects);
                        newData.sort(sortStr);
                        return {
                            data: newData
                        };
                    });
                    this.props.updateCredCount(this.state.data.length);
                }

                if (data.meta && data.meta.next) {
                    this.loadCredsFromUrl(ratticURL + data.meta.next);
                } else {
                    console.log("got no next url");
                    this.setState(function (previousState) {
                        previousState.data.sort(sortStr);
                        return {
                            data: previousState.data
                        };
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function () {
        console.log("I will now load something via ajax");
        this.loadCredsFromUrl(ratticURL + "/api/v1/cred?format=json&limit=200");
    },

    componentWillReceiveProps: function (nextProps) {

        var query = nextProps.query;
        var filteredData = [];

        if (!query) {
            filteredData = this.state.data;
        } else {
            var that = this;
            query.split(" ").forEach(function (item) {
                item = item.trim();
                if (item) {

                    function matcher(cred) {
                        var term = cred.title + " " + cred.url + " " + cred.username;
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
    },

    render: function () {

        var list = this.state.data;

        if (this.state.filteredData) {
            list = this.state.filteredData;
        }

        var credentials;
        if (list) {
            var that = this;
            credentials = list.map(function (cred, i) {
                var boundShowPassword = that.props.showPassword.bind(null, i);
                return (
                    <Credential
                        key={cred.id}
                        name={ cred.title }
                        url={cred.url}
                        credId={cred.id}
                        username={cred.username}
                        showPassword={boundShowPassword}/>
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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {credentials}
                    </tbody>
                </table>
            </div>
        );
    }
});
