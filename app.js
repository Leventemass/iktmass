// ---------- Alap statisztikák ----------
let level = 1, xp = 0, balance = 0, bottles = 0;
let ownedAnimals = [], currentAnimal = 'goldfish.png';

const animalNames = {
    'goldfish.png':'Aranyhal','turtle.png':'Teknős','dolphin.png':'Delfin',
    'whale2.png':'Bálna','lohal.png':'Lóhal','octopus.png':'Polip',
    'shark2.png':'Cápa','medzua.png':'Medúza'
};

const animalInfo = {
    'goldfish.png':{desc:"Kis aranyhal, vízben él.", rescue:"Tartsd tisztán a vizet."},
    'turtle.png':{desc:"Lassú teknős.", rescue:"Védett élőhelyre szállítani."},
    'dolphin.png':{desc:"Intelligens delfin.", rescue:"Mentőközpontban rehabilitálni."},
    'whale2.png':{desc:"Hatalmas bálna.", rescue:"Óceánvédelmi területen segíteni."},
    'lohal.png':{desc:"Lóhal.", rescue:"Biztonságos akváriumban gondozni."},
    'octopus.png':{desc:"Polip.", rescue:"Tengeri akváriumban rehabilitálni."},
    'shark2.png':{desc:"Cápa.", rescue:"Óceánvédelmi programban részt venni."},
    'medzua.png':{desc:"Medúza.", rescue:"Megfelelő környezetben engedni vissza."}
};

const levelAnimals = {1:'goldfish.png',2:'turtle.png',4:'dolphin.png',6:'whale2.png'};

const challenges = [
    {id:1, text:"Szerezz 3 állatot", completed:false, check:()=>ownedAnimals.length>=3},
    {id:2, text:"Érj el szint 3-at", completed:false, check:()=>level>=3},
    {id:3, text:"Szerezz Polipot", completed:false, check:()=>ownedAnimals.includes('octopus.png')},
    {id:4, text:"Gyűjts 10 üveget", completed:false, check:()=>bottles>=10}
];

// ---------- UI frissítés ----------
function updateUI(){
    document.getElementById('level-profile').textContent=level;
    document.getElementById('xp-profile').textContent=xp;
    document.getElementById('balance-profile').textContent=balance;
    document.getElementById('balance-stats').textContent=balance;
    document.getElementById('balance-game').textContent=balance;
    document.getElementById('xp-game').textContent=xp;
    document.getElementById('bottles-stats').textContent=bottles;
    updateChallenges();
}

// ---------- Állataim kezelése ----------
function updateOwnedAnimals(){
    const container = document.getElementById('owned-animals');
    container.innerHTML = '';
    if(ownedAnimals.length===0){ container.innerHTML='<p>Még nincs állatod.</p>'; return; }
    ownedAnimals.forEach(animal=>{
        const div = document.createElement('div');
        div.className='owned-animal';
        const name = animalNames[animal]||animal.split('.')[0];
        div.innerHTML=`<img src="${animal}" alt="${name}"><p>${name}</p>
        <button onclick="selectAnimal('${animal}')">Kiválaszt</button>`;
        container.appendChild(div);
    });
}

function selectAnimal(animalSrc){
    currentAnimal = animalSrc;
    const showcase = document.getElementById('animal-showcase');
    const info = animalInfo[animalSrc];
    showcase.innerHTML = `
        <img src="${animalSrc}" alt="${animalNames[animalSrc]}">
        <h4>${animalNames[animalSrc]}</h4>
        <p>${info.desc}</p>
        <p><strong>Hogyan lehet megmenteni:</strong> ${info.rescue}</p>
    `;
    showcase.classList.add('pulse-scale');
    setTimeout(()=>showcase.classList.remove('pulse-scale'),1000);
}

// ---------- Panel váltás ----------
function showPanel(panelName){
    document.querySelectorAll('.panel').forEach(p=>p.style.display='none');
    const active=document.getElementById(panelName+'-panel');
    if(active) active.style.display='block';
}

// ---------- Nagy animált üzenet ----------
function showBigNotify(text, duration=2000){
    const notify = document.getElementById("big-notify");
    notify.textContent = text;
    notify.classList.remove("hide");
    notify.style.opacity = 1;
    notify.style.transform = "translateX(-50%) translateY(0px) scale(1)";
    setTimeout(()=>{
        notify.classList.add("hide");
    }, duration);
}

// ---------- Vásárlás ----------
function buyAnimal(animalSrc, price){
    if(balance >= price){
        balance -= price;
        if(!ownedAnimals.includes(animalSrc)) ownedAnimals.push(animalSrc);
        currentAnimal = animalSrc;
        document.getElementById('animalImg').src = animalSrc;
        updateUI(); updateOwnedAnimals();
        selectAnimal(animalSrc);
        showBigNotify(`Új állatot kaptál: ${animalNames[animalSrc]}`);
    } else {
        showBigNotify('Nincs elég pénzed!');
    }
}

// ---------- Újrahasznosítás ----------
function addRecycle(){
    bottles++; 
    balance += 50;
    xp += 10;

    for(let i=0;i<10;i++){
        const bubble = document.createElement('div');
        bubble.className='bubble';
        bubble.style.left = Math.random()*100 + '%';
        bubble.style.width = (15 + Math.random()*15)+'px';
        bubble.style.height = (15 + Math.random()*15)+'px';
        document.getElementById('game').appendChild(bubble);
        setTimeout(()=>bubble.remove(),2500);
    }

    if(xp >= level*50){
        xp -= level*50;
        level++;
        updateAnimal();
        levelUpAnimal();

        // Nagy animált üzenet
        showBigNotify(`Szintet léptél! Szinted: ${level}`);
    }

    updateUI();
}

// ---------- Szintlépés állat ----------
function levelUpAnimal(){
    let newAnimal=currentAnimal;
    const levels=Object.keys(levelAnimals).map(Number).sort((a,b)=>a-b);
    for(let l of levels){ if(level>=l) newAnimal=levelAnimals[l]; }
    if(newAnimal !== currentAnimal){
        currentAnimal=newAnimal;
        document.getElementById('animalImg').src = newAnimal;
        if(!ownedAnimals.includes(newAnimal)) ownedAnimals.push(newAnimal);
        updateOwnedAnimals();

        // Nagy animált üzenet
        showBigNotify(`Új állatot kaptál: ${animalNames[newAnimal]}`);
    }
}

// ---------- Állat animáció (szintlépés) ----------
function updateAnimal(){
    const animalImg=document.getElementById('animalImg');
    const glow=document.querySelector('.level-glow');
    const msg=document.getElementById('level-up-msg');

    glow.classList.add('glow-active');
    setTimeout(()=>{glow.classList.remove('glow-active');},1000);

    msg.classList.add('show');
    setTimeout(()=>{msg.classList.remove('show');},1200);

    animalImg.classList.add('swim');
    setTimeout(()=>{animalImg.classList.remove('swim');},1500);

    for(let i=0;i<10;i++){
        const bubble=document.createElement('div');
        bubble.className='bubble';
        bubble.style.left=(Math.random()*100)+'%';
        bubble.style.width=(15+Math.random()*15)+'px';
        bubble.style.height=(15+Math.random()*15)+'px';
        document.getElementById('game').appendChild(bubble);
        setTimeout(()=>{bubble.remove();},2500);
    }
}

// ---------- Kihívások ----------
function updateChallenges(){
    const container = document.getElementById('challenges-list');
    container.innerHTML = '';
    challenges.forEach(c=>{
        if(c.check()){ c.completed=true; }
        const div = document.createElement('div');
        div.className = 'challenge-item'+(c.completed?' completed':'');
        div.textContent = c.text;
        container.appendChild(div);
    });
}

// ---------- Buborék folyamatos ----------
setInterval(()=>{
    const bubble = document.createElement('div');
    bubble.className='bubble';
    const game = document.getElementById('game');
    const size = 20 + Math.random()*40;
    bubble.style.width = size+'px';
    bubble.style.height = size+'px';
    bubble.style.left = Math.random()*game.offsetWidth+'px';
    game.appendChild(bubble);
    setTimeout(()=>bubble.remove(),5000);
},200);

// ------------------------------
// Természetes úszó állatok háttérben
// ------------------------------
const backgroundAnimals = [
    "goldfish.png",
    "turtle.png",
    "dolphin.png",
    "lohal.png",
    "octopus.png",
    "shark2.png"
];

function spawnSwimmingAnimal() {
    const game = document.getElementById("game");
    const fish = document.createElement("img");
    fish.src = backgroundAnimals[Math.floor(Math.random() * backgroundAnimals.length)];
    fish.className = "swimming-animal";

    // random méret
    const size = 50 + Math.random() * 50;
    fish.style.width = size + "px";

    // random start pozíció és irány
    let y = 60 + Math.random() * 250;
    let x = -120;
    let direction = Math.random() < 0.5 ? 1 : -1; // 1=jobbra, -1=balra
    let speed = 0.5 + Math.random();

    if (direction === -1) {
        x = game.offsetWidth + 120;
    }

    fish.style.transform = `scaleX(${direction})`;
    fish.style.top = y + "px";
    fish.style.left = x + "px";
    game.appendChild(fish);

    let wave = 0;

    function swim() {
        wave += 0.05;
        x += speed * direction;
        y += Math.sin(wave) * 0.6;
        fish.style.left = x + "px";
        fish.style.top = y + "px";
        fish.style.transform = `rotate(${Math.sin(wave)*4}deg) scaleX(${direction})`;

        if ((direction === 1 && x > game.offsetWidth + 150) ||
            (direction === -1 && x < -150)) {
            fish.remove();
            return;
        }

        requestAnimationFrame(swim);
    }

    swim();
}

setInterval(spawnSwimmingAnimal, 2200);