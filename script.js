const letterText = `Rojbûna te pîroz be çîçekamin
Her sal bi kêf û xweşî be
Hêvî û xewnê te bibin rastî û her dem û rojên te tenê ken û hezkirin be
Tu bibe gulek di dilê xwe de ez biçînim
Tu bibe ronahiyek û kenê te tarîtiya vê cîhanê ronî bike
Tu bibe yar
Gelekî ji te hez dikim
♥️♥️`;

const $ = (id) => document.getElementById(id);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Continuous falling rose petals. Kept decorative and non-interactive.
(function makeRosePetals() {
  const layer = $("roseLayer");
  if (!layer || reducedMotion) return;
  const petals = ["🌹", "🌸", "✿", "❀"];
  const colors = ["#d98ca3", "#e8a7b7", "#c77d91", "#e8b9a8"];
  for (let i = 0; i < 22; i++) {
    const petal = document.createElement("span");
    petal.className = "rose-petal";
    petal.textContent = petals[i % petals.length];
    petal.style.setProperty("--left", `${Math.random() * 100}%`);
    petal.style.setProperty("--size", `${14 + Math.random() * 15}px`);
    petal.style.setProperty("--duration", `${13 + Math.random() * 15}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 25}s`);
    petal.style.setProperty("--sway", `${-55 + Math.random() * 110}px`);
    petal.style.setProperty("--rotate", `${Math.random() * 360}deg`);
    petal.style.setProperty("--opacity", `${0.35 + Math.random() * 0.4}`);
    petal.style.setProperty("--color", colors[i % colors.length]);
    layer.appendChild(petal);
  }
})();

// Reveal sections as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Open the surprise and scroll to the letter.
$("beginBtn")?.addEventListener("click", () => $("letter")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }));

// Typewriter letter.
let letterStarted = false;
$("envelope")?.addEventListener("click", () => {
  const card = $("letterCard");
  card.classList.add("open");
  $("envelope").classList.add("opened");
  if (letterStarted) return;
  letterStarted = true;
  const target = $("typedMessage");
  let index = 0;
  const type = () => {
    if (index < letterText.length) {
      target.textContent += letterText.charAt(index++);
      setTimeout(type, letterText.charAt(index - 1) === "\n" ? 280 : 34);
    }
  };
  type();
});

// Photo captions.
document.querySelectorAll(".memory-card").forEach(card => {
  card.addEventListener("click", () => {
    $("modalText").textContent = card.dataset.caption || "";
    $("photoModal").classList.add("open");
  });
});
$("modalClose")?.addEventListener("click", () => $("photoModal").classList.remove("open"));
$("photoModal")?.addEventListener("click", e => {
  if (e.target === $("photoModal")) $("photoModal").classList.remove("open");
});

// Cake candles.
const candles = [...document.querySelectorAll(".candle")];
candles.forEach(candle => candle.addEventListener("click", () => {
  candle.classList.add("out");
  if (candles.every(item => item.classList.contains("out"))) {
    $("wishMessage").textContent = "Hêvî dikim hemû daxwazên te bibin rastî! ❤️";
    burstHearts();
  }
}));
$("relightBtn")?.addEventListener("click", () => {
  candles.forEach(candle => candle.classList.remove("out"));
  $("wishMessage").textContent = "Sê ronahiyên biçûk, tenê ji bo te.";
});
function burstHearts() {
  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.cssText = `position:fixed;left:${45 + Math.random()*10}%;top:55%;z-index:20;color:#c77d91;font-size:${16+Math.random()*20}px;pointer-events:none;transition:transform 1.4s ease,opacity 1.4s ease`;
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      heart.style.transform = `translate(${(Math.random()-.5)*380}px,${-100-Math.random()*260}px) rotate(${Math.random()*90-45}deg)`;
      heart.style.opacity = "0";
    });
    setTimeout(() => heart.remove(), 1500);
  }
}

// Tiny heart-catching game.
let score = 0;
let gameTimer = null;
$("startGame")?.addEventListener("click", () => {
  clearInterval(gameTimer);
  score = 0;
  $("score").textContent = "0 / 5";
  $("gameResult").textContent = "";
  $("heartField").innerHTML = "";
  $("gameInstruction").textContent = "";
  spawnGameHeart();
  gameTimer = setInterval(() => {
    if (score >= 5) { clearInterval(gameTimer); return; }
    spawnGameHeart();
  }, 950);
});
function spawnGameHeart() {
  const field = $("heartField");
  const heart = document.createElement("button");
  heart.className = "floating-heart";
  heart.type = "button";
  heart.textContent = "♥";
  heart.setAttribute("aria-label", "Dilêk bigire");
  heart.style.left = `${8 + Math.random()*78}%`;
  heart.style.top = `${12 + Math.random()*65}%`;
  heart.addEventListener("click", () => {
    if (heart.dataset.caught) return;
    heart.dataset.caught = "yes";
    heart.remove();
    score++;
    $("score").textContent = `${score} / 5`;
    if (score >= 5) {
      clearInterval(gameTimer);
      $("gameResult").textContent = "Ev pênc dil ji bo te ne, Yaramin! ♥";
      burstHearts();
    }
  });
  field.appendChild(heart);
  setTimeout(() => heart.remove(), 2400);
}
$("backTop")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));

// Music starts only after the visitor taps the music button (mobile browser rule).
const song = $("birthdaySong");
$("musicToggle")?.addEventListener("click", async () => {
  if (!song) return;
  if (song.paused) {
    try {
      await song.play();
      $("musicLabel").textContent = "Muzîkê rawestîne";
    } catch {
      $("musicLabel").textContent = "Pêlê dîsa bike";
      $("toast").textContent = "Pêşî stranê MP3 di peldanka assets de zêde bike.";
      $("toast").classList.add("show");
      setTimeout(() => $("toast").classList.remove("show"), 2800);
    }
  } else {
    song.pause();
    $("musicLabel").textContent = "Muzîka me";
  }
});
