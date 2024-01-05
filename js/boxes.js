function initializeTimer() {
  if (!localStorage.getItem("ever-timer")) {
    var e = {hours: 0, minutes: 27, seconds: 0};
    e = 3600 * e.hours + 60 * e.minutes + e.seconds, localStorage.setItem("time", e), localStorage.setItem("ever-timer", !0)
  }
  timerSettings()
}

function timerSettings() {
  var e = localStorage.getItem("time"), t = document.querySelector(".timer-different"), i = parseInt(e / 3600, 10),
    s = parseInt((e - 3600 * i) / 60, 10), o = parseInt(e % 60, 10);
  s = s < 10 ? "0" + s : "" + s, o = o < 10 ? "0" + o : "" + o, i = i < 10 ? "0" + i : "" + i;
  var n = document.getElementsByClassName("hours"), r = document.getElementsByClassName("minutes"),
    l = document.getElementsByClassName("seconds");
  --e < 0 ? localStorage.removeItem("ever-timer") : (t ? (o = o.split(""), s = s.split(""), diFilling(n, i = i.split("")), diFilling(r, s), diFilling(l, o)) : (filling(n, i), filling(r, s), filling(l, o)), localStorage.setItem("time", e), setTimeout(timerSettings, 1e3))
}

function filling(e, t) {
  for (var i = 0; i < e.length; i++) e[i].innerHTML = t
}

function diFilling(e, t) {
  for (var i = 0; i < e.length; i++) e[i].innerHTML = t[i % 2]
}

setTimeout(() => {
  jQuery(document).ready((function () {
    jQuery(".boxes > div").click((function () {
      jQuery(this).parent().hasClass("boxesfirsttry") ? (jQuery(".boxes").removeClass("boxesfirsttry"), jQuery(this).addClass("openbox"), jQuery(this).find(".try").hide(), jQuery(this).find(".opentry").show(), setTimeout((function () {
        jQuery(".sweet-overlay").show(), jQuery(".sweet-alert").show()
      }), 500)) : jQuery(this).parent().hasClass("boxeslasttry") && (jQuery(this).hasClass("openbox") || (jQuery(this).find(".try").hide(), jQuery(this).find(".opentry").show(), jQuery(this).find(".boxtext").css("display", "block"), setTimeout((function () {
        jQuery(".new-comebacker-overlay").is(":visible") && jQuery(".new-comebacker-overlay").hide(), jQuery(".new-comebacker-overlay .boxes-is-open").show(), jQuery(".new-comebacker-overlay .boxes-not-open").hide(), jQuery(".spin-result-wrapper").show(), setTimeout((function () {
          jQuery("#boxesContainer").slideUp(250), setTimeout((function () {
            jQuery(".order_block").slideDown(250)
          }), 500)
        }), 500)
      }), 500)))
    })), jQuery("#update").click((function () {
      jQuery(".sweet-overlay").hide(), jQuery(".sweet-alert").hide(), jQuery(".boxes").addClass("boxeslasttry")
    }));
    document.querySelector(".close-popup");
    jQuery(".close-popup, .popup-button").click((function (e) {
      e.preventDefault(), jQuery(".spin-result-wrapper").fadeOut();
      jQuery("#terra-wrapper").offset().top
    }))
  })), initializeTimer();
}, 500);

(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const offset = -90,
        element = document.querySelector(this.getAttribute('href')),
        target = element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({top: target, behavior: 'smooth'});
    });
  });
})();
