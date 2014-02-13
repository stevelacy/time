(function() {
  $(function() {
    var clock, file, getSettings, ls, repaint, setBackground;
    getSettings = function(cb) {
      return $.getJSON("settings.json", function(data) {
        return cb(data);
      });
    };
    if (!localStorage.settings) {
      file = "settings.json";
      getSettings(function(data) {
        localStorage.settings = JSON.stringify(data);
        return location.reload();
      });
    }
    if (localStorage.settings) {
      ls = JSON.parse(localStorage.settings);
      console.log(ls);
    }
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
        hour = hour - ls.clock.format;
      }
      if (hour === 0) {
        hour = 12;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      return "" + hour + ":" + minute;
    };
    setBackground = function(image) {
      return $("#background").css({
        "background": "url(" + image + ")",
        "background-size": "cover",
        "background-attachment": "fixed",
        "background-position": "center top"
      });
    };
    $(".clock").text(clock());
    setInterval(function() {
      return $(".clock").text(clock());
    }, 5000);
    setBackground(ls.background);
    $("#button-settings").click(function() {
      return $("#settings").stop().fadeToggle();
    });
    $("#close").click(function() {
      return $(this).parent().fadeOut();
    });
    return $("#file").change(function(e) {
      var input, reader,
        _this = this;
      input = e.currentTarget;
      e.preventDefault();
      if (input.files && input.files[0]) {
        reader = new FileReader();
        console.log(input.files[0]);
        reader.onload = function(e) {
          setBackground(e.target.result);
          ls.background = e.target.result;
          return localStorage.settings = JSON.stringify(ls);
        };
        return reader.readAsDataURL(input.files[0]);
      }
    });
  });

}).call(this);
