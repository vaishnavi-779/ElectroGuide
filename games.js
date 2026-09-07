/* ElectroGuide - 10 practical ECE learning games */
(function(){
  const games=[
    {name:'Circuit Fault Finder',icon:'🔧',desc:'Diagnose common circuit faults.',questions:[
      ['An LED circuit has no light. The LED polarity is reversed. What should you do?',['Reverse the LED orientation','Increase resistor value','Remove the battery','Short the LED'],'Reverse the LED orientation','An LED is a polarized diode and normally conducts when forward biased.'],
      ['A circuit works only when a loose jumper wire is pressed. What is the most likely fault?',['Poor connection','Too much capacitance','Wrong transistor gain','Excessive bandwidth'],'Poor connection','A loose or intermittent wire can open the circuit until pressure restores contact.'],
      ['A resistor becomes very hot and its value is correct. What should you check first?',['Power rating and current','LED color','Clock frequency','PCB silkscreen'],'Power rating and current','Excessive power dissipation can overheat a resistor; check current and its power rating.'],
      ['A DC motor does not start, but the supply voltage is present. What is a useful first check?',['Motor current path and connections','Change AC frequency','Remove the ground','Increase logic clock'],'Motor current path and connections','Checking the motor path, driver and connections is a practical first troubleshooting step.'] ]},
    {name:'Component Master',icon:'🧩',desc:'Choose the right component for the job.',questions:[
      ['Which component is best for limiting current through an LED?',['Resistor','Inductor','Transformer','Crystal'],'Resistor','A series resistor limits LED current.'],
      ['Which component is commonly used to smooth DC supply ripple?',['Capacitor','LDR','Relay','Buzzer'],'Capacitor','A capacitor can store charge and reduce supply ripple when properly selected.'],
      ['Which component changes resistance with light level?',['LDR','Zener diode','Fuse','Crystal'],'LDR','An LDR is a light-dependent resistor.'],
      ['Which device is commonly used as an electronic switch?',['Transistor','Transformer','Potentiometer','Thermistor'],'Transistor','A transistor can be driven between cutoff and conduction to switch a load.'] ]},
    {name:"Ohm's Law Challenge",icon:'⚡',desc:'Calculate voltage, current and resistance quickly.',questions:[
      ['A 12 V source is connected to a 4 Ω resistor. What current flows?',['3 A','4 A','8 A','48 A'],'3 A','I = V/R = 12/4 = 3 A.'],
      ['A 2 A current flows through a 5 Ω resistor. What is the voltage?',['2.5 V','7 V','10 V','20 V'],'10 V','V = IR = 2 × 5 = 10 V.'],
      ['A 9 V source produces 3 mA through a resistor. What is the resistance?',['300 Ω','3 kΩ','27 Ω','30 kΩ'],'3 kΩ','R = V/I = 9/0.003 = 3000 Ω = 3 kΩ.'],
      ['A resistor has 0.5 A through it and 20 V across it. What power does it dissipate?',['10 W','20 W','40 W','0.025 W'],'10 W','P = VI = 20 × 0.5 = 10 W.'] ]},
    {name:'Build the Circuit',icon:'🔌',desc:'Select the correct connection or component.',questions:[
      ['You want to connect a standard LED to a 5 V supply. What should normally be included in series?',['Current-limiting resistor','Large electrolytic only','Transformer primary','Antenna'],'Current-limiting resistor','A resistor limits current and protects the LED.'],
      ['Two resistors must form a simple adjustable voltage divider. Which component can provide adjustment?',['Potentiometer','Fuse','Crystal','Relay coil'],'Potentiometer','A potentiometer provides an adjustable resistance and can be used as a voltage divider.'],
      ['You need to protect a relay-driving transistor from coil turn-off transients. What is commonly placed across the DC coil?',['Flyback diode','LDR','LED in series','Crystal'],'Flyback diode','A flyback diode provides a path for inductive current when the coil is switched off.'],
      ['A sensor output must be converted into a digital number for a microcontroller. What block is needed?',['ADC','DAC','Transformer','Rectifier'],'ADC','An ADC converts an analog input into a digital code.'] ]},
    {name:'Signal Decoder',icon:'📡',desc:'Identify modulation and communication concepts.',questions:[
      ['In FM, which carrier property changes with the message?',['Frequency','Resistance','Capacitance','Inductance'],'Frequency','Frequency modulation varies carrier frequency according to the information signal.'],
      ['In AM, which carrier property is varied?',['Amplitude','Resistance','Power supply type','Antenna length'],'Amplitude','Amplitude modulation varies the carrier amplitude with the message.'],
      ['Which modulation changes carrier phase according to the message?',['PM','AM','FM','FDM'],'PM','Phase modulation varies carrier phase with the information signal.'],
      ['Which multiplexing technique separates channels by frequency bands?',['FDM','TDM','UART','PWM'],'FDM','Frequency-division multiplexing assigns different frequency bands to signals.'] ]},
    {name:'Digital Logic Battle',icon:'🧠',desc:'Master gates, binary and digital logic.',questions:[
      ['What is the output of an AND gate for inputs 1 and 0?',['0','1','10','Undefined'],'0','AND outputs 1 only when all inputs are 1.'],
      ['What is decimal 13 in binary?',['1011','1101','1110','1001'],'1101','13 = 8 + 4 + 1, so the binary representation is 1101.'],
      ['Which gate gives 1 when its two inputs are different?',['XOR','AND','NOR','XNOR'],'XOR','XOR is high when the two binary inputs differ.'],
      ['How many combinations are possible with 4 binary bits?',['4','8','16','32'],'16','Four bits give 2^4 = 16 possible combinations.'] ]},
    {name:'Multimeter Master',icon:'🎯',desc:'Practice safe and correct measurement choices.',questions:[
      ['To measure a DC battery voltage, which mode should you select?',['DC voltage','AC current','Resistance','Continuity only'],'DC voltage','Battery voltage is a DC quantity, so use the DC voltage function.'],
      ['How should an ammeter normally be connected to measure load current?',['In series','In parallel','Across the battery only','To earth only'],'In series','Current must flow through the meter, so an ammeter is connected in series with the load.'],
      ['How is voltage normally measured across a component?',['In parallel','In series','Only with power removed','Across a fuse only'],'In parallel','A voltmeter measures potential difference between two points, so it is connected in parallel.'],
      ['Before measuring resistance with a handheld multimeter, what is the safest basic step?',['De-energize the circuit','Increase supply voltage','Short the battery','Set it to AC current'],'De-energize the circuit','Resistance measurement should be made on a de-energized circuit to avoid unsafe readings or meter damage.'] ]},
    {name:'Microcontroller Mission',icon:'🤖',desc:'Solve Arduino, ESP32 and embedded-system challenges.',questions:[
      ['Which interface commonly uses SDA and SCL?',['I²C','UART','PWM','ADC'],'I²C','I²C commonly uses SDA for data and SCL for clock.'],
      ['Which interface commonly uses MOSI, MISO and SCK?',['SPI','I²C','UART','GPIO only'],'SPI','SPI commonly uses MOSI, MISO and a clock signal, plus chip select.'],
      ['What is GPIO?',['General-purpose input/output','Graphical processor instruction output','Ground power isolation option','General power impedance oscillator'],'General-purpose input/output','GPIO pins can be configured as digital inputs or outputs.'],
      ['What is a watchdog timer mainly used for?',['Recovering from a stalled program','Increasing RAM size','Changing resistor color','Generating Wi-Fi passwords'],'Recovering from a stalled program','A watchdog can reset a microcontroller if software stops responding.'] ]},
    {name:'ECE Interview Challenge',icon:'💼',desc:'Fast technical questions for internships and placements.',questions:[
      ['Why is a decoupling capacitor placed near an IC power pin?',['To supply transient current and reduce local noise','To increase clock frequency automatically','To replace the ground connection','To measure resistance'],'To supply transient current and reduce local noise','A nearby capacitor helps provide short-duration current and reduce supply disturbances.'],
      ['What is the purpose of a pull-up resistor on a digital input?',['Provide a defined high state when the input is otherwise undriven','Increase motor speed','Convert AC to DC','Store program code'],'Provide a defined high state when the input is otherwise undriven','A pull-up biases the input toward the supply when no stronger signal drives it.'],
      ['What does UART commonly use for asynchronous serial communication?',['TX and RX','SDA and SCL','MOSI and MISO only','Gate and source'],'TX and RX','UART commonly uses transmit and receive lines and does not require a shared clock line.'],
      ['What does PCB stand for?',['Printed Circuit Board','Power Control Battery','Programmable Circuit Bus','Parallel Current Block'],'Printed Circuit Board','PCB stands for Printed Circuit Board.'] ]},
    {name:'Troubleshoot the Board',icon:'🏭',desc:'Think like an embedded hardware engineer.',questions:[
      ['A microcontroller board is completely dead. What should you check first?',['Power supply and ground','Change the firmware language','Replace every resistor','Increase serial baud rate'],'Power supply and ground','Verify correct power and ground before deeper firmware or peripheral debugging.'],
      ['A serial monitor shows unreadable characters. What is a common first setting to verify?',['Baud rate','LED color','Resistor tolerance only','ADC reference only'],'Baud rate','The serial device and monitor must use compatible baud settings.'],
      ['An input button randomly changes state when untouched. What practical fix is often needed?',['Pull-up/pull-down and debouncing','Higher speaker volume','More antenna gain','A larger transformer'],'Pull-up/pull-down and debouncing','A defined input bias and software or hardware debouncing can prevent floating and contact-bounce problems.'],
      ['An MCU resets when a motor starts. What hardware issue is worth checking early?',['Supply dip and electrical noise','LCD font size','UART text color','PCB label spelling'],'Supply dip and electrical noise','Motor startup can disturb the supply and generate noise, causing a microcontroller reset.'] ]}
  ];

  const state={game:0,q:0,score:0,solved:0,answered:false,questions:[]};
  const $=s=>document.querySelector(s);
  const app=$('#games-app'); if(!app)return;
  function shuffle(a){return a.map(x=>[Math.random(),x]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);}
  function xp(n){const old=Number(localStorage.getItem('eg-xp')||0);localStorage.setItem('eg-xp',String(old+n));}
  function renderMenu(){
    app.innerHTML='<div class="games-title"><div><span class="eyebrow">10 PLAYABLE ECE CHALLENGES</span><h2>Choose Your Mission</h2><p>Practice the skills used in labs, interviews, internships and real troubleshooting.</p></div><div class="game-score">Total XP: <b id="games-xp">'+(localStorage.getItem('eg-xp')||0)+'</b></div></div><div class="games-grid">'+games.map((g,i)=>'<button class="game-card" data-game="'+i+'"><span class="game-card-icon">'+g.icon+'</span><strong>'+g.name+'</strong><small>'+g.desc+'</small><span class="play-label">PLAY →</span></button>').join('')+'</div>';
    app.querySelectorAll('[data-game]').forEach(b=>b.addEventListener('click',()=>startGame(Number(b.dataset.game))));
  }
  function startGame(i){state.game=i;state.q=0;state.score=0;state.solved=0;state.answered=false;state.questions=shuffle(games[i].questions.slice());renderQuestion();}
  function renderQuestion(){
    const g=games[state.game],q=g.questions[state.q];state.answered=false;
    app.innerHTML='<div class="game-top"><button class="secondary-btn game-back">← Games</button><div><span class="eyebrow">'+g.icon+' '+g.name.toUpperCase()+'</span><div class="game-progress">Challenge '+(state.q+1)+' of '+state.questions.length+'</div></div><div class="game-score">Score: <b>'+state.score+'</b></div></div><div class="game-question-card"><h2>'+q[0]+'</h2><div class="game-options">'+shuffle(q[1]).map((o,i)=>'<button class="game-option" data-answer="'+encodeURIComponent(o)+'"><b>'+String.fromCharCode(65+i)+'</b>'+o+'</button>').join('')+'</div><div class="game-feedback"></div><button class="game-next secondary-btn" hidden>Next Challenge →</button></div>';
    $('.game-back').addEventListener('click',renderMenu);app.querySelectorAll('.game-option').forEach(b=>b.addEventListener('click',()=>answer(decodeURIComponent(b.dataset.answer))));
  }
  function answer(value){if(state.answered)return;state.answered=true;const q=state.questions[state.q],buttons=app.querySelectorAll('.game-option');buttons.forEach(b=>{const v=decodeURIComponent(b.dataset.answer);if(v===q[2])b.classList.add('correct');if(v===value&&v!==q[2])b.classList.add('wrong');b.disabled=true;});const good=value===q[2];if(good){state.score+=10;state.solved++;xp(10);}const f=$('.game-feedback');f.innerHTML=(good?'✓ Correct! ':'✗ Not quite. ')+'<strong>'+q[2]+'</strong><br>'+q[3];f.classList.add(good?'success':'error');const next=$('.game-next');next.hidden=false;next.textContent=state.q===state.questions.length-1?'Finish Game →':'Next Challenge →';}
  function next(){if(state.q<state.questions.length-1){state.q++;renderQuestion();}else finish();}
  function finish(){xp(5);app.innerHTML='<div class="game-result"><span class="eyebrow">MISSION COMPLETE</span><h2>'+games[state.game].icon+' '+games[state.game].name+'</h2><div class="result-score">'+state.score+' / '+(state.questions.length*10)+'</div><p>You solved <b>'+state.solved+'</b> of '+state.questions.length+' challenges correctly.</p><p>+5 XP completion bonus</p><div class="result-actions"><button class="primary-btn play-again">Play Again</button><button class="secondary-btn all-games">All Games</button></div></div>';$('.play-again').addEventListener('click',()=>startGame(state.game));$('.all-games').addEventListener('click',renderMenu);}
  app.addEventListener('click',e=>{if(e.target.classList.contains('game-next'))next();});
  renderMenu();
})();