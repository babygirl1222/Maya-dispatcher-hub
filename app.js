
if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('./service-worker.js'); }); }
const loadingOverlay = document.getElementById('loadingOverlay');
const welcomeBanner = document.getElementById('welcomeBanner');
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
const reflectionBtn = document.getElementById('openReflection');
const reflectionModal = document.getElementById('reflectionModal');
const reflectionText = document.getElementById('reflectionText');
const backToTop = document.getElementById('backToTop');

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => loadingOverlay.style.display='none', 600);
    playSoftBell();
    showBanner();
  }, 900);
});

function showBanner(){ welcomeBanner.style.opacity = '1'; setTimeout(() => { welcomeBanner.style.opacity = '0'; }, 2600); }

function playSoftBell(){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o1 = ctx.createOscillator(); const o2 = ctx.createOscillator(); const g = ctx.createGain();
    o1.type='sine'; o2.type='triangle'; o1.frequency.value = 880; o2.frequency.value = 1320; g.gain.value = 0.001;
    o1.connect(g); o2.connect(g); g.connect(ctx.destination); o1.start(); o2.start();
    const now = ctx.currentTime; g.gain.exponentialRampToValueAtTime(0.08, now + 0.02); g.gain.exponentialRampToValueAtTime(0.03, now + 0.35); g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    o1.stop(now + 1.25); o2.stop(now + 1.25);
  }catch(e){}
}

tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x=>x.classList.remove('active')); panels.forEach(p=>p.classList.remove('active'));
  t.classList.add('active'); const target = document.getElementById(t.dataset.target); if(target) target.classList.add('active');
  markStudiedToday();
}));

const QUOTES = [
  "You showed up for yourself today, Maya — that's enough.",
  "Rest is part of progress. Breathe, reset, and start fresh tomorrow.",
  "You can't pour from an empty cup. Fill yours first.",
  "Calm is contagious. You bring it to every call.",
  "Tiny reps count. Two cards now > zero later."
];
reflectionBtn.addEventListener('click', () => { const q = QUOTES[Math.floor(Math.random()*QUOTES.length)]; reflectionText.textContent = q; reflectionModal.classList.add('show'); });
document.getElementById('closeReflection').addEventListener('click', ()=>{ reflectionModal.classList.remove('show'); });

window.addEventListener('scroll', () => { if(window.scrollY > 600) backToTop.style.display='block'; else backToTop.style.display='none'; });
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

function markStudiedToday(){
  const keyDate = 'maya_study_last'; const keyStreak = 'maya_study_streak';
  const today = new Date(); today.setHours(0,0,0,0); const last = localStorage.getItem(keyDate);
  let streak = parseInt(localStorage.getItem(keyStreak) || '0', 10);
  if(!last){ streak = 1; } else { const lastDate = new Date(parseInt(last,10)); const diff = (today - lastDate) / (1000*60*60*24);
    if(diff === 0){} else if(diff === 1){ streak += 1; } else { streak = 1; } }
  localStorage.setItem(keyDate, today.getTime().toString()); localStorage.setItem(keyStreak, String(streak)); renderStreak(streak);
}
function renderStreak(streak){ document.getElementById('streakCount').textContent = streak; }
(function(){ const s = parseInt(localStorage.getItem('maya_study_streak')||'0',10); renderStreak(s); })();

window.addEventListener('pageshow', ()=>{ const el = document.getElementById('welcomeBack'); el.style.opacity='1'; setTimeout(()=> el.style.opacity='0', 800); });
