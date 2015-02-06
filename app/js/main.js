(function() {
  $(function() {
    var clock, file, getSettings, ls, repaint, setBackgroundColor, setBackgroundImage, setClockColor, setClockSize;
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
    }
    repaint = function() {
      var element;
      element = $(".clock");
      return $(window).resize(function() {
        return element.css("z-index", 1);
      });
    };
    repaint();
    $("#font").val(ls.clock.size);
    $("#background-color").val(ls.background.color);
    $("#clock-color").val(ls.clock.color);
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
      return hour + ":" + minute;
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
    setClockSize = function(size) {
      return $(".clock").css({
        "font-size": size + "vw"
      });
    };
    setClockColor = function(color) {
      return $(".clock").css({
        "color": color
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
    setClockSize(ls.clock.size);
    setClockColor(ls.clock.color);
    $("#button-settings").click(function() {
      return $("#settings").stop().fadeToggle();
    });
    $("#close").click(function() {
      return $(this).parent().fadeOut();
    });
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        return $("#settings").fadeOut();
      }
    });
    $("#file").change(function(e) {
      var input, reader;
      input = e.currentTarget;
      e.preventDefault();
      if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = (function(_this) {
          return function(e) {
            setBackgroundImage(e.target.result);
            ls.background.image = e.target.result;
            return localStorage.settings = JSON.stringify(ls);
          };
        })(this);
        return reader.readAsDataURL(input.files[0]);
      }
    });
    $("#background-color").change(function(e) {
      setBackgroundColor(e.target.value);
      ls.background.image = "";
      ls.background.color = e.target.value;
      return localStorage.settings = JSON.stringify(ls);
    });
    $("#font").change(function(e) {
      setClockSize(e.target.value);
      ls.clock.size = e.target.value;
      localStorage.settings = JSON.stringify(ls);
      return repaint();
    });
    return $("#clock-color").change(function(e) {
      setClockColor(e.target.value);
      ls.clock.color = e.target.value;
      return localStorage.settings = JSON.stringify(ls);
    });
  });

}).call(this);
