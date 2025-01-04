import { focus } from './focus';
import { click } from './click';
import { diff } from './diff';
import wave from './wave';

const directives = {
    focus,
    click,
    diff,
    wave
};

export default {
    install(app) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key]);
        });
    }
};