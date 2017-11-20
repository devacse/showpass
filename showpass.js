(function(){

  function getPasswords(){
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {method: 'getPasswords'}, function(res) {
         console.log(res);
         if(typeof(res)=="undefined" || res.passwords.length < 1){
           $('#passCount').append( "<li> No passwords found on this page. </li>");

           }else {
             for (var i = 0; i < res.passwords.length; i++) {
                 if(res.passwords[i]!=null){
                   $('#passCount').append( "<li>"+res.passwords[i]+"</li>");
                 }
             }
           }

      });
    });
  }

  function showPasswords(){
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {method: 'showPasswords'}, function(res) {

      });
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
      var passCount  = $('#passCount');
      var viewPassBtn = $('#viewPassBtn');
      var showPassBtn = $('#showPassBtn');

      var getPass = getPasswords();

      showPassBtn.click(function(){
        showPasswords();
      });

      viewPassBtn.click(function(){
        passCount.slideDown(200);
      });

  });

})();
