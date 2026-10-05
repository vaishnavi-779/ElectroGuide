(() => {
const grid=document.getElementById('pcb-project-grid');
const search=document.getElementById('pcb-search-input');
const count=document.getElementById('pcb-count');
if(!grid)return;

const projects=[
{id:'led',name:'LED + Resistor Circuit',level:'BEGINNER',domain:'BASIC',desc:'Learn polarity, current limiting, resistor selection and basic PCB power routing.'},
{id:'button-led',name:'Push Button + LED',level:'BEGINNER',domain:'BASIC',desc:'Understand digital input, pull-up/pull-down resistors and LED output control.'},
{id:'buzzer',name:'Buzzer Indicator',level:'BEGINNER',domain:'BASIC',desc:'Drive a buzzer safely and learn when a transistor driver is required.'},
{id:'sevenseg',name:'7-Segment Display',level:'BEGINNER',domain:'DIGITAL',desc:'Connect a seven-segment display to a microcontroller with segment current limiting.'},
{id:'traffic',name:'Traffic Light Controller',level:'BEGINNER',domain:'DIGITAL',desc:'Build a multi-output LED controller with timing and clear power distribution.'},
{id:'ldr',name:'LDR Light Sensor',level:'BEGINNER',domain:'SENSORS',desc:'Use an LDR voltage divider and an analog input to measure light level.'},
{id:'temp',name:'Temperature Sensor',level:'BEGINNER',domain:'SENSORS',desc:'Connect a temperature sensor, decoupling capacitor and controller input.'},
{id:'regulator',name:'5 V Regulated Supply',level:'BEGINNER',domain:'POWER',desc:'Learn input protection, regulator wiring, decoupling and output testing.'},
{id:'relay',name:'Relay Driver',level:'INTERMEDIATE',domain:'POWER',desc:'Control a relay with a transistor, flyback diode and protected microcontroller output.'},
{id:'uart',name:'UART Interface',level:'INTERMEDIATE',domain:'COMMUNICATION',desc:'Design a serial interface with connectors, logic-level awareness and protection.'},
{id:'opamp',name:'Non-Inverting Op-Amp',level:'INTERMEDIATE',domain:'ANALOG',desc:'Build a feedback amplifier and select resistor values for a target gain.'},
{id:'esp32',name:'ESP32 Sensor Node',level:'INTERMEDIATE',domain:'EMBEDDED',desc:'Combine ESP32, sensor interface, power decoupling, headers and programming access.'},
{id:'motor',name:'DC Motor Driver',level:'INTERMEDIATE',domain:'POWER',desc:'Design a transistor/MOSFET motor driver with protection and adequate current handling.'},
{id:'buck',name:'12 V to 5 V Buck Converter',level:'ADVANCED',domain:'POWER',desc:'Plan a switching regulator including controller, inductor, capacitors and protection.'},
{id:'charger',name:'Li-Ion Charger',level:'ADVANCED',domain:'POWER',desc:'Study a dedicated charging IC, battery protection, current setting and safe power routing.'}
];

let level='ALL';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function render(){
 const q=(search.value||'').trim().toLowerCase();
 const list=projects.filter(p=>(level==='ALL'||p.level===level)&&(!q||(p.name+' '+p.domain+' '+p.desc+' '+p.level).toLowerCase().includes(q)));
 count.textContent=list.length+' project'+(list.length===1?'':'s');
 grid.innerHTML=list.length?list.map(p=>`<article class="pcb-card">
   <div class="pcb-card-top"><span class="pcb-domain">${esc(p.domain)}</span><span class="pcb-level ${p.level.toLowerCase()}">${esc(p.level)}</span></div>
   <h3>${esc(p.name)}</h3>
   <p>${esc(p.desc)}</p>
   <div class="pcb-card-footer"><span>Components · Connections · BOM</span><span class="pcb-arrow">→</span></div>
 </article>`).join(''):'<div class="pcb-empty">No project matches your search. Try a different project name or level.</div>';
}
document.querySelectorAll('[data-level]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('[data-level]').forEach(b=>b.classList.remove('active'));
 btn.classList.add('active'); level=btn.dataset.level; render();
}));
search.addEventListener('input',render);
render();
})();