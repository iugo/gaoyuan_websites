var system = {
    init: function(navigator) {
        var platforms = this.platforms,
            ln = platforms.length,
            i, platform;
        navigator = navigator || window.navigator;
        for (i = 0; i < ln; i++) {
            platform = platforms[i];
            this[platform.identity] = platform.regex.test(navigator[platform.property]);
        }
        this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
        this.Tablet = this.iPad;
        this.Phone = !this.Desktop && !this.Tablet;
        this.iOS = this.iPhone || this.iPad || this.iPod;
        this.Standalone = !!window.navigator.standalone;
    },
    platforms: [{
        property: 'platform',
        regex: /iPhone/i,
        identity: 'iPhone'
    },
        {
            property: 'platform',
            regex: /iPod/i,
            identity: 'iPod'
        },
        {
            property: 'userAgent',
            regex: /iPad/i,
            identity: 'iPad'
        },
        {
            property: 'userAgent',
            regex: /Blackberry/i,
            identity: 'Blackberry'
        },
        {
            property: 'userAgent',
            regex: /Android/i,
            identity: 'Android'
        },
        {
            property: 'platform',
            regex: /Mac/i,
            identity: 'Mac'
        },
        {
            property: 'platform',
            regex: /Win/i,
            identity: 'Windows'
        },
        {
            property: 'platform',
            regex: /Linux/i,
            identity: 'Linux'
        },
        {
            property: 'userAgent',
            regex: /MicroMessenger/i,
            identity: 'wx'
        },
        {
            property: 'userAgent',
            regex: /AppStrategy/i,
            identity: 'AppStrategy'
        },
        {
            property: 'userAgent',
            regex: /baiduboxapp/i,
            identity: 'BaiduBoxApp'
        }
    ]
};

var head = {
    init: function(intFirst, intSecond) {
        $("#ulFirstNav").find("li:eq(" + intFirst + ")").addClass('cur');
        if (intSecond >= 0) {
            $("#ulSecondNav").find("li:eq(" + intSecond + ")").addClass('cur');
        }
    }
};

var ppl = {
    ajax: null,
    currentPage: 1,
    pageSize: 15,
    totalCount: 0,
    url: "",
    param: {},
    panle: null,
    template: null,
    myScroll: null,
    more: null,
    loadTemplate: null,
    initCallback: null,
    specialObj: "",
    init: function() {        
        if (ppl.specialObj != "") {
            ppl.more = $("#" + ppl.specialObj);
        }
        else {
            ppl.more = $("#list-more");
        }
        ppl.moreRefresh();
        ppl.loadTemplate = nothing.listLoad;

        ppl.more.click(function() {
            ppl.currentPage += 1;
            googleStatistics.pageView(ppl.currentPage);
            ppl.panle.append(ppl.loadTemplate());
            ppl.loadData();
        });
    },
    isEnd: function() {
        return ppl.currentPage * ppl.pageSize >= ppl.totalCount;
    },
    moreRefresh: function() {

        if (ppl.isEnd()) {
            ppl.more.remove();
            return;
        }
        ppl.more.show();
    },
    stopAjax: function() {
        if (ppl.ajax) {
            ppl.ajax.abort();
            ppl.ajax = null;
        }
    },
    loadData: function() {
        if (ppl.ajax) {
            return;
        }
        ppl.param.currentPage = ppl.currentPage;

        ppl.ajax = $.ajax({
            url: ppl.url,
            data: ppl.param,
            dataType: "text",
            beforeSend: function() {

            },
            success: function(res) {
                ppl.stopAjax();

                if (!res) {
                    return;
                }
                var data = $.parseJSON(res);
                var html = ppl.template(data);
                ppl.panle.find(".listItemLoad").remove();
                ppl.panle.append(html);
                ppl.moreRefresh();
            },
            error: function() {
                ppl.stopAjax();
                ppl.currentPage -= 1;
                ppl.more.find("span").html("加载失败,请重新再来");
                ppl.panle.find(".listItemLoad").remove();
            }
        });
    },
    appListTemplate: function(res) {

        var data = res.AppList;
        var arrAppHtml = [];

        for (var i = 0; i < data.length; i++) {

            if (ppl.panle.find("#myId" + data[i].AppId).length == 0) {
                arrAppHtml.push("<li id=\"myId" + data[i].AppId + "\" class=\"index-item\"><div class=\"index-item-main\">");
                arrAppHtml.push("<a href=\"/info/" + data[i].AppId + "\"><dl class=\"clearfix\">");
                arrAppHtml.push("<dt class=\"item-icon\">");
                arrAppHtml.push("<img src=\"" + data[i].AppLogo + "\" alt=\"\" /></dt>");
                arrAppHtml.push("<dd class=\"item-title\"><div class=\"item-title-sname\">");
                arrAppHtml.push("<div class=\"baiying-name\">" + subString.autoAddEllipsis(data[i].AppName, 22, true) + "</div></div></dd>");
                arrAppHtml.push("<dd class=\"item-star\"><span class=\"score-star\">");
                arrAppHtml.push("<span style=\"width: " + data[i].AppScore + "%;\"></span></span>");
                arrAppHtml.push("<span class=\"new-item-size\">" + data[i].LeftAttrValue);

                if (data[i].AppSize != "") {
                    arrAppHtml.push(" | " + data[i].AppSize);
                }
                arrAppHtml.push("</span></dd>");
                arrAppHtml.push("<dd><div class=\"xiaobian-comment\">");
                arrAppHtml.push(data[i].BriefSummary == "" ? "暂无介绍" : data[i].BriefSummary);
                arrAppHtml.push("</div></dd></dl></a></div>");
                var gaAppName = data[i].AppName.replace(/\"/g, "”").replace(/'/g, "’");
                arrAppHtml.push("<div class=\"item-side item-download\"><a href=\"" + data[i].AppSource + "\" onclick=\"googleStatistics.appDownload('" + data[i].AppId + "','" + gaAppName + "');\"><div class=\"status-download\"><span class=\"download-text" + (data[i].FreePage == 1 ? " download-text-through" : "") + "\">" + data[i].AppPrice + "</span></div></a></div>");
                arrAppHtml.push("</li>");
            }
        }

        return arrAppHtml.join("");
    },
    appArticleList: function(res) {
        var data = res.AppArticleList;
        var arrAppArticleHtml = [];
        for (var i = 0; i < data.length; i++) {
            if (ppl.panle.find("#myId" + data[i].ArticleId).length == 0) {
                arrAppArticleHtml.push("<li id=\"myId" + data[i].ArticleId + "\">");
                arrAppArticleHtml.push("<a href=\"" + data[i].Link + "\">");
                arrAppArticleHtml.push("<span>" + getArticleMasterPic(data[i].ArticleMasterPic, false));
                arrAppArticleHtml.push(parseInt(data[i].ArticleSecondType) == 185 ? "<i></i>" : "");
                arrAppArticleHtml.push("</span>" + data[i].ArticleTitle + "</a>");
                arrAppArticleHtml.push("<time>" + data[i].PublishTime + "</time>");
                arrAppArticleHtml.push("</li>");
            }
        }

        return arrAppArticleHtml.join("");
    },
    appTopicList: function(res) {

        var data = res.AppTopicList;
        var arrAppTopicHtml = [];
        for (var i = 0; i < data.length; i++) {
            if (ppl.panle.find("#myId" + data.AppId).length == 0) {
                arrAppTopicHtml.push("<li id=\"myId" + data[i].AppId + "\">");
                arrAppTopicHtml.push("<a href=\"" + data[i].FormatTopicInfoLink + "\">");
                arrAppTopicHtml.push("<img src=\"" + data[i].FormatImageName + "\" alt=\"\" />");
                arrAppTopicHtml.push("<p>" + data[i].FormatAppTopicTitle + "</p>");
                arrAppTopicHtml.push("</a></li>");
            }
        }
        return arrAppTopicHtml.join("");
    },
    AppTopicTagArticleList: function(res) {
        var data = res.AppTopicTagArticleList;
        var arrAppTopicArticleHtml = [];
        for (var i = 0; i < data.length; i++) {
            if (ppl.panle.find("#myArticleId" + data.ArticleId).length == 0) {
                arrAppTopicArticleHtml.push("<li id=\"myArticleId" + data[i].ArticleId + "\">");
                arrAppTopicArticleHtml.push("<a href=\"" + data[i].ArticleLink + "\">");
                arrAppTopicArticleHtml.push("<img src=\"" + data[i].FormatArticleMasterPic + "\" alt=\"\" />");
                arrAppTopicArticleHtml.push("<p>" + data[i].FormatArticleTitle + "</p>");
                arrAppTopicArticleHtml.push("</a></li>");
            }
        }
        return arrAppTopicArticleHtml.join("");
    }
};

var searchApp = {
    ajax: null,
    interval: null,
    init: function() {
        $("#search-input-form").submit(function() {
            var strSearchKey = $.trim($("#sug").val());
            if (strSearchKey == "") {
                return false;
            }

            if (searchApp.interval != null) {
                clearInterval(searchApp.interval);
                searchApp.interval = null;
            }

            $("#divSearchAppContentPanle").show();
            $("#box_search").hide();
            $("#sug").blur();

            $("#search-input-form").attr("action", "/search?k=" + encodeURIComponent(strSearchKey));
        });

        $("#search").click(function() {
            $("#search-input-form").submit();
        });

        $("#sug").focus(function() {
            searchApp.searchXLData();
        }).keyup(function() {
            searchApp.searchXLData();
        });

        $("#sug").bind('input propertychange', function() {
            searchApp.searchXLData();
        });

        $('#sug').click(function(event) {

            if ($(this).attr("data-search") == "0") {
                $('.content_wraper').hide();
            }

            $('.search_wraper').removeClass('allwrap_hide');
            $(this).attr("data-topicclass", $("html").attr("class")); //专题使用
            $("html").removeClass().css("background","#fff");
            return false;
        });

        $(".btn_close").click(function() {
            $("#sug").val("");
            $("html").attr("class", $("#sug").attr("data-topicclass")); //专题使用             
            searchApp.searchXLData();
            $(".search_wraper").addClass('allwrap_hide')
            $(".content_wraper").show();

            return false;
        });
    },
    stopAjax: function() {
        if (searchApp.ajax) {
            searchApp.ajax.abort();
            searchApp.ajax = null;
        }
    },
    searchXLData: function() {

        var val = $.trim($("#sug").val());
        if (val == "") {
            $("#box_search ul").empty();
            $("#divSearchAppContentPanle").show();
            $("#box_search").hide();
            return;
        }

        if (searchApp.interval != null) {
            clearInterval(searchApp.interval);
            searchApp.interval = null;
        }

        searchApp.interval = setInterval(function() {

            $.ajax({
                url: "/ajax/getsearchappbysearchkey/",
                data: {
                    k: encodeURIComponent(val)
                },
                dataType: "text",
                success: function(res) {

                    if (searchApp.interval == null) {
                        $("#box_search ul").empty();
                        $("#box_search").hide();
                        $("#divSearchAppContentPanle").show();
                        return;
                    }

                    clearInterval(searchApp.interval);
                    searchApp.interval = null;

                    if (res == "") {
                        $("#box_search ul").empty();
                        $("#box_search").hide();
                        $("#divSearchAppContentPanle").show();
                        return;
                    }

                    var data = eval('(' + res + ')');

                    if ($.trim($("#sug").val()) == "") {
                        $("#box_search ul").empty();
                        $("#box_search").hide();
                        $("#divSearchAppContentPanle").show();

                        return;
                    }

                    var arrHtml = new Array();

                    for (var i = 0; i < data.length; i++) {
                        arrHtml.push("<li>");
                        arrHtml.push("<div class=\"ui-suggestion-result\">");
                        var searchAppName = data[i].AppName.replace(/\"/g, "$1$").replace(/'/g, "$2$");
                        arrHtml.push("<p><a href=\"/search?k=" + encodeURIComponent(searchAppName) + "\">" +
                                    subString.autoAddEllipsis(data[i].AppName, 36, true) + "</a></p>");
                        arrHtml.push("</div>");
                        arrHtml.push("</li>");
                    }

                    $("#box_search ul").html(arrHtml.join(""));

                    $("#box_search a").each(function() {
                        var strText = $.trim($(this).html());
                        $(this).html(strText.replace(new RegExp("(" + val + ")", "gi"), "<i>$1</i>"));
                    });

                    $("#box_search").show();
                    $("#divSearchAppContentPanle").hide();
                },
                error: function() {
                    if (searchApp.interval != null) {
                        clearInterval(searchApp.interval);
                        searchApp.interval = null;
                    }

                    $("#box_search ul").empty();
                    $("#box_search").hide();
                    $("#divSearchAppContentPanle").show();
                }
            });
        }, 500);
    }
};

var subString = {
    thisStr: "",
    thisLen: 10,
    thisFlag: true,
    autoAddEllipsis: function(pStr, pLen, pFlag) {
        this.thisStr = pStr;
        this.thisLen = pLen;
        this.thisFlag = pFlag;
        var _ret = this.cutString();
        var _cutFlag = _ret.cutflag;
        var _cutStringn = _ret.cutstring;
        if ("1" == _cutFlag && this.thisFlag) {
            return _cutStringn + "...";
        } else {
            return _cutStringn;
        }
    },
    cutString: function() {
        var pStr = this.thisStr;
        var pLen = this.thisLen;
        var pFlag = this.thisFlag;
        var _strLen = this.thisStr.length;
        var _tmpCode;
        var _cutString;
        var _cutFlag = "1";
        var _lenCount = 0;
        var _ret = false;
        if (_strLen <= pLen / 2) {
            _cutString = pStr;
            _ret = true;
        }
        if (pFlag) {
            pLen = pLen - 3;
        }
        if (!_ret) {
            for (var i = 0; i < _strLen; i++) {
                if (this.isFull(pStr.charAt(i))) {
                    _lenCount += 2;
                } else {
                    _lenCount += 1;
                }
                if (_lenCount > pLen) {
                    _cutString = pStr.substring(0, i);
                    _ret = true;
                    break;
                } else if (_lenCount == pLen) {
                    _cutString = pStr.substring(0, i + 1);
                    _ret = true;
                    break;
                }
            }
        }
        if (!_ret) {
            _cutString = pStr;
            _ret = true;
        }
        if (_cutString.length == _strLen) {
            _cutFlag = "0";
        }
        return { "cutstring": _cutString, "cutflag": _cutFlag };
    },
    isFull: function(pChar) {
        if ((pChar.charCodeAt(0) > 128)) {
            return true;
        } else {
            return false;
        }
    }
};

var content = {
    photoSwipe: null,
    instance: null,
    isPhotoSwipe: false,
    options: {
        loop: false,
        swipeThreshold: 10,
        swipeTimeThreshold: 50,
        slideSpeed: 100,
        allowUserZoom: false,
        getImageSource: function(obj) {
            return obj.url;
        },
        getImageCaption: function(obj) {
            return obj.caption;
        }
    },
    init: function() {
        (function(window, $, PhotoSwipe) {
            content.photoSwipe = PhotoSwipe;
        } (window, window.jQuery, window.Code.PhotoSwipe));

        system.init();
        content.photoSwipeBind();
    },
    photoSwipeBind: function() {
        if (content.instance == null && $("#divAppImagePanle img").length > 0) {

            var appImageList = [];
            var appImageInfo;
            $("#divAppImagePanle img").each(function() {
                appImageInfo = new Object();
                appImageInfo.url = $(this).attr("dataSrc");
                appImageInfo.caption = "";
                appImageList.push(appImageInfo);
            });

            content.instance = content.photoSwipe.attach(appImageList, content.options);

            content.instance.addEventHandler(content.photoSwipe.EventTypes.onDisplayImage, function(e) {
                if (e.action == "next" || e.action == "previous" || e.action == "current") {
                    $(".ps-document-overlay").css("background", "#000 url(/images/photoswipe-loader.gif) no-repeat center center");
                }
            });
            content.instance.addEventHandler(content.photoSwipe.EventTypes.onTouch, function(e) {
                if (e.action == "touchMove") {
                    $(".ps-document-overlay").css("background", "#000");
                }
            });
            content.instance.addEventHandler(content.photoSwipe.EventTypes.onShow, function(e) {                
                content.isPhotoSwipe = true;
            });
            content.instance.addEventHandler(content.photoSwipe.EventTypes.onHide, function(e) {
                content.isPhotoSwipe = false;                
            });
        }
    }
};

var imagePrepare = {
    show: function() {
        var arrImage = $("img[original]");
        arrImage.each(function() {

            var intTop = $(this).offset().top - 65 * 5;

            if ($(document).scrollTop() + $(window).height() >= intTop) {
                var strOriginal = $(this).attr("original");
                $(this).attr("src", strOriginal);
                $(this).removeAttr("original");
            }
            else {
                return false;
            }
        });
    }
};

var articlePage = {
    url: "",
    customPage: function(intCurrentPage, intTotalCount) {
        var intPage = $.trim($("#txtPage").val());

        if (intPage == "" || /[^\d$]/.test(intPage)) {
            intPage = 0;
        }

        if (intPage < 1 || intPage > intTotalCount) {
            return;
        }

        location.href = articlePage.url.replace("[CurrentPage]", intPage);
    },
    gotoPageUrl: function(intPage) {
        location.href = articlePage.url.replace("[CurrentPage]", intPage);
    }
};

var scrollToObj = function(obj) {
    window.scrollTo(0, obj.offset().top);
};

var jump = {
    click: function() {
        jump.addCookieByDay('ism', 0, 7);
    },
    addCookieByDay: function(cookieKey, cookieValue, cookieDays) {
        var varDate = new Date();
        varDate.setTime(varDate.getTime() + (24 * 60 * 60 * 1000 * parseInt(cookieDays)));
        var varStr = cookieKey + "=" + escape(cookieValue) + ";expires=" + varDate.toGMTString() + ";domain=app111.com;path=/";
        document.cookie = varStr;
    }
};

var nothing = {
    app: function() {
        var arrHtml = new Array();
        arrHtml.push("<section class=\"nores\">");
        arrHtml.push("<div class=\"sorry-info\">");
        arrHtml.push("抱歉o(&gt;__&lt;)o,没有找到应用相关信息");
        arrHtml.push("</div>");
        arrHtml.push("<div class=\"seperateline app-pingpu\"></div>");
        arrHtml.push("</section>");

        return arrHtml.join("");
    },
    listLoad: function() {
        var arrHtml = new Array();

        for (var i = 0; i < 15; i++) {
            arrHtml.push("<li class=\"index-item listItemLoad list-index\">");
            arrHtml.push("<div class=\"index-item-main\">");
            arrHtml.push("<a href=\"javascript:void(0);\">");
            arrHtml.push("<dl class=\"clearfix\">");
            arrHtml.push("<dt class=\"item-icon\">");
            arrHtml.push("<img src=\"/images/default-icon.png\" alt=\"\" />");
            arrHtml.push("</dt>");
            arrHtml.push("<dd class=\"item-title\">");
            arrHtml.push("<div class=\"item-title-sname\">");
            arrHtml.push("<div class=\"baiying-name\">");
            arrHtml.push("应用名称</div></div></dd>");
            arrHtml.push("<dd class=\"item-star\">");
            arrHtml.push("<span class=\"score-star\"></span>");
            arrHtml.push("<span class=\"new-item-size\"></span>");
            arrHtml.push("</dd>");
            arrHtml.push("<dd>");
            arrHtml.push("<div class=\"xiaobian-comment\">");
            arrHtml.push("应用简介");
            arrHtml.push("</div></dd></dl></a></div>");
            arrHtml.push("<div class=\"item-side item-download\"><a href=\"javascript:void(0);\"><div class=\"status-download\"><span class=\"download-text\">价格</span></div></a></div>");
            arrHtml.push("</li>");
        }
        return arrHtml.join("");
    },
    listDocLoad: function() {
        var arrHtml = new Array();

        for (var i = 0; i < 15; i++) {
            arrHtml.push("<li class=\"listItemLoad\">");
            arrHtml.push("<a href=\"javascript:void(0);\"><span><img src=\"/images/doc_nothing.png\" alt=\"\" /></span>");
            arrHtml.push("标题</a><time>2014-05-21</time>");
            arrHtml.push("</li>");
        }
        return arrHtml.join("");
    },
    listAppTopicLoad: function() {
        var arrHtml = [];
        for (var i = 0; i < 6; i++) {
            arrHtml.push("<li class=\"listItemLoad\">");
            arrHtml.push("<a href=\"javascript:void(0);\">");
            arrHtml.push("<img src=\"/images/default-topicicon.png\" alt=\"\" />");
            arrHtml.push("<p></p>");
            arrHtml.push("</a></li>");
        }
        return arrHtml.join("");
    }
};

var googleStatistics = {
    pageView: function(currentPage) {
        var pageUrl = location.href.replace('http://', '');

        if (currentPage == -998) {
            pageUrl += "-" + "pic";
        }
        else if (currentPage == -999) {
            pageUrl += "-" + "video";
        }
        else if (currentPage > 1) {
            pageUrl += "-" + currentPage;
        }

        _hmt.push(['_trackPageview', pageUrl.replace(location.host, '')]);
        ga('send', 'pageview', pageUrl);
    },
    appDownload: function(appId, appName) {

        var pageSource = "";
        googleStatistics.appId = appId;

        var pageUrl = location.href.replace('http://', '');
        if (pageUrl.indexOf("history") != -1) {
            pageSource = "每日精选";
        }
        else if (pageUrl.indexOf("game") != -1) {
            pageSource = "热门游戏";
        }
        else if (pageUrl.indexOf("bibei") != -1) {
            pageSource = "装机必备";
        }
        else if (pageUrl.indexOf("free") != -1) {
            pageSource = "限时";
        }
        else if (pageUrl.indexOf("home") != -1) {
            pageSource = "分类-" + pageUrl.substring(pageUrl.indexOf("home") + 5).replace('/', '');
        }
        else if (pageUrl.indexOf("search") != -1) {
            var url = location.search;
            if (url.indexOf("=") != -1) {
                pageSource = "搜索结果-" + url.split("=")[1];
            }
        }
        else if (pageUrl.indexOf("info") != -1) {
            pageSource = "应用最终页-官方下载";
        }
        else if (pageUrl.indexOf("doc") != -1) {
            pageSource = "文章最终页";
        }
        else if (pageUrl.indexOf("devinfo") != -1) {
            pageSource = "厂商页";
        }
        else if (pageUrl.replace('/', '') == location.host) {
            pageSource = "首页";
        }

        _hmt.push(['_trackEvent', '应用下载', pageSource, appName]);
        ga('send', 'event', "应用下载", pageSource, appName);
    },
    lineSetup: function(appId, appName) {
        var pageSource = "应用最终页-一键安装";
        _hmt.push(['_trackEvent', '应用下载', pageSource, appName]);
        ga('send', 'event', "应用下载", pageSource, appName);
    }
};

var hello = {
    days: 0,
    source: "",
    init: function(now) {

        var utmaCookie = cookieFunction.getCookie("__utma");
        var helloCookie = cookieFunction.getCookie("hello");

        if (utmaCookie != "" && helloCookie == "") {
            return;
        }

        if (utmaCookie == "" && helloCookie == "") {

            var source = window.document.referrer.replace('http://', '');
            if (source == '') {
                source = 'wulaiyuan';
            }
            cookieFunction.addCookieByDay("hello", now + "," + now + "," + source, 3650);
            return;
        }

        var arrCookie = helloCookie.split(",");
        if (arrCookie.length < 3) {
            return;
        }

        var dtRecently = new Date(arrCookie[1]);
        var dtNow = new Date(now);
        var date = dtNow.getTime() - dtRecently.getTime();

        if (date <= 0) {
            return;
        }
        var days = Math.floor(date / (24 * 3600 * 1000));

        if (days <= 0) {
            return;
        }

        var dtFirstTime = new Date(arrCookie[0]);
        date = dtNow.getTime() - dtFirstTime.getTime();
        days = Math.floor(date / (24 * 3600 * 1000));

        hello.days = days;
        hello.source = arrCookie[2];
        cookieFunction.addCookieByDay("hello", arrCookie[0] + "," + now + "," + arrCookie[2], 3650);
    }
};

var cookieFunction = {
    addCookie: function(cookieKey, cookieValue) {
        var varDate = new Date();
        varDate.setTime(varDate.getTime() + (24 * 60 * 60 * 1000));
        var varStr = cookieKey + "=" + escape(cookieValue) + ";expires=" + varDate.toGMTString() + ";domain=app111.com;path=/";
        document.cookie = varStr;
    },
    addCookieByDay: function(cookieKey, cookieValue, cookieDays) {
        var varDate = new Date();
        varDate.setTime(varDate.getTime() + (24 * 60 * 60 * 1000 * parseInt(cookieDays)));
        var varStr = cookieKey + "=" + escape(cookieValue) + ";expires=" + varDate.toGMTString() + ";domain=app111.com;path=/";
        document.cookie = varStr;
    },
    getCookie: function(cookieKey) {
        var varArray = document.cookie.split("; ");
        for (var varI = 0; varI < varArray.length; varI++) {
            var varTemp = varArray[varI].split("=");
            if (varTemp[0] == cookieKey) {
                return decodeURI(unescape(varTemp[1]));
            }
        }
        return "";
    },
    delCookie: function(cookieKey) {
        var varDate = new Date();
        varDate.setTime(varDate.getTime() - 1);
        var varCval = "";
        document.cookie = cookieKey + "=" + 1 +
                          ";;domain=app111.com;path=/;expires=" +
                          varDate.toGMTString();
    }
};

var wx = {
    init: function() {

        system.init();
        if (!system.wx) {
            return;
        }
        var varWx = cookieFunction.getCookie("iswxclose");
        if (varWx == "1") {
            return;
        }
        $('.tip').show();
        var _tip = $('.tip').position().top;
        $(window).scroll(function() {
            if ($(window).scrollTop() > _tip) {
                $('.tip').addClass('pos_fixed');
            } else {
                $('.tip').removeClass('pos_fixed');
            }
        });
    },
    close: function() {
        $(".tip").hide();
        cookieFunction.addCookieByDay("iswxclose", "1", 99999);
    }
};

var yueyu = {
    init: function() {
        var varYueYu = cookieFunction.getCookie("isyueyuclose");
        if (varYueYu == "1") {
            $(".tip_yueyu").hide();
            return;
        }
        var tip_yueyu = $('.tip_yueyu').find('span');
        tip_yueyu.css("cursor", "pointer");
    },
    close: function() {
        $(".tip_yueyu").hide();
        cookieFunction.addCookieByDay("isyueyuclose", "1", 14);
    },

    HeadInit: function(headtype) {
        if (headtype == 1) {
            $("header li").eq(0).addClass("here");
        }
        if (headtype == 2) {
            $("header li").eq(1).addClass("here");
        }
        if (headtype == 3) {
            $("header li").eq(2).addClass("here");
        }
        if (headtype == 4) {
            $("header li").eq(3).addClass("here");
        }
        if (headtype == 5) {
            $("header li").eq(4).addClass("here");
        }
    }
};

var getArticleMasterPic = function(articleMasterPic, isImagePrepare) {

    if (articleMasterPic == "/images/doc_nothing.png") {
        return "<img src=\"/images/doc_nothing.png\" alt=\"\" style=\"width:100%;\" />";
    }

    if (articleMasterPic.indexOf("/cover/") == -1) {

        if (isImagePrepare) {
            return "<img src=\"/images/doc_nothing.png\" alt=\"\" class=\"other\" original=\"" + articleMasterPic + "\" />";
        }

        return "<img src=\"" + articleMasterPic + "\" alt=\"\" class=\"other\" />";
    }
    else {

        if (isImagePrepare) {
            return "<img src=\"/images/doc_nothing.png\" alt=\"\" original=\"" + articleMasterPic + "\" />";
        }

        return "<img src=\"" + articleMasterPic + "\" alt=\"\" />";
    }
};

var slide = {
    index: 0,
    count: 0,
    width: 180,
    flag: true,
    interval: null,
    ulSlide: null,
    init: function() {
        system.init();
        var isios = system.iOS ? 1 : 0;
        slide.ulSlide = $("#fouce>.img-box>ul");
        slide.count = slide.ulSlide.children().length;
        if (slide.count == 0) {
            return;
        }
        var liFirst = slide.ulSlide.find("li").first().clone();
        var liLast = slide.ulSlide.find("li").last().clone();
        slide.ulSlide.append(liFirst).append(liLast);
        var liFirstBtn = $("#fouce>.link-text").find("a").first().clone();
        var liLastBtn = $("#fouce>.link-text").find("a").last().clone();
        $("#fouce>.link-text").append(liFirstBtn).append(liLastBtn);

        slide.ulSlide.css({ width: slide.width * slide.ulSlide.find("li").length });

        
        $("#fouce>.btn a").each(function(i) {
            if (isios == 1) {
                $(this).click(function() {
                    slide.select(i);
                });
            } else {
                $(this).hover(function() {
                    slide.move(i);
                }, function() {
                    $(slide.ulSlide).stop();
                    var intLeft = 0 - i * slide.width;
                    $(slide.ulSlide).css("marginLeft", intLeft + "px");
                    slide.flag = true;
                    slide.run();
                });
            }
        });

        if (isios == 1) {

            fnslide(jQuery);

            $(slide.ulSlide).touchwipe({
                min_move_x: 40,
                min_move_y: 40,
                wipeLeft: function() { slide.right(); }, //手势向左,看下一张
                wipeRight: function() { slide.left(); }, //手势向右,看上一张
                preventDefaultEvents: false
            });
        }

        slide.run();
    },
    left: function() {
        if (!slide.flag) {
            return;
        }
        slide.stop();
        slide.flag = false;

        var intLeft = 0;
        if (slide.index == 0) {
            intLeft = 0 - slide.count * slide.width;
            $(slide.ulSlide).css("marginLeft", intLeft + "px");
            slide.index = slide.count;
        }

        slide.index--;
        intLeft = 0 - slide.index * slide.width;

        slide.focus();
        $(slide.ulSlide).animate({ marginLeft: intLeft + "px" }, 300, function() {
            slide.flag = true;
            slide.run();
        });
    },
    right: function() {
        if (!slide.flag) {
            return;
        }
        slide.stop();
        slide.flag = false;
        slide.index++;

        var intLeft = 0 - slide.index * slide.width;
        slide.focus();

        $(slide.ulSlide).animate({ marginLeft: intLeft + "px" }, 300, function() {
            if (slide.index == slide.count) {
                $(slide.ulSlide).css("marginLeft", "0px");
                slide.index = 0;
            }

            slide.flag = true;
            slide.run();
        });
    },
    focus: function() {
        $('.link-text a:eq(' + slide.index + ')').fadeIn().siblings().hide();
        $("#fouce>.btn a").removeClass("cur");

        if (slide.index == slide.count) {
            $("#fouce>.btn a:first").addClass("cur");
            return;
        }
        $("#fouce>.btn a:eq(" + slide.index + ")").addClass("cur");

    },
    select: function(n) {
        if (!slide.flag) {
            return;
        }
        slide.stop();
        slide.flag = false;
        slide.index = n;
        var intLeft = 0 - slide.index * slide.width;
        slide.focus();

        $(slide.ulSlide).animate({ marginLeft: intLeft + "px" }, 300, function() {
            slide.flag = true;
            slide.run();
        });
    },
    move: function(n) {
        if (!slide.flag) {
            return;
        }

        slide.stop();
        slide.flag = false;
        slide.index = n;
        var intLeft = 0 - slide.index * slide.width;
        slide.focus();

        $(slide.ulSlide).animate({ marginLeft: intLeft + "px" }, 300, function() {
            slide.flag = true;
        });
    },
    run: function() {
        if (slide.interval != null) {
            return;
        }
        slide.interval = setInterval(slide.right, 4000);
    },
    stop: function() {
        clearInterval(slide.interval);
        slide.interval = null;
    }
};

//手势操作
var fnslide = function(a) {
    a.prototype.touchwipe = function(c) {
        var b = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function() {
            },
            wipeRight: function() {
            },
            wipeUp: function() {
            },
            wipeDown: function() {
            },
            wipe: function() {
            },
            wipehold: function() {
            },
            preventDefaultEvents: true
        };
        if (c) {
            a.extend(b, c);
        }
        this.each(function() {
            var h;
            var g;
            var j = false;
            var i = false;
            var e;

            function m() {
                this.removeEventListener("touchmove", d);
                h = null;
                j = false;
                clearTimeout(e);
            }

            function d(q) {
                if (b.preventDefaultEvents) {
                    q.preventDefault();
                }
                if (j) {
                    var n = q.touches[0].pageX;
                    var r = q.touches[0].pageY;
                    var p = h - n;
                    var o = g - r;
                    if (Math.abs(p) >= b.min_move_x) {
                        q.preventDefault();
                        m();
                        if (p > 0) {
                            b.wipeLeft();
                        } else {
                            b.wipeRight();
                        }
                    } else {
                        if (Math.abs(o) >= b.min_move_y) {
                            m();
                            if (o > 0) {
                                b.wipeUp();
                            } else {
                                b.wipeDown();
                            }
                        }
                    }
                }
            }

            function k() {
                clearTimeout(e);
                if (!i && j) {
                    b.wipe();
                }
                i = false;
            }

            function l() {
                i = true;
                b.wipehold();
            }

            function f(n) {
                if (n.touches.length == 1) {
                    h = n.touches[0].pageX;
                    g = n.touches[0].pageY;
                    j = true;
                    this.addEventListener("touchmove", d, false);
                    e = setTimeout(l, 750);
                }
            }

            if ("ontouchstart" in document.documentElement) {
                this.addEventListener("touchstart", f, false);
                this.addEventListener("touchend", k, false);
            }
        });
        return this;
    };
    a.extend(a.prototype.touchwipe, 1);
};