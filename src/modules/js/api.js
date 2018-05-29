let hosts='http://rap2api.taobao.org/app/mock/7058'; //这里是开发环境下的模拟hosts
// let hosts='' 这里可以先定义好生产环境下的真实hosts地址,上线是直接注释上面的开发环境地址，使用这个真实地址
let url={
    hotLists:'/index/hotLists',
    bannerLists:'/index/banner',
    topLists:'/category/topList',
    rank:'/category/rank',
    subLists:'/category/subList',
    searchList:'/search/list',
    getDetails:'/goods/details',
    getDeal:'/goods/deal',
    getCart:'/cart/add',
    getCartList:'/cart/list',
    cartUpdate:'/cart/update',
    cartReduce:'/cart/reduce',
    cartRemove:'/cart/remove',
    cartMrremove:'/cart/mrremove'
}


//遍历url对象，每个成员添加hosts内容，目的是让所有接口API都有统一的hosts
for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = hosts+url[key];
        
    }
}

//导出默认模块url
export default url