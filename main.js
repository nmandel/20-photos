$(document).ready(function() {

  hello.init({
    "facebook": "884342831617060"
  }, {
    scope: "files, photos",
    redirect_uri: "redirect.html"
  })

  hello.on('auth.login', function(auth) {
    console.log('logging in with fb', auth.network);
    hello('facebook').api('/me').then(function(r) {
      console.log(r.name + " is logged in");
      setupSlideshow();
      // $('#your-name').text('Welcome ' + r.name);
    });
    
  })

  $('#login').click(function() {
    hello('facebook').login();
    $('#btn').hide();
    setupSlideshow()
  });

  function setupSlideshow() {
    getPhotos();
    // fotorama needs to be called after all of the photos are loaded in
    setTimeout(function() {
      $('.fotorama').fotorama();
    }, 750);
  }

  function getPhotos () {
    console.log('connecting to fb');
    hello('facebook').login({
      force: false
    }, function(auth) {
      hello('facebook').api('me/photos', 'get', {limit: 20, width:1000, height: 1000}).then(function(r) {
        if (!r || r.error) {
          console.log('Error opening photos');
          return;
        }
        else if (!r.data || r.data.length === 0) {
          console.log('No photos available');
          return;
        }
        for (var i = 0; i < r.data.length; i++) {
          $('.fotorama').append('<img src="'+ r.data[i].source +'" />');
        }
      })
    })
  }

})
