window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var width = 426;
var height = 320;
var imagesPerMinute = 1;

var timeSinceLastImage = 0;
var lastImateTaken;

var init = function(){
  $('#progress').hide();

  $('#my_camera').css({
    'width': width + 'px',
    'height': height + 'px',
  });

  $('#my_result').css({
    'width': width + 'px',
    'height': height + 'px',
  });

  $('#start_capturing').click(function(e){
    takeSnapshot();
    loop();
    $('#progress').show();
    $('#start_capturing').hide();
  });

  Webcam.set({
    width: width,
    height: height,
    dest_width: width,
    dest_height: height,
    image_format: 'jpeg',
    jpeg_quality: 90,
    force_flash: false
  });

  Webcam.attach('#my_camera');
}

var takeSnapshot = function() {
  Webcam.snap(function(webcamData) {
    document.getElementById('my_result').innerHTML = '<img src="' + webcamData + '"/>';

    $.ajax({
      type: "POST",
      url: "/image",
      data: {
        data: webcamData
      }
    })
    .done(function(response) {
      console.log(response);
    });
  });

  lastImateTaken = new Date().getTime();
  timeSinceLastImage = 0;
}

var loop = function(){
  requestAnimFrame(loop);

  if(!lastImateTaken) { return }

  timeSinceLastImage = new Date().getTime() - lastImateTaken;
  var percentage = timeSinceLastImage / (60000 / imagesPerMinute);

  $('#progress').css({
    'transform': 'scale(' + (1-percentage) + ',1)'
  });

  if(percentage > 1) {
    takeSnapshot()
  }
}

$(document).ready(function(){
  init();
});
