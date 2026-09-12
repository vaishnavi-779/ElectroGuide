(() => {
  const app = document.getElementById('games-app');
  if (!app) return;

  const games = [
    ['circuit','🔌','Circuit Builder','Build and test complete electronic circuits.'],
    ['led','💡','LED Safety Lab','Choose the correct resistor and learn safe LED current.'],
    ['repair','🛠️','Faulty Circuit Repair','Trace faults and restore circuit continuity.'],
    ['supply','⚡','Power Supply Builder','Build a regulated power-supply chain.'],
    ['logic','🔷','Digital Logic Builder','Build logic functions from digital inputs.'],
    ['arduino','🤖','Arduino Wiring Lab','Wire LEDs, buttons and sensors to Arduino pins.'],
    ['comm','📡','Communication Lab','Build a transmitter-to-receiver signal chain.'],
    ['meter','📟','Virtual Multimeter','Use the correct mode and probe placement.'],
    ['scope','〰️','Oscilloscope Lab','Set up and stabilize oscilloscope measurements.'],
    ['pcb','🧩','PCB Troubleshooter','Inspect a board and locate the faulty part.']
  ];

  const KEY = 'electroguide-game-progress-v2';
  let progress = {};
  try { progress = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) {}
  games.forEach(g => { if (!progress[g[0]]) progress[g[0]] = {level:1,xp:0}; });

  let current = 'circuit';
  let selected = null;
  let wires = [];
  let ledValue = 330;
  let meterMode = 'V', meterPlacement = 'parallel';
  let logicA = false, logicB = false, logicGate = 'AND';
  let scopeFreq = 1000, scopeAmp = 2, scopeWave = 'Sine';
  let pcbChoice = null;
  let lastStatus = 'Select an action to begin.';

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const game = () => games.find(g => g[0] === current);
  const level = () => progress[current].level;
  const cfg = () => {
    const n = level();
    return {
      n,
      tier: n <= 10 ? 'FOUNDATION' : n <= 20 ? 'INTERMEDIATE' : 'ADVANCED',
      wires: Math.min(7, 2 + Math.floor((n - 1) / 5)),
      voltage: 3 + (n % 6),
      resistor: [100,220,330,470,680,1000][(n-1) % 6],
      freq: [100,250,500,1000,2000,5000][(n-1) % 6],
      amp: [1,2,3,5][(n-1) % 4],
      targetGate: ['AND','OR','XOR'][Math.floor((n-1)/10) % 3],
      targetMode: ['V','I','R'][Math.floor((n-1)/10) % 3],
      targetPlacement: n % 3 === 0 ? 'series' : 'parallel'
    };
  };

  function save() { try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (_) {} }
  function setStatus(text, good=false) { lastStatus = text; const s = document.getElementById('game-status'); if (s) { s.textContent = text; s.className = 'status ' + (good ? 'ok' : ''); } }
  function award() {
    const p = progress[current], n = level();
    if (p.level >= 30) {
      p.xp += 50;
      setStatus('🏆 Level 30 complete! You mastered all 30 levels of this game. +50 XP', true);
    } else {
      p.xp += 10 + n * 2;
      p.level++;
      setStatus(`✅ Level ${n} complete! Level ${p.level} unlocked. +${10+n*2} XP`, true);
    }
    save();
    selected = null; wires = []; pcbChoice = null;
    render();
  }

  function resetLevel() { selected = null; wires = []; pcbChoice = null; render(); setStatus('Level reset. Try the challenge again.'); }
  function pair(a,b) { return wires.some(w => (w[0]===a&&w[1]===b)||(w[0]===b&&w[1]===a)); }
  function connect(id) {
    if (!selected) { selected = id; render(); return; }
    if (selected !== id && !pair(selected,id)) wires.push([selected,id]);
    selected = null; render();
  }
  function term(id,x,y) { return `<circle class="terminal ${selected===id?'selected':''}" data-terminal="${id}" cx="${x}" cy="${y}" r="10"></circle>`; }
  function line(a,b) { return `<line class="wire" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`; }
  function wireLines(points) { return wires.map(w => points[w[0]]&&points[w[1]] ? line(points[w[0]],points[w[1]]) : '').join(''); }
  function text(x,y,t,size=14) { return `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle">${esc(t)}</text>`; }
  function btn(label,action,cls='lab-btn') { return `<button class="${cls}" data-action="${action}">${label}</button>`; }

  function shell(content) {
    const g = game(), c = cfg(), p = progress[current];
    app.innerHTML = `
      <div class="game-select">${games.map(x => `<button class="game-tab ${x[0]===current?'active':''}" data-game="${x[0]}">${x[1]} ${x[2]}</button>`).join('')}</div>
      <section class="lab">
        <div class="lab-head">
          <div><h2>${g[1]} ${g[2]}</h2><p>${g[3]}</p></div>
          <strong>Level ${c.n}/30 · ${c.tier}<br>Game XP: ${p.xp}</strong>
        </div>
        <div class="level-bar" aria-label="Level progress"><span style="width:${(c.n/30)*100}%"></span></div>
        <div class="level-strip">${Array.from({length:30},(_,i)=>`<button class="level-dot ${i+1===c.n?'current':''} ${i+1<p.level?'done':''}" data-level="${i+1}" ${i+1>p.level?'disabled':''}>${i+1}</button>`).join('')}</div>
        ${content}
      </section>`;
    app.querySelectorAll('[data-game]').forEach(b => b.onclick=()=>{ current=b.dataset.game; selected=null; wires=[]; pcbChoice=null; lastStatus='Select an action to begin.'; render(); });
    app.querySelectorAll('[data-level]').forEach(b => b.onclick=()=>{ const n=Number(b.dataset.level); if(n<=progress[current].level){ progress[current].level=n; save(); resetLevel(); } });
    bind();
  }

  function challenge(title, mission, controls, graphic) {
    return `<div class="lab-layout"><div class="board">${graphic}</div><aside class="palette"><div class="tool-card"><h3>🎯 Level ${cfg().n} Mission</h3><p>${mission}</p></div>${controls}<div class="actions">${btn('RESET LEVEL','reset','lab-btn secondary')}</div>${`<div id="game-status" class="status">${esc(lastStatus)}</div>`}</aside></div>`;
  }

  function circuit() {
    const c=cfg();
    const P={bp:[90,230],s1:[250,230],s2:[360,230],r1:[470,230],r2:[580,230],l1:[690,230],l2:[800,230],bn:[90,350]};
    const target=['bp','s1','s2','r1','r2','l1','l2','bn'];
    const need=c.wires;
    const action=()=>{
      const required=target.slice(0,Math.min(target.length,need+1));
      const ok=required.every((v,i)=>i===0 || wires.some(w=>pair(w,required[i-1]) && w.includes(v))) && wires.length>=need;
      if(ok) award(); else setStatus(`Not complete yet. Build at least ${need} correct connections. Required path starts + → switch → resistor → LED → −.`);
    };
    window._gameAction=action;
    return challenge('Circuit Builder',`Connect the circuit with at least ${need} wires. Higher levels add more connection checks. Level ${c.n} target: ${c.wires} connections.`,
      `<div class="tool-card"><h3>🧠 Learn</h3><p>Current needs a closed electrical path. Follow the source, control element, resistor and load in order.</p></div><div class="actions">${btn('⚡ TEST CIRCUIT','test')}</div>`,
      `<svg viewBox="0 0 900 480">${text(450,50,'CIRCUIT BUILDER · LEVEL '+c.n,20)}${wireLines(P)}
      <rect class="component-body" x="40" y="185" width="100" height="170" rx="14"/><text class="component-label" x="90" y="260">BATTERY</text><text class="component-note" x="90" y="284">${c.voltage}V</text>
      <rect class="component-body" x="220" y="200" width="160" height="60" rx="12"/><text class="component-label" x="300" y="235">SWITCH</text>
      <rect class="component-body" x="440" y="200" width="160" height="60" rx="12"/><text class="component-label" x="520" y="235">RESISTOR</text>
      <rect class="component-body" x="660" y="200" width="160" height="60" rx="30"/><text class="component-label" x="740" y="235">LED</text>
      ${term('bp',90,230)}${term('s1',250,230)}${term('s2',360,230)}${term('r1',470,230)}${term('r2',580,230)}${term('l1',690,230)}${term('l2',800,230)}${term('bn',90,350)}${text(450,420,`Click two yellow terminals to connect · ${wires.length}/${need} required`,13)}</svg>`);
  }

  function led() {
    const c=cfg(), currentmA=((c.voltage-2)/ledValue*1000), safe=ledValue>=c.resistor && ledValue<=1000;
    window._gameAction=()=>{ if(safe && Math.abs(ledValue-c.resistor)<1) award(); else setStatus(`Choose ${c.resistor} Ω for this level. Your current setting is ${ledValue} Ω.`); };
    return challenge('LED Safety Lab',`Select the target resistor for this level: ${c.resistor} Ω. Predict current, then apply power.`,
      `<div class="tool-card"><h3>Resistor</h3><div class="value-row">${[100,220,330,470,680,1000].map(v=>`<button class="value-btn ${v===ledValue?'active':''}" data-resistor="${v}">${v} Ω</button>`).join('')}</div></div><div class="tool-card"><p>Calculated current: <b>${currentmA.toFixed(1)} mA</b></p></div><div class="actions">${btn('💡 APPLY POWER','test')}</div>`,
      `<svg viewBox="0 0 900 480">${text(450,50,'LED SAFETY LAB · LEVEL '+c.n,20)}<rect class="component-body" x="60" y="190" width="150" height="100" rx="14"/><text class="component-label" x="135" y="235">${c.voltage}V SUPPLY</text><rect class="component-body" x="330" y="205" width="240" height="70" rx="12"/><text class="component-label" x="450" y="245">R = ${ledValue} Ω</text><rect class="component-body" x="690" y="205" width="130" height="70" rx="35"/><text class="component-label" x="755" y="245">RED LED</text><line class="wire" x1="210" y1="240" x2="330" y2="240"/><line class="wire" x1="570" y1="240" x2="690" y2="240"/>${text(450,370,`Target: ${c.resistor} Ω · Current: ${currentmA.toFixed(1)} mA`,18)}${text(450,405,'I = (V − VLED) / R',13)}</svg>`);
  }

  function repair() {
    const c=cfg(), P={a:[210,235],b:[690,235]};
    window._gameAction=()=>{ if(wires.length>=1 && pair('a','b')) award(); else setStatus('The open terminals are still disconnected. Click both yellow terminals.'); };
    return challenge('Faulty Circuit Repair',`Find and repair the open trace. Level ${c.n} requires ${Math.min(3,1+Math.floor((c.n-1)/10))} continuity test${c.n>10?'s':''}.`,
      `<div class="tool-card"><h3>🔎 Diagnostic</h3><p>Follow the signal from SOURCE to LOAD. A dashed trace means an open circuit.</p></div><div class="actions">${btn('🛠️ TEST REPAIR','test')}</div>`,
      `<svg viewBox="0 0 900 480">${text(450,50,'FAULT REPAIR · LEVEL '+c.n,20)}<circle cx="145" cy="235" r="55" class="component-body"/><text class="component-label" x="145" y="240">SOURCE</text><rect class="component-body" x="350" y="205" width="130" height="60" rx="12"/><text class="component-label" x="415" y="240">RESISTOR</text><circle cx="755" cy="235" r="45" class="component-body"/><text class="component-label" x="755" y="240">LOAD</text><line class="wire" x1="200" y1="235" x2="350" y2="235"/><line class="wire" x1="480" y1="235" x2="700" y2="235" stroke-dasharray="10 12"/>${wireLines(P)}${term('a',210,235)}${term('b',690,235)}${text(450,390,'Connect the two yellow fault terminals.',13)}</svg>`);
  }

  function chain(type) {
    const c=cfg(), supply=type==='supply';
    const nodes=supply?['AC SOURCE','RECTIFIER','FILTER CAP','REGULATOR','LOAD']:['SIGNAL','MODULATOR','CHANNEL','DEMODULATOR','OUTPUT'];
    const P={}; nodes.forEach((_,i)=>{if(i<nodes.length-1){P['o'+i]=[160+i*180,230];P['i'+(i+1)]=[200+i*180,230];}});
    const required=nodes.length-1;
    window._gameAction=()=>{const good=Array.from({length:required},(_,i)=>pair('o'+i,'i'+(i+1))).every(Boolean); if(good) award(); else setStatus(`Connect all ${required} adjacent stages from left to right.`);};
    return challenge(supply?'Power Supply Builder':'Communication Lab',`Build every stage in order. Level ${c.n} requires all ${required} stage-to-stage connections.`,
      `<div class="tool-card"><h3>Mission chain</h3><p>${nodes.join(' → ')}.</p></div><div class="actions">${btn('▶ RUN TEST','test')}</div>`,
      `<svg viewBox="0 0 1000 500">${text(500,55,(supply?'POWER SUPPLY':'COMMUNICATION')+' · LEVEL '+c.n,20)}${nodes.map((n,i)=>{const x=25+i*180;return `<rect class="component-body" x="${x}" y="180" width="135" height="100" rx="15"/><text class="component-label" x="${x+67}" y="222">${n}</text><text class="component-note" x="${x+67}" y="248">stage ${i+1}</text>${i<nodes.length-1?term('o'+i,x+135,230)+term('i'+(i+1),x+175,230):''}`}).join('')}${wireLines(P)}${text(500,405,'Connect each adjacent stage.',13)}</svg>`);
  }

  function logic() {
    const c=cfg();
    const out=logicGate==='AND'?logicA&&logicB:logicGate==='OR'?logicA||logicB:logicA!==logicB;
    const desired = c.n%2===0;
    window._gameAction=()=>{ if(logicGate===c.targetGate && out===desired) award(); else setStatus(`Target: ${c.targetGate} gate with output ${desired?'HIGH':'LOW'}.`); };
    return challenge('Digital Logic Builder',`Level ${c.n}: use a ${c.targetGate} gate and make the output ${desired?'HIGH':'LOW'}.`,
      `<div class="tool-card toggle"><span>Input A: <b>${logicA?'HIGH':'LOW'}</b></span><button class="switch ${logicA?'on':''}" data-toggle="A"></button></div><div class="tool-card toggle"><span>Input B: <b>${logicB?'HIGH':'LOW'}</b></span><button class="switch ${logicB?'on':''}" data-toggle="B"></button></div><div class="tool-card"><h3>Gate</h3><div class="value-row">${['AND','OR','XOR'].map(g=>`<button class="value-btn ${logicGate===g?'active':''}" data-gate="${g}">${g}</button>`).join('')}</div></div><div class="actions">${btn('CHECK OUTPUT','test')}</div>`,
      `<svg viewBox="0 0 900 500">${text(450,50,'DIGITAL LOGIC · LEVEL '+c.n,20)}<rect class="component-body" x="70" y="135" width="160" height="65" rx="12"/><text class="component-label" x="150" y="174">INPUT A</text><rect class="component-body" x="70" y="280" width="160" height="65" rx="12"/><text class="component-label" x="150" y="319">INPUT B</text><rect class="component-body" x="350" y="175" width="190" height="145" rx="18"/><text class="component-label" x="445" y="250">${logicGate} GATE</text><rect class="component-body" x="675" y="215" width="120" height="80" rx="14"/><text class="component-label" x="735" y="250">OUTPUT</text><text x="735" y="276" fill="#00ffc8" font-size="15" font-weight="900" text-anchor="middle">${out?'HIGH':'LOW'}</text>${text(450,410,`Target output: ${desired?'HIGH':'LOW'}`,13)}</svg>`);
  }

  function arduino() {
    const c=cfg(), P={v5:[350,170],gnd:[550,325],d13:[550,170],d2:[550,250],led:[210,205],button:[700,250]};
    const need=c.n<=10?['v5','led','d13']:c.n<=20?['gnd','led','d13','button','d2']:['v5','gnd','led','d13','button','d2'];
    window._gameAction=()=>{ if(need.every(x=>wires.some(w=>w.includes(x)))) award(); else setStatus(`Connect the required Arduino points: ${need.join(', ')}.`); };
    return challenge('Arduino Wiring Lab',`Level ${c.n}: wire the required points. Later levels require power, ground, LED and push-button connections.`,
      `<div class="tool-card"><h3>Required</h3><p>${need.map(x=>'<b>'+x+'</b>').join(' · ')}</p></div><div class="actions">${btn('⬆️ UPLOAD / RUN','test')}</div>`,
      `<svg viewBox="0 0 900 500">${text(450,50,'ARDUINO WIRING · LEVEL '+c.n,20)}<rect class="component-body" x="330" y="100" width="240" height="300" rx="18"/><text class="component-label" x="450" y="140">ARDUINO UNO</text><text class="component-note" x="450" y="165">D13 · D2 · 5V · GND</text><rect class="component-body" x="125" y="175" width="150" height="80" rx="15"/><text class="component-label" x="200" y="220">LED</text><rect class="component-body" x="625" y="215" width="150" height="80" rx="15"/><text class="component-label" x="700" y="260">PUSH BUTTON</text>${Object.entries(P).map(([k,p])=>term(k,p[0],p[1])).join('')}${wireLines(P)}${text(450,430,'Click two yellow terminals to make wiring connections.',13)}</svg>`);
  }

  function meter() {
    const c=cfg();
    window._gameAction=()=>{if(meterMode===c.targetMode&&meterPlacement===c.targetPlacement) award(); else setStatus(`Level ${c.n} target: ${c.targetMode} measurement in ${c.targetPlacement} placement.`);};
    const reading=meterMode==='V'?'5.00 V':meterMode==='I'?'18.2 mA':'330 Ω';
    return challenge('Virtual Multimeter',`Choose the correct measurement mode and probe placement for level ${c.n}: ${c.targetMode} + ${c.targetPlacement}.`,
      `<div class="tool-card"><h3>Mode</h3><div class="value-row">${['V','I','R'].map(x=>`<button class="value-btn ${meterMode===x?'active':''}" data-meter="${x}">${x==='V'?'Voltage':x==='I'?'Current':'Resistance'}</button>`).join('')}</div></div><div class="tool-card"><h3>Placement</h3><div class="value-row">${['parallel','series'].map(x=>`<button class="value-btn ${meterPlacement===x?'active':''}" data-place="${x}">${x}</button>`).join('')}</div></div><div class="actions">${btn('📟 MEASURE','test')}</div>`,
      `<svg viewBox="0 0 900 480">${text(450,50,'VIRTUAL MULTIMETER · LEVEL '+c.n,20)}<rect class="component-body" x="80" y="120" width="740" height="260" rx="22"/><text class="component-label" x="450" y="165">DIGITAL MULTIMETER</text><rect x="270" y="200" width="360" height="90" rx="12" fill="#02080c" stroke="#5b7b88"/><text x="450" y="258" fill="#00ffc8" font-size="38" font-weight="900" text-anchor="middle">${reading}</text>${text(450,335,`Mode: ${meterMode} · Probe: ${meterPlacement}`,14)}</svg>`);
  }

  function scope() {
    const c=cfg();
    window._gameAction=()=>{if(scopeFreq===c.freq&&scopeAmp===c.amp) award(); else setStatus(`Tune the scope to ${c.freq} Hz and ${c.amp} Vpp.`);};
    return challenge('Oscilloscope Lab',`Level ${c.n}: set frequency to ${c.freq} Hz and amplitude to ${c.amp} Vpp, then stabilize the waveform.`,
      `<div class="tool-card"><h3>Frequency</h3><div class="value-row">${[100,250,500,1000,2000,5000].map(v=>`<button class="value-btn ${scopeFreq===v?'active':''}" data-freq="${v}">${v} Hz</button>`).join('')}</div></div><div class="tool-card"><h3>Amplitude</h3><div class="value-row">${[1,2,3,5].map(v=>`<button class="value-btn ${scopeAmp===v?'active':''}" data-amp="${v}">${v} Vpp</button>`).join('')}</div></div><div class="actions">${btn('〰️ STABILIZE / TEST','test')}</div>`,
      `<svg viewBox="0 0 900 480"><rect x="50" y="70" width="800" height="330" rx="18" fill="#02080c" stroke="#5b7b88"/><g opacity=".25">${Array.from({length:9},(_,i)=>`<line x1="90" y1="${105+i*32}" x2="810" y2="${105+i*32}" stroke="#7a9"/>`).join('')}</g>${waveSvg(scopeFreq,scopeAmp)}${text(450,435,`CH1 · ${scopeFreq} Hz · ${scopeAmp} Vpp · ${scopeWave}`,14)}</svg>`);
  }

  function waveSvg(freq,amp){let pts=[];for(let i=0;i<=240;i++){const x=90+i*3;const y=235-Math.sin(i/18)*amp*18;pts.push((i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1));}return `<path d="${pts.join(' ')}" fill="none" stroke="#00ffc8" stroke-width="3"/>`;}

  function pcb() {
    const c=cfg(), parts=['F1 Fuse','U1 Regulator','R3 Resistor','Q1 Transistor'];
    const target=parts[(c.n-1)%4];
    window._gameAction=()=>{if(pcbChoice===target) award(); else setStatus(`Incorrect diagnosis. Check the board symptoms and identify ${target}.`);};
    return challenge('PCB Troubleshooter',`Level ${c.n}: inspect the board and identify the faulty component. Current fault target: ${target}.`,
      `<div class="tool-card"><h3>🔬 Suspect list</h3><div class="value-row">${parts.map(p=>`<button class="value-btn ${pcbChoice===p?'active':''}" data-pcb="${esc(p)}">${p}</button>`).join('')}</div></div><div class="tool-card"><p>Tip: trace power first, then regulation, signal conditioning and output.</p></div><div class="actions">${btn('🔎 TEST DIAGNOSIS','test')}</div>`,
      `<svg viewBox="0 0 900 480">${text(450,50,'PCB TROUBLESHOOTER · LEVEL '+c.n,20)}<rect x="90" y="90" width="720" height="310" rx="25" fill="#123d30" stroke="#6caa8d" stroke-width="4"/>${[[190,160,'F1'],[400,150,'U1'],[610,175,'R3'],[300,300,'Q1']].map(a=>`<rect class="component-body" x="${a[0]-55}" y="${a[1]-35}" width="110" height="70" rx="10"/><text class="component-label" x="${a[0]}" y="${a[1]+5}">${a[2]}</text>`).join('')}<path d="M190 160 H345 M455 150 H555 M300 300 H600 M400 150 V300" stroke="#d8b45c" stroke-width="5" fill="none" opacity=".8"/>${text(450,440,'Select a suspect, then run the diagnosis.',13)}</svg>`);
  }

  function render() {
    if(current==='circuit') shell(circuit());
    else if(current==='led') shell(led());
    else if(current==='repair') shell(repair());
    else if(current==='supply') shell(chain('supply'));
    else if(current==='logic') shell(logic());
    else if(current==='arduino') shell(arduino());
    else if(current==='comm') shell(chain('comm'));
    else if(current==='meter') shell(meter());
    else if(current==='scope') shell(scope());
    else if(current==='pcb') shell(pcb());
  }

  function bind() {
    app.querySelectorAll('[data-terminal]').forEach(el=>el.onclick=()=>connect(el.dataset.terminal));
    app.querySelectorAll('[data-action]').forEach(el=>el.onclick=()=>{
      const a=el.dataset.action;
      if(a==='reset') resetLevel();
      if(a==='test' && window._gameAction) window._gameAction();
    });
    app.querySelectorAll('[data-resistor]').forEach(el=>el.onclick=()=>{ledValue=Number(el.dataset.resistor);render();});
    app.querySelectorAll('[data-meter]').forEach(el=>el.onclick=()=>{meterMode=el.dataset.meter;render();});
    app.querySelectorAll('[data-place]').forEach(el=>el.onclick=()=>{meterPlacement=el.dataset.place;render();});
    app.querySelectorAll('[data-gate]').forEach(el=>el.onclick=()=>{logicGate=el.dataset.gate;render();});
    app.querySelectorAll('[data-toggle]').forEach(el=>el.onclick=()=>{if(el.dataset.toggle==='A')logicA=!logicA;else logicB=!logicB;render();});
    app.querySelectorAll('[data-freq]').forEach(el=>el.onclick=()=>{scopeFreq=Number(el.dataset.freq);render();});
    app.querySelectorAll('[data-amp]').forEach(el=>el.onclick=()=>{scopeAmp=Number(el.dataset.amp);render();});
    app.querySelectorAll('[data-pcb]').forEach(el=>el.onclick=()=>{pcbChoice=el.dataset.pcb;render();});
  }

  render();
})();
