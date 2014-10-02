/* borrowed from http://stackoverflow.com/questions/12068734/jquery-simple-image-slideshow-tutorial*/
function control_slides() {
    var change_img_time     = 5000;
    var transition_speed    = 1000;
    var simple_slideshow    = $("#slides");
    var listItems           = simple_slideshow.children('li');
    var listLen             = listItems.length;
    if (listLen <= 1) {
        return;
    }
    var i                   = 0;
    function changeList() {
        function next(j) {
            j += 1;
            if (j === listLen) {
                return 0;
            }
            return j;
        }
        listItems.eq(i).fadeOut(transition_speed, function () {
            i = next(i);
            listItems.eq(i).fadeIn(transition_speed);
        });
    };
    listItems.not(':first').hide();
    setInterval(changeList, change_img_time);
}

function rptk_is_ios() {
    var u = window.navigator.userAgent;
    var device_types = ["iPhone", "iPod", "iPad"];
    for (var i in device_types) {
        var dt = device_types[i];
        if (u.indexOf(dt) >= 0) {
            return true;
        }
    }
    return false;
}
