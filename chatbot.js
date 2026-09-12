document.addEventListener('DOMContentLoaded',()=>{
  const start=document.getElementById('start-chatbot');
  const panel=document.getElementById('chatbot-panel');
  const close=document.getElementById('chatbot-close');
  const input=document.getElementById('chatbot-input');
  const send=document.getElementById('chatbot-send');
  const messages=document.getElementById('chatbot-messages');
  if(!start||!panel||!input||!send||!messages)return;
  const knowledge=[
    ['resistor','A resistor limits current and creates voltage drops. Use Ohm’s law V = I × R.'],
    ['capacitor','A capacitor stores electrical energy in an electric field. It is commonly used for filtering, timing, coupling and decoupling.'],
    ['inductor','An inductor stores energy in a magnetic field and resists changes in current.'],
    ['diode','A diode mainly allows current to flow in one direction. It is used for rectification, protection and signal processing.'],
    ['led','An LED is a light-emitting diode. Always use appropriate current limiting, commonly a resistor, when driving a basic LED.'],
    ['zener','A Zener diode is designed to operate in reverse breakdown and is commonly used for voltage regulation or reference circuits.'],
    ['transistor','A transistor is a semiconductor device used mainly for switching or amplification. Common types include BJT and MOSFET.'],
    ['mosfet','A MOSFET is a voltage-controlled transistor widely used for switching and power control.'],
    ['bjt','A BJT is a current-controlled transistor with NPN and PNP types, commonly used for switching and amplification.'],
    ['555','The 555 timer is a popular IC used for timing, pulse generation, oscillators and monostable/astable circuits.'],
    ['op amp','An operational amplifier is a high-gain differential amplifier used for amplification, filtering, comparison and signal conditioning.'],
    ['arduino','Arduino boards are microcontroller development platforms used for learning, prototyping, sensors, automation and robotics.'],
    ['esp32','ESP32 is a microcontroller family with Wi-Fi and Bluetooth capabilities, widely used for IoT projects.'],
    ['adc','An ADC converts an analog voltage into a digital number so a microcontroller or digital system can process it.'],
    ['dac','A DAC converts a digital value into an analog voltage or current.'],
    ['pwm','PWM rapidly switches a digital output to control average power. It is commonly used for LED brightness and motor speed control.'],
    ['ohm','Ohm’s law is V = I × R. From it, I = V/R and R = V/I.'],
    ['kirchhoff','Kirchhoff’s Current Law says currents entering a node equal currents leaving it. Kirchhoff’s Voltage Law says the algebraic sum of voltages around a closed loop is zero.'],
    ['voltage divider','A two-resistor voltage divider gives Vout = Vin × R2/(R1 + R2), assuming the output is not significantly loaded.'],
    ['multimeter','A multimeter can measure quantities such as voltage, current and resistance. Choose the correct mode and connect it safely.'],
    ['oscilloscope','An oscilloscope displays voltage versus time and helps inspect waveforms, frequency, noise and transients.'],
    ['relay','A relay is an electrically controlled switch that lets a low-power control circuit switch another circuit.'],
    ['transformer','A transformer transfers AC energy between windings using magnetic induction and can step voltage up or down.'],
    ['battery','A battery supplies electrical energy from stored chemical energy and provides a DC source.'],
    ['sensor','A sensor detects a physical quantity such as temperature, light, pressure, motion or humidity and produces a usable signal.'],
    ['ldr','An LDR changes resistance with light level and is often used for light sensing.'],
    ['thermistor','A thermistor is a temperature-sensitive resistor. NTC resistance decreases as temperature rises; PTC resistance increases.'],
    ['ultrasonic','An ultrasonic sensor uses high-frequency sound to estimate distance, commonly by measuring echo time.'],
    ['pir','A PIR sensor detects changes in infrared radiation associated with movement of warm objects.'],
    ['motor','A motor converts electrical energy into mechanical motion. DC, stepper and servo motors are common in projects.'],
    ['servo','A servo motor is a position-controlled actuator commonly used in robotics and mechanisms.'],
    ['stepper','A stepper motor moves in discrete steps and is useful when controlled positioning is required.'],
    ['logic gate','Logic gates perform Boolean operations. AND, OR, NOT, NAND, NOR, XOR and XNOR are common gates.'],
    ['and gate','An AND gate outputs 1 only when all of its inputs are 1.'],
    ['or gate','An OR gate outputs 1 when at least one input is 1.'],
    ['not gate','A NOT gate inverts its input: 0 becomes 1 and 1 becomes 0.'],
    ['pcb','A PCB mechanically supports components and electrically connects them using copper traces, pads and vias.'],
    ['ground','Ground is a circuit reference node. In many low-voltage circuits it is also the return path for current.'],
    ['frequency','Frequency is the number of cycles per second, measured in hertz (Hz).'],
    ['power','Electrical power is P = V × I. For a resistor, P can also be calculated as I²R or V²/R.']
  ];
  const aliases={'resistors':'resistor','resistance':'resistor','caps':'capacitor','capacitors':'capacitor','mosfets':'mosfet','leds':'led','diodes':'diode','transistors':'transistor','arduinos':'arduino','sensors':'sensor','motors':'motor'};
  function normalize(s){return s.toLowerCase().replace(/[^a-z0-9+\-*/=. ?]/g,' ').replace(/\s+/g,' ').trim()}
  function answer(q){
    const text=normalize(q);
    if(!text)return 'Type an electronics question to get started.';
    if(/^(hi|hello|hey|hii)\b/.test(text))return 'Hello! I’m ElectroGuide Assistant ⚡ Ask me about components, circuits, formulas, sensors, Arduino, PCB design or ECE concepts.';
    const calc=text.match(/(?:calculate|find|solve)\s+(?:current|i)\s+(?:if|when)?\s*v\s*=\s*([\d.]+)\s*(?:v)?\s*(?:and|,)\s*r\s*=\s*([\d.]+)\s*(?:ohm|Ω)?/i);
    if(calc){const i=Number(calc[1])/Number(calc[2]);return `Using Ohm’s law I = V/R:\nI = ${calc[1]} / ${calc[2]} = ${i.toFixed(4)} A.`;}
    for(const [key,val] of knowledge){if(text.includes(key))return val;}
    for(const [alias,key] of Object.entries(aliases)){if(text.includes(alias))return knowledge.find(x=>x[0]===key)?.[1]||'';}
    if(/difference between|compare/.test(text)&&text.includes('ac')&&text.includes('dc'))return 'AC periodically changes direction; DC flows with a constant polarity. AC is common in mains power transmission, while DC is common in batteries and electronics circuits.';
    if(/formula|equation/.test(text)&&text.includes('power'))return 'Power formulas: P = V×I, P = I²R, and P = V²/R.';
    return 'I can help with electronics topics, but I don’t have a matching answer yet. Try asking about a component, circuit, formula, sensor, microcontroller, PCB, or measurement.';
  }
  function add(text,who){const el=document.createElement('div');el.className=`chat-msg ${who}`;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;}
  function ask(){const q=input.value.trim();if(!q)return;add(q,'user');input.value='';send.disabled=true;setTimeout(()=>{add(answer(q),'bot');send.disabled=false;input.focus()},180)}
  start.addEventListener('click',()=>{panel.classList.add('open');input.focus()});
  close?.addEventListener('click',()=>panel.classList.remove('open'));
  send.addEventListener('click',ask);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask()}});
});
