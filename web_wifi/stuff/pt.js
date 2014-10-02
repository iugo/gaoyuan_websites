(function () {
    var holders = ["phone", "weixin"];
    var is_ios = rptk_is_ios();
    var wx_ent = false;

    function holder_id(h) {
        return "#holder_" + h;
    }

    function hide_holder(h) {
        $(holder_id(h)).hide();
        $("#half_shadow").hide();
    }

    function show_holder(h) {
        if (h == "phone") {
            $(holder_id("weixin")).hide();
            $(holder_id(h)).show();
            $("#phone_num").focus();
        } else {
            $(holder_id("phone")).hide();
            $(holder_id(h)).show();
        }
        $("#half_shadow").show();
        $("body").scrollTop(0);
    }

    function hide_all_holders() {
        for (var i = 0; i < holders.length; i ++) {
            hide_holder(holders[i]);
        }
    }

    function try_hide_ios_cp() {
        var dev_url = "http://rippletek.lan:3000/rippletek/hide_ios_cp";
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = dev_url + "?rand=" + Math.random();
        document.body.appendChild(script);

        var cnt = 0;
        var f = function () {
            if (typeof rptk_cp_done == "boolean" && rptk_cp_done) {
	            window.location.href = "http://t.rippletek.com/rptkProb.html" + window.location.search;
            } else {
                if (cnt < 30) {
                    setTimeout(f, 100);
                } else {
                    rptk_probation();
                }
            }
            cnt ++;
        };
        f();        
    }

    $(function ()
      {
          if (is_ios) {
              $("#apple_shortcut").show();
          }
          $("#half_shadow").hide();
          hide_all_holders();
          $("#weibo_login").click(function () {
              rptk_login("sina");
          });
          $("#qq_login").click(function () {
              rptk_login("qq");
          });
          $("#phone_login").click(function () {
              show_holder("phone");
          });
          $("#weixin_login").click(function () {
              if (wx_ent) return;
              if (is_ios) {
                  try_hide_ios_cp();
                  wx_ent = true;
              } else {
                  show_holder("weixin");
              }
          });
          $("#close_phone").click(function () {
              hide_holder("phone");
          });
          $("#close_weixin").click(function () {
              hide_holder("weixin");
          });
          $("#phone_login_btn").click(function () {
              rptk_phone_submit("phone_num");
          });
          control_slides();
      });
})();