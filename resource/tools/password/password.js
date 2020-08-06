const DIGIT = "0123456789";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const CAPITAL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const PUNCTUATION = "!@#$%^*_+~|(){}[]:;?,./-=";
var Password = {
  generate: function(length=8, options) {
    if (length < 6) {
      length = 6;
    }
    options = options || {
      digit: true
    };
    for (let i in options) {
      if (options[i] !== true) {
        delete options[i];
      }
    }
    var containsPunctuation = options.punctuation === true
      , punctuationCount = 0;
    if (containsPunctuation) {
      if (length <= 6) {
        punctuationCount = 1;
      } else if (length > 6 && length <= 12) {
        punctuationCount = 2;
      } else if (length > 12 && length <= 18) {
        punctuationCount = 3;
      } else if (length > 18 && length <= 24) {
        punctuationCount = 4;
      } else if (length > 24 && length <= 30) {
        punctuationCount = 5;
      } else if (length > 30 && length <= 36) {
        punctuationCount = 6;
      } else if (length > 36 && length <= 42) {
        punctuationCount = 7;
      } else if (length > 42 && length <= 48) {
        punctuationCount = 8;
      } else if (length > 48 && length <= 54) {
        punctuationCount = 9;
      } else {
        punctuationCount = 10;
      }
    }
    var parts = Object.keys(options)
      , partLength = parts.length
      , perPartCount = 0;
    if (partLength === 1) {
      perPartCount = length;
      punctuationCount = length;
    } else {
      partLength = containsPunctuation ? partLength - 1 : partLength;
      perPartCount = Math.ceil((1 / partLength) * (length - punctuationCount));
    }
    var randomCode = '';
    if (options.digit === true) {
      randomCode += _randomCode(DIGIT, perPartCount);
    }
    if (options.lowercase === true) {
      randomCode += _randomCode(LOWERCASE, perPartCount);
    }
    if (options.capital === true) {
      randomCode += _randomCode(CAPITAL, perPartCount);
    }
    if (containsPunctuation) {
      randomCode += _randomCode(PUNCTUATION, punctuationCount);
    }
    if (randomCode === '') {
      randomCode += _randomCode(DIGIT, length);
    }
    if (randomCode.length > length) {
      randomCode = randomCode.substr(-1 * length);
    }
    return util.array.shuffle(randomCode.split('')).join('');
  },
  strength: {
    check: function(pswd) {
      var minimumLength = 6;
      var score = 0;
      if (pswd.length < minimumLength) {
        return 0;
      }
      score += pswd.length * 4;
      score += _checkRepetition(1, pswd).length - pswd.length;
      score += _checkRepetition(2, pswd).length - pswd.length;
      score += _checkRepetition(3, pswd).length - pswd.length;
      score += _checkRepetition(4, pswd).length - pswd.length;
      if (pswd.match(/(.*[0-9].*[0-9].*[0-9])/)) {
        score += 5;
      }
      var symbols = PUNCTUATION.split('').join(',');
      var regex = new RegExp('(.*[' + symbols + '].*[' + symbols + '])');
      if (pswd.match(regex)) {
        score += 5;
      }
      if (pswd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        score += 10;
      }
      if (pswd.match(/([a-zA-Z])/) && pswd.match(/([0-9])/)) {
        score += 15;
      }
      regex = new RegExp('([' + symbols + '])');
      if (pswd.match(regex) && pswd.match(/([0-9])/)) {
        score += 15;
      }
      if (pswd.match(regex) && pswd.match(/([a-zA-Z])/)) {
        score += 15;
      }
      if (pswd.match(/^\w+$/) || pswd.match(/^\d+$/)) {
        score -= 10;
      }
      if (score > 100) {
        score = 100;
      }
      if (score < 0) {
        score = 0;
      }
      return score;
    },
    draw: function(score) {
      var text, html;
      const WEAk_HTML = '<span class="pswd-weak"></span>'
        , NORMAL_HTML = '<span></span>'
        , MIDDLE_HTML = '<span class="pswd-middle"></span>'
        , STRONG_HTML = '<span class="pswd-strong"></span>';
      if (score <= 20) {
        text = '极弱';
        html = WEAk_HTML;
        html += NORMAL_HTML.repeat(4);
      } else if (score <= 40) {
        text = '弱';
        html = WEAk_HTML.repeat(2);
        html += NORMAL_HTML.repeat(3);
      } else if (score <= 60) {
        text = '中';
        html = MIDDLE_HTML.repeat(3);
        html += NORMAL_HTML.repeat(2);
      } else if (score <= 80) {
        text = '强';
        html = STRONG_HTML.repeat(4);
        html += NORMAL_HTML;
      } else {
        text = '极强';
        html = STRONG_HTML.repeat(5);
      }
      return {
        text: text,
        html: '<div class="pswd-strength" data-text="' + text + '">' + html + '</div>'
      }
    }
  },
};
function _randomCode(code, length) {
  if (code.length < length) {
    code = code.repeat(Math.ceil(length / code.length));
  }
  var shuffled = util.array.shuffle(code.split(''));
  if (shuffled.length > length) {
    shuffled = shuffled.slice(0, length);
  }
  return shuffled.join('');
}
function _checkRepetition(rLen, str) {
  var res = ""
    , repeated = false;
  for (var i = 0; i < str.length; i++) {
    repeated = true;
    for (var j = 0; j < rLen && (j + i + rLen) < str.length; j++) {
      repeated = repeated && (str.charAt(j + i) === str.charAt(j + i + rLen));
    }
    if (j < rLen) {
      repeated = false;
    }
    if (repeated) {
      i += rLen - 1;
      repeated = false;
    } else {
      res += str.charAt(i);
    }
  }
  return res;
}
;(function(w) {
    var displayAs = 'table';
    var passwords = []
      , $result = null;
    var _getPasswordsAsTable = function() {
      var pswdRows = ''
        , pswdRowTemplate = $('#password-row-template').html();
      passwords.forEach(function(pswd, index) {
        score = Password.strength.check(pswd);
        pswdRows += util.string.format(pswdRowTemplate, {
          class: 'pswd-' + index,
          password: pswd,
          strength: Password.strength.draw(score).html
        });
      });
      return pswdRows;
    };
    var displayAsTable = function() {
      if (!passwords) {
        return;
      }
      $result = $result ? $result : $('.result-section').removeClass('hidden').find('.result-content');
      var pswdTable = util.string.format($('#password-table-template').html(), {
        length: passwords[0].length
      });
      var content = _getPasswordsAsTable();
      $result.html(pswdTable).find('tbody').html(content);
      $('.btn-display-as').html('显示为纯文本');
      displayAs = 'table';
    }
    var _getPasswordsAsText = function() {
      var template = $('#password-text-template').html();
      return util.string.format(template, {
        passwords: passwords.join("\n"),
      })
    };
    var displayAsText = function() {
      if (!passwords) {
        return;
      }
      $result = $result ? $result : $('.result-section').removeClass('hidden').find('.result-content');
      var content = _getPasswordsAsText();
      $result.html(content);
      $('.btn-display-as').html('显示为表格');
      displayAs = 'text';
    }
    w.clickHandler = {
      generate: function($element) {
        passwords = [];
        var $count = $('#count')
          , count = parseInt($.trim($count.val()));
        if (isNaN(count) || count < 1) {
          count = 1;
          $count.val(count);
        } else if (count > 100) {
          count = 100;
          $count.val(count);
        }
        var length = parseInt($('#length').val());
        if (isNaN(length) || length < 6) {
          length = 6;
        }
        var options = {};
        $('input.password-contains:checked').each(function() {
          options[this.value] = true
        });
        dom.disable($element);
        for (let i = 0; i < count; i++) {
          passwords.push(Password.generate(length, options));
        }
        if (displayAs === 'table') {
          displayAsTable();
        } else {
          displayAsText();
        }
        dom.enable($element);
        // dom.scrollTo('.result-section');
        // 点击生成结果后，屏幕滚动至生成结果
      },
      toggleDisplay: function($element) {
        if (displayAs === 'table') {
          displayAsText();
        } else {
          displayAsTable();
        }
      }
    }
    window.changeHandler = function() {
      // $('#btn-password-generate').prop('disabled', $('.password-contains:checked').length === 0);
    }
    ;
  }
)(window);
