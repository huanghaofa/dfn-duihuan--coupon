(function(){
  'use strict';
  window.GUIExchangeMock = {
    meta:{version:'2026.10.14',source:'产品中心',scope:'一期仅 GUI 皮肤'},
    vehicle:{model:'东风日产 探陆 2026',vin:'LGBM4AE47PS102825',source:'用户默认会员卡'},
    coupon:{id:'EC-GUI-20261014-001',name:'智能座舱皮肤任选5选2',status:'可使用',mode:'n-of-m',candidateCount:5,redeemCount:2,fulfillment:'车联网履约',validTo:'2026-12-31 23:59'},
    suppliers:['全部供应商','DFN 数字座舱','东风日产车联','尼桑创意工坊'],
    products:[
      {spu:'GUI-SPU-1001',name:'星河漫游座舱皮肤',supplier:'DFN 数字座舱',sale:'已上架',exchangeable:true,tone:'violet',desc:'深空动效与星轨主题组件',skus:[
        {id:'GUI-SKU-100101',spec:'曜石紫·标准版',rightId:'IOV-SKIN-4101',max:2,available:true},
        {id:'GUI-SKU-100102',spec:'星云蓝·动效版',rightId:'IOV-SKIN-4102',max:1,available:true}
      ]},
      {spu:'GUI-SPU-1002',name:'极光森境座舱皮肤',supplier:'东风日产车联',sale:'未上架',exchangeable:true,tone:'green',desc:'极光流动背景与森林绿动效',skus:[
        {id:'GUI-SKU-100201',spec:'翡翠绿·日间版',rightId:'IOV-SKIN-4201',max:2,available:true},
        {id:'GUI-SKU-100202',spec:'极光绿·夜间版',rightId:'IOV-SKIN-4202',max:1,available:true}
      ]},
      {spu:'GUI-SPU-1003',name:'赤焰赛道座舱皮肤',supplier:'尼桑创意工坊',sale:'已上架',exchangeable:true,tone:'red',desc:'赛道仪表与碳纤维质感界面',skus:[
        {id:'GUI-SKU-100301',spec:'赛道红·经典版',rightId:'IOV-SKIN-4301',max:1,available:true}
      ]},
      {spu:'GUI-SPU-1004',name:'海岸清风座舱皮肤',supplier:'DFN 数字座舱',sale:'未上架',exchangeable:true,tone:'blue',desc:'浅蓝海岸、白砂与日落主题',skus:[
        {id:'GUI-SKU-100401',spec:'海盐蓝·标准版',rightId:'IOV-SKIN-4401',max:2,available:true},
        {id:'GUI-SKU-100402',spec:'落日橙·特别版',rightId:'IOV-SKIN-4402',max:1,available:false}
      ]},
      {spu:'GUI-SPU-1005',name:'水墨东方座舱皮肤',supplier:'尼桑创意工坊',sale:'已上架',exchangeable:true,tone:'ink',desc:'山水长卷与水墨过渡动效',skus:[
        {id:'GUI-SKU-100501',spec:'远山黛·深色版',rightId:'IOV-SKIN-4501',max:1,available:true}
      ]},
      {spu:'GUI-SPU-1006',name:'未来机甲座舱皮肤',supplier:'东风日产车联',sale:'已上架',exchangeable:true,tone:'cyan',desc:'科技蓝线框与机甲光效',skus:[
        {id:'GUI-SKU-100601',spec:'电光青·运动版',rightId:'IOV-SKIN-4601',max:1,available:true}
      ]},
      {spu:'GUI-SPU-1007',name:'复古像素座舱皮肤',supplier:'DFN 数字座舱',sale:'已上架',exchangeable:false,tone:'amber',desc:'像素艺术与复古游戏界面',skus:[
        {id:'GUI-SKU-100701',spec:'8-bit·彩色版',rightId:'IOV-SKIN-4701',max:1,available:false}
      ]},
      {spu:'GUI-SPU-1008',name:'银河悬浮座舱皮肤',supplier:'尼桑创意工坊',sale:'未上架',exchangeable:true,tone:'silver',desc:'悬浮卡片与银河粒子效果',skus:[
        {id:'GUI-SKU-100801',spec:'星银·豪华版',rightId:'IOV-SKIN-4801',max:1,available:true}
      ]}
    ],
    excluded:[
      {type:'流量包',reason:'一期不在 GUI 皮肤范围'},
      {type:'会员权益',reason:'一期不在 GUI 皮肤范围'},
      {type:'实物/服务',reason:'使用其他独立履约链路'}
    ],
    successRecord:{orderNo:'EX202610140001',attemptNo:'TRY20261014001',time:'2026-10-14 10:28:36',outcome:'success',status:'全部成功',couponStatus:'已核销',iovNo:'IOV20261014A7821',items:['GUI-SKU-100101','GUI-SKU-100201']},
    partialRecord:{orderNo:'EX202610140002',attemptNo:'TRY20261014002',time:'2026-10-14 10:31:05',outcome:'partial',status:'部分成功',couponStatus:'已核销',iovNo:'IOV20261014P5531',reason:'部分商品未兑换成功，请联系客服处理',items:['GUI-SKU-100101','GUI-SKU-100201'],itemResults:[{id:'GUI-SKU-100101',status:'success'},{id:'GUI-SKU-100201',status:'failed'}]},
    failedRecord:{orderNo:'—',attemptNo:'TRY20261014003',time:'2026-10-14 10:34:18',outcome:'failed',status:'全部失败',couponStatus:'可使用',iovNo:'IOV20261014F3320',reason:'当前车辆暂不支持所选座舱皮肤',items:['GUI-SKU-100101','GUI-SKU-100201'],itemResults:[{id:'GUI-SKU-100101',status:'failed'},{id:'GUI-SKU-100201',status:'failed'}]}
  };
})();
