(function () {
  document
    .querySelector('meta[name="viewport"]')
    ?.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
    );
  const style = document.createElement('style');
  style.innerHTML = `
    #SidebarContainer .SidebarChannel .SidebarLink {
      width: 100% !important;
    }
    .MenuWrapper, .post-menu__item--wide {
      display: none !important;
    }
    .FollowButton {
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);

  var wmSelectors =
    '.__wm,[class*="__wm"],[class*="watermark"],[data-watermark],[data-v-watermark]';
  function cleanWatermark() {
    var i, el, list = document.querySelectorAll(wmSelectors);
    for (i = 0; i < list.length; i++) list[i].remove();
    if (!document.body) return;
    if (document.body.style.backgroundImage) document.body.style.backgroundImage = 'none';
    for (i = 0, list = document.body.children; i < list.length; i++) {
      el = list[i];
      if (el.style && el.style.backgroundImage) el.style.backgroundImage = 'none';
    }
  }
  var wmStyle = document.createElement('style');
  wmStyle.id = 'alook-hide-wm';
  wmStyle.textContent =
    wmSelectors +
    '{display:none!important;visibility:hidden!important;opacity:0!important;}body>*{background-image:none!important;}';
  document.head.appendChild(wmStyle);

  function run() {
    document.querySelector('.app-bar')?.remove();
    document.querySelectorAll('.post-menu__item')?.forEach(function (el) {
      el.classList.add('icon', 'icon-apps');
    });
    cleanWatermark();
  }

  function isRelevant(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      if (m.addedNodes && m.addedNodes.length) return true;
      if (m.type === 'attributes' && m.attributeName === 'style') {
        var t = m.target;
        if (t === document.body || t.parentNode === document.body) return true;
      }
    }
    return false;
  }
  var observeTimer;
  var observer = new MutationObserver(function (mutations) {
    if (!isRelevant(mutations)) return;
    observer.disconnect();
    run();
    clearTimeout(observeTimer);
    observeTimer = setTimeout(function () {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style'],
      });
    }, 80);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style'],
  });
  run();
  setTimeout(cleanWatermark, 300);
  setTimeout(cleanWatermark, 1200);
  setInterval(cleanWatermark, 2500);
})();
