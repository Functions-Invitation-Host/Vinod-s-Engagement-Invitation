(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Music (fades in/out; starts only after the guest taps) ---------- */
var audio=$('#audio'),player=$('#player'),pp=$('#pp'),mute=$('#mute'),VOL=.55,raf=0,wantPlay=false;
function fade(to,ms,done){cancelAnimationFrame(raf);var from=audio.volume,t0=performance.now();
 (function step(now){var k=Math.min(1,(now-t0)/ms);audio.volume=Math.max(0,Math.min(1,from+(to-from)*k));if(k<1)raf=requestAnimationFrame(step);else if(done)done()})(t0)}
function setUI(){player.classList.toggle('playing',wantPlay);pp.setAttribute('aria-pressed',wantPlay);pp.setAttribute('aria-label',wantPlay?'Pause music':'Play music')}
function play(){wantPlay=true;audio.volume=0;var p=audio.play();setUI();
 if(p&&p.then)p.then(function(){fade(VOL,2500)}).catch(function(){wantPlay=false;setUI();player.classList.add('nofile')})}
function pause(){wantPlay=false;setUI();fade(0,900,function(){if(!wantPlay)audio.pause()})}
audio.addEventListener('error',function(){player.classList.add('nofile');wantPlay=false;setUI()});
pp.addEventListener('click',function(){wantPlay?pause():play()});
mute.addEventListener('click',function(){audio.muted=!audio.muted;player.classList.toggle('muted',audio.muted);mute.setAttribute('aria-pressed',audio.muted);mute.setAttribute('aria-label',audio.muted?'Unmute music':'Mute music')});
document.addEventListener('visibilitychange',function(){if(document.hidden&&wantPlay)audio.pause();else if(wantPlay)audio.play().catch(function(){})});

/* ---------- Gate ---------- */
var gate=$('#gate');
function openGate(){gate.classList.add('open');document.body.classList.remove('locked');window.scrollTo(0,0);burst(innerWidth/2,innerHeight/2,26);setTimeout(startReveals,900);setTimeout(function(){gate.setAttribute('hidden','')},1800)}
$('#openBtn').addEventListener('click',function(){play();openGate()});
$('#quietBtn').addEventListener('click',openGate);

/* ---------- Split names into letters ---------- */
$$('.split').forEach(function(el){var txt=el.textContent;el.setAttribute('aria-label',txt);el.textContent='';
 txt.split('').forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i);s.textContent=c===' '?'\u00a0':c;el.appendChild(s)})});

/* ---------- Scroll reveals ---------- */
function startReveals(){
 var els=$$('.rv,.hs,.reveal,.cal,.venue-box');
 if(!('IntersectionObserver' in window)||reduce){els.forEach(function(e){e.classList.add('in')});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var d=e.target.getAttribute('data-d');if(d)e.target.style.setProperty('--d',d);e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.2,rootMargin:'0px 0px -8% 0px'});
 els.forEach(function(e){io.observe(e)});
}

/* ---------- Gentle parallax on flowers ---------- */
var px=$$('[data-px]'),tick=false;
function par(){tick=false;var h=innerHeight;px.forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom<-50||r.top>h+50)return;var o=(r.top+r.height/2-h/2)*parseFloat(el.getAttribute('data-px'));el.style.translate='0 '+o.toFixed(1)+'px'})}
if(!reduce){addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(par)}},{passive:true})}

/* ---------- Countdown: 16 Nov 2026, 7:30 PM IST ---------- */
var TARGET=new Date('2026-11-16T19:30:00+05:30').getTime(),cd=['d','h','m','s'].map(function(k){return $('#cd-'+k)});
function pad(n){return n<10?'0'+n:''+n}
function set(e,v){if(e.textContent!==''+v){e.textContent=v;e.classList.remove('tick');void e.offsetWidth;e.classList.add('tick')}}
function tickCd(){var ms=TARGET-Date.now();
 if(ms<=0){cd.forEach(function(e){e.textContent='00'});$('#cd-note').textContent='The celebration has begun. Join us with your blessings.';return}
 var s=Math.floor(ms/1000);set(cd[0],Math.floor(s/86400));set(cd[1],pad(Math.floor(s%86400/3600)));set(cd[2],pad(Math.floor(s%3600/60)));set(cd[3],pad(s%60))}
tickCd();setInterval(tickCd,1000);

/* ---------- Falling petals + tap bursts (hearts and petals) ---------- */
var fx=$('#fx'),cx=fx.getContext('2d'),W,H,R=1,petals=[],parts=[],COL=['#f4aaa9','#f6b8b3','#e98590','#fbd9d2','#f7cdb4','#e3c27a'];
function size(){R=Math.min(devicePixelRatio||1,2);W=fx.width=innerWidth*R;H=fx.height=innerHeight*R}
size();addEventListener('resize',size);
function petal(init){return{x:Math.random()*W,y:init?Math.random()*H:-20*R,s:(Math.random()*7+6)*R,v:(Math.random()*.6+.35)*R,r:Math.random()*6,vr:(Math.random()-.5)*.04,p:Math.random()*6,c:COL[Math.random()*4|0]}}
for(var k=0;k<(innerWidth<700?12:22);k++)petals.push(petal(true));
function drawPetal(x,y,s,r,c,a){cx.save();cx.translate(x,y);cx.rotate(r);cx.globalAlpha=a;cx.fillStyle=c;cx.beginPath();cx.moveTo(0,-s);cx.bezierCurveTo(s*.9,-s*.5,s*.7,s*.7,0,s);cx.bezierCurveTo(-s*.7,s*.7,-s*.9,-s*.5,0,-s);cx.fill();cx.restore()}
function drawHeart(x,y,s,c,a){cx.save();cx.translate(x,y);cx.globalAlpha=a;cx.fillStyle=c;cx.beginPath();cx.moveTo(0,s*.35);cx.bezierCurveTo(-s*1.2,-s*.4,-s*.5,-s*1.1,0,-s*.4);cx.bezierCurveTo(s*.5,-s*1.1,s*1.2,-s*.4,0,s*.35);cx.fill();cx.restore()}
function burst(x,y,n){if(reduce)return;for(var i=0;i<n;i++){var a=Math.random()*6.283,v=(Math.random()*4+2)*R;parts.push({x:x*R,y:y*R,vx:Math.cos(a)*v,vy:Math.sin(a)*v-2*R,s:(Math.random()*6+5)*R,r:Math.random()*6,life:1,h:i%3===0,c:COL[Math.random()*6|0]})}}
window.burst=burst;
if(!reduce){(function draw(){cx.clearRect(0,0,W,H);
 petals.forEach(function(p,i){p.y+=p.v;p.p+=.015;p.x+=Math.sin(p.p)*.7*R;p.r+=p.vr;if(p.y>H+20*R)petals[i]=petal();drawPetal(p.x,p.y,p.s,p.r,p.c,.55)});
 parts=parts.filter(function(q){q.x+=q.vx;q.y+=q.vy;q.vy+=.12*R;q.vx*=.99;q.r+=.08;q.life-=.014;if(q.life<=0)return false;q.h?drawHeart(q.x,q.y,q.s,'#e98590',q.life):drawPetal(q.x,q.y,q.s,q.r,q.c,q.life);return true});
 requestAnimationFrame(draw)})()}
document.addEventListener('pointerdown',function(e){if(document.body.classList.contains('locked')&&!e.target.closest('.btn,.skip'))return;if(e.target.closest('.player'))return;burst(e.clientX,e.clientY,14)});
$('#dateBtn').addEventListener('click',function(e){var r=e.currentTarget.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,36)});

/* ---------- Photo tilt (mouse or finger) ---------- */
var ph=$('#photo');
if(ph&&!reduce){var tl=function(e){var r=ph.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ph.style.transform='perspective(800px) rotateY('+(x*10).toFixed(1)+'deg) rotateX('+(-y*8).toFixed(1)+'deg)'};
 ph.addEventListener('pointermove',tl);ph.addEventListener('pointerleave',function(){ph.style.transform=''});ph.addEventListener('pointerup',function(){ph.style.transform=''})}

/* ---------- Scroll progress + WhatsApp share ---------- */
var pr=$('#prog');addEventListener('scroll',function(){var m=document.documentElement.scrollHeight-innerHeight;pr.style.width=(m>0?scrollY/m*100:0)+'%'},{passive:true});
$('#share').href='https://wa.me/?text='+encodeURIComponent('You are invited to the engagement of Vinod & Nethra on 16 November 2026 at Sri Panduranga Temple, Gangavathi. '+location.href.split('#')[0]);

})();
