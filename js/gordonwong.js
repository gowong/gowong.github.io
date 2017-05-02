
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
  $(window).on('scroll', $.debounce(250, true, lightbox.close));
}

function registerSoftwareThumbnailClickHandlers() {
  var clickHandler = function(experienceItemSelector) {
    // Wait for tab animation and tab content to finish loading after switching
    // to experience tab
    setTimeout(function() {
      // Scroll to item
      $('html, body').animate({
        scrollTop: $(experienceItemSelector).offset().top
      }, 800);
    }, 1000);
  };

  $('.software-thumbnail').each(function() {
    $(this).click(function() {
      var dataTarget = $(this).attr('data-target');
      if (dataTarget) {
        clickHandler(dataTarget);
      }
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
      // Can only be used with the singleItem option
      options.autoHeight = true;
    }

    $(this).owlCarousel(options);
  });
}

function setupPhotoGallery() {
  var flickrUserId = '129081259@N03';

  $('#photo-gallery').nanoGallery({
    kind: 'flickr',
    userID: flickrUserId,
    photoset: 'none',
    photoSorting: 'standard',
    thumbnailWidth: 'auto',
    thumbnailHeight: 300,
    thumbnailLabel: {
      display: true,
      position: 'overImageOnMiddle',
      hideIcons: true,
      align: 'center'
    },
    thumbnailHoverEffect: [
      { name: 'labelAppear75', duration: 300 },
    ],
    theme: 'light',
    colorScheme: 'none',
    thumbnailGutterWidth: 8,
    thumbnailGutterHeight: 8,
    locationHash: false,
    displayBreadcrumb: false,
    fnThumbnailInit: onPhotoGalleryThumbnailInit,
    fnThumbnailOpen: onPhotoGalleryThumbnailOpen.bind(this, flickrUserId)
  });
}

function onPhotoGalleryThumbnailInit(thumbnail) {
  var $thumbnail = $(thumbnail[0]);
  $thumbnail.addClass('thumbnail');
}

function onPhotoGalleryThumbnailOpen(flickrUserId, items) {
  var openedItem = items[0];
  var itemURL = 'https://www.flickr.com/photos/' + flickrUserId + '/' + openedItem.GetID();
  window.open(itemURL);
}

$(function() {
  // Update URL hash when switching tabs
  $('#tabs a[data-toggle="tab"]').on('click', function(e) {
    history.pushState(null, null, $(this).attr('href'));
  });

  // Switch tabs when browser history changes
  window.addEventListener('popstate', function(e) {
    // Default to software tab
    showTab(location.hash || '#software');
  });

  // Setup photo gallery when the photos tab is clicked
  $('#photos-tab-link').on('shown.bs.tab', function() {
    // If the photo gallery is already setup, calling setup() again won't have any effect
    // HACK to fix photo gallery occassionally failing to load, possibly due to DOM not
    // being ready when setup() is called.
    setTimeout(setupPhotoGallery, 0);
  });

  // Setup photo gallery the first time the photos tab is clicked
  var isPhotoGallerySetup = false;
  $('#photos-tab-link').on('shown.bs.tab', function() {
    if (isPhotoGallerySetup) {
      // Refresh the gallery size to fix the gallery disappearing when the window
      // is resized and a different tab is selected
      $('#photo-gallery').nanoGallery('refreshSize');
      return;
    }
    setupPhotoGallery();
    isPhotoGallerySetup = true;
  });

  registerSoftwareThumbnailClickHandlers();
  registerLightboxHandlers();
  setupExperienceCarousels();

  // Show tab matching URL hash when page is refreshed
  // NOTE: This must be done after all tab listeners are registered
  if (location.hash) {
    showTab(location.hash);
  }
  // Default to software tab
  else {
    showTab('#software');
  }
});
