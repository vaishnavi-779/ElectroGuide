/* ElectroGuide interactive learning, quiz, games and tools */
const EG={
 xp(){return Number(localStorage.getItem('eg-xp')||0)},
 addXP(n){localStorage.setItem('eg-xp',String(EG.xp()+n));EG.paintStats()},
 streak(){return Number(localStorage.getItem('eg-streak')||0)},
 touchStreak(){const today=new Date().toISOString().slice(0,10),last=localStorage.getItem('eg-last-day');if(last!==today){const y=new Date(Date.now()-86400000).toISOString().slice(0,10);localStorage.setItem('eg-streak',String(last===y?EG.streak()+1:1));localStorage.setItem('eg-last-day',today)}},
 paintStats(){EG.touchStreak();document.querySelectorAll('[data-xp],#xp').forEach(e=>e.textContent=EG.xp());document.querySelectorAll('[data-level],#level').forEach(e=>e.textContent=Math.floor(EG.xp()/100)+1);document.querySelectorAll('[data-streak],#streak').forEach(e=>e.textContent=EG.streak())}
};

/* Question format: [topic, question, options, correct answer, explanation, difficulty] */
const quizBank=[
['Basic Electronics','What is the relationship described by Ohm’s law?',['V = IR','P = VI','Q = CV','f = 1/T'],'V = IR','Voltage, current and resistance are related by V = IR.','Beginner'],
['Basic Electronics','A 10 V source is connected to a 2 kΩ resistor. What current flows?',['2 mA','5 mA','20 mA','50 mA'],'5 mA','I = V/R = 10/2000 = 5 mA.','Beginner'],
['Basic Electronics','Which quantity is measured in ohms?',['Voltage','Current','Resistance','Power'],'Resistance','The SI unit of resistance is the ohm (Ω).','Beginner'],
['Basic Electronics','Which component stores energy mainly in an electric field?',['Inductor','Capacitor','Resistor','Diode'],'Capacitor','A capacitor stores energy in its electric field.','Beginner'],
['Basic Electronics','Which component stores energy mainly in a magnetic field?',['Capacitor','Resistor','Inductor','Diode'],'Inductor','An inductor stores energy in its magnetic field.','Beginner'],
['Basic Electronics','What is electrical power when V = 12 V and I = 2 A?',['6 W','14 W','24 W','48 W'],'24 W','P = VI = 12 × 2 = 24 W.','Beginner'],
['Basic Electronics','Two 1 kΩ resistors are connected in series. What is the equivalent resistance?',['0.5 kΩ','1 kΩ','2 kΩ','10 kΩ'],'2 kΩ','Series resistances add: 1 kΩ + 1 kΩ = 2 kΩ.','Beginner'],
['Basic Electronics','Two 1 kΩ resistors are connected in parallel. What is the equivalent resistance?',['0.5 kΩ','1 kΩ','2 kΩ','4 kΩ'],'0.5 kΩ','Equal resistors in parallel give R/2 = 0.5 kΩ.','Intermediate'],
['Basic Electronics','What does Kirchhoff’s current law state at a node?',['Algebraic sum of currents is zero','Voltage always equals current','Power is always zero','Resistance is constant'],'Algebraic sum of currents is zero','KCL follows conservation of charge: currents entering and leaving a node balance algebraically.','Intermediate'],
['Basic Electronics','A 5 V source supplies 0.5 A. What is the load resistance?',['2.5 Ω','5 Ω','10 Ω','25 Ω'],'10 Ω','R = V/I = 5/0.5 = 10 Ω.','Beginner'],
['Components','What is the main purpose of a resistor in a simple LED circuit?',['Limit current','Store magnetic energy','Generate AC','Convert light to voltage'],'Limit current','A series resistor limits LED current and helps protect the LED.','Beginner'],
['Components','A diode normally conducts easily in which condition?',['Reverse bias','Forward bias','Zero temperature','Open circuit'],'Forward bias','A standard diode conducts when forward biased.','Beginner'],
['Components','What is a Zener diode commonly used for?',['Voltage regulation/reference','Mechanical motion','Audio recording','Data storage'],'Voltage regulation/reference','A Zener can operate in reverse breakdown for regulation or reference applications.','Beginner'],
['Components','Which component is commonly used to switch a load electronically?',['Transistor','Fuse','Capacitor','Transformer core'],'Transistor','Transistors are widely used as electronic switches.','Beginner'],
['Components','What does an LDR respond primarily to?',['Light','Pressure','Humidity','Sound'],'Light','An LDR changes resistance with incident light level.','Beginner'],
['Components','What does a potentiometer provide?',['Adjustable resistance/voltage division','Fixed inductance only','Light emission','Digital storage'],'Adjustable resistance/voltage division','A potentiometer is a variable resistor commonly used as an adjustable voltage divider.','Beginner'],
['Components','Which component interrupts excessive current for protection?',['Fuse','Capacitor','LED','Crystal'],'Fuse','A fuse opens the circuit when excessive current causes its element to melt.','Beginner'],
['Components','Which component is polarized in many common types and must be connected correctly?',['Electrolytic capacitor','Resistor','Inductor','Copper wire'],'Electrolytic capacitor','Many electrolytic capacitors have polarity markings and must be installed correctly.','Beginner'],
['Components','Which device converts electrical energy into rotational mechanical energy?',['Motor','Photodiode','ADC','Crystal'],'Motor','A motor converts electrical energy into mechanical motion.','Beginner'],
['Components','A silicon diode often has approximately what forward voltage at ordinary current?',['0.7 V','5 V','12 V','24 V'],'0.7 V','About 0.7 V is a common rule of thumb for a silicon PN diode; the exact value varies with current and temperature.','Beginner'],
['Analog Electronics','What is the ideal voltage gain of a voltage follower op-amp circuit?',['0','1','10','Infinite'],'1','A voltage follower has approximately unity voltage gain and provides buffering.','Beginner'],
['Analog Electronics','What is the main purpose of a rectifier?',['Convert AC to DC','Convert DC to AC','Increase resistance','Store data'],'Convert AC to DC','A rectifier produces a unidirectional output from an AC input.','Beginner'],
['Analog Electronics','A low-pass filter primarily allows which frequencies to pass?',['Low frequencies','Only high frequencies','Only DC','No frequencies'],'Low frequencies','A low-pass filter attenuates higher frequencies while passing lower frequencies in its passband.','Beginner'],
['Analog Electronics','What does transistor current gain β represent for a BJT?',['IC/IB','IB/IC','VCE/IC','IE/VBE'],'IC/IB','β is commonly defined as collector current divided by base current.','Intermediate'],
['Analog Electronics','Which circuit converts an analog voltage into a digital number?',['ADC','DAC','Oscillator','Relay'],'ADC','An analog-to-digital converter produces a digital representation of an analog quantity.','Beginner'],
['Analog Electronics','What is the cutoff frequency of an RC filter with R = 1 kΩ and C ≈ 159 nF?',['About 100 Hz','About 1 kHz','About 10 kHz','About 100 kHz'],'About 1 kHz','fc = 1/(2πRC), which is approximately 1 kHz.','Advanced'],
['Analog Electronics','What is the main function of a DAC?',['Convert digital data to an analog signal','Convert AC to DC','Measure resistance','Store charge permanently'],'Convert digital data to an analog signal','A DAC generates an analog output corresponding to a digital input code.','Beginner'],
['Analog Electronics','For an ideal op-amp with negative feedback, what is the input differential voltage approximately?',['0 V','1 V','5 V','Infinite'],'0 V','Negative feedback drives the two input voltages very close to each other in the ideal model.','Intermediate'],
['Digital Electronics','Which logic gate outputs 1 only when all inputs are 1?',['OR','AND','XOR','NOT'],'AND','An AND gate is high only when every input is high.','Beginner'],
['Digital Electronics','Which gate is called an inverter?',['AND','OR','NOT','XOR'],'NOT','A NOT gate produces the logical complement of its input.','Beginner'],
['Digital Electronics','How many stable states does a basic flip-flop have?',['1','2','3','4'],'2','A flip-flop is a bistable circuit with two stable states.','Beginner'],
['Digital Electronics','What is decimal 10 in binary?',['1010','1001','1100','1110'],'1010','Decimal 10 equals binary 1010.','Beginner'],
['Digital Electronics','Which circuit selects one of several inputs and forwards the selected one?',['Multiplexer','Counter','Decoder','Register'],'Multiplexer','A multiplexer selects one input from several sources and routes it to its output.','Intermediate'],
['Digital Electronics','How many different values can an n-bit unsigned binary number represent?',['n','2n','2^n','n^2'],'2^n','Each bit has two states, so n bits provide 2^n possible combinations.','Intermediate'],
['Digital Electronics','What is the hexadecimal representation of binary 1111?',['A','B','F','10'],'F','Binary 1111 is decimal 15, which is hexadecimal F.','Beginner'],
['Digital Electronics','Which circuit converts a binary code into one of many active outputs?',['Decoder','Multiplexer','Oscillator','Amplifier'],'Decoder','A decoder activates an output corresponding to an input code.','Intermediate'],
['Digital Electronics','What is a register primarily used for?',['Storing a group of bits','Converting AC to DC','Measuring temperature','Generating magnetic flux'],'Storing a group of bits','A register is a group of flip-flops used to store binary information.','Beginner'],
['Microcontrollers','Which Arduino Uno MCU is the main application controller?',['ATmega328P','ESP32','STM32F103','RP2040'],'ATmega328P','The Arduino Uno R3 uses the ATmega328P MCU.','Beginner'],
['Microcontrollers','Which interface is commonly used for two-wire synchronous peripheral communication?',['I²C','UART','PWM','GPIO only'],'I²C','I²C uses SDA for data and SCL for clock.','Beginner'],
['Microcontrollers','What does PWM duty cycle control in many load-control applications?',['Average delivered power/voltage behavior','Flash size','CPU architecture','USB type'],'Average delivered power/voltage behavior','Changing PWM duty cycle changes the average effect of a pulsed signal on a suitable load.','Intermediate'],
['Microcontrollers','Which ESP32 feature is especially useful for IoT projects?',['Wi-Fi and Bluetooth','Vacuum tube amplification','Mechanical relay contacts','CRT display'],'Wi-Fi and Bluetooth','ESP32 development boards commonly provide integrated Wi-Fi and Bluetooth.','Beginner'],
['Microcontrollers','Which interface commonly uses MOSI, MISO, SCK and chip select?',['SPI','I²C','UART','ADC'],'SPI','SPI commonly uses clock, MOSI, MISO and chip-select signals.','Beginner'],
['Microcontrollers','What is GPIO?',['General-purpose input/output','Graphical processor instruction output','Ground power isolation option','General power impedance oscillator'],'General-purpose input/output','GPIO pins can be configured by firmware as digital inputs or outputs.','Beginner'],
['Microcontrollers','A 10-bit ADC has how many possible output codes?',['10','100','1024','2048'],'1024','An n-bit ADC has 2^n possible codes; 2^10 = 1024.','Intermediate'],
['Microcontrollers','Which memory normally retains firmware when power is removed?',['Flash','SRAM','CPU register','Cache only'],'Flash','Flash memory is non-volatile and commonly stores firmware.','Beginner'],
['Microcontrollers','What is a watchdog timer mainly intended to do?',['Reset/recover a stalled system','Measure resistor color','Increase ADC resolution','Generate Ethernet frames'],'Reset/recover a stalled system','A watchdog can reset the MCU if software fails to service it within the expected time.','Intermediate'],
['Embedded Systems','What is an interrupt used for?',['Responding to an event without continuous polling','Increasing resistor value','Storing analog energy','Replacing a power supply'],'Responding to an event without continuous polling','An interrupt lets the processor respond to an event through an interrupt service routine.','Beginner'],
['Embedded Systems','Which protocol is asynchronous and commonly uses TX and RX lines?',['UART','I²C','SPI','ADC'],'UART','UART commonly communicates asynchronously using transmit and receive signals.','Beginner'],
['Embedded Systems','What is debouncing used for with a mechanical push button?',['Reduce false transitions caused by contact bounce','Increase battery voltage','Encrypt firmware','Cool the switch'],'Reduce false transitions caused by contact bounce','Mechanical contacts can bounce briefly and produce multiple transitions.','Beginner'],
['Embedded Systems','What is a real-time system mainly concerned with?',['Meeting timing deadlines','Using the largest memory','Maximizing screen brightness','Avoiding all interrupts'],'Meeting timing deadlines','Real-time systems must respond within specified timing constraints.','Intermediate'],
['Embedded Systems','Which approach assigns tasks priorities and runs higher-priority ready tasks first?',['Priority-based scheduling','Random scheduling','Analog scheduling','Voltage scheduling'],'Priority-based scheduling','Priority-based schedulers choose ready tasks according to assigned priority.','Intermediate'],
['Communication','What is the main purpose of modulation?',['Vary a carrier according to information','Eliminate all noise','Increase resistor power','Store firmware'],'Vary a carrier according to information','Modulation maps information onto a carrier signal for transmission.','Beginner'],
['Communication','In FM, which carrier property is varied by the message?',['Frequency','Resistance','Capacitance','Physical length'],'Frequency','Frequency modulation varies carrier frequency according to the information signal.','Beginner'],
['Communication','What does AM vary?',['Carrier amplitude','Carrier resistance','Antenna mass','Battery chemistry'],'Carrier amplitude','Amplitude modulation varies carrier amplitude with the information signal.','Beginner'],
['Communication','Which modulation changes carrier phase according to the information?',['PM','AM','FM','PWM'],'PM','Phase modulation varies carrier phase in response to the message.','Beginner'],
['Communication','What sampling frequency is required ideally when the highest signal frequency is B?',['B','At least 2B','B/2','B/4'],'At least 2B','The Nyquist condition requires a sampling rate at least twice the highest frequency.','Intermediate'],
['Communication','Which unit is commonly used for signal power gain or loss on a logarithmic scale?',['dB','Hz','Ohm','Farad'],'dB','Decibels express ratios such as power gain or loss on a logarithmic scale.','Beginner'],
['Communication','What is the primary role of an antenna in a radio system?',['Convert guided electrical energy and electromagnetic waves','Store DC charge','Regulate voltage','Measure resistance'],'Convert guided electrical energy and electromagnetic waves','An antenna couples electrical signals to electromagnetic radiation and vice versa.','Intermediate'],
['Communication','What does bandwidth describe in a communication channel?',['Range of frequencies occupied or passed','Battery capacity','Antenna weight','Number of logic gates'],'Range of frequencies occupied or passed','Bandwidth describes a frequency range associated with a signal or channel.','Beginner'],
['Communication','Which multiplexing method assigns different frequency bands to different signals?',['FDM','TDM','PWM','UART'],'FDM','Frequency-division multiplexing separates signals by frequency bands.','Intermediate'],
['Power Electronics','Why is a flyback diode placed across a DC relay coil?',['To provide a path for inductive transient current','To increase coil voltage','To generate Wi-Fi','To measure temperature'],'To provide a path for inductive transient current','When coil current is interrupted, the diode provides a safer path for the inductive transient.','Intermediate'],
['Power Electronics','What does a buck converter normally do?',['Step down DC voltage','Step up AC frequency','Convert light to sound','Measure current only'],'Step down DC voltage','A buck converter is a switching regulator that normally reduces DC input voltage.','Beginner'],
['Power Electronics','What does a boost converter normally do?',['Step up DC voltage','Step down resistance','Convert binary to decimal','Generate mechanical torque directly'],'Step up DC voltage','A boost converter normally produces a higher DC output voltage than its input.','Beginner'],
['Power Electronics','Why are heat sinks used on power semiconductors?',['Increase heat transfer to the surroundings','Increase transistor gain automatically','Store firmware','Generate a clock signal'],'Increase heat transfer to the surroundings','Heat sinks improve heat transfer and help prevent excessive junction temperature.','Beginner'],
['Power Electronics','Which device is commonly used for rectification?',['Diode','LDR','Microphone','Crystal'],'Diode','Diodes provide controlled current direction and are widely used in rectifiers.','Beginner'],
['Measurements','Which instrument measures voltage, current and resistance in common use?',['Multimeter','Oscillator','Antenna','Relay'],'Multimeter','A digital multimeter commonly measures voltage, current and resistance.','Beginner'],
['Measurements','Which instrument displays voltage versus time for electrical signals?',['Oscilloscope','Transformer','Potentiometer','Fuse'],'Oscilloscope','An oscilloscope displays electrical waveforms, typically voltage versus time.','Beginner'],
['Measurements','Which oscilloscope control changes the horizontal time scale?',['Time/div','Volts/div','Trigger level only','Resistance range'],'Time/div','Time/div sets the horizontal time scale.','Beginner'],
['Measurements','Which oscilloscope control changes the vertical voltage scale?',['Volts/div','Time/div','Trigger source only','Probe ground'],'Volts/div','Volts/div sets the vertical voltage scale.','Beginner'],
['Measurements','A 20 V signal is displayed at 5 V/div. How many vertical divisions is its peak value?',['2 divisions','4 divisions','5 divisions','10 divisions'],'4 divisions','Divisions = voltage / volts-per-division = 20/5 = 4.','Intermediate'],
['Safety','What should you check before connecting a module to a microcontroller?',['Supply voltage and pinout','Its color only','Its package weight','Its logo size'],'Supply voltage and pinout','Confirm the required voltage, ground, pin functions and logic levels before wiring.','Beginner'],
['Safety','Why should mains-voltage circuits be handled with special precautions?',['They can cause severe electric shock, burns or fire','They always use low voltage','They cannot store energy','They are safe when wet'],'They can cause severe electric shock, burns or fire','Mains voltage can be lethal and can create fire hazards. Use appropriate isolation, protection and qualified supervision.','Beginner'],
['Safety','What should you do before measuring resistance with a multimeter?',['De-energize the circuit','Apply maximum voltage','Short the battery','Touch both probes together on a live circuit'],'De-energize the circuit','Resistance mode should normally be used on a de-energized circuit to protect the meter and obtain a valid reading.','Beginner'],
['Safety','What is a common reason to connect grounds between two low-voltage modules?',['Provide a common voltage reference','Increase every supply voltage','Create a fuse','Remove all noise automatically'],'Provide a common voltage reference','A shared ground/reference lets signal voltages be interpreted consistently, provided the circuit architecture calls for it.','Intermediate'],
['Safety','What is the safest response if a component becomes unexpectedly hot?',['Disconnect power safely and investigate','Touch it immediately','Increase the supply voltage','Cover it with paper'],'Disconnect power safely and investigate','Unexpected heating can indicate overload, incorrect wiring or component failure. Remove power safely before troubleshooting.','Beginner']
];

let quizState={questions:[],index:0,score:0,answered:false};
const $=id=>document.getElementById(id);
const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
function quizStart(){
 const category=$('quiz-category')?.value||'All',difficulty=$('quiz-difficulty')?.value||'Beginner',count=Number($('quiz-count')?.value||10);
 let pool=quizBank.filter(q=>(category==='All'||q[0]===category)&&(q[5]===difficulty));
 if(pool.length<count) pool=quizBank.filter(q=>category==='All'||q[0]===category);
 if(!pool.length){$('quiz-question').textContent='No questions are available for this selection yet.';return}
 quizState={questions:shuffle(pool).slice(0,Math.min(count,pool.length)),index:0,score:0,answered:false};
 $('quiz-result').hidden=true;$('quiz-next').hidden=true;renderQuizQuestion();EG.paintStats();
}
function renderQuizQuestion(){
 const q=quizState.questions[quizState.index];quizState.answered=false;
 $('quiz-progress').textContent=`Question ${quizState.index+1} of ${quizState.questions.length}`;$('quiz-topic').textContent=`${q[0]} • ${q[5]}`;$('quiz-score').textContent=`Score: ${quizState.score}`;$('quiz-question').textContent=q[1];$('quiz-feedback').textContent='';$('quiz-next').hidden=true;
 const options=shuffle(q[2]);$('quiz-options').innerHTML='';
 options.forEach((option,i)=>{const b=document.createElement('button');b.type='button';b.className='quiz-option';b.innerHTML=`<span>${String.fromCharCode(65+i)}</span>${option}`;b.addEventListener('click',()=>answerQuiz(b,option));$('quiz-options').appendChild(b)});
}
function answerQuiz(button,choice){
 if(quizState.answered)return;quizState.answered=true;const q=quizState.questions[quizState.index];
 document.querySelectorAll('#quiz-options .quiz-option').forEach(b=>{b.disabled=true;if(b.textContent.trim().slice(1).trim()===q[3])b.classList.add('correct')});
 if(choice===q[3]){quizState.score++;EG.addXP(10);button.classList.add('correct');$('quiz-feedback').textContent=`✓ Correct! ${q[4]}`}else{button.classList.add('wrong');$('quiz-feedback').textContent=`✗ Correct answer: ${q[3]}. ${q[4]}`}
 $('quiz-score').textContent=`Score: ${quizState.score}`;$('quiz-next').textContent=quizState.index===quizState.questions.length-1?'Finish Quiz':'Next Question →';$('quiz-next').hidden=false;
}
function quizNext(){if(!quizState.answered)return;if(quizState.index<quizState.questions.length-1){quizState.index++;renderQuizQuestion()}else finishQuiz()}
function finishQuiz(){const total=quizState.questions.length,pct=Math.round((quizState.score/total)*100);EG.addXP(2);$('quiz-options').innerHTML='';$('quiz-question').textContent='Quiz Complete!';$('quiz-feedback').textContent='';$('quiz-next').hidden=true;$('quiz-result').hidden=false;$('quiz-result').innerHTML=`<strong>${quizState.score}/${total}</strong><span>${pct}% correct • +2 XP attempt bonus</span><br><button id="quiz-result-restart" class="primary-btn" type="button" style="margin-top:18px">▶ Play Again</button>`;$('quiz-last').textContent=`Last score: ${quizState.score}/${total} (${pct}%)`;$('quiz-result-restart').addEventListener('click',quizStart);EG.paintStats()}

function initQuiz(){if(!$('quiz-start'))return;$('quiz-start').addEventListener('click',quizStart);$('quiz-next').addEventListener('click',quizNext);EG.paintStats()}

/* Existing games/tools can continue to use the shared progress engine. */
document.addEventListener('DOMContentLoaded',()=>{EG.paintStats();initQuiz()});
