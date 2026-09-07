/* ElectroGuide learning, quiz, games, tools and project engine */
const EG={
 xp(){return Number(localStorage.getItem('eg-xp')||0)},
 addXP(n){localStorage.setItem('eg-xp',String(EG.xp()+n));EG.paintStats()},
 streak(){return Number(localStorage.getItem('eg-streak')||0)},
 touchStreak(){const today=new Date().toISOString().slice(0,10),last=localStorage.getItem('eg-last-day');if(last!==today){const y=new Date(Date.now()-86400000).toISOString().slice(0,10);localStorage.setItem('eg-streak',String(last===y?EG.streak()+1:1));localStorage.setItem('eg-last-day',today)}},
 paintStats(){EG.touchStreak();document.querySelectorAll('[data-xp]').forEach(e=>e.textContent=EG.xp());document.querySelectorAll('[data-level]').forEach(e=>e.textContent=Math.floor(EG.xp()/100)+1);document.querySelectorAll('[data-streak]').forEach(e=>e.textContent=EG.streak())},
 esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
};
const quizBank=[
['Basic Electronics','What is the relationship described by Ohm’s law?',['V = IR','P = VI','Q = CV','f = 1/T'],'V = IR','Voltage, current and resistance are related by V = IR.'],
['Basic Electronics','A 10 V source is connected to a 2 kΩ resistor. What current flows?',['2 mA','5 mA','20 mA','50 mA'],'5 mA','I = V/R = 10/2000 = 5 mA.'],
['Basic Electronics','Which quantity is measured in ohms?',['Voltage','Current','Resistance','Power'],'Resistance','The SI unit of resistance is the ohm (Ω).'],
['Basic Electronics','Which component primarily stores energy in an electric field?',['Inductor','Capacitor','Resistor','Transformer'],'Capacitor','A capacitor stores energy in its electric field.'],
['Basic Electronics','Which component stores energy mainly in a magnetic field?',['Capacitor','Resistor','Inductor','Diode'],'Inductor','An inductor stores energy in its magnetic field.'],
['Basic Electronics','What is electrical power when V = 12 V and I = 2 A?',['6 W','14 W','24 W','48 W'],'24 W','P = VI = 12 × 2 = 24 W.'],
['Basic Electronics','Two 1 kΩ resistors are connected in series. What is the equivalent resistance?',['0.5 kΩ','1 kΩ','2 kΩ','10 kΩ'],'2 kΩ','Series resistances add: 1 kΩ + 1 kΩ = 2 kΩ.'],
['Basic Electronics','Two 1 kΩ resistors are connected in parallel. What is the equivalent resistance?',['0.5 kΩ','1 kΩ','2 kΩ','4 kΩ'],'0.5 kΩ','For equal resistors in parallel, R/2 = 0.5 kΩ.'],
['Basic Electronics','What is the SI unit of electric charge?',['Coulomb','Volt','Ampere','Watt'],'Coulomb','Electric charge is measured in coulombs (C).'],
['Basic Electronics','What does Kirchhoff’s current law state at a node?',['Algebraic sum of currents is zero','Voltage always equals current','Power is always zero','Resistance is constant'],'Algebraic sum of currents is zero','KCL follows conservation of charge: currents entering and leaving a node balance algebraically.'],
['Components','What is the main purpose of a resistor in a simple LED circuit?',['Limit current','Store magnetic energy','Generate AC','Convert light to voltage'],'Limit current','A series resistor limits LED current and helps protect the LED.'],
['Components','A diode normally conducts easily in which condition?',['Reverse bias','Forward bias','Zero temperature','Open circuit'],'Forward bias','A standard diode conducts when forward biased.'],
['Components','What is a Zener diode commonly used for?',['Voltage regulation/reference','Mechanical motion','Audio recording','Data storage'],'Voltage regulation/reference','A Zener can operate in reverse breakdown for regulation or reference applications.'],
['Components','Which component is commonly used to switch a load electronically?',['Transistor','Fuse','Capacitor','Transformer core'],'Transistor','Transistors are widely used as electronic switches.'],
['Components','What does an LDR respond primarily to?',['Light','Pressure','Humidity','Sound'],'Light','An LDR changes resistance with incident light level.'],
['Components','Which device converts electrical energy into rotational mechanical energy?',['Motor','Photodiode','ADC','Crystal'],'Motor','A motor converts electrical energy into mechanical motion.'],
['Components','What does a potentiometer provide?',['Adjustable resistance/voltage division','Fixed inductance only','Light emission','Digital storage'],'Adjustable resistance/voltage division','A potentiometer is a variable resistor commonly used as an adjustable voltage divider.'],
['Components','Which component is designed to interrupt excessive current for protection?',['Fuse','Capacitor','LED','Crystal'],'Fuse','A fuse opens the circuit when excessive current causes its element to melt.'],
['Components','What is the usual forward-voltage behavior of a silicon diode?',['About 0.7 V is typical','Exactly 5 V','Exactly 12 V','Always 0 V'],'About 0.7 V is typical','A silicon PN diode often has a forward drop around 0.7 V at ordinary currents; the exact value varies.'],
['Components','Which component is polarized and commonly marked with positive and negative terminals?',['Electrolytic capacitor','Resistor','Inductor','Thermistor only'],'Electrolytic capacitor','Many electrolytic capacitors are polarized and must be connected with correct polarity.'],
['Analog Electronics','What is the ideal voltage gain of a voltage follower op-amp circuit?',['0','1','10','Infinite'],'1','A voltage follower has approximately unity voltage gain and provides buffering.'],
['Analog Electronics','What is the main purpose of a rectifier?',['Convert AC to DC','Convert DC to AC','Increase resistance','Store data'],'Convert AC to DC','A rectifier produces a unidirectional output from an AC input.'],
['Analog Electronics','A low-pass filter primarily allows which frequencies to pass?',['Low frequencies','Only high frequencies','Only DC','No frequencies'],'Low frequencies','A low-pass filter attenuates higher frequencies while passing lower frequencies in its passband.'],
['Analog Electronics','What does transistor current gain β represent for a BJT?',['IC/IB','IB/IC','VCE/IC','IE/VBE'],'IC/IB','For a common BJT definition, β is collector current divided by base current.'],
['Analog Electronics','Which circuit converts a changing analog voltage into a digital number?',['ADC','DAC','Oscillator','Relay'],'ADC','An analog-to-digital converter produces a digital representation of an analog quantity.'],
['Analog Electronics','What is the cutoff frequency of an RC low-pass filter with R = 1 kΩ and C ≈ 159 nF?',['About 100 Hz','About 1 kHz','About 10 kHz','About 100 kHz'],'About 1 kHz','fc = 1/(2πRC), which is approximately 1 kHz for these values.'],
['Analog Electronics','What is the main function of a DAC?',['Convert digital data to an analog signal','Convert AC to DC','Measure resistance','Store charge permanently'],'Convert digital data to an analog signal','A digital-to-analog converter generates an analog output corresponding to a digital input code.'],
['Analog Electronics','For an ideal op-amp operating with negative feedback, what is the input differential voltage approximately?',['0 V','1 V','5 V','Infinite'],'0 V','Negative feedback drives the two input voltages very close to each other in the ideal model.'],
['Digital Electronics','Which logic gate outputs 1 only when all inputs are 1?',['OR','AND','XOR','NOT'],'AND','An AND gate is high only when every input is high.'],
['Digital Electronics','Which gate is called an inverter?',['AND','OR','NOT','XOR'],'NOT','A NOT gate produces the logical complement of its input.'],
['Digital Electronics','How many stable states does a basic flip-flop have?',['1','2','3','4'],'2','A flip-flop is a bistable circuit with two stable states.'],
['Digital Electronics','What is decimal 10 in binary?',['1010','1001','1100','1110'],'1010','Decimal 10 equals binary 1010.'],
['Digital Electronics','Which circuit selects one of several inputs and forwards the selected one?',['Multiplexer','Counter','Decoder only','Register'],'Multiplexer','A multiplexer selects one input from several sources and routes it to its output.'],
['Digital Electronics','How many different values can an n-bit unsigned binary number represent?',['n','2n','2^n','n^2'],'2^n','Each bit has two states, so n bits provide 2^n possible combinations.'],
['Digital Electronics','What is the hexadecimal representation of binary 1111?',['A','B','F','10'],'F','Binary 1111 is decimal 15, which is hexadecimal F.'],
['Digital Electronics','Which circuit converts a binary code into one of many active outputs?',['Decoder','Multiplexer','Oscillator','Amplifier'],'Decoder','A decoder activates an output corresponding to an input code.'],
['Digital Electronics','What is a register primarily used for?',['Storing a group of bits','Converting AC to DC','Measuring temperature','Generating magnetic flux only'],'Storing a group of bits','A register is a group of flip-flops used to store binary information.'],
['Microcontrollers','Which Arduino Uno MCU is the main application controller?',['ATmega328P','ESP32','STM32F103','RP2040'],'ATmega328P','The Arduino Uno R3 uses the ATmega328P MCU.'],
['Microcontrollers','Which interface is commonly used for two-wire synchronous peripheral communication?',['I²C','UART','PWM','GPIO only'],'I²C','I²C uses SDA for data and SCL for clock.'],
['Microcontrollers','What does PWM control directly through duty cycle?',['Average delivered power/voltage behavior','Flash size','CPU architecture','USB connector type'],'Average delivered power/voltage behavior','Changing PWM duty cycle changes the average effect of a pulsed signal on suitable loads.'],
['Microcontrollers','Which ESP32 feature is especially useful for IoT projects?',['Wi-Fi and Bluetooth','Vacuum tube amplification','Mechanical relay contacts','CRT display'],'Wi-Fi and Bluetooth','ESP32 development boards commonly provide integrated Wi-Fi and Bluetooth.'],
['Microcontrollers','Which interface commonly uses MOSI, MISO, SCK and a chip-select signal?',['SPI','I²C','UART','CAN only'],'SPI','SPI commonly uses clock, master-out/slave-in, master-in/slave-out and chip-select signals.'],
['Microcontrollers','What is GPIO?',['General-purpose input/output','Graphical processor instruction output','Ground power isolation option','General power impedance oscillator'],'General-purpose input/output','GPIO pins can be configured by firmware as digital inputs or outputs.'],
['Microcontrollers','What is ADC resolution of an ideal 10-bit ADC in terms of output codes?',['10','100','1024','2048'],'1024','An n-bit ADC has 2^n possible digital codes; 2^10 = 1024.'],
['Microcontrollers','Which memory normally retains firmware when power is removed?',['Flash','SRAM','CPU register','Cache only'],'Flash','Flash memory is non-volatile and commonly stores microcontroller firmware.'],
['Microcontrollers','What is a watchdog timer mainly intended to do?',['Reset/recover a stalled system','Measure resistor color','Increase ADC resolution','Generate Ethernet frames'],'Reset/recover a stalled system','A watchdog can reset the MCU if software fails to service it within the expected time.'],
['Embedded Systems','What is an interrupt used for?',['Responding to an event without continuous polling','Increasing resistor value','Storing analog energy','Replacing a power supply'],'Responding to an event without continuous polling','An interrupt lets the processor respond to an event through an interrupt service routine.'],
['Embedded Systems','Which protocol is asynchronous and commonly uses TX and RX lines?',['UART','I²C','SPI only','ADC'],'UART','UART commonly communicates asynchronously using transmit and receive signals.'],
['Embedded Systems','What is debouncing used for with a mechanical push button?',['Reduce false transitions caused by contact bounce','Increase battery voltage','Encrypt firmware','Cool the switch'],'Reduce false transitions caused by contact bounce','Mechanical contacts can bounce briefly, producing multiple transitions that software or hardware can filter.'],
['Embedded Systems','What is a real-time system mainly concerned with?',['Meeting timing deadlines','Using the largest memory','Maximizing screen brightness','Avoiding all interrupts'],'Meeting timing deadlines','Real-time systems must respond within specified timing constraints.'],
['Embedded Systems','Which scheduling approach assigns tasks priorities and runs higher-priority ready tasks first?',['Priority-based scheduling','Random scheduling','Analog scheduling','Voltage scheduling'],'Priority-based scheduling','Priority-based schedulers choose ready tasks according to assigned priority.'],
['Communication','What is the main purpose of modulation?',['Vary a carrier according to information','Eliminate all noise','Increase resistor power','Store firmware'],'Vary a carrier according to information','Modulation maps information onto a carrier signal for transmission.'],
['Communication','In FM, which carrier property is varied by the message?',['Frequency','Resistance','Capacitance','Physical length'],'Frequency','Frequency modulation varies carrier frequency according to the information signal.'],
['Communication','What does AM vary?',['Carrier amplitude','Carrier resistance','Antenna mass','Battery chemistry'],'Carrier amplitude','Amplitude modulation varies carrier amplitude with the information signal.'],
['Communication','Which modulation changes carrier phase according to the information?',['PM','AM','FM','PWM'],'PM','Phase modulation varies carrier phase in response to the message.'],
['Communication','What sampling frequency is required, ideally, for a band-limited signal whose highest frequency is B?',['B','At least 2B','B/2','B/4'],'At least 2B','The Nyquist condition requires a sampling rate at least twice the highest frequency; practical systems often sample above it.'],
['Communication','Which unit is commonly used for signal power gain or loss on a logarithmic scale?',['dB','Hz','Ohm','Farad'],'dB','Decibels express ratios such as power gain or loss on a logarithmic scale.'],
['Communication','What is the primary role of an antenna in a radio system?',['Convert guided electrical energy and electromagnetic waves','Store DC charge','Regulate voltage','Measure resistance'],'Convert guided electrical energy and electromagnetic waves','An antenna couples electrical signals to electromagnetic radiation and vice versa.'],
['Communication','What does bandwidth describe in a communication channel?',['Range of frequencies occupied or passed','Battery capacity','Antenna weight','Number of logic gates'],'Range of frequencies occupied or passed','Bandwidth describes a frequency range associated with a signal or channel.'],
['Communication','Which multiplexing method assigns different frequency bands to different signals?',['FDM','TDM','PWM','UART'],'FDM','Frequency-division multiplexing separates signals by frequency bands.'],
['Power Electronics','Which device is commonly used for reverse-polarity or rectification applications?',['Diode','LDR','Microphone','Crystal'],'Diode','Diodes provide controlled current direction and are widely used in rectification and protection.'],
['Power Electronics','Why is a flyback diode placed across a DC relay coil in many circuits?',['To provide a path for inductive transient current','To increase coil voltage','To generate Wi-Fi','To measure temperature'],'To provide a path for inductive transient current','When coil current is interrupted, the diode provides a safer path for the inductive transient.'],
['Power Electronics','What does a buck converter normally do?',['Step down DC voltage','Step up AC frequency','Convert light to sound','Measure current only'],'Step down DC voltage','A buck converter is a switching regulator that normally reduces DC input voltage.'],
['Power Electronics','What does a boost converter normally do?',['Step up DC voltage','Step down resistance','Convert binary to decimal','Generate mechanical torque directly'],'Step up DC voltage','A boost converter normally produces a higher DC output voltage than its input.'],
['Power Electronics','Why are heat sinks used on power semiconductors?',['Increase heat transfer to the surroundings','Increase transistor gain automatically','Store firmware','Generate a clock signal'],'Increase heat transfer to the surroundings','Heat sinks increase thermal conduction and surface area to help dissipate heat.'],
['Measurements','Which instrument measures voltage, current and resistance in common use?',['Multimeter','Oscillator','Antenna','Relay'],'Multimeter','A digital multimeter commonly measures voltage, current and resistance.'],
['Measurements','Which instrument displays voltage versus time for electrical signals?',['Oscilloscope','Transformer','Potentiometer','Fuse'],'Oscilloscope','An oscilloscope displays electrical waveforms, typically voltage versus time.'],
['Measurements','Which oscilloscope control changes the horizontal time scale?',['Time/div','Volts/div','Trigger level only','Resistance range'],'Time/div','The time-per-division control sets the horizontal time scale.'],
['Measurements','Which oscilloscope control changes the vertical voltage scale?',['Volts/div','Time/div','Trigger source only','Probe ground'],'Volts/div','The volts-per-division control sets the vertical voltage scale.'],
['Safety','What should you check first before connecting a module to a microcontroller?',['Supply voltage and pinout','Its color only','Its package weight','Its logo size'],'Supply voltage and pinout','Correct supply voltage and pinout prevent many wiring and component-damage mistakes.'],
['Safety','Why should a circuit be powered off before changing many physical connections?',['To reduce shock, short-circuit and component-damage risk','To increase clock speed','To improve Wi-Fi','To change resistor tolerance'],'To reduce shock, short-circuit and component-damage risk','Powering down before rewiring reduces the risk of accidental shorts and unsafe contact.'],
['Safety','What is a current-limiting resistor important for when driving a typical LED from a voltage source?',['Keeping LED current within a safe range','Making the LED generate AC','Increasing supply voltage','Removing all heat'],'Keeping LED current within a safe range','The resistor sets and limits current so the LED is not subjected to excessive current.'],
['Safety','What should be done with an unknown capacitor before handling it in a high-voltage circuit?',['Follow the circuit safety procedure and verify it is discharged','Short it with bare fingers','Assume it is empty','Connect it directly to ground with no procedure'],'Follow the circuit safety procedure and verify it is discharged','Capacitors can retain dangerous energy; proper discharge procedures are essential.']
];
const difficultyByCategory={'Basic Electronics':'Beginner','Components':'Beginner','Analog Electronics':'Intermediate','Digital Electronics':'Intermediate','Microcontrollers':'Intermediate','Embedded Systems':'Intermediate','Communication':'Intermediate','Power Electronics':'Advanced','Measurements':'Intermediate','Safety':'Beginner'};
function initQuiz(){
 const el=document.getElementById('quiz-app');if(!el)return;
 let pool=[...quizBank],index=0,score=0,answered=false,correctCount=0;
 const cat=document.getElementById('quiz-category'),diff=document.getElementById('quiz-difficulty'),count=document.getElementById('quiz-count'),start=document.getElementById('quiz-start');
 const result=document.querySelector('[data-quiz-result]');
 function begin(){
  let c=cat.value,d=diff.value;
  pool=quizBank.filter(q=>(c==='All'||q[0]===c)&&(d==='All'||difficultyByCategory[q[0]]===d));
  if(!pool.length){pool=quizBank.filter(q=>c==='All'||q[0]===c)}
  pool=pool.sort(()=>Math.random()-.5).slice(0,Math.min(Number(count.value),pool.length));
  index=0;score=0;correctCount=0;answered=false;render();
 }
 function render(){
  if(index>=pool.length){finish();return}
  const q=pool[index],opts=[...q[2]].sort(()=>Math.random()-.5);
  el.querySelector('.quiz-progress').textContent=`Question ${index+1} of ${pool.length}`;
  el.querySelector('.quiz-score').textContent=`Score ${score}`;
  el.querySelector('.quiz-topic').textContent=`${q[0]} • ${difficultyByCategory[q[0]]}`;
  el.querySelector('.quiz-question').textContent=q[1];
  const box=el.querySelector('.quiz-options');
  box.innerHTML=opts.map((o,i)=>`<button class="quiz-option" data-value="${EG.esc(o)}"><span>${String.fromCharCode(65+i)}</span>${EG.esc(o)}</button>`).join('');
  el.querySelector('.quiz-feedback').textContent='';el.querySelector('.quiz-next').disabled=true;answered=false;
  box.querySelectorAll('button').forEach(b=>b.onclick=()=>choose(b,q));
 }
 function choose(btn,q){
  if(answered)return;answered=true;
  const val=btn.dataset.value,correct=val===q[3];
  if(correct){score++;correctCount++;EG.addXP(10)}else EG.addXP(2);
  el.querySelectorAll('.quiz-option').forEach(b=>{if(b.dataset.value===q[3])b.classList.add('correct');if(b===btn&&!correct)b.classList.add('wrong');b.disabled=true});
  el.querySelector('.quiz-feedback').innerHTML=`<strong>${correct?'Correct! +10 XP':'Not quite. +2 XP for trying.'}</strong> ${EG.esc(q[4])}`;
  el.querySelector('.quiz-next').disabled=false;
 }
 function next(){if(!answered)return;index++;render()}
 function finish(){
  const pct=Math.round(score/pool.length*100);
  el.querySelector('.quiz-progress').textContent='Quiz complete';el.querySelector('.quiz-topic').textContent=`${difficultyByCategory[cat.value]||'Mixed'} practice`;
  el.querySelector('.quiz-score').textContent=`Final score ${score}/${pool.length}`;
  el.querySelector('.quiz-question').textContent=pct>=80?'Excellent work!':pct>=60?'Good progress — review and try again.':'Keep practising — you will improve with each round.';
  el.querySelector('.quiz-options').innerHTML=`<div class="result-card"><strong>${pct}%</strong><span>${score} correct out of ${pool.length}<br>+${score*10+(pool.length-score)*2} XP earned this round</span></div>`;
  el.querySelector('.quiz-feedback').textContent='Choose Start / Restart for a fresh randomized round.';el.querySelector('.quiz-next').disabled=true;
  if(result)result.textContent=`Last score: ${score}/${pool.length} (${pct}%)`;
 }
 start?.addEventListener('click',begin);el.querySelector('.quiz-next').addEventListener('click',next);begin();
}
function initGames(){const root=document.getElementById('games-app');if(!root)return;const circuit=[['A 5 V source is connected to an LED. Which addition is normally needed in series with the LED?',['Current-limiting resistor','Second battery in parallel','A fuse rated 0 A','An antenna'],'Current-limiting resistor'],['A relay coil is switched off. What component is commonly placed across the DC coil?',['Flyback diode','LDR','Crystal','ADC'],'Flyback diode'],['A sensor output is 0–3.3 V but a 5 V-only input is expected. What should you check first?',['Logic-level compatibility','Wire color','Board logo','Screw size'],'Logic-level compatibility']];let n=0,pts=0;function show(){const q=circuit[n%circuit.length];root.querySelector('.game-question').textContent=q[0];root.querySelector('.game-options').innerHTML=q[1].sort(()=>Math.random()-.5).map((o,i)=>`<button class="game-option" data-v="${EG.esc(o)}">${String.fromCharCode(65+i)}. ${EG.esc(o)}</button>`).join('');root.querySelector('.game-feedback').textContent='';root.querySelectorAll('.game-option').forEach(b=>b.onclick=()=>{const ok=b.dataset.v===q[2];if(ok){pts++;EG.addXP(15)}else EG.addXP(2);root.querySelector('.game-feedback').textContent=ok?'⚡ Circuit fixed! +15 XP':'Try again: think about the electrical role of the component.';root.querySelectorAll('.game-option').forEach(x=>x.disabled=true);root.querySelector('.game-score').textContent=`Solved: ${pts}`})}root.querySelector('.game-next').onclick=()=>{n++;show()};show();}
function initTools(){const r=document.getElementById('tools-app');if(!r)return;const out=(id,v)=>r.querySelector('#'+id).textContent=v;function calc(){const v=Number(r.querySelector('#v').value),res=Number(r.querySelector('#r').value),i=Number(r.querySelector('#i').value);if(v&&res)out('ohm-result',`I = ${(v/res).toFixed(6).replace(/0+$/,'').replace(/\.$/,'')} A`);else if(v&&i)out('ohm-result',`R = ${(v/i).toFixed(4)} Ω`);else if(res&&i)out('ohm-result',`V = ${(res*i).toFixed(4)} V`);else out('ohm-result','Enter any two values.')}r.querySelector('#ohm-calc').onclick=calc;r.querySelector('#led-calc').onclick=()=>{const s=Number(r.querySelector('#led-v').value),f=Number(r.querySelector('#led-f').value),m=Number(r.querySelector('#led-i').value)/1000;out('led-result',m>0?`R ≈ ${((s-f)/m).toFixed(1)} Ω`:'Enter a valid LED current.')}r.querySelector('#divider-calc').onclick=()=>{const v=Number(r.querySelector('#div-v').value),r1=Number(r.querySelector('#div-r1').value),r2=Number(r.querySelector('#div-r2').value);out('divider-result',r1+r2?`Vout ≈ ${(v*r2/(r1+r2)).toFixed(3)} V`:'Enter valid resistances.')}r.querySelector('#binary-calc').onclick=()=>{const x=r.querySelector('#binary').value.trim();const n=parseInt(x,2);out('binary-result',Number.isNaN(n)?'Enter a binary number.':`${n} decimal = 0x${n.toString(16).toUpperCase()} hex`)};}
function init(){EG.paintStats();initQuiz();initGames();initTools()}document.addEventListener('DOMContentLoaded',init);
