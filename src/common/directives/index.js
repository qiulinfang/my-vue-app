import { focus } from './focus';
import { click } from './click';
import { diff } from './diff';

const directives = {
    focus,
    click,
    diff
};

export default {
    install(app) {
        Object.keys(directives).forEach(key => {
            app.directive(key, directives[key]);
        });
    }
};