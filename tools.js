(()=>{
const $=id=>document.getElementById(id);const out=(id,t)=>{const e=$(id);if(e)e.innerHTML=t};
const tools=[
['calc','Ohm\'s Law','Calculate V, I, R and power','V=I×R'],['calc','Power Calculator','Voltage, current, resistance and power','P=VI'],['calc','Voltage Divider','Find output voltage','Vout=Vin×R2/(R1+R2)'],['calc','Current Divider','Find branch current','I1=It×R2/(R1+R2)'],['calc','LED Resistor','Choose safe LED resistor','R=(Vs−Vf)/I'],['calc','Series Resistors','Equivalent resistance','Req=R1+R2+…'],['calc','Parallel Resistors','Equivalent resistance','1/Req=Σ1/R'],['calc','Series Capacitors','Equivalent capacitance','1/Ceq=Σ1/C'],['calc','Parallel Capacitors','Equivalent capacitance','Ceq=ΣC'],['calc','RC Time Constant','Charging/discharging timing','τ=RC'],['calc','Frequency / Period','Convert frequency and period','T=1/f'],['calc','Angular Frequency','Find ω','ω=2πf'],['calc','dB Power Gain','Power ratio to dB','10log10(P2/P1)'],['calc','dB Voltage Gain','Voltage ratio to dB','20log10(V2/V1)'],['calc','Transformer Ratio','Turns, voltage and current','Vp/Vs=Np/Ns'],['calc','Battery Runtime','Estimate operating time','hours=Ah/A'],['calc','Energy / Wh','Battery energy','Wh=V×Ah'],['calc','Watt to Horsepower','Convert power','1 hp≈746 W'],['calc','Frequency to Wavelength','EM wavelength','λ=c/f'],['calc','Duty Cycle','Pulse duty cycle','D=Ton/T'],
['decoder','Resistor Color Code','Decode 4-band resistor','Colors → Ω'],['decoder','Capacitor Code','Decode 3-digit marking','104 → 100 nF'],['decoder','SMD Resistor Code','Decode 3/4 digit SMD values','103 → 10 kΩ'],['decoder','SMD Capacitor Code','Estimate common SMD marking','Code → pF'],['decoder','Diode Marking Guide','Identify common diode families','Part → use'],['decoder','Logic IC Pin Guide','Quick pin/function reference','IC → pins'],
['measure','Virtual Multimeter','Practice V, A, Ω and continuity','Measure safely'],['measure','Diode Test','Forward/reverse diode test','Vf + OPEN'],['measure','Continuity Tester','Check a virtual connection','BEEP / OPEN'],['measure','Component Tester','Test resistor, LED, diode, capacitor','PASS / CHECK'],['measure','Power Supply','Set voltage/current limit','Bench supply'],['measure','Battery Lab','Series/parallel battery setup','Pack voltage'],
['signal','Signal Generator','Create sine/square/triangle signals','f, Vpp, offset'],['signal','Oscilloscope','View and measure waveforms','Vpp, RMS, T'],['signal','Logic Analyzer','Inspect digital channels','HIGH / LOW'],['signal','PWM Generator','Set frequency and duty cycle','PWM'],['signal','RC Waveform Lab','See capacitor charging','1−e^(−t/RC)'],['signal','Filter Response','Estimate RC low/high pass','fc=1/(2πRC)'],
['sensor','LDR Sensor Lab','Change light and observe resistance','Light → Ω'],['sensor','Thermistor Lab','Change temperature and resistance','Temp → Ω'],['sensor','LM35 Lab','Temperature to voltage','10 mV/°C'],['sensor','Ultrasonic Lab','Distance to echo time','t=2d/c'],['sensor','PIR Lab','Motion sensor output','LOW / HIGH'],['sensor','Hall Sensor Lab','Magnetic field switching','Field → output'],
['digital','Logic Gate Lab','AND/OR/NOT/XOR/NAND/NOR','Inputs → Y'],['digital','Binary / Decimal','Convert number systems','BIN ↔ DEC'],['digital','Hex / Binary','Convert hexadecimal','HEX ↔ BIN'],['digital','Two\'s Complement','Signed binary helper','N-bit'],['digital','Truth Table Builder','Generate gate truth table','Inputs → table'],
['diagnose','Circuit Troubleshooter','Find common wiring faults','Diagnose → fix'],['diagnose','Voltage Drop Checker','Check expected drops','ΣV=0'],['diagnose','Power Budget Checker','Check load vs supply','Margin'],['diagnose','Safety Checker','Flag risky circuit conditions','SAFE / WARNING'],['diagnose','Component Selection Helper','Choose a suitable basic part','Requirement → choice']
];
const host=$('tools-app');const search=$('tool-search');const cat=$('tool-category');
const cats=[...new Set(tools.map(t=>t[0]))];const names={calc:'Calculators',decoder:'Decoders & References',measure:'Meters & Bench',signal:'Signals & Waveforms',sensor:'Sensor Labs',digital:'Digital & Logic',diagnose:'Diagnosis & Design'};
cat.innerHTML='<option value="all">All tools (50)</option>'+cats.map(c=>`<option value="${c}">${names[c]}</option>`).join('');
function fields(i){const common={calc:['Value A','Value B','Value C'],measure:['Voltage (V)','Resistance (Ω)'],signal:['Frequency (Hz)','Amplitude (V)','Offset (V)'],sensor:['Input value'],digital:['Input A','Input B'],diagnose:['Supply (V)','Load current (A)'],decoder:['Code / value']}[tools[i][0]]||['Value'];return common.map((x,j)=>`<label>${x}<input id="t${i}-${j}" type="number" step="any" placeholder="${j===0?'Enter value':''}"></label>`).join('')}
function card(i,t){return `<article class="tool-card lab-tool" data-cat="${t[0]}" data-name="${t[1].toLowerCase()}"><div class="tool-tag">${names[t[0]]}</div><h2>${t[1]}</h2><p>${t[2]}</p><div class="formula">${t[3]}</div><div class="tool-inputs">${fields(i)}</div><button class="primary-btn" data-run="${i}">Run Tool</button><output id="to${i}">Ready.</output><details><summary>How to use</summary><p>Enter the required values, press <b>Run Tool</b>, then read the result. Use the result as a learning estimate and verify real hardware with proper instruments.</p></details></article>`}
function render(){const q=(search.value||'').toLowerCase();const c=cat.value;host.innerHTML=tools.map((t,i)=>card(i,t)).filter((_,i)=>{const t=tools[i];return(c==='all'||t[0]===c)&&(!q||t[1].toLowerCase().includes(q)||t[2].toLowerCase().includes(q))}).join('');host.querySelectorAll('[data-run]').forEach(b=>b.onclick=()=>run(+b.dataset.run))}
function val(i,j){return parseFloat($(`t${i}-${j}`)?.value)}
function run(i){const t=tools[i],o='to'+i,a=val(i,0),b=val(i,1),c=val(i,2),type=t[0],name=t[1];let r='Enter the required values.';
if(name==="Ohm's Law")r=Number.isFinite(a)&&Number.isFinite(b)?`V=${(a*b).toFixed(3)} V • I=${a} A • R=${b} Ω • P=${(a*a*b).toFixed(3)} W`:'Enter I and R.';
else if(name==='Power Calculator')r=Number.isFinite(a)&&Number.isFinite(b)?`Power = <b>${(a*b).toFixed(3)} W</b>`:'Enter voltage and current.';
else if(name==='Voltage Divider')r=Number.isFinite(a)&&Number.isFinite(b)&&Number.isFinite(c)?`Vout = <b>${(a*c/(b+c)).toFixed(3)} V</b>`:'Enter Vin, R1, R2.';
else if(name==='Current Divider')r=Number.isFinite(a)&&Number.isFinite(b)&&Number.isFinite(c)?`Branch current = <b>${(a*c/(b+c)).toFixed(4)} A</b>`:'Enter total current and two resistors.';
else if(name==='LED Resistor')r=Number.isFinite(a)&&Number.isFinite(b)&&Number.isFinite(c)?`Recommended R ≈ <b>${Math.max(1,Math.ceil((a-b)/(c/1000)/10)*10)} Ω</b>`:'Enter supply, Vf and current.';
else if(name==='Series Resistors')r=[a,b,c].filter(Number.isFinite).reduce((x,y)=>x+y,0)+` Ω`;
else if(name==='Parallel Resistors'){let x=[a,b,c].filter(Number.isFinite);r=x.length?`Req ≈ <b>${(1/x.reduce((s,y)=>s+1/y,0)).toFixed(3)} Ω</b>`:'Enter resistors.'}
else if(name==='Series Capacitors'){let x=[a,b,c].filter(Number.isFinite);r=x.length?`Ceq ≈ <b>${(1/x.reduce((s,y)=>s+1/y,0)).toFixed(3)}</b> µF`:'Enter capacitors.'}
else if(name==='Parallel Capacitors')r=`Ceq ≈ <b>${[a,b,c].filter(Number.isFinite).reduce((x,y)=>x+y,0).toFixed(3)} µF</b>`;
else if(name==='RC Time Constant')r=Number.isFinite(a)&&Number.isFinite(b)?`τ = <b>${(a*b/1e6).toFixed(6)} s</b> (R in Ω, C in µF)`:'Enter R and C.';
else if(name==='Frequency / Period')r=Number.isFinite(a)?`T = <b>${(1/a).toExponential(4)} s</b>`:'Enter frequency.';
else if(name==='Angular Frequency')r=Number.isFinite(a)?`ω = <b>${(2*Math.PI*a).toFixed(3)} rad/s</b>`:'Enter frequency.';
else if(name.includes('dB'))r=Number.isFinite(a)&&Number.isFinite(b)?`Gain = <b>${(name.includes('Power')?10:20)*Math.log10(b/a).toFixed(3)} dB</b>`:'Enter two values.';
else if(name==='Transformer Ratio')r=Number.isFinite(a)&&Number.isFinite(b)?`Turns ratio = <b>${(a/b).toFixed(3)}</b>`:'Enter primary and secondary values.';
else if(name==='Battery Runtime')r=Number.isFinite(a)&&Number.isFinite(b)?`Estimated runtime = <b>${(a/b).toFixed(2)} h</b>`:'Enter Ah and load A.';
else if(name==='Energy / Wh')r=Number.isFinite(a)&&Number.isFinite(b)?`Energy = <b>${(a*b).toFixed(2)} Wh</b>`:'Enter V and Ah.';
else if(name==='Watt to Horsepower')r=Number.isFinite(a)?`≈ <b>${(a/746).toFixed(3)} hp</b>`:'Enter watts.';
else if(name==='Frequency to Wavelength')r=Number.isFinite(a)?`λ ≈ <b>${(299792458/a).toFixed(3)} m</b>`:'Enter Hz.';
else if(name==='Duty Cycle')r=Number.isFinite(a)&&Number.isFinite(b)?`Duty cycle = <b>${(a/b*100).toFixed(2)}%</b>`:'Enter Ton and period.';
else if(type==='decoder')r=`<b>${String($(`t${i}-0`)?.value||'').trim()||'Enter a code'}</b> → use the reference guidance above and verify the component datasheet.`;
else if(name==='Binary / Decimal'){let s=$(`t${i}-0`)?.value||'';r=/^[01]+$/.test(s)?`Decimal = <b>${parseInt(s,2)}</b>`:'Enter binary digits only.'}
else if(name==='Hex / Binary'){let s=$(`t${i}-0`)?.value||'';r=`Binary = <b>${parseInt(s,16).toString(2).padStart(4,'0')}</b>`}
else if(name==='Two\'s Complement'){let s=$(`t${i}-0`)?.value||'';r=`Use an N-bit width and invert + 1 for the negative representation.`}
else if(name==='Ultrasonic Lab'&&Number.isFinite(a))r=`Echo time ≈ <b>${(2*a/343*1000).toFixed(3)} ms</b>`;
else if(name==='LM35 Lab'&&Number.isFinite(a))r=`Output ≈ <b>${(a*0.01).toFixed(3)} V</b>`;
else if(name==='Thermistor Lab'&&Number.isFinite(a))r=`Approx. resistance changes with temperature; use a calibrated thermistor curve for real hardware.`;
else if(name==='LDR Sensor Lab'&&Number.isFinite(a))r=`Higher light level generally means <b>lower resistance</b> for an LDR.`;
else if(name==='RC Waveform Lab')r='Charging: 0% → 63% at τ → 95% at 3τ → 99% at 5τ.';
else if(name==='Filter Response'&&Number.isFinite(a)&&Number.isFinite(b))r=`Cutoff frequency fc ≈ <b>${(1/(2*Math.PI*a*b)).toFixed(3)} Hz</b>`;
else if(name==='Logic Gate Lab'){let A=!!a,B=!!b;r=`AND=${A&&B?1:0} • OR=${A||B?1:0} • XOR=${A!==B?1:0} • NAND=${!(A&&B)?1:0}`}
else if(type==='signal')r='Tool ready. Set the parameters, then use the Simulator/Oscilloscope for visual waveform experiments.';
else if(type==='measure')r='Virtual bench ready. Follow the safety note and choose the correct measurement mode before connecting probes.';
else if(type==='diagnose')r='Check supply polarity, ground, continuity, component orientation and current limits in that order.';
else r='Interactive lab ready — follow the instructions and compare your prediction with the result.';out(o,r)}
search.oninput=render;cat.onchange=render;render();
})();