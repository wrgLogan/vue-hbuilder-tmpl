import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from './pages/index/index.vue';
import ScrollerPage from './pages/scroller/index.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: IndexPage
        },
        {
            path: '/scroller',
            component: ScrollerPage
        }
    ]
})