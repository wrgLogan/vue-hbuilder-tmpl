import ReqAnimate from '../../assets/js/reqAnimate.js';
import async from '../../assets/js/async.js';
import $ from 'jquery';

window.async = async;

export default {
    data: function () {
        return {
            msg: 'Scroller'
        }
    },
    methods: {
        back: function() {
            this.$goBackward();
        }
    },
    mounted: function() {
        
    }
};
