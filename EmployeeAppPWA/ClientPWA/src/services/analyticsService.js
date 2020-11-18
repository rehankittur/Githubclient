import ReactGA from 'react-ga';
import config from '../config';

class AnalyticsService {
    constructor() {
        const trackingId = config.googleAnalyticsKey;
        if (trackingId) {
            ReactGA.initialize(trackingId);
        }
    }

    sendPageView(path, title) {
        ReactGA.pageview(path, [], title);
    }

    sendEvent(category, action, label) {
        const event = {
            category,
            action,
            label
        };

        ReactGA.event(event);
    }

    setUserId(userId) {
        if (userId == undefined || this._userId) {
            // only set once
            return;
        }

        this._userId = userId;

        // will not reach GA without user id agreement being enabled for employee app
        ReactGA.set({ userId });
    }
}

export const analyticsService = new AnalyticsService()