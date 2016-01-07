$(function() {
  // Select news tab when clicking link in footer
  $('#footer-news-link').click(function (e) {
    $('#tabs a[href="#news"]').tab('show');
  });
});
