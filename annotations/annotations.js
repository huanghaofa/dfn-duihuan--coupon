window.AnnotationData = {
  wallet: [
    {
      id: '1', page: 'wallet', target: '[data-anno="wallet-summary"]', title: '卡券状态分组',
      sections: {
        functionDesc: '汇总用户当前可使用、已核销和已失效的卡券数量。',
        dataSource: '卡券中心的用户卡券实例。',
        interactionDesc: '状态标签用于切换对应卡券列表；当前原型固定展示可使用列表。'
      }
    },
    {
      id: '2', page: 'wallet', target: '[data-anno="usable-coupon"]', title: '可使用的兑换券',
      sections: {
        functionDesc: '展示 5 件商品任选 2 件的兑换券，点击进入券详情。',
        judgeRule: '本期只包含产品中心 GUI 皮肤 SKU；整张券固定为车联网履约。',
        interactionDesc: '点击卡片或“立即使用”进入兑换流程。'
      }
    },
    {
      id: '3', page: 'wallet', target: '[data-anno="redeemed-coupon"]', title: '已核销卡券可回看兑换内容',
      sections: {
        functionDesc: '已核销卡券仍保留详情入口，便于查看实际兑换的 SKU/规格和履约结果。',
        interactionDesc: '点击“查看内容”进入已核销卡券详情。'
      }
    }
  ],
  redeem: [
    {
      id: '1', page: 'redeem', state: 'detail', target: '[data-anno="coupon-summary"]', title: '兑换券基础信息',
      sections: {
        functionDesc: '展示券名称、有效期和 5 件商品任选 2 件。',
        judgeRule: '本券候选池仅包含产品中心标记可兑换的 GUI 皮肤 SKU。'
      }
    },
    {
      id: '2', page: 'redeem', state: 'detail', target: '[data-anno="default-member-card"]', title: '默认会员卡车辆信息',
      sections: {
        functionDesc: '此处展示用户的默认会员卡。',
        dataSource: '用户默认会员卡中的车型与 VIN。',
        fieldDesc: '只展示车型与 VIN；当前无车牌号数据，不展示车牌号。',
        interactionDesc: '该区域仅作信息回显，不提供选车入口。'
      }
    },
    {
      id: '3', page: 'redeem', state: 'detail', target: '[data-anno="candidate-preview"]', title: '候选 SKU 预览',
      sections: {
        functionDesc: '预览本券关联的 GUI 皮肤 SKU/规格，可进入商品详情。',
        judgeRule: '商城销售未上架不是不可兑换理由；库存为 0 时不可选择。'
      }
    },
    {
      id: '4', page: 'redeem', state: 'select', target: '[data-anno="sku-selection"]', title: '5 选 2 选择进度',
      sections: {
        functionDesc: '按件数实时展示已选数量。',
        judgeRule: '必须选满 2 件才能进入确认页；可以选择两个不同 SKU。'
      }
    },
    {
      id: '5', page: 'redeem', state: 'select', target: '[data-anno="selection-methods"]', title: '兑换方式配置',
      sections: {
        functionDesc: '建券时支持固定兑换与 N 选 M 两种兑换方式。',
        fieldDesc: '固定兑换：预设商品及数量，用户无需选择；N 选 M：配置候选商品数 N 和可兑换件数 M。',
        judgeRule: 'N 选 M 需配置“是否允许重复 SKU”；允许时同一 SKU 可选多件，但不得超过单 SKU 数量上限及整券 M 件上限。',
        otherDesc: '当前原型示例为 5 选 2，并允许重复 SKU。'
      }
    },
    {
      id: '6', page: 'redeem', state: 'confirm', target: '[data-anno="confirm-member-card"]', title: '确认页车辆回显',
      sections: {
        functionDesc: '再次回显默认会员卡中的车型与 VIN，供用户核对履约对象。',
        fieldDesc: '不展示车牌号，不提供选车或编辑操作。'
      }
    },
    {
      id: '7', page: 'redeem', state: 'confirm', target: '[data-anno="confirm-submit"]', title: '确认兑换',
      sections: {
        functionDesc: '用户确认后，卡券中心经新商城代理同步调用车联网。',
        judgeRule: '同一请求同步返回每个商品的最终结果；页面加载不形成可查询的“履约中”状态。',
        otherDesc: 'C 端确认页不展示调用链、同步履约卡片或系统状态说明。'
      }
    },
    {
      id: '8', page: 'redeem', state: 'confirm', target: '[data-anno="confirm-submit"]', title: '全部失败处理',
      sections: {
        functionDesc: '所有商品均失败时，当前兑换不成立，页面停留在确认兑换。',
        dataSource: '弹窗失败原因直接反显车联网同步最终响应。',
        judgeRule: '弹窗提示“核销失败”，不改变卡券状态，不进入兑换后卡券详情，不展示联系客服。'
      }
    }
  ],
  redeemed: [
    {
      id: '1', page: 'redeemed', target: '[data-anno="redeemed-result"]', title: '卡券兑换信息',
      sections: {
        functionDesc: '向用户展示卡券状态和兑换时间。',
        judgeRule: '全部成功或部分成功时，卡券状态均为已核销。'
      }
    },
    {
      id: '2', page: 'redeemed', target: '[data-anno="redeemed-items"]', title: '逐商品兑换结果',
      sections: {
        functionDesc: '在卡券详情中逐项展示已兑换商品及成功、失败状态。',
        dataSource: '卡券中心保存的逐商品同步结果快照。'
      }
    },
    {
      id: '3', page: 'redeemed', target: '[data-anno="redeemed-support"]', title: '部分成功中的失败商品处理',
      sections: {
        functionDesc: '部分成功后卡券已核销，卡券详情对失败商品只展示“联系客服”。',
        interactionDesc: '用户端不展示补偿、重试或系统状态说明。'
      }
    },
    {
      id: '4', page: 'redeemed', target: '[data-anno="redeemed-member-card"]', title: '使用车辆信息',
      sections: {
        functionDesc: '展示本次兑换对应的默认会员卡车辆信息。',
        fieldDesc: '只展示车型与 VIN，不展示车牌号。'
      }
    }
  ]
};
