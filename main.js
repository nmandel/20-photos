$(document).ready(function() {
  hello.init({
    "facebook": "884342831617060"
  })

  hello.on('auth.login', function(auth) {
    console.log('logged in with fb', auth.network);
    hello('facebook').api('/me').then(function(r) {
      $('#profile').append('<img src="'+ r.thumbnail +'" /> Hey '+r.name);
    });
    // hello.api('facebook' + ':me/albums', function(r) {
    //   if (!r || r.error) {
    //     console.log('err opening albums');
    //     return;
    //   }
    //   else if (!r.data || r.data.length === 0) {
    //     console.log('no albums');
    //     return;
    //   }
      
    // })
  })

  $('#login').click(function() {
    console.log('connecting to fb');
    hello('facebook').login();
  })

})
