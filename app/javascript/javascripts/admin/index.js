import compareVersion from 'compare-versions';
const newVesionUrl = 'https://api.github.com/repos/tryzealot/zealot/releases/latest';

$(document).on('turbolinks:load', () => {
  var elm = $('#new-version');
  if (!elm.length) { return; }

  var current_version = $('#current-version').html();
  if (current_version == 'development') { return; }

  fetch(newVesionUrl, {
    method: 'GET',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/vnd.github.v3+json'
    }
  }).then((response) => response.json())
    .then(json => {
      var latest_version = json.tag_name;
      if (compareVersion(latest_version, current_version) <= 0) { return; }

      var release_link = json.html_url;
      elm.html(
        '<a target="_blank" href="' + release_link + '">' +
        '<i class="fas fa-rainbow"></i>发现新版本 ' + latest_version + '</a>');
  });
});