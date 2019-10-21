import Vue from 'vue';
import Router from 'vue-router';
import News from '../components/News';
import About from '../components/About';
import Breweries from '../components/Pivnice';
import Articles from '../components/Articles';
import Home from '../components/Home';
import Events from '../components/Events';
import Comments from '../components/Comments';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/news',
            name: 'News',
            component: News

        },
        {
            path: '/events',
            name: 'Events',
            component: Events
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/breweries',
            name: 'Breweries',
            component: Breweries
        },
        {
            path: '/articles',
            name: 'Articles',
            component: Articles
        },
        {
             path: '/comments',
            name: 'Comments',
            component: Comments
        }
    ]
})