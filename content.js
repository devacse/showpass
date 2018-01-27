(function(){

    var pass = [];
    var inputs = document.getElementsByTagName('input');

    function getPasswords(){
        if(inputs.length>0){
          for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].type.toLowerCase() == 'password') {
                pass[i]=inputs[i].value;
            }
          }
        } else{
          pass = null;
        }
        return pass;
    }

    function showPasswords(){
      for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].type.toLowerCase() == 'password') {
          inputs[i].type = 'text';
        }        
      }
    }


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
