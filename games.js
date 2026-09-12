(() => {
  const app = document.getElementById('games-app');
  if (!app) return;

  const games = [
    ['circuit','🔌','Circuit Builder','Build a complete battery → switch → resistor → LED loop.'],
    ['led','💡','LED Safety Lab','Choose a current-limiting resistor and calculate LED current.'],
    ['repair','🛠️','Faulty Circuit Repair','Trace the open connection and restore continuity.'],
    ['supply','⚡','Power Supply Builder','Build AC source → rectifier → filter → regulator → load.'],
    ['logic','🔷','Digital Logic Builder','Operate logic inputs and build the requested logic function.'],
    ['arduino','🤖','Arduino Wiring Lab','Wire an LED and push button to the correct Arduino pins.'],
    ['comm','📡','Communication Lab','Connect the complete transmitter-to-receiver signal chain.'],
    ['meter','📟','Virtual Multimeter','Select the correct measurement mode and probe placement.'],
    ['scope','〰️','Oscilloscope Lab','Set amplitude/frequency and create a stable oscilloscope reading.'],
    ['pcb','🧩','PCB Troubleshooter','Inspect board sections and identify the faulty component.']
  ];

  let current = 'circuit';
  let selected = null;
  let wires = [];
  let xp = 0;
  let completed = new Set();
  let ledValue = 330;
  let meterMode = 'V';
  let meterPlacement = 'parallel';
  let logicA = false, logicB = false, logicGate = 'AND';
  let scopeFreq = 1000, scopeAmp = 2, scopeStable = false;
  let pcbStep = 0, pcbChoice = null;

  const addXP = (n, key) => {
    if (key && completed.has(key)) return;
    xp += n;
    if (key) completed.add(key);
    try { if (window.EG && EG.addXP) EG.addXP(n); } catch (_) {}
    const s = document.getElementById('game-status');
    if (s) { s.textContent = `+${n} XP earned. ${s.textContent}`; s.className = 'status ok'; }
  };

  const pair = (a,b) => (wires.some(w => (w[0] === a && w[1] === b) || (w[0] === b && w[1] === a)));
  const connect = id => {
    if (!selected) { selected = id; render(); return; }
    if (selected !== id && !pair(selected,id)) wires.push([selected,id]);
    selected = null;
    render();
  };
  const reset = () => { selected = null; wires = []; pcbChoice = null; pcbStep = 0; scopeStable = false; render(); };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const btn = (text, action, cls='lab-btn') => `<button class="${cls}" data-action="${action}">${text}</button>`;
  const status = text => `<div id="game-status" class="status">${text}</div>`;
  const term = (id,x,y) => `<circle class="terminal ${selected===id?'selected':''}" data-terminal="${id}" cx="${x}" cy="${y}" r="10"></circle>`;
  const line = (a,b) => `<line class="wire" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;

  function wireLines(points) {
    return wires.map(w => points[w[0]] && points[w[1]] ? line(points[w[0]],points[w[1]]) : '').join('');
  }

  function svgText(x,y,text,size=14,cls='') {
    return `<text x="${x}" y="${y}" ${cls ? `class="${cls}"` : ''} font-size="${size}" text-anchor="middle">${esc(text)}</text>`;
  }

  function shell(content) {
    const g = games.find(x => x[0] === current);
    app.innerHTML = `
      <div class="game-select">${games.map(x => `<button class="game-tab ${x[0]===current?'active':''}" data-game="${x[0]}">${x[1]} ${x[2]}</button>`).join('')}</div>
      <section class="lab">
        <div class="lab-head">
          <div><h2>${g[1]} ${g[2]}</h2><p>${g[3]}</p></div>
          <strong>Session XP: ${xp}</strong>
        </div>
        ${content}
      </section>`;
    app.querySelectorAll('[data-game]').forEach(b => b.onclick = () => { current=b.dataset.game; selected=null; wires=[]; pcbStep=0; pcbChoice=null; render(); });
    bind();
  }

  function circuit() {
    const P={bp:[100,225],sw1:[285,225],sw2:[400,225],r1:[515,225],r2:[630,225],l1:[745,225],l2:[845,225],bn:[100,355]};
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 950 480">
      ${svgText(475,55,'BUILD THE LED CIRCUIT',20)}${wireLines(P)}
      <rect class="component-body" x="50" y="180" width="100" height="180" rx="14"/><text class="component-label" x="100" y="270">BATTERY</text><text class="component-note" x="100" y="294">9V</text>
      <rect class="component-body" x="270" y="195" width="145" height="60" rx="12"/><text class="component-label" x="342" y="230">SWITCH</text>
      <rect class="component-body" x="500" y="195" width="145" height="60" rx="12"/><text class="component-label" x="572" y="230">RESISTOR</text>
      <rect class="component-body" x="715" y="195" width="150" height="60" rx="30"/><text class="component-label" x="790" y="230">LED</text>
      ${term('bp',100,225)}${term('sw1',285,225)}${term('sw2',400,225)}${term('r1',515,225)}${term('r2',630,225)}${term('l1',745,225)}${term('l2',845,225)}${term('bn',100,355)}
      ${svgText(475,425,'Click two yellow terminals to place a wire. Then press POWER ON.',13)}</svg></div>
      <aside class="palette"><div class="tool-card"><h3>🎯 Mission</h3><p>Make exactly this loop: <b>+</b> → switch → resistor → LED → <b>−</b>.</p></div><div class="tool-card"><h3>🧠 Learn</h3><p>A closed path is required for current. The resistor limits LED current and protects the LED.</p></div><div class="actions">${btn('POWER ON','circuit')}${btn('RESET','reset','lab-btn secondary')}</div>${status('Select two terminals to create a wire.')}</aside></div>`;
  }

  function led() {
    const currentmA = ((9-2.0)/ledValue*1000);
    const safe = ledValue >= 220 && ledValue <= 1000;
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 900 480">
      ${svgText(450,55,'LED CURRENT LIMITER LAB',20)}
      <rect class="component-body" x="60" y="190" width="150" height="100" rx="14"/><text class="component-label" x="135" y="235">9V SUPPLY</text>
      <rect class="component-body" x="330" y="205" width="240" height="70" rx="12"/><text class="component-label" x="450" y="245">R = ${ledValue} Ω</text>
      <rect class="component-body" x="690" y="205" width="130" height="70" rx="35"/><text class="component-label" x="755" y="245">RED LED</text>
      <line class="wire" x1="210" y1="240" x2="330" y2="240"/><line class="wire" x1="570" y1="240" x2="690" y2="240"/>
      ${svgText(450,370,`Calculated current: ${currentmA.toFixed(1)} mA`,18)}${svgText(450,405,'V = 9V, VLED ≈ 2V. I = (V − VLED) / R',13)}</svg></div>
      <aside class="palette"><div class="tool-card"><h3>Choose resistor</h3><div class="value-row">${[100,220,330,470,1000].map(v=>`<button class="value-btn ${v===ledValue?'active':''}" data-resistor="${v}">${v} Ω</button>`).join('')}</div></div>
      <div class="tool-card"><p>Try different values and predict the current before testing. Values around a few hundred ohms are a good learning range for this 9V example.</p></div>
      <div class="actions">${btn('APPLY POWER','led')}</div>${status('Choose a resistor, calculate the current, then apply power.')}</aside></div>`;
  }

  function repair() {
    const P={a:[205,235],b:[650,235]};
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 900 480">${svgText(450,55,'REPAIR THE BROKEN CIRCUIT',20)}
      <circle cx="145" cy="235" r="55" class="component-body"/><text class="component-label" x="145" y="240">SOURCE</text>
      <rect class="component-body" x="350" y="205" width="130" height="60" rx="12"/><text class="component-label" x="415" y="240">RESISTOR</text>
      <circle cx="700" cy="235" r="45" class="component-body"/><text class="component-label" x="700" y="240">LOAD</text>
      <line class="wire" x1="200" y1="235" x2="350" y2="235"/><line class="wire" x1="480" y1="235" x2="650" y2="235" stroke-dasharray="10 12"/>${wireLines(P)}${term('a',205,235)}${term('b',650,235)}${svgText(450,390,'Connect the two open terminals to restore continuity.',13)}</svg></div>
      <aside class="palette"><div class="tool-card"><h3>🔎 Trace the fault</h3><p>The dashed section is the broken trace. Connect both yellow terminals.</p></div><div class="actions">${btn('TEST CIRCUIT','repair')}${btn('RESET','reset','lab-btn secondary')}</div>${status('Click both open terminals.')}</aside></div>`;
  }

  function chain(type) {
    const supply = type==='supply';
    const nodes = supply ? ['AC SOURCE','BRIDGE RECTIFIER','FILTER CAP','5V REGULATOR','LOAD'] : ['SIGNAL SOURCE','MODULATOR','CHANNEL','DEMODULATOR','OUTPUT'];
    const P={};
    nodes.forEach((_,i)=>{ if(i<nodes.length-1){P[`o${i}`]=[160+i*190,228];P[`i${i+1}`]=[205+i*190,228];} });
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 1000 500">${svgText(500,55,supply?'BUILD THE POWER SUPPLY':'BUILD THE COMMUNICATION CHAIN',20)}
      ${nodes.map((n,i)=>{const x=25+i*190;return `<rect class="component-body" x="${x}" y="175" width="145" height="105" rx="15"/><text class="component-label" x="${x+72}" y="218">${esc(n)}</text>${svgText(x+72,245,`stage ${i+1}`,11,'component-note')}${i<nodes.length-1?`${term(`o${i}`,x+145,228)}${term(`i${i+1}`,x+190,228)}`:''}`}).join('')}
      ${wireLines(P)}${svgText(500,405,'Connect every adjacent stage from left to right, then RUN.',13)}</svg></div>
      <aside class="palette"><div class="tool-card"><h3>Mission</h3><p>${supply?'AC source → bridge rectifier → filter capacitor → 5V regulator → load.':'Signal source → modulator → channel → demodulator → output.'}</p></div><div class="tool-card"><p>Every stage must have an input and output connection. This is a simplified block-level view of a real system.</p></div><div class="actions">${btn('RUN','chain')}${btn('RESET','reset','lab-btn secondary')}</div>${status('Connect adjacent stages.')}</aside></div>`;
  }

  function logic() {
    const out = logicGate==='AND' ? logicA&&logicB : logicGate==='OR' ? logicA||logicB : logicA!==logicB;
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 900 500">${svgText(450,50,'BUILD A LOGIC FUNCTION',20)}
      <rect class="component-body" x="80" y="135" width="150" height="65" rx="12"/><text class="component-label" x="155" y="174">INPUT A</text><circle class="terminal" cx="230" cy="168" r="8"/>
      <rect class="component-body" x="80" y="280" width="150" height="65" rx="12"/><text class="component-label" x="155" y="319">INPUT B</text><circle class="terminal" cx="230" cy="313" r="8"/>
      <rect class="component-body" x="350" y="180" width="190" height="140" rx="18"/><text class="component-label" x="445" y="252">${logicGate} GATE</text>
      <rect class="component-body" x="675" y="215" width="120" height="80" rx="14"/><text class="component-label" x="735" y="250">OUTPUT</text><text x="735" y="275" fill="#00ffc8" font-size="15" font-weight="900" text-anchor="middle">${out?'HIGH':'LOW'}</text>
      ${svgText(450,405,'Challenge: make OUTPUT HIGH with the selected gate.',13)}</svg></div>
      <aside class="palette"><div class="tool-card toggle"><span>Input A: <b>${logicA?'HIGH':'LOW'}</b></span><button class="switch ${logicA?'on':''}" data-toggle="A"></button></div><div class="tool-card toggle"><span>Input B: <b>${logicB?'HIGH':'LOW'}</b></span><button class="switch ${logicB?'on':''}" data-toggle="B"></button></div>
      <div class="tool-card"><h3>Logic gate</h3><div class="value-row">${['AND','OR','XOR'].map(g=>`<button class="value-btn ${logicGate===g?'active':''}" data-gate="${g}">${g}</button>`).join('')}</div></div><div class="actions">${btn('CHECK OUTPUT','logic')}</div>${status('Set the inputs and choose a gate.')}</aside></div>`;
  }

  function arduino() {
    const P={d13:[550,175],gnd:[550,230],d2:[550,285],v5:[350,175],ledA:[195,205],ledK:[195,245],btn1:[675,205],btn2:[675,245]};
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 900 500">${svgText(450,50,'ARDUINO WIRING LAB',20)}
      <rect class="component-body" x="330" y="100" width="240" height="300" rx="18"/><text class="component-label" x="450" y="140">ARDUINO UNO</text>
      ${[['v5','5V',350,175],['gnd','GND',550,230],['d2','D2',550,285],['d13','D13',550,175]].map(p=>`${term(p[0],p[2],p[3])}<text x="${p[2]+(p[2]<450?20:-20)}" y="${p[3]+5}" fill="#9fb4bd" font-size="12" text-anchor="${p[2]<450?'start':'end'}">${p[1]}</text>`).join('')}
      <rect class="component-body" x="60" y="175" width="140" height="100" rx="14"/><text class="component-label" x="130" y="215">LED</text>${term('ledA',195,205)}${term('ledK',195,245)}
      <rect class="component-body" x="675" y="175" width="165" height="100" rx="14"/><text class="component-label" x="757" y="215">PUSH BUTTON</text>${term('btn1',675,205)}${term('btn2',675,245)}
      ${wireLines(P)}${svgText(450,440,'Target: D13 → LED anode, LED cathode → GND, D2 → button, button → 5V.',12)}</svg></div>
      <aside class="palette"><div class="tool-card"><h3>Target wiring</h3><p>Make these four connections exactly. Think about <b>pin mapping</b> and <b>LED polarity</b>.</p></div><div class="actions">${btn('UPLOAD / RUN','arduino')}${btn('RESET','reset','lab-btn secondary')}</div>${status('Select two terminals to wire them.')}</aside></div>`;
  }

  function meter() {
    const value = meterMode==='V' ? '9.00 V' : meterMode==='I' ? '27.3 mA' : '330 Ω';
    const correctPlacement = (meterMode==='V' && meterPlacement==='parallel') || (meterMode==='I' && meterPlacement==='series') || (meterMode==='R' && meterPlacement==='across');
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 900 500">${svgText(450,50,'VIRTUAL MULTIMETER',20)}
      <rect class="component-body" x="310" y="105" width="280" height="285" rx="25"/><text class="component-label" x="450" y="145">DIGITAL MULTIMETER</text><text x="450" y="225" fill="#00ffc8" font-size="44" font-weight="900" text-anchor="middle">${value}</text><text x="450" y="255" fill="#91aab5" font-size="13" text-anchor="middle">Mode: ${meterMode}</text>
      <circle class="terminal" cx="220" cy="250" r="11"/><circle class="terminal" cx="680" cy="250" r="11"/><text x="220" y="285" fill="#9fb4bd" text-anchor="middle">RED PROBE</text><text x="680" y="285" fill="#9fb4bd" text-anchor="middle">BLACK PROBE</text>${svgText(450,405,'Select a measurement mode and the correct circuit placement.',13)}</svg></div>
      <aside class="palette"><div class="tool-card"><h3>Measurement mode</h3><div class="value-row">${[['V','Voltage'],['I','Current'],['R','Resistance']].map(x=>`<button class="value-btn ${meterMode===x[0]?'active':''}" data-meter="${x[0]}">${x[1]}</button>`).join('')}</div></div><div class="tool-card"><h3>Probe placement</h3><div class="value-row">${[['parallel','Parallel'],['series','Series'],['across','Across component']].map(x=>`<button class="value-btn ${meterPlacement===x[0]?'active':''}" data-placement="${x[0]}">${x[1]}</button>`).join('')}</div></div><div class="actions">${btn('MEASURE','meter')}</div>${status('Voltage is measured in parallel; current is measured in series.')}</aside></div>`;
  }

  function scope() {
    const ok = scopeFreq===1000 && scopeAmp===2;
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 900 500">${svgText(450,50,'OSCILLOSCOPE LAB',20)}
      <rect class="component-body" x="70" y="105" width="180" height="90" rx="14"/><text class="component-label" x="160" y="145">SIGNAL SOURCE</text><text x="160" y="170" fill="#00ffc8" font-size="13" text-anchor="middle">${scopeFreq} Hz • ${scopeAmp} Vpp</text>
      <rect class="component-body" x="610" y="105" width="180" height="90" rx="14"/><text class="component-label" x="700" y="145">OSCILLOSCOPE</text><text x="700" y="170" fill="#00ffc8" font-size="13" text-anchor="middle">CH1 • ${scopeStable?'STABLE':'TRIGGERING'}</text>
      <line class="wire" x1="250" y1="150" x2="610" y2="150"/>
      <rect x="90" y="240" width="720" height="170" rx="12" fill="#02080c" stroke="rgba(0,255,200,.2)"/>
      ${[0,1,2,3,4,5,6,7,8].map(i=>`<line x1="${120+i*80}" y1="250" x2="${120+i*80}" y2="400" stroke="rgba(255,255,255,.08)"/>`).join('')}
      ${scopeStable ? `<path d="M100 325 C140 270 180 270 220 325 S300 380 340 325 S420 270 460 325 S540 380 580 325 S660 270 700 325 S780 380 820 325" fill="none" stroke="#00ffc8" stroke-width="4"/>` : svgText(450,330,'Press STABILIZE after choosing the target signal.',14)}
      ${svgText(450,450,'Target signal: 1 kHz, 2 Vpp. Learn frequency, amplitude and triggering.',13)}</svg></div>
      <aside class="palette"><div class="tool-card"><h3>Frequency</h3><div class="value-row">${[100,500,1000,2000].map(v=>`<button class="value-btn ${scopeFreq===v?'active':''}" data-freq="${v}">${v} Hz</button>`).join('')}</div></div><div class="tool-card"><h3>Amplitude</h3><div class="value-row">${[1,2,5].map(v=>`<button class="value-btn ${scopeAmp===v?'active':''}" data-amp="${v}">${v} Vpp</button>`).join('')}</div></div><div class="actions">${btn('STABILIZE / TEST','scope')}${btn('RESET','reset','lab-btn secondary')}</div>${status('Set the signal to the target values and stabilize the waveform.')}</aside></div>`;
  }

  function pcb() {
    const sections=[['1','POWER','Check supply rails'],['2','REGULATOR','Check 5V regulator'],['3','SENSOR','Check sensor line'],['4','OUTPUT','Check output driver']];
    const suspects=['F1 fuse','U1 regulator','R3 resistor','Q1 transistor'];
    return `<div class="lab-layout"><div class="board"><svg viewBox="0 0 900 500">${svgText(450,50,'PCB TROUBLESHOOTER',20)}
      <rect class="component-body" x="70" y="100" width="760" height="300" rx="20"/>
      ${sections.map((s,i)=>{const x=100+i*180;return `<rect class="component-body" x="${x}" y="180" width="140" height="100" rx="12"/><text class="component-label" x="${x+70}" y="215">${s[0]} • ${s[1]}</text><text x="${x+70}" y="240" fill="#91aab5" font-size="11" text-anchor="middle">${s[2]}</text>${i<3?`<line class="wire" x1="${x+140}" y1="230" x2="${x+180}" y2="230"/>`:''}`}).join('')}
      ${svgText(450,350,`Inspection step: ${pcbStep+1} / 4`,15)}${svgText(450,430,'Inspect each section in order. The hidden fault is the regulator (U1).',13)}</svg></div>
      <aside class="palette"><div class="tool-card"><h3>🔎 Inspection</h3><p>${sections[pcbStep][1]}: ${sections[pcbStep][2]}. Select the component that should be checked next.</p></div><div class="value-row">${suspects.map((s,i)=>`<button class="value-btn ${pcbChoice===i?'active':''}" data-pcb="${i}">${s}</button>`).join('')}</div><div class="actions">${btn('INSPECT','pcb')}${btn('RESET','reset','lab-btn secondary')}</div>${status('Start at POWER and inspect the board section by section.')}</aside></div>`;
  }

  function bind() {
    app.querySelectorAll('[data-terminal]').forEach(el => el.addEventListener('click', () => connect(el.dataset.terminal)));
    app.querySelectorAll('[data-resistor]').forEach(el => el.addEventListener('click', () => { ledValue=Number(el.dataset.resistor); render(); }));
    app.querySelectorAll('[data-toggle]').forEach(el => el.addEventListener('click', () => { if(el.dataset.toggle==='A') logicA=!logicA; else logicB=!logicB; render(); }));
    app.querySelectorAll('[data-gate]').forEach(el => el.addEventListener('click', () => { logicGate=el.dataset.gate; render(); }));
    app.querySelectorAll('[data-meter]').forEach(el => el.addEventListener('click', () => { meterMode=el.dataset.meter; render(); }));
    app.querySelectorAll('[data-placement]').forEach(el => el.addEventListener('click', () => { meterPlacement=el.dataset.placement; render(); }));
    app.querySelectorAll('[data-freq]').forEach(el => el.addEventListener('click', () => { scopeFreq=Number(el.dataset.freq); scopeStable=false; render(); }));
    app.querySelectorAll('[data-amp]').forEach(el => el.addEventListener('click', () => { scopeAmp=Number(el.dataset.amp); scopeStable=false; render(); }));
    app.querySelectorAll('[data-pcb]').forEach(el => el.addEventListener('click', () => { pcbChoice=Number(el.dataset.pcb); render(); }));
    app.querySelectorAll('[data-action]').forEach(el => el.addEventListener('click', () => action(el.dataset.action)));
  }

  function action(a) {
    const s = document.getElementById('game-status');
    if (!s) return;
    if (a==='reset') { reset(); return; }

    if (a==='circuit') {
      const required=[['bp','sw1'],['sw2','r1'],['r2','l1'],['l2','bn']];
      const all=required.every(x=>pair(x[0],x[1])) && wires.length===4;
      s.textContent=all?'Circuit complete! Current has a closed path through the LED.':'Not quite. Connect +→switch, switch→resistor, resistor→LED, and LED→− exactly.';
      s.className=all?'status ok':'status bad'; if(all) addXP(20,'circuit');
    }
    if (a==='led') {
      const safe=ledValue>=220 && ledValue<=1000;
      s.textContent=safe?`Good choice: ${ledValue} Ω keeps this example in a useful LED-current range.`:`Try a larger resistor. ${ledValue} Ω gives about ${((7/ledValue)*1000).toFixed(1)} mA in this simplified model.`;
      s.className=safe?'status ok':'status bad'; if(safe) addXP(15,'led');
    }
    if (a==='repair') {
      const ok=pair('a','b') && wires.length===1;
      s.textContent=ok?'Fault repaired! Continuity is restored.':'The open trace is still broken. Connect the two yellow terminals.';
      s.className=ok?'status ok':'status bad'; if(ok) addXP(20,'repair');
    }
    if (a==='chain') {
      const ids=current==='supply' ? [['o0','i1'],['o1','i2'],['o2','i3'],['o3','i4']] : [['o0','i1'],['o1','i2'],['o2','i3'],['o3','i4']];
      const ok=ids.every(x=>pair(x[0],x[1])) && wires.length===4;
      s.textContent=ok?'All stages connected. Signal/power can pass through the complete chain.':'A stage is missing a connection. Connect every adjacent pair from left to right.';
      s.className=ok?'status ok':'status bad'; if(ok) addXP(20,current);
    }
    if (a==='logic') {
      const out=logicGate==='AND'?logicA&&logicB:logicGate==='OR'?logicA||logicB:logicA!==logicB;
      const target=out;
      s.textContent=target?`Correct! ${logicGate} produces HIGH for the current input combination.`:`Output is LOW. Change the inputs or gate and try again.`;
      s.className=target?'status ok':'status bad'; if(target) addXP(15,'logic');
    }
    if (a==='arduino') {
      const required=[['d13','ledA'],['ledK','gnd'],['d2','btn1'],['btn2','v5']];
      const ok=required.every(x=>pair(x[0],x[1])) && wires.length===4;
      s.textContent=ok?'Upload successful! LED and button wiring matches the target pin map.':'Wiring error. Check LED polarity, GND, D2 and D13 connections.';
      s.className=ok?'status ok':'status bad'; if(ok) addXP(25,'arduino');
    }
    if (a==='meter') {
      const ok=(meterMode==='V'&&meterPlacement==='parallel')||(meterMode==='I'&&meterPlacement==='series')||(meterMode==='R'&&meterPlacement==='across');
      s.textContent=ok?`Measurement correct: ${meterMode==='V'?'voltage is measured in parallel.':meterMode==='I'?'current is measured in series.':'resistance is checked across the component with power removed.'}`:'Wrong setup. Think about how the selected meter mode must be connected.';
      s.className=ok?'status ok':'status bad'; if(ok) addXP(15,'meter');
    }
    if (a==='scope') {
      const ok=scopeFreq===1000 && scopeAmp===2; scopeStable=ok; render();
      const ss=document.getElementById('game-status'); if(ss){ss.textContent=ok?'Stable waveform! You matched 1 kHz and 2 Vpp.':'The waveform is not at the target settings yet. Set 1 kHz and 2 Vpp.';ss.className=ok?'status ok':'status bad';}
      if(ok) addXP(20,'scope');
    }
    if (a==='pcb') {
      const expected=[0,1,2,3];
      if(pcbChoice===expected[pcbStep]){
        if(pcbStep<3){ pcbStep++; pcbChoice=null; render(); const ss=document.getElementById('game-status'); if(ss){ss.textContent='Good inspection. Move to the next board section.';ss.className='status ok';} }
        else { s.textContent='Fault found: U1 regulator is the failed component. Replace it and retest the 5V rail.';s.className='status ok';addXP(25,'pcb'); }
      } else { s.textContent='That is not the best component to inspect at this stage. Follow the board path from POWER to OUTPUT.';s.className='status bad'; }
    }
  }

  function render() {
    let content='';
    if(current==='circuit') content=circuit();
    else if(current==='led') content=led();
    else if(current==='repair') content=repair();
    else if(current==='supply') content=chain('supply');
    else if(current==='logic') content=logic();
    else if(current==='arduino') content=arduino();
    else if(current==='comm') content=chain('comm');
    else if(current==='meter') content=meter();
    else if(current==='scope') content=scope();
    else if(current==='pcb') content=pcb();
    shell(content);
  }

  render();
})();
