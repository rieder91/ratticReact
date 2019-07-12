export default class RatticCacheWrapper {
    constructor(ratticService) {
        this.ratticService = ratticService;
        this.cache = {};

        this.getCredential = this.getCredential.bind(this);
        this.getCredentialList = this.getCredentialList.bind(this);
        this.getPageSize = this.getPageSize.bind(this);
        this.isCached = this.isCached.bind(this);
    }

    getCredential(credentialId, shouldCache=false) {
        const that = this;
        if (this.cache[credentialId]) {
            return new Promise((resolve) => {
                resolve(that.cache[credentialId]);
            });
        } else {
            const p = this.ratticService.getCredential(credentialId);
            p.then(data => {
                if (shouldCache) {
                    that.cache[data.id] = data;
                }
            });

            return p;
        }
    }

    getCredentialList(page) {
        return this.ratticService.getCredentialList(page)
    }

    getPageSize() {
        return this.ratticService.getPageSize();
    }

    isCached(credId) {
        return this.cache[credId] != null;
    }
}