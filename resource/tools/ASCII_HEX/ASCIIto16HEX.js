var editor1 = CodeMirror.fromTextArea(document.getElementById("code1"), {
    lineNumbers: true,
    lineWrapping: true,
  });
  var editor2 = CodeMirror.fromTextArea(document.getElementById("code2"), {
    lineNumbers: true,
    lineWrapping: true,
  });
  editor1.on('change', function () {
    query();
  });

  function query() {
    $('#spinner').css('visibility', 'visible');
    editor2.setValue("Invalid Input");
    editor2.setValue(ascii_to_hex(editor1.getValue(), document.getElementById("Delimiter").value));
    finished_spin_hidden();
  }

  function ascii_to_hex(input_str, delimiter) {
    var arr1 = [];
    for (var n = 0, l = input_str.length; n < l; n++) {
      var hex = Number(input_str.charCodeAt(n)).toString(16);
      if (hex.length==1){
        hex = '0' + hex;
      }
      arr1.push(hex);
    }
    result = arr1.join(delimiter);
    if (delimiter != ' ') {
      result = delimiter + result;
    }
    return result;
  }

  function loadexample() {
    clear_txt();
    editor1.setValue("This is an example.");
    $('#submit_button').trigger('click');
  }

  function clear_txt() {
    editor1.setValue("");
    editor2.setValue("");
  }

  function copy_to_clipboard() {
    var copy_button = document.getElementById("copy");
    editor2.focus();
    editor2.execCommand("selectAll");
    document.execCommand("copy");
    copy_button.innerHTML = copied_button_text;
    setTimeout(function () {
      copy_button.innerHTML = copy_button_text;
    }, 1000);
  }

var copy_button_text = "<i class=\"far fa-copy\"></i> 复制结果";
  var copied_button_text = "<i class=\"far fa-copy\"></i> 成功复制结果";

  function finished_spin_hidden() {
    setTimeout(function () {
      $('#spinner').css('visibility', 'hidden');
    }, 200);
  }

  function code2_error_alert() {
    var alert_element = document.getElementsByClassName("codewrapper")[1];
    alert_element.style.borderColor = '#d12f19';
    alert_element.style.borderWidth = "3px";
    setTimeout(function () {
      alert_element.style.borderColor = '#e1e1e1';
      alert_element.style.borderWidth = "1px";
    }, 1000);
  }

  $(document).keypress(function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $("#submit_button").click();
      //if ($("#google-search-input").is(':focus')) {
      //    $("#google-search-button").click();
      //} else {
      //    $("#submit_button").click();
      //}
    }
  });

  function download_editor2_as_txt(filename) {
    var blob = new Blob([editor2.getValue()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename);
  }

  $('div.tool-list > a.table-link').each(function (i, item) {
    let table_link_url_end = item.href.split("/").pop().toString();
    let window_url_end = window.location.href.split("/").pop().toString();
    if(table_link_url_end==window_url_end){
      $(this).addClass("table-link-corrent");
    }
  });
