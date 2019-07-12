import {devMode} from '../Globals';
import MockedRatticService from "./MockedRatticService";
import RatticService from "./RatticService";
import RatticCacheWrapper from "./RatticCacheWrapper";

let ratticService = null;

export default function getRatticService() {
    if (!ratticService) {
        if (devMode) {
            ratticService = new RatticCacheWrapper(new MockedRatticService());
        } else {
            ratticService = new RatticCacheWrapper(new RatticService());
        }
    }

    return ratticService;
}