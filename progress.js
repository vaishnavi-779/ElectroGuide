/* ElectroGuide unified progress system */
(() => {
  const XP_KEY = 'eg-xp';
  const DAY_KEY = 'eg-activity-day';
  const GAME_KEY = 'electroguide-game-progress-v2';
  const GAME_SEEN = 'eg-game-xp-seen-v1';
  const page = location.pathname.split('/').pop() || 'index.html';

  const xp = () => Number(localStorage.getItem(XP_KEY) || 0);
  const setXP = n => { localStorage.setItem(XP_KEY, String(Math.max(0, Math.floor(n)))); if (window.EG && EG.paintStats) EG.paintStats(); render(); };
  const add = (n, reason) => {
    if (!n) return;
    setXP(xp() + n);
    toast(`+${n} XP · ${reason}`);
  };
  const toast = msg => {
    let t = document.getElementById('eg-xp-toast');
    if (!t) { t = document.createElement('div'); t.id='eg-xp-toast'; document.body.appendChild(t); }
    t.textContent = `🏆 ${msg}`; t.classList.add('show'); clearTimeout(t._timer); t._timer=setTimeout(()=>t.classList.remove('show'),2200);
  };

  function render() {
    document.querySelectorAll('[data-eg-total-xp]').forEach(e => e.textContent = xp());
    document.querySelectorAll('[data-eg-level]').forEach(e => e.textContent = Math.floor(xp()/100)+1);
    const need = 100 - (xp() % 100);
    document.querySelectorAll('[data-eg-next]').forEach(e => e.textContent = need === 100 ? 100 : need);
    const pct = xp()%100;
    document.querySelectorAll('[data-eg-xp-fill]').forEach(e => e.style.width = `${pct}%`);
  }

  function ensurePanel() {
    if (!document.body || document.getElementById('eg-progress-panel')) return;
    const panel = document.createElement('aside');
    panel.id='eg-progress-panel';
    panel.innerHTML=`<div class="egp-title">🏆 YOUR ELECTROGUIDE PROGRESS</div><div class="egp-main"><strong data-eg-total-xp>${xp()}</strong><span>XP</span><b>LEVEL <em data-eg-level>${Math.floor(xp()/100)+1}</em></b></div><div class="egp-bar"><span data-eg-xp-fill></span></div><div class="egp-next"><span><b data-eg-next>${100-(xp()%100)}</b> XP to next level</span><a href="quiz.html">Practice →</a></div>`;
    document.body.appendChild(panel); render();
  }

  function rewardDailyActivity() {
    const today = new Date().toISOString().slice(0,10);
    if (localStorage.getItem(DAY_KEY) !== today) {
      localStorage.setItem(DAY_KEY, today);
      add(5, 'daily ElectroGuide activity');
    }
  }

  function watchGames() {
    let seen={};
    try { seen=JSON.parse(localStorage.getItem(GAME_SEEN)||'{}'); } catch (_) {}
    const check=()=>{
      let data={};
      try { data=JSON.parse(localStorage.getItem(GAME_KEY)||'{}'); } catch (_) { return; }
      let changed=false;
      Object.keys(data).forEach(k=>{
        const current=Number(data[k]?.xp||0), previous=Number(seen[k]||0);
        if (current>previous) { add(current-previous, `${k} game progress`); seen[k]=current; changed=true; }
      });
      if (changed) localStorage.setItem(GAME_SEEN, JSON.stringify(seen));
    };
    check(); setInterval(check, 700);
  }

  const style=document.createElement('style');
  style.textContent=`#eg-progress-panel{position:fixed;right:18px;bottom:18px;z-index:9998;width:255px;padding:14px 16px;border:1px solid rgba(54,224,197,.35);border-radius:16px;background:rgba(5,15,22,.96);box-shadow:0 12px 35px rgba(0,0,0,.35);color:#e7fbff;font:13px/1.4 system-ui,sans-serif;backdrop-filter:blur(10px)}.egp-title{font-size:10px;letter-spacing:1px;color:#8faab6;font-weight:800;margin-bottom:8px}.egp-main{display:flex;align-items:baseline;gap:6px}.egp-main strong{font-size:26px;color:#36e0c5}.egp-main span{color:#8faab6}.egp-main b{margin-left:auto;font-size:11px;color:#ffd166}.egp-main em{font-style:normal;color:#fff}.egp-bar{height:6px;margin:10px 0 7px;border-radius:99px;background:#142632;overflow:hidden}.egp-bar span{display:block;height:100%;width:0;background:#36e0c5;transition:width .25s}.egp-next{display:flex;justify-content:space-between;color:#8faab6;font-size:11px}.egp-next a{color:#36e0c5;text-decoration:none;font-weight:800}#eg-xp-toast{position:fixed;right:22px;bottom:118px;z-index:10000;padding:11px 15px;border-radius:12px;background:#102b36;color:#eaffff;border:1px solid rgba(54,224,197,.45);box-shadow:0 10px 25px rgba(0,0,0,.3);font:700 13px system-ui,sans-serif;opacity:0;transform:translateY(8px);pointer-events:none;transition:.2s}#eg-xp-toast.show{opacity:1;transform:translateY(0)}@media(max-width:600px){#eg-progress-panel{left:12px;right:12px;bottom:10px;width:auto}.egp-title{font-size:9px}#eg-xp-toast{left:18px;right:18px;bottom:105px;text-align:center}}`;
  document.head.appendChild(style);
  ensurePanel();
  rewardDailyActivity();
  if (page === 'games.html') watchGames();
  render();
})();