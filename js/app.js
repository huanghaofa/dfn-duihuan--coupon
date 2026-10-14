(function () {
  'use strict';

  var D = window.GUIExchangeMock;
  var candidateIds = ['GUI-SKU-100101', 'GUI-SKU-100201', 'GUI-SKU-100301', 'GUI-SKU-100401', 'GUI-SKU-100402'];
  var S = { flow: 'detail', quantities: {}, result: null };

  function allSkus() {
    var out = [];
    D.products.forEach(function (product) {
      product.skus.forEach(function (sku) { out.push(Object.assign({ product: product }, sku)); });
    });
    return out;
  }

  function skuById(id) { return allSkus().filter(function (sku) { return sku.id === id; })[0]; }
  function candidates() { return candidateIds.map(skuById).filter(Boolean); }
  function totalQty() { return Object.keys(S.quantities).reduce(function (total, id) { return total + (S.quantities[id] || 0); }, 0); }
  function chosen() {
    return Object.keys(S.quantities).filter(function (id) { return S.quantities[id] > 0; }).map(function (id) {
      return { sku: skuById(id), qty: S.quantities[id] };
    });
  }
  function chosenIds() {
    var ids = [];
    chosen().forEach(function (item) {
      for (var i = 0; i < item.qty; i += 1) ids.push(item.sku.id);
    });
    return ids;
  }
  function tag(text, cls) { return '<span class="tag ' + (cls || '') + '">' + text + '</span>'; }
  function productPic(sku) { return '<div class="product-pic tone-' + sku.product.tone + '">' + sku.product.name.slice(0, 1) + '</div>'; }

  function pageShell(title, subtitle, body, crumb) {
    return '<div class="page-shell"><div class="topbar"><div class="breadcrumb">营销平台 / 卡券中心 / <b>' + (crumb || 'App与微信小程序') + '</b></div><div class="user"><span>原型演示环境</span><span class="avatar">产</span></div></div><div class="page-content"><div class="page-title-row"><div><h1 class="page-title">' + title + '</h1><p class="page-subtitle">' + subtitle + '</p></div></div>' + body + '</div></div>';
  }

  function phone(title, body, opts) {
    opts = opts || {};
    return '<div class="phone ' + (opts.cls || '') + '"><div class="phone-notch"></div><div class="mobile-nav">' + (opts.back ? '<span class="back" data-phone-back>‹</span>' : '') + title + '<span class="more">•••</span></div>' + body + '</div>';
  }

  function tabbar(active) {
    return '<div class="mobile-tabbar"><span>首页</span><span>商城</span><span class="' + (active === 'coupon' ? 'active' : '') + '">卡券</span><span>我的</span></div>';
  }

  function walletPhone() {
    var usable = D.coupon.status === '可使用';
    return phone('卡券中心', '<div class="mobile-body wallet-body"><div class="wallet-summary" data-anno="wallet-summary"><div><span>可使用</span><b>' + (usable ? '1' : '0') + '</b></div><div><span>已核销</span><b>' + (usable ? '1' : '2') + '</b></div><div><span>已失效</span><b>0</b></div></div><div class="wallet-tabs"><span class="active">可使用</span><span>已核销</span><span>已失效</span></div><article class="wallet-coupon" data-open-coupon data-anno="usable-coupon"><div class="wallet-coupon-main"><span class="wallet-coupon-type">兑换券</span><h3>' + D.coupon.name + '</h3><p>5件商品任选2件</p><div class="wallet-expire">有效期至 ' + D.coupon.validTo + '</div></div><div class="wallet-coupon-action"><b>' + D.coupon.status + '</b><button>立即使用</button></div></article><article class="wallet-coupon redeemed" data-anno="redeemed-coupon"><div class="wallet-coupon-main"><span class="wallet-coupon-type">兑换券</span><h3>智能座舱主题兑换券</h3><p>已兑换 2 件商品</p><div class="wallet-expire">核销时间 2026-10-01 16:35</div></div><div class="wallet-coupon-action"><b>已核销</b><button data-go="redeemed">查看内容</button></div></article></div>' + tabbar('coupon'));
  }

  function wallet() {
    var side = '<div class="side-stack"><section class="panel"><div class="panel-head">演示操作</div><div class="panel-body"><button class="btn btn-primary" data-open-coupon>从可使用卡券开始</button><button class="btn" data-go="redeemed">查看兑换后卡券</button></div></section></div>';
    return pageShell('卡券中心', 'App 卡包中的兑换券入口。', '<div class="mobile-workspace">' + walletPhone() + side + '</div>');
  }

  function productMini(sku) {
    return '<div class="product-mini ' + (!sku.available ? 'unavailable' : '') + '">' + productPic(sku) + '<div class="product-mini-info"><strong>' + sku.product.name + '</strong><p>' + sku.spec + (!sku.available ? ' · 暂不可兑换' : '') + '</p><button class="mobile-text-btn" data-product-detail="' + sku.id + '">查看详情</button></div></div>';
  }

  function detailView() {
    return '<div class="mobile-body"><div class="mobile-hero" data-anno="coupon-summary"><div class="type">兑换券</div><h2>' + D.coupon.name + '</h2><p>有效期至 ' + D.coupon.validTo + '</p></div><div class="mobile-card choice-rule"><b>5选2</b><span>5件商品任选2件</span></div><div class="mobile-card readonly-vin-card" data-anno="default-member-card"><div class="readonly-card-title"><h3>绑定车辆</h3></div><b>' + D.vehicle.model + '</b><p class="vin-value">' + D.vehicle.vin + '</p></div><div class="mobile-card" data-anno="candidate-preview"><h3>可兑换商品</h3>' + candidates().slice(0, 3).map(productMini).join('') + '<div class="more-products">还有2件，进入下一步查看</div></div><button class="mobile-cta" data-flow="select">去选商品</button></div>';
  }

  function selectView() {
    var total = totalQty();
    return '<div class="mobile-body select-body" data-anno="selection-methods"><div class="selection-tip" data-anno="sku-selection"><span>请选择 <b>2</b> 件</span><strong>已选 ' + total + '/2</strong></div>' + candidates().map(function (sku) {
      var qty = S.quantities[sku.id] || 0;
      var max = Math.min(sku.max, 2);
      var disabled = !sku.available;
      return '<article class="mobile-select-product ' + (disabled ? 'unavailable' : '') + '" data-sku="' + sku.id + '">' + productPic(sku) + '<div class="mobile-select-info"><strong>' + sku.product.name + (disabled ? '<em class="stock-sold-out">暂不可兑换</em>' : '') + '</strong><p>' + sku.spec + '</p><button class="mobile-text-btn" data-product-detail="' + sku.id + '">查看详情</button></div><div class="mobile-qty"><button data-qty="-" data-id="' + sku.id + '" ' + (!qty ? 'disabled' : '') + '>−</button><span>' + qty + '</span><button data-qty="+" data-id="' + sku.id + '" ' + (disabled || total >= 2 || qty >= max ? 'disabled' : '') + '>+</button></div></article>';
    }).join('') + '<div class="mobile-sticky-space"></div></div><div class="mobile-actionbar"><div><span>已选</span><b>' + total + '/2 件</b></div><button class="mobile-cta compact" data-flow="confirm" ' + (total !== 2 ? 'disabled' : '') + '>下一步</button></div>';
  }

  function confirmView() {
    return '<div class="mobile-body"><div class="mobile-card" data-anno="confirm-items"><h3>兑换商品</h3>' + chosen().map(function (item) {
      return '<div class="confirm-item">' + productPic(item.sku) + '<div><b>' + item.sku.product.name + '</b><span>' + item.sku.spec + '</span></div><strong>×' + item.qty + '</strong></div>';
    }).join('') + '</div><div class="mobile-card" data-anno="confirm-member-card"><h3>使用车辆</h3><div class="detail-line"><span>车型</span><b>' + D.vehicle.model + '</b></div><div class="detail-line"><span>VIN</span><b>' + D.vehicle.vin + '</b></div></div><button class="mobile-cta" data-submit="success" data-anno="confirm-submit">确认兑换</button></div>';
  }

  function groupItems(ids) {
    var counts = {};
    ids.forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
    return Object.keys(counts).map(function (id) {
      var sku = skuById(id);
      return '<div class="product-mini">' + productPic(sku) + '<div class="product-mini-info"><strong>' + sku.product.name + '</strong><p>' + sku.spec + ' · ×' + counts[id] + '</p></div></div>';
    }).join('');
  }

  function itemResultRows(record) {
    return (record.itemResults || []).map(function (item, index) {
      var sku = skuById(item.id);
      var success = item.status === 'success';
      return '<div class="result-product-row"><div class="result-product-index">' + (index + 1) + '</div>' + productPic(sku) + '<div class="result-product-copy"><strong>' + sku.product.name + '</strong><span>' + sku.spec + '</span></div><b class="result-product-state ' + (success ? 'success' : 'fail') + '">' + (success ? '成功' : '失败') + '</b></div>';
    }).join('');
  }

  function flowPhone() {
    var titles = { detail: '兑换券详情', select: '选择商品', confirm: '确认兑换' };
    var body = { detail: detailView, select: selectView, confirm: confirmView }[S.flow]();
    return phone(titles[S.flow], body, { back: S.flow !== 'detail', cls: 'flow-phone' });
  }

  function flowSteps() {
    var keys = ['detail', 'select', 'confirm'];
    var labels = ['1 券详情', '2 选商品', '3 确认'];
    var current = keys.indexOf(S.flow);
    return '<div class="flow-steps">' + labels.map(function (label, index) {
      return '<button class="' + (index === current ? 'active' : '') + ' ' + (index < current ? 'done' : '') + '" data-step="' + keys[index] + '" ' + (index > current ? 'disabled' : '') + '>' + label + '</button>';
    }).join('') + '</div>';
  }

  function scenarioControls() {
    if (S.flow !== 'confirm') return '';
    return '<section class="panel scenario-panel"><div class="panel-head">评审结果切换</div><div class="panel-body"><p class="side-copy">仅用于原型评审，不属于用户端页面。</p><div class="scenario-actions"><button class="btn" data-submit="success">全部成功</button><button class="btn" data-submit="partial">部分成功</button><button class="btn" data-submit="failed">全部失败</button></div></div></section>';
  }

  function flowSide() {
    return '<div class="side-stack">' + scenarioControls() + '<button class="btn" data-reset>重置兑换演示</button></div>';
  }

  function redeem() {
    return pageShell('前台兑换流程', 'App / 微信小程序兑换券流程。', flowSteps() + '<div class="mobile-workspace">' + flowPhone() + flowSide() + '</div>');
  }

  function redeemedPhone() {
    var record = S.result || D.partialRecord;
    var hasFailure = (record.itemResults || []).some(function (item) { return item.status !== 'success'; });
    return phone('卡券详情', '<div class="mobile-body"><div class="mobile-hero redeemed-hero"><div class="type">兑换券</div><h2>' + D.coupon.name + '</h2><p>' + record.couponStatus + '</p></div><div class="mobile-card" data-anno="redeemed-result"><h3>兑换信息</h3><div class="detail-line"><span>卡券状态</span><b>' + record.couponStatus + '</b></div><div class="detail-line"><span>兑换时间</span><b>' + record.time + '</b></div></div><div class="mobile-card" data-anno="redeemed-items"><h3>已兑换商品</h3>' + itemResultRows(record) + '</div>' + (hasFailure ? '<button class="mobile-secondary-cta" data-support data-anno="redeemed-support">联系客服</button>' : '') + '<div class="mobile-card readonly-vin-card" data-anno="redeemed-member-card"><h3>使用车辆</h3><b>' + D.vehicle.model + '</b><p class="vin-value">' + D.vehicle.vin + '</p></div></div>', { back: true });
  }

  function redeemed() {
    return pageShell('卡券详情', '查看已兑换商品及其结果。', '<div class="mobile-workspace">' + redeemedPhone() + '<div class="side-stack"><button class="btn" data-go="wallet">返回卡券中心</button></div></div>');
  }

  function showProduct(id) {
    var sku = skuById(id);
    var product = sku.product;
    window.openModal('<div class="modal-header"><div><h2>' + product.name + '</h2><p class="page-subtitle">商品详情</p></div><button class="modal-close" data-close-modal>×</button></div><div class="modal-body"><div class="product-detail-hero tone-' + product.tone + '">' + product.name.slice(0, 1) + '</div><h3>' + sku.spec + '</h3><p class="detail-description">' + product.desc + '</p><div class="detail-lines"><p><span>兑换状态</span><b>' + (sku.available ? '可兑换' : '暂不可兑换') + '</b></p></div></div><div class="modal-footer"><button class="btn btn-primary" data-close-modal>我知道了</button></div>');
  }

  function makeResult(kind, ids) {
    var source = kind === 'success' ? D.successRecord : D.partialRecord;
    var itemResults = ids.map(function (id, index) {
      var itemStatus = kind === 'success' ? 'success' : (kind === 'partial' && index === 0 ? 'success' : 'failed');
      return { id: id, status: itemStatus };
    });
    return Object.assign({}, source, { items: ids.slice(), itemResults: itemResults });
  }

  function showRedeemFailure(reason) {
    window.openModal('<div data-anno="redeem-failure-modal"><div class="modal-header"><div><h2>核销失败</h2></div><button class="modal-close" data-close-modal>×</button></div><div class="modal-body"><p class="detail-description">' + window.escapeHTML(reason) + '</p></div><div class="modal-footer"><button class="btn btn-primary" data-close-modal>我知道了</button></div></div>');
  }

  function submit(kind) {
    var overlay = document.createElement('div');
    overlay.className = 'sync-loading';
    overlay.innerHTML = '<div class="loader"></div><b>正在兑换…</b><p>请稍候</p>';
    document.body.appendChild(overlay);
    setTimeout(function () {
      overlay.remove();
      if (kind === 'failed') {
        showRedeemFailure(D.failedRecord.reason);
        return;
      }
      var ids = chosenIds();
      S.result = makeResult(kind, ids);
      D.coupon.status = '已核销';
      window.navigateTo('redeemed');
    }, 800);
  }

  function rerender() {
    var page = window.getCurrentPage && window.getCurrentPage();
    if (page && window.Pages[page]) document.getElementById('app').innerHTML = window.Pages[page].render();
    if (window.AnnotationRuntime) window.AnnotationRuntime.refresh();
  }

  function reset() {
    S.flow = 'detail';
    S.quantities = {};
    S.result = null;
    D.coupon.status = '可使用';
  }

  window.Pages = { wallet: { render: wallet }, redeem: { render: redeem }, redeemed: { render: redeemed } };

  window.revealGUIAnnotation = function (anno) {
    if (!anno || window.getCurrentPage() !== 'redeem' || !anno.state) return;
    if (anno.state === 'confirm' && totalQty() !== 2) S.quantities = { 'GUI-SKU-100101': 2 };
    S.flow = anno.state;
    rerender();
    return new Promise(function (resolve) { requestAnimationFrame(function () { requestAnimationFrame(resolve); }); });
  };

  document.addEventListener('click', function (event) {
    var target = event.target.closest('button,a,article');
    if (!target) return;
    if (target.dataset.go) { window.navigateTo(target.dataset.go); return; }
    if (target.hasAttribute('data-open-coupon')) { reset(); window.navigateTo('redeem'); return; }
    if (target.dataset.flow) { S.flow = target.dataset.flow; rerender(); return; }
    if (target.dataset.step) { S.flow = target.dataset.step; rerender(); return; }
    if (target.dataset.qty) {
      var id = target.dataset.id;
      var sku = skuById(id);
      var qty = S.quantities[id] || 0;
      var delta = target.dataset.qty === '+' ? 1 : -1;
      if (!sku.available || delta > 0 && totalQty() >= 2) return;
      S.quantities[id] = Math.max(0, Math.min(Math.min(sku.max, 2), qty + delta));
      rerender();
      return;
    }
    if (target.dataset.productDetail) { showProduct(target.dataset.productDetail); return; }
    if (target.dataset.submit) { submit(target.dataset.submit); return; }
    if (target.hasAttribute('data-reset')) { reset(); rerender(); return; }
    if (target.hasAttribute('data-support')) { window.showToast('已模拟唤起在线客服'); return; }
    if (target.hasAttribute('data-reuse')) { reset(); window.navigateTo('redeem'); return; }
    if (target.hasAttribute('data-phone-back')) {
      if (window.getCurrentPage() === 'redeem') {
        var back = { select: 'detail', confirm: 'select' };
        S.flow = back[S.flow] || 'detail';
        rerender();
      } else {
        window.navigateTo('wallet');
      }
    }
  });
})();
