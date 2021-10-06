// deklarasi variabel pendukung
let jumlahKartu = 10;
let kartuPertama = (kartuKedua = 0);

// fungsi untuk penambahan nilai dalam array
function buatAngka() {
  let angkaUrut = [];

  for (let i = 1; i <= jumlahKartu; i++) {
    angkaUrut.push(i, i);
  }
  return angkaUrut;
}

// fungsi untuk mengacak nilai array
function acakAngka(angkaUrut) {
  let angkaAcak = angkaUrut.sort(function () {
    return 0.5 - Math.random();
  });
  return angkaAcak;
}

//fungsi untuk pembuatan kartu dan pengisian nilai
function persiapankartu(angkaAcak) {
  let str = "";

  angkaAcak.forEach(function (i) {
    str += '<div class="kartu" nilai="' + i + '">' + '<div class="belakang">' + i + "</div>" + '<div class="depan">Games<br/>Woo</div>' + "</div>";
  });

  $("#game").append(str);
}

// fungsi untuk mengatur aksi dalam program
function control() {
  $(".kartu").on("click", function () {
    $(this).addClass("buka");

    if (kartuPertama == 0) {
      kartuPertama = $(this).attr("nilai");
      console.log("kartu pertama : " + kartuPertama);
    } else {
      kartuKedua = $(this).attr("nilai");
      console.log("kartu kedua : " + kartuKedua);

      if (kartuPertama == kartuKedua) {
        console.log("benar");
        $(".buka").addClass("betul");
        $(".betul").removeClass("buka");

        kartuPertama = kartuKedua = 0;
      } else {
        console.log("salah");
        kartuPertama = kartuKedua = 0;
        $(this).one("transitionend", function () {
          $(".kartu").removeClass("buka");
        });
      }
    }
  });
}

// fungsi untuk mengatur timer
(function () {
  var timeContainer = document.getElementById("timer-value");
  var startButton = document.getElementById("start-game");
  var timer = 60;
  var MaxTime = 0;
  var timeout = null;
  function count() {
    timeout = setTimeout(function () {
      if (timer > MaxTime) {
        timer--;
        timeContainer.innerText = timer;
        count();
      } else {
        alert("Waktu telah berakhir");
        startButton.style.display = "inline-block";
        endGame();
      }
    }, 1000);
  }
  function endGame() {
    $(".kartu").addClass("hilang");
    clearTimeout(timeout);
    startButton.style.display = "inline-block";
    window.location.reload(true);
  }
  function startGame() {
    $(".kartu").addClass("muncul");
    $(".container").addClass("warna");
    if (timeout) {
      clearTimeout(timeout);
    }
    timeContainer.innerText = timer;
    // this.style.display = "none";
    count();
  }
  document.getElementById("start-game").addEventListener("click", startGame);
  document.getElementById("restart-game").addEventListener("click", endGame);
})();

$(document).ready(function () {
  let angkaUrut = buatAngka();
  let angkaAcak = acakAngka(angkaUrut);
  persiapankartu(angkaAcak);
  control();
});
