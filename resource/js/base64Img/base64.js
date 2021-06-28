webpackJsonp([1], {
  1: function (e, t) {
    e.exports = jQuery
  }, 11: function (e, t) {
    e.exports = ReactDOM
  }, 2: function (e, t) {
    e.exports = React
  }, 24: function (e, t, n) {
    "use strict";

    function a(e) {
      return e && e.__esModule ? e : {default: e}
    }

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function l(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    n(4);
    var c = n(0), i = a(c), u = n(2), s = a(u), f = n(11), d = a(f), m = n(8), p = a(m), b = new (function (e) {
      function t() {
        r(this, t);
        var e = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        e.$dragarea = (0, c.$)("#dragarea");
        var n = new c.OpenFile({dragArea: e.$dragarea}).change(function () {
          n.read("dataURL", function (t) {
            e.fire("add", t)
          })
        }).dragfocus(function (t) {
          e.$dragarea.toggleClass("focus", t.data)
        });
        return e.$dragarea.click(function () {
          n.browseFile()
        }), e
      }

      return l(t, e), t
    }(i.default));
    d.default.render(s.default.createElement(p.default, {app: b}), (0, c.$)("#base64TranslistContainer").get(0))
  }, 4: function (e, t) {
  }, 8: function (e, t, n) {
    "use strict";

    function a(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
      }
      return Array.from(e)
    }

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function l(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var c = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
        }
      }

      return function (t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t
      }
    }(), i = n(2), u = function (e) {
      return e && e.__esModule ? e : {default: e}
    }(i), s = n(0), f = function (e) {
      function t(e) {
        r(this, t);
        var n = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)), a = new Set;
        return n.state = {items: a}, e.app.on("add", function (e) {
          e.data.forEach(function (e) {
            e.backgroundColor = "#fff", e.backgroundSize = "contain", e.cssFormat = !0, e.isImage = e.type.startsWith("image/"), e.isText = e.type.startsWith("text/"), a.add(e)
          }), n.forceUpdate()
        }), n
      }

      return l(t, e), c(t, [{
        key: "forCssFormat", value: function (e, t) {
          if (e.isImage && e.cssFormat) {
            return t ? "background-image:url('" + e.data + "');" : u.default.createElement("div", {className: "item-main-code multiline"}, u.default.createElement("div", null, "// CSS中引用demo"), u.default.createElement("div", null, ".box{"), u.default.createElement("div", null, u.default.createElement("strong", null, "background-image:url('"), u.default.createElement("span", null, e.data), u.default.createElement("strong", null, "');")), u.default.createElement("div", null, "}"))
          }
          return t ? e.data : u.default.createElement("div", {className: "item-main-code"}, e.data)
        }
      }, {
        key: "previewSourceTextHandle", value: function (e) {
          var t = new FileReader;
          t.onload = function () {
            s.Tools.runHTML(this.result)
          }, t.readAsText(e.origin)
        }
      }, {
        key: "render", value: function () {
          var e = this, t = this.state.items, n = [];
          return [].concat(a(t)).reverse().forEach(function (a, r) {
            var o = function () {
              var t = a.backgroundColor;
              a.backgroundColor = "#fff" === t ? "#333" : "#fff", e.forceUpdate()
              // a.backgroundColor = "#fff" === t ? "#99ffec" : "#fff", e.forceUpdate()
            }, l = function () {
              var t = a.backgroundSize;
              a.backgroundSize = "" === t ? "contain" : "", e.forceUpdate()
            }, c = function () {
              a.cssFormat = !a.cssFormat, e.forceUpdate()
            };
            n.push(u.default.createElement("div", {className: "item"}, u.default.createElement("icon", {
              className: "item-close",
              onClick: function (n) {
                t.delete(a), e.forceUpdate()
              }
            }, ""), u.default.createElement("div", {className: "item-detail"}, a.isImage ? u.default.createElement("div", {
              className: "item-preview",
              style: {
                backgroundImage: "url(" + a.data + ")",
                backgroundSize: a.backgroundSize,
                backgroundColor: a.backgroundColor
              }
            }, u.default.createElement("div", {className: "item-preview-btns"}, u.default.createElement("icon", {
              title: "切换背景",
              onClick: function (e) {
                return o()
              }
            }, ""), u.default.createElement("icon", {
              title: "自适应大小", onClick: function (e) {
                return l()
              }
            }, ""))) : "", u.default.createElement("div", {className: "item-main"}, u.default.createElement("div", {className: "item-main-filename"}, a.name), u.default.createElement("div", {className: "item-main-fileinfo"}, u.default.createElement("span", null, "Source Size: ", u.default.createElement("strong", null, s.Tools.showFileSize(a.size)), " "), " ", u.default.createElement("span", null, "Converted Size: ", u.default.createElement("strong", null, s.Tools.showFileSize(a.data.length)))), u.default.createElement("div", {className: "item-main-converratio"}, u.default.createElement("span", {style: {width: parseInt(a.size / a.data.length * 100) + "%"}}), u.default.createElement("span", null, parseInt(a.data.length / a.size * 100) + "%")), e.forCssFormat(a))), u.default.createElement("div", {className: "item-operabar"}, a.isImage ? u.default.createElement("label", null, u.default.createElement("input", {
              type: "checkbox",
              className: "options",
              checked: !!a.cssFormat,
              onChange: function (e) {
                return c()
              }
            }), u.default.createElement("icon", null), "使用在CSS中") : "", a.isText ? u.default.createElement("button", {
              className: "gray",
              onClick: function (t) {
                return e.previewSourceTextHandle(a)
              }
            }, "Source Text") : "", u.default.createElement("button", {
              className: "gray", onClick: function (t) {
                return s.Tools.copy(e.forCssFormat(a, !0), t.target)
              }
            }, "Copy code"))))
          }), u.default.createElement("div", {className: "base64-translist"}, n)
        }
      }]), t
    }(u.default.Component);
    t.default = f
  }
}, [24]);
