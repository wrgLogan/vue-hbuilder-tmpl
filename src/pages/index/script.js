import ReqAnimate from '../../assets/js/reqAnimate.js';
import async from '../../assets/js/async.js';

export default {
    data: function () {
        return {
            message: 'Hello'
        };
    },
    mounted: function () {

    },
    components: {
    },
    methods: {
        go() {
            this.$switchTo('scroller', 'forward');
        }
    }
}