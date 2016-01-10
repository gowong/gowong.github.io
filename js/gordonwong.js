
function showTab(tabId) {
  $('#tabs a[href="' + tabId + '"]').tab('show');
}

$(function() {
  // Show tab indicated by the URL hash
  if(window.location.hash) {
      showTab(window.location.hash);
  }

  // Select news tab when clicking link in footer
  $('#footer-news-link').click(function (e) {
    showTab('#news');
  });
});
