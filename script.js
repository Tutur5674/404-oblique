// -----------------------
// Initialisation des lignes et particules
for (let i = 0; i < 15; i++) {
  let line = document.createElement('div');
  line.className = 'line';
  line.style.left = Math.random() * window.innerWidth + 'px';
  line.style.animationDuration = (5 + Math.random() * 10) + 's';
  document.body.appendChild(line);
}

for (let i = 0; i < 50; i++) {
  let particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = Math.random() * window.innerHeight + 'px';
  document.body.appendChild(particle);
}

const errorText = document.getElementById('error');

// -----------------------
// Variables pour secrets
let secretSequence = ['l','c','o'];
let userSequence = [];
let clickCount = 0;

// -----------------------
// Fonction pour créer messages secrets
function spawnSecret(msg, color) {
  const secret = document.createElement('div');
  secret.className = 'secret';
  secret.style.left = Math.random() * window.innerWidth + 'px';
  secret.style.top = Math.random() * window.innerHeight + 'px';
  secret.style.color = color || '#00ffff';
  secret.textContent = msg || "Message secret...";
  document.body.appendChild(secret);
  setTimeout(() => secret.style.opacity = 1, 50);
  setTimeout(() => secret.style.opacity = 0, 3000);
  setTimeout(() => secret.remove(), 4000);
}

// -----------------------
// 1. Texte qui se disperse
function disperseText() {
  const chars = errorText.textContent.split('');
  errorText.textContent = '';
  chars.forEach((c,i)=>{
    const span = document.createElement('span');
    span.textContent = c;
    span.style.display='inline-block';
    span.style.transition='transform 0.5s, opacity 0.5s';
    errorText.appendChild(span);
    setTimeout(()=>{
      span.style.transform = `translate(${(Math.random()-0.5)*100}px, ${(Math.random()-0.5)*100}px) rotate(${Math.random()*360}deg)`;
      span.style.opacity = 0;
    }, i*50);
  });
  setTimeout(()=>errorText.textContent = chars.join(''), 1000);
}

// -----------------------
// 3. Explosion de particules
function explodeParticles() {
  for(let i=0;i<20;i++){
    spawnSecret("✨", `hsl(${Math.random()*360},80%,70%)`);
  }
}

// -----------------------
// 4. Changer couleur texte
function randomColorText() {
  errorText.style.color = `hsl(${Math.random()*360},80%,60%)`;
}

// -----------------------
// 6. Mini texte caché
function miniMessage(){
  spawnSecret("🎉 Bien joué !", "#00ff00");
}

// -----------------------
// 7. Particules autour du texte
function particleTrail(){
  for(let i=0;i<10;i++){
    spawnSecret("•", `hsl(${Math.random()*360},70%,70%)`);
  }
}

// -----------------------
// 8. Effet miroir
function mirrorEffect(){
  const clone = errorText.cloneNode(true);
  clone.style.position='absolute';
  clone.style.left = (window.innerWidth - errorText.offsetLeft - errorText.offsetWidth) + 'px';
  clone.style.top = errorText.offsetTop + 'px';
  clone.style.opacity = 0.3;
  clone.style.transform = 'scaleX(-1)';
  document.body.appendChild(clone);
  setTimeout(()=>clone.remove(), 3000);
}

// -----------------------
// 10. Glitch avancé
function glitchEffect(){
  errorText.classList.add('glitch');
  setTimeout(()=>errorText.classList.remove('glitch'), 1000);
}

// -----------------------
// 19. Formes cachées
function spawnShape(){
  const div = document.createElement('div');
  div.style.position='absolute';
  div.style.left = Math.random()*window.innerWidth+'px';
  div.style.top = Math.random()*window.innerHeight+'px';
  div.style.width = Math.random()*40+20+'px';
  div.style.height = div.style.width;
  div.style.backgroundColor = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.2)`;
  div.style.transform = `rotate(${Math.random()*360}deg)`;
  document.body.appendChild(div);
  setTimeout(()=>div.remove(),4000);
}

// -----------------------
// Gestion des clics
errorText.addEventListener('click', ()=>{
  clickCount++;

  // Effets principaux
  glitchEffect();
  explodeParticles();
  particleTrail();
  disperseText();

  // Effet miroir seulement après 3 clics
  if(clickCount === 3) mirrorEffect();

  // Formes cachées aléatoires
  spawnShape();

  // Mini message tous les 5 clics
  if(clickCount % 5 === 0) miniMessage();
});

// -----------------------
// Gestion touches clavier
document.addEventListener('keydown', (e)=>{
  const key = e.key.toLowerCase();

  // Ajouter à la séquence
  userSequence.push(key);
  if(userSequence.length > secretSequence.length) userSequence.shift();

  // Vérifier séquence L+C+O
  if(userSequence.join('') === secretSequence.join('')){
    spawnSecret("✨ Séquence secrète activée !", "#ff00ff");

    // Redirection si 3 clics faits
    if(clickCount >= 3){
      setTimeout(()=>window.location.href="secret.html", 1500);
    }
  }

  // Couleur aléatoire sur touche "G"
  if(key === 'g') randomColorText();
});
