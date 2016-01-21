
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

function setupExperienceCarousels() {
  $('.owl-carousel').each(function() {
    var options = {
      lazyLoad: true,
      scrollPerPage: true,
      navigation: true,
      navigationText: [
        '<span class="glyphicon glyphicon-chevron-left"></span>',
        '<span class="glyphicon glyphicon-chevron-right"></span>'
      ]
    };
    $(this).owlCarousel(options);
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
  setupExperienceCarousels();
});
