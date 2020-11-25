import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: ()=> {return import('@/components/Layout.vue')},
    redirect: '/dashboard',
    children: [
      {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'el-icon-s-home',
        affix:true,
      }
    },
  ]
  },
  {
    path: '/blog',
    component: ()=> {return import('@/components/Layout.vue')},
    redirect: '/blog/article',
    name: 'Blog',
    meta: {
      title: '博客管理',
      icon: 'el-icon-notebook-2'
    },
    children: [{
        path: 'article',
        name: 'Article',
        component: () => import('@/views/article/index'),
        meta: {
          title: '文章管理',
          icon: 'el-icon-notebook-1'
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/category/index.vue'),
        meta: {
          title: '分类管理',
          icon: 'el-icon-s-order'
        }
      },
      {
        path: 'label',
        name: 'Label',
        component: () => import('@/views/label/index'),
        meta: {
          title: '标签管理',
          icon: 'el-icon-collection-tag'
        }
      }
    ]
  },
 
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
