(() => {
  const app=document.getElementById('designer-content');
  if(!app)return;
  const parts={
    battery:{name:'Battery',symbol:'🔋',pins:['+','−'],fp:'BATT-2P'},resistor:{name:'Resistor',symbol:'▭',pins:['A','B'],fp:'R_AXIAL'},led:{name:'LED',symbol:'💡',pins:['A','K'],fp:'LED-5MM'},capacitor:{name:'Capacitor',symbol:'▱',pins:['+','−'],fp:'C_RADIAL'},diode:{name:'Diode',symbol:'◀',pins:['A','K'],fp:'D_AXIAL'},transistor:{name:'Transistor',symbol:'🔺',pins:['B','C','E'],fp:'TO-92'},switch:{name:'Switch',symbol:'⏻',pins:['1','2'],fp:'SW_THT'},pushbutton:{name:'Push Button',symbol:'🔘',pins:['1','2'],fp:'SW_PUSH'},pot:{name:'Potentiometer',symbol:'🎚️',pins:['1','W','2'],fp:'POT-TH'},ldr:{name:'LDR',symbol:'☀️',pins:['A','B'],fp:'LDR-5MM'},buzzer:{name:'Buzzer',symbol:'🔊',pins:['+','−'],fp:'BUZZER-TH'},motor:{name:'Motor',symbol:'⚙️',pins:['+','−'],fp:'MOTOR-2P'},ic555:{name:'IC 555',symbol:'🧠',pins:['GND','TRIG','OUT','VCC'],fp:'DIP-8'},opamp:{name:'Op-Amp',symbol:'➤',pins:['IN−','IN+','OUT','VCC','GND'],fp:'DIP-8'},arduino:{name:'Arduino',symbol:'🤖',pins:['5V','GND','D2','D13'],fp:'ARDUINO-UNO'},ground:{name:'Ground',symbol:'⏚',pins:['GND'],fp:'GND-TH'}
  };
  let placed=[],wires=[],selectedPin=null,selectedId=null,id=0,stage=1,wireSide='front',assignments={},board=null;
  const required=['battery','switch','resistor','led','ground'];
  const saveKey='electroguide-designer-v3';
  const status=t=>{const s=document.getElementById('designer-status');if(s)s.textContent=t};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pinPos=key=>{const [pid,pi]=key.split(':').map(Number),p=placed.find(x=>x.id===pid);if(!p)return null;const n=parts[p.type].pins.length, offset=n===1?55:pi===0?0:pi===1?62:112;return{x:p.x+offset+7,y:p.y+44}};
  const pair=(a,b)=>wires.some(w=>(w.a===a&&w.b===b)||(w.a===b&&w.b===a));
  function addPart(type){placed.push({id:++id,type,x:30+(placed.length%5)*155,y:35+Math.floor(placed.length/5)*120,value:defaultValue(type),rot:0});selectedId=id;render()}
  function defaultValue(t){return {battery:'9V',resistor:'330Ω',led:'RED',capacitor:'100µF',diode:'1N4007',transistor:'BC547',pot:'10kΩ',ldr:'LDR',buzzer:'5V',motor:'DC',ic555:'TIMER',opamp:'LM358',arduino:'UNO'}[t]||''}
  function render(){
    if(stage===1)renderCircuit(); else if(stage===2)renderRouting(); else if(stage===3)renderAssign(); else if(stage===4)render3D(); else renderGcode();
    document.querySelectorAll('[data-stage]').forEach(b=>{b.classList.toggle('active',+b.dataset.stage===stage);b.classList.toggle('done',+b.dataset.stage<stage)});
  }
  function shell(content,help){app.innerHTML=`<div class="stage-toolbar"><strong>${stageTitle()}</strong><span id="designer-status">${esc(help)}</span></div>${content}<div class="status" id="stage-status">${stage===1?'Start by placing components.':stage===2?'Choose FRONT or BACK and connect the pads.':stage===3?'Give each part a simple footprint.':stage===4?'Rotate the board to inspect it.': 'Generate simple educational CNC/G-code.'}</div>`;bindCommon()}
  function stageTitle(){return ['','Round 1 · Circuit Creation','Round 2 · PCB Wire Routing','Round 3 · Component Assignment','Round 4 · 3D PCB View','Round 5 · G-code'][stage]}
  function circuitValid(){const types=new Set(placed.map(p=>p.type));return required.every(x=>types.has(x))&&wires.length>=4}
  function renderCircuit(){
    const controls=`<div class="design-panel"><b>Required beginner circuit</b><p>Place Battery, Switch, Resistor, LED and Ground. Add at least 4 connections.</p><div class="actions"><button class="primary-btn wide" id="check-circuit">✓ Check Circuit</button><button class="secondary-btn wide" id="next-route" ${circuitValid()?'':'disabled'}>Continue to PCB Routing →</button></div></div>`;
    shell(`<div id="schematic" class="schematic-grid"></div>${controls}`, 'Round 1: place components and connect the circuit.');
    const s=document.getElementById('schematic');
    wires.forEach(w=>drawWire(s,w));
    placed.forEach(p=>drawPart(s,p));
    document.getElementById('check-circuit').onclick=()=>{if(circuitValid()){status('✅ Circuit complete. You can continue to PCB routing.');document.getElementById('next-route').disabled=false}else status('⚠ Add Battery, Switch, Resistor, LED and Ground, then make at least 4 wires.')};
    document.getElementById('next-route').onclick=()=>{if(circuitValid()){stage=2;render()}};
  }
  function drawWire(s,w){const a=pinPos(w.a),b=pinPos(w.b);if(!a||!b)return;const d=document.createElement('div');d.className='designer-wire '+(w.side==='back'?'back':'');const dx=b.x-a.x,dy=b.y-a.y;d.style.width=Math.hypot(dx,dy)+'px';d.style.left=a.x+'px';d.style.top=a.y+'px';d.style.transform=`rotate(${Math.atan2(dy,dx)}rad)`;s.appendChild(d)}
  function drawPart(s,p){const el=document.createElement('div');el.className='placed-part '+(selectedId===p.id?'selected':'');el.style.left=p.x+'px';el.style.top=p.y+'px';el.style.transform=`rotate(${p.rot||0}deg)`;el.innerHTML=`<div class="part-symbol">${parts[p.type].symbol}</div><b>${parts[p.type].name}</b><small>${esc(p.value||'')} ${p.rot?'· '+p.rot+'°':''}</small>`;parts[p.type].pins.forEach((pin,i)=>{const t=document.createElement('button');t.className='designer-pin '+(selectedPin===p.id+':'+i?'selected':'');t.textContent=pin;t.style.left=(parts[p.type].pins.length===1?45:i===0?-14:i===1?50:100)+'px';t.onclick=e=>{e.stopPropagation();connect(p.id+':'+i)};el.appendChild(t)});el.onpointerdown=e=>{if(e.target.classList.contains('designer-pin'))return;selectedId=p.id;drag(e,p);};s.appendChild(el)}
  function connect(k){if(stage!==1&&stage!==2)return;if(!selectedPin){selectedPin=k;render();return}if(selectedPin!==k&&!pair(selectedPin,k)){wires.push({a:selectedPin,b:k,side:wireSide});status('Wire added. Continue connecting the circuit.')}selectedPin=null;render()}
  function drag(e,p){const s=document.getElementById('schematic'),r=s.getBoundingClientRect(),ox=e.clientX-r.left-p.x,oy=e.clientY-r.top-p.y;const move=ev=>{p.x=Math.max(5,Math.min(s.clientWidth-135,ev.clientX-r.left-ox));p.y=Math.max(5,Math.min(s.clientHeight-100,ev.clientY-r.top-oy));render()};const up=()=>{removeEventListener('pointermove',move);removeEventListener('pointerup',up)};addEventListener('pointermove',move);addEventListener('pointerup',up)}
  function renderRouting(){
    const front=wires.filter(w=>w.side!=='back').length,back=wires.filter(w=>w.side==='back').length;
    shell(`<div class="design-panel"><b>PCB routing mode</b><p>Like a simple PCB editor: use copper on the <b>front</b> or <b>back</b> side. Yellow = front, orange = back.</p><div class="actions"><button class="wide ${wireSide==='front'?'primary-btn':'secondary-btn'}" id="front">🟡 Front Copper (${front})</button><button class="wide ${wireSide==='back'?'primary-btn':'secondary-btn'}" id="back">🟠 Back Copper (${back})</button><button class="secondary-btn wide" id="clear-wires">↺ Clear Wires</button><button class="primary-btn wide" id="next-assign" ${wires.length>=4?'':'disabled'}>Continue to Assignment →</button></div></div><div id="schematic" class="schematic-grid"></div>`, 'Round 2: choose a copper side, then click two terminals to route traces.');
    const s=document.getElementById('schematic');wires.forEach(w=>drawWire(s,w));placed.forEach(p=>drawPart(s,p));
    document.getElementById('front').onclick=()=>{wireSide='front';render()};document.getElementById('back').onclick=()=>{wireSide='back';render()};document.getElementById('clear-wires').onclick=()=>{wires=[];selectedPin=null;render()};document.getElementById('next-assign').onclick=()=>{if(wires.length>=4){stage=3;render()}};
  }
  function renderAssign(){
    const cards=placed.map(p=>`<div class="assign-card"><b>${parts[p.type].symbol} ${parts[p.type].name}</b><span class="footprint">${esc(assignments[p.id]||parts[p.type].fp)}</span><select data-assign="${p.id}"><option value="">Choose footprint</option>${['THT-2P','THT-3P','AXIAL','RADIAL','LED-5MM','TO-92','DIP-8','SMD-0805','SMD-SOT23','GND-TH','ARDUINO-UNO'].map(x=>`<option ${((assignments[p.id]||parts[p.type].fp)===x)?'selected':''}>${x}</option>`).join('')}</select></div>`).join('');
    shell(`<div class="design-panel"><p><b>Component assignment:</b> this is the easy version of choosing footprints in a PCB tool. You don't need to know package dimensions yet.</p><div class="assign-grid">${cards}</div><div class="actions"><button class="primary-btn wide" id="next-3d">Continue to 3D View →</button></div></div>`, 'Round 3: assign a simple PCB footprint/package to each component.');
    document.querySelectorAll('[data-assign]').forEach(s=>s.onchange=()=>{assignments[s.dataset.assign]=s.value;render()});document.getElementById('next-3d').onclick=()=>{stage=4;render()};
  }
  function render3D(){
    shell(`<div class="design-panel"><p><b>3D preview:</b> this is a learning preview of how assigned parts can sit on a board. Drag the board to rotate.</p><div class="actions"><button class="secondary-btn wide" id="back-route">← Back to Routing</button><button class="primary-btn wide" id="next-gcode">Continue to G-code →</button></div></div><div class="pcb-scene"><div class="pcb-board" id="pcb-board"><div class="pcb-hole h1"></div><div class="pcb-hole h2"></div><div class="pcb-hole h3"></div><div class="pcb-hole h4"></div><div id="pcb-components"></div></div></div>`, 'Round 4: inspect your educational 3D PCB preview.');
    const box=document.getElementById('pcb-components');placed.forEach((p,i)=>{const q=document.createElement('div');q.className='pcb-part';q.style.left=(8+(i%5)*18)+'%';q.style.top=(15+Math.floor(i/5)*32)+'%';q.innerHTML=`<span>${parts[p.type].symbol}</span><small>${parts[p.type].name}<br>${esc(assignments[p.id]||parts[p.type].fp)}</small>`;box.appendChild(q)});
    const b=document.getElementById('pcb-board');let rx=18,ry=-25,last=null;b.onpointerdown=e=>{last={x:e.clientX,y:e.clientY};b.setPointerCapture(e.pointerId)};b.onpointermove=e=>{if(!last)return;ry+=(e.clientX-last.x)*.5;rx-=(e.clientY-last.y)*.5;last={x:e.clientX,y:e.clientY};b.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`};b.onpointerup=()=>last=null;b.onpointercancel=()=>last=null;
    document.getElementById('back-route').onclick=()=>{stage=2;render()};document.getElementById('next-gcode').onclick=()=>{stage=5;render()};
  }
  function renderGcode(){
    const lines=['; ElectroGuide educational PCB G-code preview','; NOT manufacturing-ready — use only for learning','G21 ; millimeters','G90 ; absolute coordinates','G0 Z5','G0 X10 Y10','G1 Z-0.10 F80'];
    placed.forEach((p,i)=>{const x=15+(i%5)*20,y=15+Math.floor(i/5)*15;lines.push(`; ${parts[p.type].name} - ${assignments[p.id]||parts[p.type].fp}`);lines.push(`G0 X${x} Y${y}`);lines.push('G1 Z-0.10 F80');lines.push('G1 X'+(x+5)+' Y'+y+' F120');lines.push('G0 Z5')});lines.push('G0 X0 Y0','M2');
    shell(`<div class="design-panel"><p><b>G-code preview:</b> this is intentionally simplified so students can understand CNC instructions such as rapid move (G0), cutting move (G1), units (G21) and program end (M2).</p><textarea class="gcode-box" readonly>${esc(lines.join('\n'))}</textarea><div class="actions"><button class="secondary-btn wide" id="back-3d">← Back to 3D</button><button class="primary-btn wide" id="reset-design">↺ Reset Designer</button></div></div>`, 'Round 5: understand a simple educational G-code output.');document.getElementById('back-3d').onclick=()=>{stage=4;render()};document.getElementById('reset-design').onclick=resetAll;
  }
  function bindCommon(){document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>{const n=+b.dataset.stage;if(n===1||n<=stage){stage=n;render()}})}
  function resetAll(){placed=[];wires=[];selectedPin=null;selectedId=null;id=0;stage=1;assignments={};wireSide='front';render();status('Designer reset. Start a new circuit.')}
  document.querySelectorAll('[data-part]').forEach(b=>b.onclick=()=>addPart(b.dataset.part));
  document.getElementById('designer-reset').onclick=resetAll;
  document.getElementById('designer-delete').onclick=()=>{if(selectedId==null){status('Select a component first.');return}const pid=selectedId;placed=placed.filter(p=>p.id!==pid);wires=wires.filter(w=>!w.a.startsWith(pid+':')&&!w.b.startsWith(pid+':'));selectedId=null;render()};
  render();
})();