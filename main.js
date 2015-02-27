$(document).ready(function() {

  hello.init({
    "facebook": "884342831617060"
  }, {scope: "files, photos"})

  hello.on('auth.login', function(auth) {
    console.log('logged in with fb', auth.network);
    hello('facebook').api('/me').then(function(r) {
      $('#your-name').text('Welcome ' + r.name);
    });
    
  })

  $('#login').click(function() {
    console.log('connecting to fb');
    hello('facebook').login();
    hello('facebook').api('me/photos', 'get', {limit: 20}).then(function(r) {
      console.log('data', r);
      if (!r || r.error) {
        console.log('err opening photos');
        return;
      }
      else if (!r.data || r.data.length === 0) {
        console.log('no photos');
        return;
      }
      for (var i = 0; i < r.data.length; i++) {
        $('#profile').append('<img src="'+ r.data[i].picture +'" />');
      }
    })
  })

})
