// ---------- Szintlépés animáció és buborék ----------
function updateAnimal(){
    const animalImg = document.getElementById('animalImg');
    const glow = document.querySelector('.level-glow');
    const msg = document.getElementById('level-up-msg');

    glow.classList.add('glow-active');
    setTimeout(()=>{glow.classList.remove('glow-active');},1000);

    msg.classList.add('show');
    setTimeout(()=>{msg.classList.remove('show');},1200);

    animalImg.classList.add('swim');
    setTimeout(()=>{animalImg.classList.remove('swim');},1500);

    // Buborékok
    for(let i=0;i<10;i++){
        const bubble = document.createElement('div');
        bubble.className='bubble';
        bubble.style.left = (Math.random()*100)+'%';
        bubble.style.width = (15+Math.random()*15)+'px';
        bubble.style.height = (15+Math.random()*15)+'px';
        document.getElementById('game').appendChild(bubble);
        setTimeout(()=>{bubble.remove();},2500);
    }
}

// ---------- Buborék folyamatosan ----------
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