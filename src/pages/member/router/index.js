
import Vue from 'vue';
import Router from 'vue-router';
import member from '../components/member.vue';
import address from '../components/address.vue';
import addressAll from '../components/address_all.vue';
import addressForm from '../components/address_form.vue';

Vue.use(Router);


const router=new Router({
    routes:[
        {
            path: '/',
            component:member
        },
        {
            path:'/address',
            component:address,
            children:[{
                path:'', //空路由，即当前页面/
                component:addressAll
                // redirect:'all'
            },
                {
                    path:'all',//嵌套路由子页面路径前不需要加'/'
                    name:'alladdress',
                    component:addressAll
                },
                {
                    path:'form',
                    name:'formaddress',
                    component:addressForm
                }
            ]
        }
    ]
})

export default router