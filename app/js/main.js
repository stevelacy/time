(function() {
  $(function() {
    var clock, file, getSettings, ls, repaint, setBackgroundColor, setBackgroundImage;
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
    setBackgroundImage = function(image) {
      return $("#background").css({
        "background": "url(" + image + ")",
        "background-size": "cover",
        "background-attachment": "fixed",
        "background-position": "center top"
      });
    };
    setBackgroundColor = function(color) {
      return $("#background").css({
        "background": color
      });
    };
    $(".clock").text(clock());
    setInterval(function() {
      return $(".clock").text(clock());
    }, 5000);
    if (ls.background.image !== "") {
      setBackgroundImage(ls.background.image);
    }
    if (ls.background.image === "") {
      setBackgroundColor(ls.background.color);
    }
    $("#button-settings").click(function() {
      return $("#settings").stop().fadeToggle();
    });
    $("#close").click(function() {
      return $(this).parent().fadeOut();
    });
    $("#file").change(function(e) {
      var input, reader,
        _this = this;
      input = e.currentTarget;
      e.preventDefault();
      if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function(e) {
          setBackgroundImage(e.target.result);
          ls.background.image = e.target.result;
          return localStorage.settings = JSON.stringify(ls);
        };
        return reader.readAsDataURL(input.files[0]);
      }
    });
    return $("#color").change(function(e) {
      setBackgroundColor(e.target.value);
      ls.background.image = "";
      ls.background.color = e.target.value;
      return localStorage.settings = JSON.stringify(ls);
    });
  });

}).call(this);
