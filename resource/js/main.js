/*Setting Cookie*/
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
//Getting cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
  }
  return "";
}
// clearCookie
function clearCookie(name) {
  setCookie(name, "", -1);
}
// checkCookie();
function checkCookie() {
  var user = getCookie("username");
  if (user !== "") {
    // alert("Welcome again " + user);
    console.log(`Welcome page In the construction of`);
  } else {
    user = prompt("Please enter your name:", "");
    if (user !== "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

/* inserting nav*/
/*(function (){
  let dom_body = document.getElementsByTagName("body")[0];
  // console.log(dom_body);
  let newNode = document.createElement("div");
  
  newNode.innerHTML = "3258";
  
  let nav = `<nav>
                    <ul class="nav_page">
                      <li class="page_active">
                        <a href="./index.html">Index</a>
                      </li>
                      <li class="menu_os page_active">
                        <a href="page/subpage/exploitSoft.html">Operating System</a>
                        <ul class="menu_list list_os">
                          <li><a href="./page/subpage/linux_command.html">Linux目录操作命令</a></li>
                          <li><a href="./page/subpage/hardware.html">硬件/设备</a></li>
                        </ul>
                      </li>
                      <li class="page_active">
                        <a href="./page/soft.html" class="menu_soft">Soft</a>
                        <ul class="menu_list list_os">
                          <li><a href="./page/Tools.html">Tools</a></li>
                        </ul>
                      </li>
                      <li class="page_active">
                        <a href="./page/about.html">About me</a>
                      </li>
                    </ul>
                  </nav>`;
  
  $("body").before(nav);
  
  
}())*/



