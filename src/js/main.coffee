$ ->

  repaint = $ ".clock"
  $(window).resize ->
    repaint.css "z-index", 1


  # Clock
  clock = ->
    date = new Date
    hour = date.getHours()
    minute = date.getMinutes()
    if hour >= 12
      hour = hour-12
    if hour == 0
      hour = 12
    if minute < 10
      minute = "0#{minute}"
    return "#{hour}:#{minute}"

  # Set the time
  $(".clock").text clock()

  # Update the time
  setInterval ->
    $(".clock").text clock()
  , 5000