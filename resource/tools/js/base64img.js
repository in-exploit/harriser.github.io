



// $("#dataUrl").focus(function (){

  console.log(2);

  !function(e) {
    var t = {};

    function n(o) {
      if (t[o]) return t[o].exports;
      var a = t[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return e[o].call(a.exports, a, a.exports, n),
          a.l = !0,
          a.exports
    }

    n.m = e,
        n.c = t,
        n.d = function(e, t, o) {
          n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
          })
        },
        n.r = function(e) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
          }),
              Object.defineProperty(e, "__esModule", {
                value: !0
              })
        },
        n.t = function(e, t) {
          if (1 & t && (e = n(e)), 8 & t) return e;
          if (4 & t && "object" == typeof e && e && e.__esModule) return e;
          var o = Object.create(null);
          if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e) for (var a in e) n.d(o, a,
              function(t) {
                return e[t]
              }.bind(null, a));
          return o
        },
        n.n = function(e) {
          var t = e && e.__esModule ?
              function() {
                return e.
                    default
              }:
              function() {
                return e
              };
          return n.d(t, "a", t),
              t
        },
        n.o = function(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t)
        },
        n.p = "/",
        n(n.s = 4)
  } ({
    4 : function(e, t, n) {
      e.exports = n("beJj")
    },
    beJj: function(e, t) {
      $((function() {
        var e = "jpg",
            t = "";
        /*$(".ui.radio.checkbox").checkbox({
          onChecked: function() {
            e = $(this).val()
          }
        }),*/
            $("#dataUrl").blur(function (){

              console.log(55);

              var e = $(this).val().split(",");
              var image_url = e[0].match(/:(.*?);/) && e[0].match(/:(.*?);/)[1];
              // console.log(e.val().split().length);
              // console.log(e[1].length);
              // console.log(e[0].match(/:(.*?);/) && e[0].match(/:(.*?);/)[1]);
              if ($("#dataUrl").val().length >= 2000) {
                if (e[0].match(/:(.*?);/) && e[0].match(/:(.*?);/)[1]){
                  e[0].match(/:(.*?);/)[1].split("/");
                  t = $(this).val(),
                      $("#uplpadStatus").removeClass("active"),
                      $("#base64Image").attr("src", $(this).val()).css({
                        // width: "auto",
                        padding: "10px 0",
                      })
                  $(".loader").html("已完成").css("color", "#ff880d");
                }
              }
              else {
                $(".loader").html("输入错误");
                $("#base64Image").attr("src", "../../resource/tools/img/base_error.jpg");
              }

            })
            // $("#dataUrl").on("input propertychange", (function() {})),
            $("#downloadBtn").on("click", (function() {
              t && $.ajax({
                url: "/base64img/download",
                type: "post",
                xhrFields: {
                  responseType: "blob"
                },
                data: {
                  type: e,
                  _token: $("#csrf_token").val(),
                  data: t
                },
                success: function(t) {
                  if (void 0 !== window.navigator.msSaveBlob) {
                    window.navigator.msSaveBlob(t, "fileName");
                  }
                  else {
                    var n = (window.URL || window.webkitURL).createObjectURL(t),
                        o = document.createElement("a");
                    if (void 0 === o.download) {
                      window.location = n;
                      console.log(window.location);
                    }
                    else {
                      var a = new Date,
                          r = a.getMonth() + 1;
                      r < 10 && (r = "0" + r),
                          a = r + a.getDate() + a.getHours() + a.getMinutes() + a.getSeconds(),
                          o.href = n,
                          o.download = "wakaTool_" + a + "." + e,
                          document.body.appendChild(o),
                          o.click(),
                          o.remove()
                    }
                  }
                }
              })
            }))
      }))
    }
  });


// })




