import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import Business from '../views/admin/Business.vue'
import Businfo from '../views/admin/BusInfo.vue'
import AddGoods from '../views/admin/AddGoods.vue'
import Admin from '../views/admin/Admin.vue'
import AdminShop from '../views/admin/AdminShop.vue'
import AdminGood from '../views/admin/AdminGood.vue'
import AddSubject from '../views/admin/AddSubject.vue'
import shopOrder from '../views/admin/shopOrder.vue'
import setDiscount from '../views/admin/setDiscount.vue'

import Index from '../views/member/index.vue'
import getDiscount from '../views/member/getDiscount.vue'
import GoodsDetail from '../views/member/goodsDetail.vue'
import shopDetail from '../views/member/shopDetail.vue'
import cart from '../views/member/cart'
import order from '../views/member/order'
import proFile from '../views/member/proFile'
import evaluate from '../views/member/evaluate'
import Share from '../views/member/share'
import Contrast from '../views/member/contrast'
import ShareDetail from '../views/member/shareDetail'
import GoodsList from '../views/member/goodsList'
import Search from '../views/member/search'
import MyDiscount from '../views/member/myDiscount'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },

  {
    path: '/login',
    name: 'login',
    component: AdminLogin
  },
  {
    path: '/business',
    name: 'business',
    component: Business,
  },
  {
    path: '/businfo',
    name: 'businfo',
    component: Businfo
  },
  {
    path: '/addgoods',
    name: 'addgoods',
    component: AddGoods
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/adminshop',
    name: 'adminshop',
    component: AdminShop
  },
  {
    path: '/admingood',
    name: 'admingood',
    component: AdminGood
  },
  {
    path: '/addsubject',
    name: 'addsubject',
    component: AddSubject
  },
  {
    path: '/shoporder',
    name: 'shoporder',
    component: shopOrder
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/getdiscount',
    name: 'getdiscount',
    component: getDiscount
  },
  {
    path: '/goodsdetail',
    name: 'goodsdetail',
    component: GoodsDetail
  },
  {
    path: '/shopdetail',
    name: 'shopdetail',
    component: shopDetail
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path: '/profile',
    name: 'profile',
    component: proFile
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: evaluate
  },
  {
    path: '/share',
    name: 'share',
    component: Share
  },
  {
    path: '/setdiscount',
    name: 'setdiscount',
    component: setDiscount
  },
  {
    path: '/contrast',
    name: 'contrast',
    component: Contrast
  },
  {
    path: '/sharedetail',
    name: 'sharedetail',
    component: ShareDetail
  },
  {
    path: '/goodslist',
    name: 'goodslist',
    component: GoodsList
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/mydiscount',
    name: 'mydiscount',
    component: MyDiscount
  }

]

const router = new VueRouter({
  routes
})

export default router
