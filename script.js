// Générer lignes obliques
for(let i=0;i<15;i++){
  let line = document.createElement('div');
  line.className = 'line';
  line.style.left = Math.random()*window.innerWidth + 'px';
  line.style.animationDuration = (5+Math.random()*10)+'s';
  document.body.appendChild(line);
}

// Générer particules fixes
for(let i=0;i<50;i++){
  let particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random()*window.innerWidth+'px';
  particle.style.top = Math.random()*window.innerHeight+'px';
  document.body.appendChild(particle);
}

const errorText = document.getElementById('error');

// Glitch sur clic + spawn secret
errorText.addEventListener('click', () => {
  errorText.classList.add('glitch');
  setTimeout(() => errorText.classList.remove('glitch'), 1000);

  spawnSecret();
});

// Easter egg touches clavier
document.addEventListener('keydown', (e)=>{
  if(e.key.toLowerCase() === 'l'){
    spawnSecret("L.C.O veille...");
  }
  if(e.key.toLowerCase() === 'o'){
    spawnSecret("Oblique activated!");
  }
});

// Fonction pour créer messages secrets
function spawnSecret(msg){
  const secret = document.createElement('div');
  secret.className = 'secret';
  secret.style.left = Math.random()*window.innerWidth+'px';
  secret.style.top = Math.random()*window.innerHeight+'px';
  secret.textContent = msg || "Message secret...";
  document.body.appendChild(secret);
  setTimeout(()=>secret.style.opacity=1, 50);
  setTimeout(()=>secret.style.opacity=0, 3000);
  setTimeout(()=>secret.remove(), 4000);
}

// Particules qui suivent la souris
document.addEventListener('mousemove', (e)=>{
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = e.clientX + 'px';
  particle.style.top = e.clientY + 'px';
  document.body.appendChild(particle);
  setTimeout(()=>particle.remove(), 2000);
});
