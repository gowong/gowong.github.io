
function showTab(tabId) {
  $('#tabs a[href="' + tabId + '"]').tab('show');
}

function registerSoftwareThumbnailClickHandlers() {
  // Show experience tab when clicking a software thumbnail
  var clickHandler = function() {
    showTab('#experience');
  };
  $('.software-thumbnail').each(function() {
    $(this).click(clickHandler);
  });
}

$(function() {
  // Show tab indicated by the URL hash
  if (window.location.hash) {
      showTab(window.location.hash);
  }

  // Show news tab when clicking link in footer
  $('#footer-news-link').click(function() {
    showTab('#news');
  });

  registerSoftwareThumbnailClickHandlers();
});
