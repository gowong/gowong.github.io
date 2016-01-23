
function showTab(tabId) {
  $('#tabs a[href="' + tabId + '"]').tab('show');
}

function registerLightboxHandlers() {
  var lightbox = lity();
  var colorThief = new ColorThief();

  // Lightbox must be opened programmatically to be controlled programmatically
  $(document).on('click', '[data-lightbox]', function(event) {
    var elImage = event.target;
    // Get image's dominant color
    var color = colorThief.getColor(elImage);

    // Open lightbox
    lightbox(elImage.src);

    // Set lightbox's background color
    var rgba = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',0.85)';
    $('.lity').css('background-color', rgba);
  });

  // Listen for open events
  $(document).on('lity:open', function(event, elLightbox, trigger) {
    // Close when clicking the image (default behavior only closes when
    // clicking outside of the image)
    $(elLightbox).on('click', lightbox.close);
  });

  // Close when scrolling the window
  $(window).on('scroll', lightbox.close);
}

function registerSoftwareThumbnailClickHandlers() {
  var clickHandler = function(experienceItemSelector) {
    // Show experience tab
    showTab('#experience');

    // Wait for tab animation and tab content to finish loading
    setTimeout(function() {
      // Scroll to item
      $('html, body').animate({
        scrollTop: $(experienceItemSelector).offset().top
      }, 700);
    }, 800);
  };

  $('.software-thumbnail').each(function() {
    $(this).click(function() {
      clickHandler($(this).attr('data-target'));
    });
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

    // Determine number of items on each page
    var dataItems = $(this).attr('data-items');
    if (dataItems) {
      options.items = dataItems;
    } else {
      options.singleItem = true;
      options.autoHeight = true;
    }

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
  registerLightboxHandlers();
  setupExperienceCarousels();
});
