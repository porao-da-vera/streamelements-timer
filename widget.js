let sound;
let image;
let timer;

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

window.addEventListener("onWidgetLoad", function (obj) {
  const fieldData = obj.detail.fieldData;
  sound = fieldData.sound;

  window.addEventListener("onEventReceived", function (obj) {
    if (!obj.detail.event) {
      return;
    }
    const event = obj.detail.event;
    const listener = obj.detail.listener;
    if (listener === "message" || listener === "bot:count") {
      console.log(obj);
    }
    if (listener === "message" && event.data.text.indexOf("!slay") === 0) {
      // $('#image').append('<img src="'+ image +'">')
    }
    if (listener === "message" && event.data.text.indexOf("!timer") === 0) {
      const elem = document.getElementById("timer");
      const audioElem = $("#sound");
      audioElem.innerHTML = "";
      clearInterval(timer);
      elem.innerHTML = "";
      if (event.data.text.split(" ")[1] === "cancel") return;
      let timeout =
        parseInt(event.data.text.split(" ")[1], 10) * 1000 * 60 ||
        3 * 60 * 1000;
      timer = setInterval(() => {
        if (timeout <= 0) {
          clearInterval(timer);
          audioElem.append(
            '<audio id="endSound" autoplay="autoplay"><source src="' +
              sound +
              '" type="audio/mp3" /></audio>'
          );
          elem.innerHTML = "Time!";
          setTimeout(() => {
            elem.innerHTML = "";
          }, 3000);
        } else {
          timeout -= 1000;
          elem.innerHTML = millisToMinutesAndSeconds(timeout);
        }
      }, 1000);
    }
  });
});
