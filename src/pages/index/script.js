
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