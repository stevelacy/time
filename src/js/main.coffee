$ ->



  getSettings = (cb) ->
    $.getJSON "settings.json", (data) ->
      cb data

  if !localStorage.settings
    file = "settings.json"
    getSettings (data) ->
      localStorage.settings = JSON.stringify data
      location.reload()

  if localStorage.settings
    ls = JSON.parse localStorage.settings


  repaint = ->
    element = $ ".clock"
    $(window).resize ->
      element.css "z-index", 1

  repaint()

  # set values
  $("#font").val ls.clock.size
  $("#background-color").val ls.background.color
  $("#clock-color").val ls.clock.color


  # Clock
  clock = ->
    date = new Date
    hour = date.getHours()
    minute = date.getMinutes()
    if hour >= 12
      hour = hour - ls.clock.format
    if hour == 0
      hour = 12
    if minute < 10
      minute = "0#{minute}"
    return "#{hour}:#{minute}"

  # Setter functions

  setBackgroundImage = (image) ->
    $("#background").css
      "background": "url("+image+")"
      "background-size": "cover"
      "background-attachment": "fixed"
      "background-position": "center top"

  setBackgroundColor = (color) ->
    $("#background").css
      "background": color

  setClockSize = (size) ->
    $(".clock").css
      "font-size": size + "vw"

  setClockColor = (color) ->
    $(".clock").css
      "color": color

  # Set the time
  $(".clock").text clock()

  # Update the time
  setInterval ->
    $(".clock").text clock()
  , 5000

  setBackgroundImage ls.background.image unless ls.background.image == ""
  setBackgroundColor ls.background.color unless ls.background.image != ""
  setClockSize ls.clock.size
  setClockColor ls.clock.color

  # Click functions

  $("#button-settings").click ->
    $("#settings").stop().fadeToggle()

  $("#close").click ->
    $(this).parent().fadeOut()

  # Change functions

  $("#file").change (e) ->
    input = e.currentTarget
    e.preventDefault()
    if input.files and input.files[0]
      reader = new FileReader()
      reader.onload = (e) =>
        setBackgroundImage e.target.result
        ls.background.image = e.target.result
        localStorage.settings = JSON.stringify ls
      reader.readAsDataURL input.files[0]

  $("#background-color").change (e) ->
    setBackgroundColor e.target.value
    ls.background.image = ""
    ls.background.color = e.target.value
    localStorage.settings = JSON.stringify ls

  $("#font").change (e) ->
    setClockSize e.target.value
    ls.clock.size = e.target.value
    localStorage.settings = JSON.stringify ls
    repaint()

  $("#clock-color").change (e) ->
    setClockColor e.target.value
    ls.clock.color = e.target.value
    localStorage.settings = JSON.stringify ls
      