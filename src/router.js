import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history', 
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/index',
      component: () => import('@/views/Layout'),
      children:[
        {
          path:'/index',
          name:'首页',
          meta:{
            isTab:true,
            active:0
          },
          component: () => import('@/views/Home')
        },
        {
          path:'/movie',
          name:'电影',
          meta:{
            isTab:true,
            active:1,
            type:'movie'
          },
          component: () => import('@/components/MovieList')
        },
        {
          path:'/Animation',
          name:'动漫',
          meta:{
            isTab:true,
            active:2,
            type:'Animation'
          },
          component: () => import('@/components/MovieList')
        },
        {
          path:'/Arts',
          name:'综艺',
          meta:{
            isTab:true,
            active:3,
            type:'Arts'
          },
          component: () => import('@/components/MovieList')
        },
        {
          path:'/tv',
          name:'电视剧',
          meta:{
            isTab:true,
            active:4,
            type:'tv'
          },
          component: () => import('@/components/MovieList')
        },
        //不带tab
        {
          path:'/detail',
          name:'电影详情',
          meta:{
            arrow:true
          },
          component: () => import('@/components/MovieDetail')
        },
        {
          path:'/play',
          name:'播放',
          meta:{
            arrow:true
          },
          component: () => import('@/components/Play')
        },
        {
          path:'/search/:id',
          name:'搜索',
          meta:{
            arrow:true
          },
          component: () => import('@/views/Search')
        }
      ]
    }
  ]
})
