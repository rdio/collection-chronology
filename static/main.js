// load data from the server.
function load() {
  var username = $('#username').val();
  $('#dialog').slideUp();
  $('#loading').slideDown();

  // find the user
  $.getJSON('/user/'+encodeURIComponent(username), function(u) {
    var user = u['key'];
    var albumCount = 0;
    function loadNewAlbums() {
      $.getJSON('/myNewReleases/'+encodeURIComponent(user), function(a) {
        if (a.length > 0) {
          // update the ui
          albumCount += a.length
          $('#loading').text('Loaded '+albumCount+' albums...');

          // looks like there's nothing left to load
          $('#loading').slideUp();
          $('#instructions').show();
          $('#title h1 .userinfo').show();
          $('#title h1 .userlink').text(username).attr('href',
            function(i, val) { return 'http://www.rdio.com/people/' + username });
          $('#title h1 .reset').click(function() { location.reload(); });
          buildGraph(a);
        }
      })
    }

    loadNewAlbums();
  })
}

var rdio_cb = {};
rdio_cb.ready = function() {
}
rdio_cb.playStateChanged = function(playState) {
}
rdio_cb.playingTrackChanged = function(playingTrack, sourcePosition) {
  console.log('PLAYING TRACK CHANGED: '+sourcePosition);
  $('.track').removeClass('playing');
  if (sourcePosition >= 0) {
    $($('.track').get(sourcePosition)).addClass('playing');
  }
}

rdio_cb.playingSourceChanged = function(playingSource) {
  $('#controls .listen').attr('href', playingSource['shortUrl']);
  $('#tracks').empty();
  $.each(playingSource['tracks'], function(i, track) {
    var e = $('<li>').addClass('track').text(track.name).appendTo($('#tracks'))
    e.click(function() { player().rdio_setCurrentPosition(i); });
  })
}

function player() {
  return $('#api_swf').get(0);
}

function play(key, art) {
  player().rdio_play(key);
  $('#art').attr('src', art);
  $('#play').hide();
  $('#pause').show();
}

function buildGraph(albums) {
  // calculate width & height
  var min = Infinity, max = 0, height = 0;

  // size up our space
  $('#graph').css({'width': '80%', 'height': 'auto'});

  // draw a graph
  for (var i = 0; i < albums.length; i++) {
    var column;
    if (i % 3 == 0) {
      column = $('<div>').addClass('column');
      column.appendTo($('#graph'));
    }

    var album = albums[i];
    console.log(album);
    var art = $('<img>').addClass('album').attr('src', album['icon'].replace("200", "600"));
    art.attr('title', album['name'] + ' / ' + album['artist']);
    art.attr('id', album['key']);
    art.click(function() {
      $('#player').show();
      $('#instructions').hide();
      play($(this).attr('id'), $(this).attr('src'));
    })

    column.append(art);
  }
}

$(document).ready(function() {
  // when the user clicks "go", go.
  $('#go').click(function(){load()});
  // when the user presses enter, likewise
  $('#username').focus().keypress(function(e) {
    var c = e.which ? e.which : e.keyCode;
    if (c == 13) {
      load();
    }
  })


  $.getJSON('/flashvars', function(flashvars) {
    // load the swf
    var swf = 'http://www.rdio.com/api/swf/';
    flashvars['listener'] = 'rdio_cb';
    var params = {
      'allowScriptAccess': 'always'
    };
    var attributes = {};
    swfobject.embedSWF(swf, 'api_swf', 1, 1, '9.0.0', 'expressInstall.swf', flashvars, params, attributes);
  });


  // set up playback controls
  $('#prev').click(function() {
    player().rdio_previous();
  })
  $('#play').click(function() {
    player().rdio_play();
    $('#play').hide();
    $('#pause').show();
  })
  $('#pause').click(function() {
    player().rdio_pause();
    $('#play').show();
    $('#pause').hide();
  })
  $('#next').click(function() {
    player().rdio_next();
  })

});
