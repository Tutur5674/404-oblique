// Générer lignes obliques
for (let i = 0; i < 15; i++) {
  let line = document.createElement('div');
  line.className = 'line';
  line.style.left = Math.random() * window.innerWidth + 'px';
  line.style.animationDuration = (5 + Math.random() * 10) + 's';
  document.body.appendChild(line);
}

// Générer particules fixes
for (let i = 0; i < 50; i++) {
  let particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = Math.random() * window.innerHeight + 'px';
  document.body.appendChild(particle);
}

const errorText = document.getElementById('error');

// Variables pour easter eggs
let secretSequence = ['l', 'c', 'o'];
let userSequence = [];
let clickCount = 0;

// Fonction pour créer messages secrets
function spawnSecret(msg) {
  const secret = document.createElement('div');
  secret.className = 'secret';
  secret.style.left = Math.random() * window.innerWidth + 'px';
  secret.style.top = Math.random() * window.innerHeight + 'px';
  secret.textContent = msg || "Message secret...";
  document.body.appendChild(secret);
  setTimeout(() => (secret.style.opacity = 1), 50);
  setTimeout(() => (secret.style.opacity = 0), 3000);
  setTimeout(() => secret.remove(), 4000);
}

// Glitch et clic
errorText.addEventListener('click', () => {
  errorText.classList.add('glitch');
  setTimeout(() => errorText.classList.remove('glitch'), 1000);

  spawnSecret();

  // Compteur pour chemin secret
  clickCount++;
  if (clickCount > 5) clickCount = 5;
});

// Gestion touches clavier
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  // Messages classiques
  if (key === 'l') spawnSecret("L.C.O veille...");
  if (key === 'o') spawnSecret("Oblique activated!");

  // Ajouter à la séquence utilisateur
  userSequence.push(key);
  if (userSequence.length > secretSequence.length) {
    userSequence.shift(); // garder seulement les 3 dernières touches
  }

  // Vérifier séquence L+C+O
  if (arraysEqual(userSequence, secretSequence)) {
    spawnSecret("✨ Séquence L.C.O activée !");
    for (let i = 0; i < 30; i++) spawnSecret("💠");

    // Vérifier si chemin secret avec clics
    if (clickCount >= 3) {
      spawnSecret("🚪 Chemin secret découvert !");
      setTimeout(() => {
        window.location.href = "secret.html";
      }, 1500);
    }
  }
});

// Vérifier l'égalité de deux tableaux
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
