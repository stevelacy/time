(function() {
  $(function() {
    var clock, repaint;
    repaint = $(".clock");
    $(window).resize(function() {
      return repaint.css("z-index", 1);
    });
    clock = function() {
      var date, hour, minute;
      date = new Date;
      hour = date.getHours();
      minute = date.getMinutes();
      if (hour >= 12) {
        hour = hour - 12;
      }
      if (hour === 0) {
        hour = 12;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      return "" + hour + ":" + minute;
    };
    $(".clock").text(clock());
    return setInterval(function() {
      return $(".clock").text(clock());
    }, 5000);
  });

}).call(this);
