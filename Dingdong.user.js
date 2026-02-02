(function() {
  const style = document.createElement('style');
  style.innerHTML = `
    #SidebarContainer .SidebarChannel .SidebarLink {
      width: 100% !important;
    }
    .MenuWrapper, .post-menu__item--wide {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(function() {
    document.querySelectorAll('.post-menu__item').forEach(function(element) {
      element.classList.add('icon', 'icon-apps');
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  document.querySelectorAll('.post-menu__item').forEach(function(element) {
    element.classList.add('icon', 'icon-apps');
  });
})();