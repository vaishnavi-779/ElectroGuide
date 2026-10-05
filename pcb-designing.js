(() => {
const grid=document.getElementById('pcb-project-grid');
const search=document.getElementById('pcb-search-input');
const count=document.getElementById('pcb-count');
if(!grid)return;

const projects=[
{id:'led',name:'LED + Resistor Circuit',level:'BEGINNER',domain:'BASIC',desc:'Learn polarity, current limiting, resistor selection and basic PCB power routing.',components:[
['D1','LED','1','LED','Device:LED','LED indicator','D1 anode → R1 → +5V; D1 cathode → GND'],
['R1','Resistor','1','330 Ω','Device:R','Current limiting','+5V → R1 → D1 anode'],
['J1','2-pin connector','1','POWER IN','Connector_Generic:Conn_01x02','Power input','J1.1 → +5V; J1.2 → GND']],notes:'For a 5 V supply and a typical red LED, 330 Ω is a safe beginner value. Verify the LED forward voltage and desired current for the selected part.'},
{id:'button-led',name:'Push Button + LED',level:'BEGINNER',domain:'BASIC',desc:'Understand digital input, pull-up/pull-down resistors and LED output control.',components:[
['U1','Microcontroller header','1','5 V MCU','Connector_Generic:Conn_01x04','Controller interface','VCC → +5V; GND → GND; D2 → LED control; D3 → button input'],
['R1','Resistor','1','330 Ω','Device:R','LED current limiting','D2 → R1 → D1 anode'],
['D1','LED','1','LED','Device:LED','Output indicator','R1 → D1 anode; D1 cathode → GND'],
['SW1','Push button','1','SW_Push','Switch:SW_Push','User input','D3 → SW1.1; SW1.2 → GND'],
['R2','Resistor','1','10 kΩ','Device:R','Input pull-up','D3 → R2 → +5V']],notes:'Using a pull-up keeps the input HIGH when the button is released and LOW when pressed.'},
{id:'buzzer',name:'Buzzer Indicator',level:'BEGINNER',domain:'BASIC',desc:'Drive a buzzer safely and learn when a transistor driver is required.',components:[
['U1','MCU header','1','5 V logic','Connector_Generic:Conn_01x04','Control interface','D5 → R1 → Q1 base; VCC → +5V; GND → GND'],
['R1','Resistor','1','1 kΩ','Device:R','Base/gate limiting','MCU output → R1 → Q1 control pin'],
['Q1','NPN transistor','1','2N2222','Transistor_BJT:Q_NPN_BCE','Buzzer driver','Q1 emitter → GND; Q1 collector → BZ1 negative'],
['BZ1','Buzzer','1','5 V active buzzer','Device:Buzzer','Sound output','+5V → BZ1 positive; BZ1 negative → Q1 collector']],notes:'Do not assume a microcontroller GPIO can directly drive every buzzer. Use a transistor when the load current exceeds the GPIO capability.'},
{id:'sevenseg',name:'7-Segment Display',level:'BEGINNER',domain:'DIGITAL',desc:'Connect a common-cathode seven-segment display to a microcontroller with one current-limiting resistor per segment.',components:[
['U1','Microcontroller','1','Arduino UNO / 5 V MCU','MCU_Module:Arduino_UNO_R3','Display controller','D2→R1→A, D3→R2→B, D4→R3→C, D5→R4→D, D6→R5→E, D7→R6→F, D8→R7→G'],
['DISP1','7-segment display','1','Common cathode','Display_Character:DA05-11EWA','Display','COM cathode pins → GND; segments receive current through R1–R7'],
['R1-R7','Resistor','7','220 Ω typical','Device:R','Segment current limiting','Each MCU segment output → one resistor → matching segment pin'],
['C1','Capacitor','1','100 nF','Device:C','Local decoupling','C1.1 → +5V; C1.2 → GND']],notes:'Use one resistor per LED segment. The exact display symbol and pin numbering depend on the selected part, so verify the datasheet before PCB layout.'},
{id:'traffic',name:'Traffic Light Controller',level:'BEGINNER',domain:'DIGITAL',desc:'Build a multi-output LED controller with timing and clear power distribution.',components:[
['U1','Microcontroller','1','Arduino UNO / compatible','MCU_Module:Arduino_UNO_R3','Controller','GPIO outputs → individual LED resistors'],
['D1-D3','LED','3','Red / Yellow / Green','Device:LED','Traffic indicators','GPIO → resistor → LED anode; LED cathode → GND'],
['R1-R3','Resistor','3','330 Ω','Device:R','LED current limiting','One resistor in series with each LED'],
['C1','Capacitor','1','100 nF','Device:C','Decoupling','+5V ↔ C1 ↔ GND']],notes:'Keep LED current paths separate and label each net clearly. Software controls the timing; the PCB provides the physical electrical connections.'},
{id:'ldr',name:'LDR Light Sensor',level:'BEGINNER',domain:'SENSORS',desc:'Use an LDR voltage divider and an analog input to measure light level.',components:[
['R1','LDR','1','Photoresistor','Device:R_Photo','Light-dependent resistance','+5V → LDR → SENSE'],
['R2','Resistor','1','10 kΩ','Device:R','Voltage divider','SENSE → R2 → GND'],
['C1','Capacitor','1','100 nF','Device:C','Noise filtering','SENSE → C1 → GND'],
['J1','MCU header','1','Analog input','Connector_Generic:Conn_01x03','Controller interface','SENSE → ADC; +5V → VCC; GND → GND']],notes:'The LDR and fixed resistor form a voltage divider. The ADC reads the divider midpoint. Swap the LDR and fixed resistor positions if you want the voltage to rise rather than fall with light.'},
{id:'temp',name:'Temperature Sensor',level:'BEGINNER',domain:'SENSORS',desc:'Connect a temperature sensor, decoupling capacitor and controller input.',components:[
['U1','Temperature sensor','1','LM35-class analog sensor','Sensor_Temperature:LM35','Temperature measurement','VCC → +5V; OUT → MCU ADC; GND → GND'],
['C1','Capacitor','1','100 nF','Device:C','Sensor decoupling','VCC → C1 → GND'],
['J1','MCU header','1','3-pin','Connector_Generic:Conn_01x03','Interface','OUT → ADC input; VCC → +5V; GND → GND']],notes:'Choose the exact sensor before layout because pin order and supply range vary between devices.'},
{id:'regulator',name:'5 V Regulated Supply',level:'BEGINNER',domain:'POWER',desc:'Learn input protection, regulator wiring, decoupling and output testing.',components:[
['U1','Linear regulator','1','L7805 / appropriate 5 V regulator','Regulator_Linear:L7805','5 V regulation','VIN → U1.IN; U1.OUT → +5V; GND → GND'],
['C1','Input capacitor','1','0.33 µF or per datasheet','Device:C','Input stability','VIN → C1 → GND'],
['C2','Output capacitor','1','0.1 µF or per datasheet','Device:C','Output stability','+5V → C2 → GND'],
['F1','Fuse','1','Rated for source/load','Device:Fuse','Input protection','Supply positive → F1 → VIN'],
['J1','Input connector','1','2-pin','Connector_Generic:Conn_01x02','Power input','J1.1 → F1; J1.2 → GND']],notes:'Regulator capacitor values must follow the selected regulator datasheet. Check heat dissipation: power loss is approximately (VIN−VOUT)×Iload.'},
{id:'relay',name:'Relay Driver',level:'INTERMEDIATE',domain:'POWER',desc:'Control a relay with a transistor, flyback diode and protected microcontroller output.',components:[
['Q1','NPN transistor','1','2N2222-class','Transistor_BJT:Q_NPN_BCE','Coil driver','MCU → R1 → Q1 base; emitter → GND; collector → relay coil negative'],
['R1','Resistor','1','1 kΩ','Device:R','Base current limiting','MCU GPIO → R1 → Q1 base'],
['D1','Diode','1','1N4007-class','Device:D','Flyback protection','Across relay coil; cathode → +V, anode → Q1 collector'],
['K1','Relay','1','5 V coil','Relay:G5V-1','Load switching','Coil positive → +5V; coil negative → Q1 collector'],
['J1','Load connector','1','2-pin/3-pin','Connector_Generic:Conn_01x03','Switched output','Connect according to NO/NC/COM requirement']],notes:'The flyback diode is essential for a typical DC relay coil. Select the transistor and diode for the actual coil current and voltage.'},
{id:'uart',name:'UART Interface',level:'INTERMEDIATE',domain:'COMMUNICATION',desc:'Design a serial interface with connectors, logic-level awareness and protection.',components:[
['J1','UART connector','1','4-pin','Connector_Generic:Conn_01x04','Serial interface','TX, RX, GND and optional VCC routed to header'],
['R1-R2','Resistor','2','1 kΩ typical','Device:R','Series protection','MCU TX → R1 → J1 RX; external TX → R2 → MCU RX'],
['D1','TVS/ESD protection','1','Logic-level suitable','Device:D_TVS','ESD protection','Place close to external connector as appropriate'],
['C1','Capacitor','1','100 nF','Device:C','Decoupling','VCC → C1 → GND']],notes:'Never connect 5 V UART directly to a 3.3 V-only input without level compatibility. Verify the voltage levels of both devices.'},
{id:'opamp',name:'Non-Inverting Op-Amp',level:'INTERMEDIATE',domain:'ANALOG',desc:'Build a feedback amplifier and select resistor values for a target gain.',components:[
['U1','Op-amp','1','LM358-class','Amplifier_Operational:LM358','Amplifier','IN+ receives VIN; feedback network connects to IN−'],
['R1','Feedback resistor','1','10 kΩ','Device:R','Gain network','IN− → R1 → GND'],
['R2','Feedback resistor','1','90 kΩ','Device:R','Gain network','OUT → R2 → IN−'],
['C1','Supply bypass','1','100 nF','Device:C','Decoupling','VCC → C1 → GND'],
['J1','I/O header','1','3-pin','Connector_Generic:Conn_01x03','Input/output','VIN, VOUT and GND']],notes:'For a non-inverting amplifier, gain is approximately 1 + R2/R1. With 10 kΩ and 90 kΩ the ideal gain is 10. Verify the op-amp supply range and output swing.'},
{id:'esp32',name:'ESP32 Sensor Node',level:'INTERMEDIATE',domain:'EMBEDDED',desc:'Combine an ESP32 module, I²C sensor, power decoupling, headers and programming access.',components:[
['U1','ESP32 module','1','ESP32-WROOM class','RF_Module:ESP32-WROOM-32','Controller','3V3 → sensor VCC; GND → common ground; I2C SDA/SCL → sensor'],
['U2','I²C sensor','1','Selected sensor','Sensor_Temperature:BME280','Measurement','SDA ↔ GPIO21; SCL ↔ GPIO22; VCC → 3V3; GND → GND'],
['R1-R2','Pull-up resistors','2','4.7 kΩ','Device:R','I²C pull-ups','SDA → R1 → 3V3; SCL → R2 → 3V3'],
['C1','Bulk capacitor','1','10 µF','Device:C','Supply stability','3V3 → C1 → GND'],
['C2','Bypass capacitor','1','100 nF','Device:C','Local decoupling','3V3 → C2 → GND'],
['J1','Programming/power header','1','USB/UART header','Connector_Generic:Conn_01x04','Programming','TX/RX/3V3/GND according to chosen programming method']],notes:'The exact ESP32 module symbol and pin names must match the selected module. Keep the antenna area clear of copper and other components when moving to PCB layout.'},
{id:'motor',name:'DC Motor Driver',level:'INTERMEDIATE',domain:'POWER',desc:'Design a MOSFET motor driver with flyback protection and adequate current handling.',components:[
['Q1','N-channel MOSFET','1','Logic-level MOSFET','Transistor_FET:Q_NMOS_GDS','Motor switch','MCU GPIO → gate; source → GND; drain → motor negative'],
['R1','Gate resistor','1','100 Ω','Device:R','Gate control','MCU GPIO → R1 → MOSFET gate'],
['R2','Gate pulldown','1','100 kΩ','Device:R','Safe startup','Gate → R2 → GND'],
['D1','Flyback diode','1','Rated for motor current','Device:D','Inductive protection','Across motor; cathode → motor supply positive'],
['M1','Motor','1','DC motor','Motor:Motor_DC','Load','Supply positive → motor positive; motor negative → Q1 drain']],notes:'Choose the MOSFET for the actual motor current and gate-drive voltage. The diode must be suitable for the motor and switching conditions.'},
{id:'buck',name:'12 V to 5 V Buck Converter',level:'ADVANCED',domain:'POWER',desc:'Plan a switching regulator including controller, inductor, capacitors and protection.',components:[
['U1','Buck regulator IC','1','Selected controller IC','Regulator_Switching:LM2596S-ADJ','DC-DC conversion','VIN, SW, FB and GND wired exactly per selected IC datasheet'],
['L1','Inductor','1','Rated for load current','Device:L','Energy storage','Switch node → L1 → VOUT'],
['D1','Schottky diode','1','Rated for current/voltage','Device:D_Schottky','Freewheel path','Anode → GND; cathode → switch node for suitable asynchronous topology'],
['C1','Input capacitor','1','Per datasheet','Device:C','Input filtering','VIN → C1 → GND'],
['C2','Output capacitor','1','Per datasheet','Device:C','Output filtering','VOUT → C2 → GND'],
['R1-R2','Feedback resistors','2','Calculated for target VOUT','Device:R','Voltage feedback','VOUT → R1 → FB; FB → R2 → GND']],notes:'Switching power designs are topology- and layout-sensitive. Use the selected IC datasheet as the authority for diode, inductor, capacitor, feedback and PCB placement values.'},
{id:'charger',name:'Li-Ion Charger',level:'ADVANCED',domain:'POWER',desc:'Study a dedicated charging IC, battery protection, current setting and safe power routing.',components:[
['U1','Li-Ion charger IC','1','Selected charger IC','Battery_Management:TP4056','Charge control','VIN → charger input; BAT → battery positive; GND → battery/system ground'],
['R1','Programming resistor','1','Value per charge current','Device:R','Charge-current setting','Connect according to charger IC datasheet'],
['C1','Input capacitor','1','Per datasheet','Device:C','Input stability','VIN → C1 → GND'],
['C2','Output/battery capacitor','1','Per datasheet','Device:C','Filtering','BAT → C2 → GND'],
['J1','Battery connector','1','2-pin','Connector_Generic:Conn_01x02','Battery interface','BAT+ → J1.1; BAT− → J1.2']],notes:'Battery charging is safety-critical. Use a charger IC and protection architecture appropriate to the cell chemistry, charge current and battery pack. Do not rely on a generic schematic without checking the manufacturer datasheet.']}
];


// Expand the PCB catalogue with the existing ElectroGuide project library.
// These projects are preserved; they are added here rather than replacing the PCB-specific designs above.
const existingNames=new Set(projects.map(p=>p.name.toLowerCase()));
if(Array.isArray(PROJECTS)){
 window.PROJECTS.forEach(x=>{
   const name=x[2]; if(!name || existingNames.has(name.toLowerCase())) return;
   const sourceLevel=x[1];
   const level=sourceLevel==='BEGINNER'?'BEGINNER':sourceLevel==='ADVANCED'?'ADVANCED':'INTERMEDIATE';
   const components=[['PROJECT BOM','Component set','—',x[4],'See component selection','Primary project components',x[5]]];
   projects.push({id:'library-'+x[0],name,level,domain:sourceLevel,desc:x[3],components,notes:x[6]+' Detailed pin-by-pin mapping will be finalized against the selected parts before KiCad generation.'});
   existingNames.add(name.toLowerCase());
 });
}

let level='ALL';
let selected=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function render(){
 const q=(search.value||'').trim().toLowerCase();
 const list=projects.filter(p=>(level==='ALL'||p.level===level)&&(!q||(p.name+' '+p.domain+' '+p.desc+' '+p.level).toLowerCase().includes(q)));
 count.textContent=list.length+' project'+(list.length===1?'':'s');
 grid.innerHTML=list.length?list.map(p=>`<article class="pcb-card" data-project="${p.id}">
   <div class="pcb-card-top"><span class="pcb-domain">${esc(p.domain)}</span><span class="pcb-level ${p.level.toLowerCase()}">${esc(p.level)}</span></div>
   <h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>
   <div class="pcb-card-footer"><span>Components · Connections · BOM</span><span class="pcb-arrow">→</span></div>
 </article>`).join(''):'<div class="pcb-empty">No project matches your search. Try a different project name or level.</div>';
 document.querySelectorAll('[data-project]').forEach(card=>card.addEventListener('click',()=>openProject(card.dataset.project)));
}
function openProject(id){
 const p=projects.find(x=>x.id===id); if(!p)return; selected=p;
 const old=document.getElementById('pcb-detail'); if(old)old.remove();
 const detail=document.createElement('section'); detail.id='pcb-detail'; detail.className='pcb-detail';
 detail.innerHTML=`<div class="pcb-detail-head"><div><span class="pcb-kicker">${esc(p.domain)} · ${esc(p.level)}</span><h2>${esc(p.name)}</h2><p>${esc(p.desc)}</p></div><button id="pcb-close" class="pcb-close" aria-label="Close project details">×</button></div>
 <div class="pcb-design-flow"><span class="active">01 Components</span><span class="active">02 Connections</span><span class="active">03 BOM</span><span>04 KiCad</span><span>05 PCB</span></div>
 <div class="pcb-section"><div class="pcb-section-title"><span>01</span><h3>Components & KiCad names</h3></div>
 <div class="pcb-table-wrap"><table class="pcb-table"><thead><tr><th>Ref</th><th>Component</th><th>Qty</th><th>Value / Part</th><th>KiCad symbol</th><th>Purpose</th></tr></thead><tbody>${p.components.map(r=>`<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td><td><code>${esc(r[4])}</code></td><td>${esc(r[5])}</td></tr>`).join('')}</tbody></table></div></div>
 <div class="pcb-section"><div class="pcb-section-title"><span>02</span><h3>Connection guide</h3></div>
 <div class="connection-list">${p.components.map(r=>`<div class="connection-row"><strong>${esc(r[0])} · ${esc(r[1])}</strong><span>${esc(r[6])}</span></div>`).join('')}</div></div>
 <div class="pcb-section"><div class="pcb-section-title"><span>03</span><h3>Engineering BOM</h3></div>
 <div class="pcb-table-wrap"><table class="pcb-table bom-table"><thead><tr><th>Ref</th><th>Component</th><th>Qty</th><th>Value / Part</th><th>KiCad symbol</th><th>Purpose</th></tr></thead><tbody>${p.components.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td><td><code>${esc(r[4])}</code></td><td>${esc(r[5])}</td></tr>`).join('')}</tbody></table></div>
 <div class="pcb-engineering-note"><b>Design note:</b> ${esc(p.notes)}</div></div>
 <div class="pcb-detail-actions"><button id="pcb-export" class="pcb-action primary">Export BOM CSV</button><button id="pcb-kicad-next" class="pcb-action">KiCad integration →</button></div>
 <div id="pcb-stage-status" class="pcb-stage-status">Native KiCad project generation will be implemented in the next integration stage.</div>`;
 document.querySelector('.pcb-library').appendChild(detail);
 document.getElementById('pcb-close').onclick=()=>detail.remove();
 document.getElementById('pcb-kicad-next').onclick=()=>document.getElementById('pcb-stage-status').textContent='Next stage: generate a real .kicad_pro and .kicad_sch from this project specification.';
 document.getElementById('pcb-export').onclick=()=>exportBom(p);
 detail.scrollIntoView({behavior:'smooth',block:'start'});
}
function exportBom(p){
 const rows=[['Reference','Component','Quantity','Value / Part','KiCad Symbol','Purpose'],...p.components.map(r=>r.slice(0,6))];
 const csv=rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=p.id+'-engineering-BOM.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
document.querySelectorAll('[data-level]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-level]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');level=btn.dataset.level;render();
}));
search.addEventListener('input',render); render();
})();