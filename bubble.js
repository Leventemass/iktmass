// Folyamatos buborékok a jobb panelen
setInterval(()=>{
    const bubble = document.createElement('div');
    bubble.className='bubble';
    const rightPanel = document.querySelector('.right-panel');
    const panelWidth = rightPanel.offsetWidth;
    bubble.style.left=Math.random()*panelWidth+'px';
    const size = 20 + Math.random()*40;
    bubble.style.width=size+'px';
    bubble.style.height=size+'px';
    rightPanel.appendChild(bubble);
    setTimeout(()=>bubble.remove(),5000);
},200);