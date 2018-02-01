import {ratticURL} from "../Globals";
import $ from "jquery";

// page size when doing REST requests
const pageSize = 200;

export default class RatticService {
    getPageSize() {
        return pageSize;
    }

    getCredential(credentialId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: ratticURL + "/api/v1/cred/" + credentialId + "?format=json",
                dataType: 'json',
                cache: false,
                headers: {
                    "Authorization": "ApiKey " + localStorage.getItem("username") + ":" + localStorage.getItem("apikey")
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, status, err) {
                    reject(err);
                }
            });
        });
    }

    getCredentialList(page = 0) {
        const size = this.getPageSize();
        const offset = size * page;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: ratticURL + `/api/v1/cred?format=json&limit=${size}&offset=${offset}`,
                dataType: 'json',
                cache: false,
                headers: {
                    "Authorization": "ApiKey " + localStorage.getItem("username") + ":" + localStorage.getItem("apikey")
                },
                method: 'GET',
                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, status, err) {
                    reject(err);
                }
            });
        });
    }
}