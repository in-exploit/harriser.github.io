'use strict';
(function() {
  var $ = document.querySelector.bind(document);
  function Bookmark(raw) {
    this.tree = JSON.parse(raw);
    this.html = '';
    this.count = 0;
    this.first = true;
  }
  function chromeTime2TimeT(time) {
    return Math.floor((time - 11644473600000000) / 1000000);
  }
  Bookmark.prototype.walk = function(node) {
    if (node.type === 'folder') {
      this.html += '<DT><H3 ADD_DATE="' + chromeTime2TimeT(node.date_added) + '" LAST_MODIFIED="' + chromeTime2TimeT(node.date_modified) + '"';
      if (this.first) {
        this.html += ' PERSONAL_TOOLBAR_FOLDER="true"';
        this.first = false;
      }
      /*this.html += '>' + node.name + '</H3>\n';
      this.html += '<DL><p>\n'
      node.children.forEach(this.walk.bind(this));
      this.html += '</DL><p>\n';*/
      
      this.html +=`>${node.name}</H3>\n
                      <DL><p>\n
                      ${node.children.forEach(this.walk.bind(this))}
                      </DL><p>\n`;
      
    } else { // node.type == 'url'
      // this.html += '<DT><A HREF="' + node.url + '" ADD_DATE="' + chromeTime2TimeT(node.date_added) + '">' + node.name + '</A>\n';
      this.html += `<DT><A HREF="${node.url} ADD_DATE="${chromeTime2TimeT(node.date_added)}"> ${node.name}'</A>\n`;
      this.count++;
    }
  }
  Bookmark.prototype.parse = function() {
    this.html = '<!DOCTYPE NETSCAPE-Bookmark-file-1><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"><TITLE>Bookmarks</TITLE><H1>Bookmarks</H1>\n';
    // this.html += '<DL><p>\n';
    this.html += `<DL><p>\n`;
    var roots = this.tree.roots;
    this.walk(roots.bookmark_bar);
    if (roots.other.children.length > 0)
      this.walk(roots.other);
    if (roots.synced.children.length > 0)
      this.walk(roots.synced);
    this.html += '<style>dt, dl { padding-left: 12px; }</style>\n';
  }
  Bookmark.prototype.newLink = function() {
    var blob = new Blob([this.html], {type: 'text/plain'});
    var a = document.createElement('a');
    a.download = 'bookmark_backup.html';
    a.href = window.URL.createObjectURL(blob);
    // a.textContent = 'Download ready (' + this.count + ' bookmarks found)';
    a.textContent = `点击此处下载，（${this.count} 个书签被发现）`;
    a.onclick = function(e) {
      if ('disabled' in this.dataset) {
        return false;
      }
      this.textContent = 'Downloaded';
      this.dataset.disabled = true;
      setTimeout(function() {
        window.URL.revokeObjectURL(this.href);
      }, 1500);
    };
    return a;
  }
  function readFile(file) {
    var reader = new FileReader();
    var li = document.createElement('li');
    let fileSize = (file.size /1024 ).toFixed(2);
    // li.innerHTML = '<strong>Last updated: ' + (file.lastModifiedDate !== undefined ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '</strong> (' + file.size + 'B) ';
    li.innerHTML=`<strong>文件最后修改时间: ${(file.lastModifiedDate !== undefined ? file.lastModifiedDate.toLocaleDateString() : 'n/a')}</strong> ${fileSize} KB `;
    reader.onloadend = function() {
      try {
        var bookmark = new Bookmark(reader.result);
        bookmark.parse();
        li.appendChild(bookmark.newLink());
      } catch(e) {
        // li.innerHTML += '<b>Error! The file is invalid. Try again!</b>';
        li.innerHTML += `<strong>错误！文件无效。再试一次！</strong>`;
      }
    };
    reader.readAsText(file);
    return li;
  }
  var input = $('#input');
  var output = $('.output');
  function handleFile(e) {
    var files = e.target.files;
    output.textContent = 'Loading ...';
    var ul = document.createElement('ul');
    for (var i = 0; i < files.length; i++) {
      ul.appendChild(readFile(files[i]));
    }
    output.innerHTML = '';
    output.setAttribute('aria-hidden', false);
    output.appendChild(ul);
  }
  input.addEventListener('change', handleFile, false);
  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    output.textContent = 'Loading ...';
    var ul = document.createElement('ul');
    for (var i = 0; i < files.length; i++) {
      ul.appendChild(readFile(files[i]));
    }
    output.innerHTML = '';
    output.appendChild(ul);
    this.classList.remove('is_dragover');
  }
  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.classList.add('is_dragover');
  }
  function handleDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.classList.remove('is_dragover');
  }
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  dropZone.addEventListener('dragleave', handleDragLeave, false);
  var solns = ["#windows", "#mac", "#linux", "#google"];
  function handleHashChange(e) {
    var hash = location.hash;
    for (var i = 0; i < solns.length; i++) {
      var id = solns[i];
      var tab = $(id + '-tab');
      var soln = $(id + '-soln');
      var visible;
      if (hash === id) {
        tab.classList.add('active');
        soln.classList.add('show');
        visible = true;
      } else {
        tab.classList.remove('active');
        soln.classList.remove('show');
        visible = false;
      }
      tab.setAttribute('aria-selected', visible);
      soln.setAttribute('aria-hidden', !visible);
    }
  }
  window.addEventListener('hashchange', handleHashChange, false);
  if (location.hash == '') location.hash = '#windows';
  handleHashChange();
  function toggleZip(e) {
    var visible = this.parentNode.classList.toggle('unzip');
    this.setAttribute('aria-expanded', visible);
    this.nextElementSibling.setAttribute('aria-hidden', !visible);
  }
  var zipH = document.querySelectorAll('.zip-h');
  for (var i = 0; i < zipH.length; i++) {
    zipH[i].addEventListener('click', toggleZip, false);
  }
}());

  // main common content
  $(function(){
    let html =
      `<li>在搜索栏中输入<code>Bookmarks</code>，你会看到一个名为<code>Bookmarks</code>或<code>Bookmarks.bak</code>的文件。(<i>注:如果有多个用户使用同一个Chrome，则也会列出其他用户的书签</i>)</li>
        <li>用鼠标选择所有文件并拖动到下面的区域。</li>
        <li>下载所有的HTML文件。</li>
        <li>用Chrome打开每个HTML文件，确定包含你的书签的HTML文件。(<i>注:最大的文件很可能是正确的一个</i>)</li>
        <li>在你的Chrome浏览器中，点击Chrome菜单图标，进入书签&gt;书签管理器。</li>
        <li>单击搜索栏旁边的菜单图标，然后单击“导入书签”。</li>
        <li>选择包含书签的HTML文件。</li>
        <li>您的书签现在应重新导入到Chrome。</li>`;
    
    $('.common').append(html)
    
  });
