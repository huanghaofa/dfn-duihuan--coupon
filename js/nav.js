(function () {
  'use strict';

  var _config = null;
  var _currentPage = (location.hash || '#wallet').slice(1);
  var _fallbackConfig = {
    menu: [{ key: 'mobile', label: '前台原型（App / 小程序）', icon: '▣', children: [
      { key: 'wallet', label: '卡券中心' },
      { key: 'redeem', label: 'GUI皮肤兑换流程' },
      { key: 'redeemed', label: '卡券详情' }
    ] }]
  };

  /* ---- Load nav config from config/nav.json ---- */
  function loadConfig() {
    return fetch('config/nav.json')
      .then(function (res) { return res.json(); })
      .then(function (cfg) {
        _config = cfg;
        render();
        window.navigateTo(_currentPage);
      })
      .catch(function (err) {
        console.info('config/nav.json unavailable; using embedded navigation for direct file access.');
        _config = _fallbackConfig;
        render();
        window.navigateTo(_currentPage);
      });
  }

  /* ---- Render menu tree into #main-nav ---- */
  function render() {
    var navEl = document.getElementById('main-nav');
    if (!navEl || !_config || !_config.menu) return;
    var html = buildTree(_config.menu, 0);
    navEl.innerHTML = html;
    bindClicks(navEl);
    highlightCurrent();
  }

  function buildTree(items, depth) {
    if (!items || !items.length) return '';
    var cls = depth === 0 ? 'nav-list nav-list--root' : 'nav-list nav-list--sub';
    return '<ul class="' + cls + '">' + items.map(function (item) {
      var hasChildren = item.children && item.children.length;
      var linkCls = 'nav-link' + (hasChildren ? ' nav-link--group' : '');
      var icon = item.icon ? '<span class="nav-icon">' + item.icon + '</span>' : '';
      return '<li class="nav-item' + (hasChildren ? ' nav-item--group' : '') + '">' +
        '<a href="#" class="' + linkCls + '" data-page="' + (item.key || '') + '">' +
        icon + '<span class="nav-label">' + (item.label || '') + '</span></a>' +
        (hasChildren ? buildTree(item.children, depth + 1) : '') +
        '</li>';
    }).join('') + '</ul>';
  }

  function bindClicks(navEl) {
    var links = navEl.querySelectorAll('.nav-link[data-page]');
    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var pageKey = this.getAttribute('data-page');
        if (pageKey) window.navigateTo(pageKey);
      });
    });
  }

  function highlightCurrent() {
    var navEl = document.getElementById('main-nav');
    if (!navEl) return;
    var prev = navEl.querySelector('.nav-link.active');
    if (prev) prev.classList.remove('active');
    var cur = navEl.querySelector('.nav-link[data-page="' + _currentPage + '"]');
    if (cur) cur.classList.add('active');
  }

  /* ---- Navigate to page ---- */
  window.navigateTo = function (pageKey) {
    if (!window.Pages || !window.Pages[pageKey]) {
      if (pageKey !== 'wallet') return window.navigateTo('wallet');
      return;
    }
    _currentPage = pageKey;
    var page = window.Pages && window.Pages[pageKey];
    if (!page || typeof page.render !== 'function') return;
    document.getElementById('app').innerHTML = page.render();
    if (typeof page.init === 'function') page.init();
    if (location.hash !== '#' + pageKey) history.replaceState(null, '', '#' + pageKey);
    window.scrollTo(0, 0);
    highlightCurrent();
    if (window.AnnotationRuntime) window.AnnotationRuntime.refresh();
  };

  window.getCurrentPage = function () {
    return _currentPage;
  };

  window.getNavConfig = function () {
    return _config;
  };

  window.addEventListener('hashchange', function () {
    var next = (location.hash || '#wallet').slice(1);
    if (window.Pages && window.Pages[next]) window.navigateTo(next);
    else window.navigateTo('wallet');
  });

  /* ---- Init ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadConfig);
  } else {
    loadConfig();
  }
})();
