const pageSize = 2;

export default class MockedRatticService {
    getPageSize() {
        return pageSize;
    }

    getCredential(credentialId) {
        return new Promise((resolve, reject) => {
            FIXTURE["objects"].forEach(cred => {
                if (cred["id"] === credentialId) {
                    resolve(cred);
                }
            });
        });
    }

    getCredentialList(page = 0) {
        const size = this.getPageSize();
        return new Promise((resolve, reject) => {
            resolve({
                "meta": {/* we shouldn't need this */},
                "objects": FIXTURE["objects"].slice(page * size, size + (page * size))
            });
        });
    }
}

const FIXTURE = {
    "meta": {
        /* we don't need to mock this */
    },
    "objects": [
        {
            "attachment_name": null,
            "created": "2016-04-29T19:34:56.675959",
            "description": "",
            "descriptionmarkdown": false,
            "iconname": "Key.png",
            "id": 780,
            "modified": "2016-04-29T19:34:56.675708",
            "on_changeq": false,
            "resource_uri": "/api/v1/cred/780/",
            "ssh_key_name": null,
            "title": "Youtube",
            "url": "https://youtube.com/",
            "username": "larry@google.com",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T12:54:23.210878",
            "description": "",
            "descriptionmarkdown": false,
            "iconname": "Globe.png",
            "id": 68,
            "modified": "2015-09-10T12:54:23.210619",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/68/",
            "ssh_key_name": null,
            "title": "Twitter",
            "url": "https://twitter.com",
            "username": "roman",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T15:20:06.558181",
            "description": "",
            "descriptionmarkdown": false,
            "iconname": "Globe.png",
            "id": 190,
            "modified": "2015-09-10T15:20:06.557953",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/190/",
            "ssh_key_name": null,
            "title": "Github",
            "url": "https://github.com/",
            "username": "thomas",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T18:49:29.467836",
            "description": "Also works for id.atlassian.com",
            "descriptionmarkdown": false,
            "iconname": "Key.png",
            "id": 373,
            "modified": "2015-09-10T18:49:29.467587",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/373/",
            "ssh_key_name": null,
            "title": "Bitbucket",
            "url": "https://bitbucket.org",
            "username": "Mario",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-24T15:41:41.726089",
            "description": "created: 2017\r\nipv6: ::1",
            "descriptionmarkdown": false,
            "iconname": "Key.png",
            "id": 482,
            "modified": "2015-09-24T15:41:41.725834",
            "on_changeq": false,
            "resource_uri": "/api/v1/cred/482/",
            "ssh_key_name": null,
            "title": "Docker Hub",
            "url": "https://hub.docker.com",
            "username": "solomon",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T16:49:10.577810",
            "description": "",
            "descriptionmarkdown": false,
            "iconname": "Key.png",
            "id": 256,
            "modified": "2015-09-10T16:49:10.577540",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/256/",
            "ssh_key_name": null,
            "title": "Twitch",
            "url": "https://twitch.tv",
            "username": "reddit",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T18:43:35.689681",
            "description": "",
            "descriptionmarkdown": false,
            "iconname": "Key.png",
            "id": 363,
            "modified": "2015-09-10T18:43:35.689451",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/363/",
            "ssh_key_name": null,
            "title": "PostgreSQL User",
            "url": "psql://10.10.55.10",
            "username": "postgres",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T19:14:26.871391",
            "description": "",
            "descriptionmarkdown": false,
            "iconname": "Globe.png",
            "id": 416,
            "modified": "2015-09-10T19:14:26.871166",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/416/",
            "ssh_key_name": null,
            "title": "Facebook",
            "url": "https://www.facebook.com",
            "username": "Francis Barnes",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T19:14:26.871391",
            "description": "",
            "descriptionmarkdown": false,
            "iconname": "Globe.png",
            "id": 617,
            "modified": "2015-09-10T19:14:26.871166",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/416/",
            "ssh_key_name": null,
            "title": "No Username",
            "url": "https://www.anandtech.com",
            "username": "",
            "password": "ThisShouldBeHidden!"
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T19:14:26.871391",
            "description": "",
            "descriptionmarkdown": false,
            "iconname": "Globe.png",
            "id": 618,
            "modified": "2015-09-10T19:14:26.871166",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/416/",
            "ssh_key_name": null,
            "title": "No Password",
            "url": "https://www.anandtech.com",
            "username": "user",
            "password": ""
        },
        {
            "attachment_name": null,
            "created": "2015-09-10T18:49:29.467836",
            "description": "Also works for id.atlassian.com",
            "descriptionmarkdown": false,
            "iconname": "Key.png",
            "id": 619,
            "modified": "2015-09-10T18:49:29.467587",
            "on_changeq": true,
            "resource_uri": "/api/v1/cred/373/",
            "ssh_key_name": null,
            "title": "Description only",
            "url": "",
            "username": "",
            "password": ""
        }
    ]
};