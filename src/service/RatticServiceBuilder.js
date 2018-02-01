import {devMode} from '../Globals';
import MockedRatticService from "./MockedRatticService";
import RatticService from "./RatticService";

export default function getRatticService() {
    if (devMode) {
        return new MockedRatticService();
    } else {
        return new RatticService();
    }
}