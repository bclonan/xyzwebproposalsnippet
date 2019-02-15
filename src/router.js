import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import XyzPagePreview from './views/XyzPagePreview.vue'
import XYZProposalPreview from './views/XYZProposalPreview.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/sp/:id',
      name: 'XPrev',
      component: XyzPagePreview
    },
    {
      path: '/xp/:id',
      name: 'Xprop',
      component: XYZProposalPreview
    },
    { path: '/404', component: NotFound },  
    { path: '*', redirect: '/404' }, 
  ]
})
