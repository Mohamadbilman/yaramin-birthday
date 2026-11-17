const $ = (id) => document.getElementById(id);

const letterText = `I hope you know how special you are — not just today, but every single day.

You deserve the kind of happiness that stays, the kind of love that feels like home, and a thousand little reasons to smile.

Thank you for being exactly who you are. I hope this year brings you closer to every dream your heart is holding.

Today, and always, I’m wishing you the very best.`;

function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}

$("beginBtn").addEventListener("click", () => {
  $("letter").scrollIntoView({behavior:"smooth"});
  setTimeout(() => $("envelope").focus(), 500);
});

let letterOpened = false;
$("envelope").addEventListener("click", () => {
  if (letterOpened) return;
  letterOpened = true;
  $("envelope").classList.add("open");
  $("letterCard").classList.add("visible");
  $("envelope").querySelector(".envelope-hint").textContent = "A little note for you";
  const target = $("typedMessage");
  target.textContent = "";
  let i = 0;
  const type = () => {
    if (i < letterText.length) {
      target.textContent += letterText.charAt(i++);
      setTimeout(type, letterText.charAt(i-1) === "\n" ? 230 : 23);
    }
  };
  setTimeout(type, 450);
  setTimeout(() => $("letterCard").scrollIntoView({behavior:"smooth",block:"center"}), 250);
});

// Music begins only after a user gesture (mobile browser-friendly).
let musicPlaying = false;
$("musicToggle").addEventListener("click", async () => {
  const audio = $("birthdaySong");
  if (!musicPlaying) {
    try {
      await audio.play();
      musicPlaying = true;
      $("musicLabel").textContent = "Pause our song";
      $("musicToggle").firstChild.textContent = "♫ ";
    } catch (e) {
      toast("Add your song as assets/song.mp3 first ♡");
    }
  } else {
    audio.pause();
    musicPlaying = false;
    $("musicLabel").textContent = "Play our song";
  }
});

// Memory cards
document.querySelectorAll(".memory-card").forEach(card => {
  card.addEventListener("click", () => {
    $("modalText").textContent = card.dataset.caption;
    $("photoModal").classList.add("open");
  });
});
function closeModal(){ $("photoModal").classList.remove("open"); }
$("modalClose").addEventListener("click", closeModal);
$("photoModal").addEventListener("click", e => { if (e.target === $("photoModal")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// Birthday candles
document.querySelectorAll(".candle").forEach(candle => {
  candle.addEventListener("click", () => {
    candle.classList.add("out");
    if (document.querySelectorAll(".candle.out").length === 3) {
      $("wishMessage").textContent = "May every beautiful wish find its way to you. ✨";
      toast("Wish made. Let the magic begin! ♡");
      burstHearts(18);
    }
  });
});
$("relightBtn").addEventListener("click", () => {
  document.querySelectorAll(".candle").forEach(c => c.classList.remove("out"));
  $("wishMessage").textContent = "Three little lights, just for you.";
});

// Catch five hearts game
let score = 0, gameTimer = null;
function spawnHeart() {
  const field = $("heartField");
  const heart = document.createElement("button");
  heart.className = "floating-heart";
  heart.type = "button";
  heart.textContent = Math.random() > .5 ? "♥" : "♡";
  heart.setAttribute("aria-label", "Collect heart");
  heart.style.left = `${8 + Math.random()*82}%`;
  heart.style.top = `${12 + Math.random()*72}%`;
  heart.style.animationDelay = `${Math.random()*-.9}s`;
  heart.addEventListener("click", () => {
    if (!heart.isConnected) return;
    heart.remove();
    score++;
    $("score").textContent = `${score} / 5`;
    if (score >= 5) {
      clearInterval(gameTimer);
      $("gameInstruction").textContent = "You collected all the love! ♡";
      $("gameResult").textContent = "If I could, I'd send you a million more. Happy Birthday!";
      $("startGame").textContent = "Play again";
      burstHearts(24);
    }
  });
  field.appendChild(heart);
  setTimeout(() => heart.remove(), 2800);
}
$("startGame").addEventListener("click", () => {
  clearInterval(gameTimer);
  score = 0;
  $("score").textContent = "0 / 5";
  $("gameResult").textContent = "";
  $("gameInstruction").textContent = "Tap the hearts before they float away!";
  $("heartField").querySelectorAll(".floating-heart").forEach(h => h.remove());
  for (let i=0;i<3;i++) setTimeout(spawnHeart, i*300);
  gameTimer = setInterval(() => {
    if (score >= 5) return;
    spawnHeart();
  }, 650);
  setTimeout(() => {
    if (score < 5) {
      clearInterval(gameTimer);
      $("gameInstruction").textContent = "Every heart counts. Try once more ♡";
    }
  }, 15000);
});

function burstHearts(count) {
  for (let i=0;i<count;i++) {
    const h = document.createElement("span");
    h.textContent = Math.random()>.5 ? "♡" : "♥";
    h.style.cssText = `position:fixed;z-index:50;left:${Math.random()*100}vw;top:${Math.random()*100}vh;color:${["#d78ca1","#e8b9c6","#bd7188"][i%3]};font-size:${14+Math.random()*22}px;pointer-events:none;transition:transform 1.6s ease,opacity 1.6s ease`;
    document.body.appendChild(h);
    requestAnimationFrame(() => {h.style.transform=`translateY(-${70+Math.random()*160}px) rotate(${Math.random()*100-50}deg)`;h.style.opacity="0";});
    setTimeout(()=>h.remove(),1700);
  }
}

// Reveal sections as they enter the screen
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

$("backTop").addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
