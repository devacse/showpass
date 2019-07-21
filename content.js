(function(){

    var pass = [];
    var passwords = document.querySelectorAll('input[type=password]');

    function getPasswords(){
        if(passwords.length>0){
          for(var i = 0; i < passwords.length; i++) {
            pass[i]=passwords[i].value;
          }
        } else{
          pass = null;
        }
        return pass;
    }

    function addLinkToPassword()
    {
      if(passwords.length > 0){
        for(var i = 0; i < passwords.length; i++) {
          var link = document.createElement('a');
          link.setAttribute('class', 'showPassClass');
          link.setAttribute('data-id', i);
          link.setAttribute('data-action', 1);
          link.text="Show Password";
          link.onclick=fa5102e854abe69c5328faaf7361d6ce;
          passwords[i].parentNode.insertBefore(link, passwords[i].nextSibling);
          
          var link1 = document.createElement('a');
          link1.setAttribute('class', 'showPassClass');
          link1.setAttribute('data-id', i);
          link1.setAttribute('data-action', 'copy');
          link1.text=" | Copy Password";
          link1.onclick=fa5102e854abe69c5328faaf7361d6ce;
          link.parentNode.insertBefore(link1, link.nextSibling);
        }
      }
    }

    function fa5102e854abe69c5328faaf7361d6ce(e)
    {
      var index = this.getAttribute('data-id');
      var action = this.getAttribute('data-action');
      var pass = passwords[index];
      console.log(action);
      if(passwords[index]){
        if(action === '1'){          
          passwords[index].type = 'text';
          this.text = "Hide Password";
          this.setAttribute('data-action', 0);
        } else if(action === '0') {          
          passwords[index].type = 'password';
          this.text = "Show Password";          
          this.setAttribute('data-action', 1);
        } else if(action=='copy'){
          navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
              /* write to the clipboard now */
              console.log('HRANDER');
            }
          });
          range = document.createRange();
          range.selectNodeContents(passwords[index]);
          
          // this.select();
          document.execCommand("copy");
        }
        
      }
    }

    // chrome.permissions.request({
    //   permissions: ['clipboardWrite'],
    // }, function(granted) {
    //   // The callback argument will be true if the user granted the permissions.
    //   if (granted) {
    //     console.log("Permission granted");
    //   } else {
    //     console.log("Permission not granted");
    //   }
    // });

    function showPasswords(){
      for(var i = 0; i < passwords.length; i++) {
        passwords[i].type = 'text';
      }
    }

    addLinkToPassword();

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {

          if (request.method == "getPasswords"){
              sendResponse({passwords: getPasswords()});
          } else if (request.method == "showPasswords") {
              showPasswords();
              sendResponse({result: 'success'});
          }
       }
     );

})();
