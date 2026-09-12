document.addEventListener('DOMContentLoaded',()=>{
  const start=document.getElementById('start-chatbot');
  const panel=document.getElementById('chatbot-panel');
  const close=document.getElementById('chatbot-close');
  const input=document.getElementById('chatbot-input');
  const send=document.getElementById('chatbot-send');
  const messages=document.getElementById('chatbot-messages');
  if(!start||!panel||!input||!send||!messages)return;

  const knowledge=[
    ['resistor','A resistor limits current and creates voltage drops. Ohm’s law is V = I × R.'],
    ['capacitor','A capacitor stores energy in an electric field. It is used for filtering, timing, coupling and decoupling.'],
    ['inductor','An inductor stores energy in a magnetic field and opposes changes in current.'],
    ['diode','A diode primarily allows current in one direction. It is used for rectification, protection and signal processing.'],
    ['led','An LED emits light when forward biased. A suitable current-limiting resistor is normally used with a basic LED circuit.'],
    ['zener','A Zener diode is designed to operate in reverse breakdown and is commonly used for voltage regulation and references.'],
    ['transistor','A transistor is a semiconductor device used for switching and amplification. Common families are BJT and MOSFET.'],
    ['mosfet','A MOSFET is a voltage-controlled transistor widely used for switching, power conversion and amplification.'],
    ['bjt','A BJT is a current-controlled transistor. NPN and PNP are the two main types.'],
    ['555','The 555 timer is used for timing, pulse generation, oscillators and monostable/astable circuits.'],
    ['op amp','An operational amplifier is a high-gain differential amplifier used for amplification, filtering, comparison and signal conditioning.'],
    ['arduino','Arduino is a family of microcontroller development boards used for learning, prototyping, sensors, automation and robotics.'],
    ['esp32','ESP32 is a microcontroller family with Wi-Fi and Bluetooth, popular for IoT projects.'],
    ['microcontroller','A microcontroller combines a processor, memory and peripherals on one chip for embedded control applications.'],
    ['adc','An ADC converts an analog signal into a digital number. Resolution determines how finely the input range is represented.'],
    ['dac','A DAC converts a digital value into an analog voltage or current.'],
    ['pwm','PWM rapidly switches a digital signal. Duty cycle controls average power and is commonly used for LED brightness and motor speed.'],
    ['ohm','Ohm’s law: V = I × R. Therefore I = V/R and R = V/I.'],
    ['kirchhoff','KCL: the algebraic sum of currents at a node is zero. KVL: the algebraic sum of voltages around a closed loop is zero.'],
    ['voltage divider','For two resistors, Vout = Vin × R2/(R1 + R2), assuming the load does not significantly change the divider.'],
    ['multimeter','A multimeter can measure voltage, current, resistance and other quantities. Select the correct mode and terminals before measuring.'],
    ['oscilloscope','An oscilloscope displays voltage versus time and helps analyze waveform shape, frequency, noise and transients.'],
    ['relay','A relay is an electrically controlled switch that allows one circuit to control another circuit.'],
    ['transformer','A transformer transfers AC energy between windings by electromagnetic induction and can step voltage up or down.'],
    ['battery','A battery converts stored chemical energy into electrical energy and normally provides a DC source.'],
    ['sensor','A sensor detects a physical quantity such as temperature, light, pressure, motion or humidity and produces a signal.'],
    ['ldr','An LDR changes resistance with light level and is used for light sensing.'],
    ['thermistor','A thermistor is temperature-sensitive. NTC resistance decreases as temperature rises; PTC resistance increases.'],
    ['ultrasonic','An ultrasonic sensor uses high-frequency sound and echo time to estimate distance.'],
    ['pir','A PIR sensor detects changes in infrared radiation associated with movement of warm objects.'],
    ['motor','A motor converts electrical energy into mechanical motion. DC, stepper and servo motors are common.'],
    ['servo','A servo is a position-controlled actuator commonly used in robotics and mechanisms.'],
    ['stepper','A stepper motor moves in discrete steps and is useful when controlled positioning is needed.'],
    ['logic gate','Logic gates perform Boolean operations. Common gates are AND, OR, NOT, NAND, NOR, XOR and XNOR.'],
    ['and gate','An AND gate outputs 1 only when all inputs are 1.'],
    ['or gate','An OR gate outputs 1 when at least one input is 1.'],
    ['not gate','A NOT gate inverts its input: 0 becomes 1 and 1 becomes 0.'],
    ['pcb','A PCB mechanically supports components and electrically connects them with copper traces, pads and vias.'],
    ['ground','Ground is a circuit reference node. In many low-voltage circuits it is also the return path.'],
    ['frequency','Frequency is the number of cycles per second, measured in hertz. Period T and frequency f are related by f = 1/T.'],
    ['power','Electrical power is P = V × I. For a resistor, P = I²R = V²/R.'],
    ['voltage','Voltage is electrical potential difference, measured in volts. It provides the potential that drives current through an impedance.'],
    ['current','Current is the rate of flow of electric charge, measured in amperes.'],
    ['resistance','Resistance opposes current flow and is measured in ohms.'],
    ['impedance','Impedance is the opposition to AC current, combining resistance and reactance, and is measured in ohms.'],
    ['reactance','Reactance is the frequency-dependent opposition of capacitors and inductors to AC.'],
    ['ac','AC periodically changes direction and magnitude. It is commonly used in power systems.'],
    ['dc','DC has a fixed polarity and normally flows in one direction. Batteries are common DC sources.'],
    ['frequency response','Frequency response describes how a circuit’s gain and phase change as input frequency changes.'],
    ['filter','A filter passes desired frequency ranges and attenuates others. Low-pass, high-pass, band-pass and band-stop are common types.'],
    ['rectifier','A rectifier converts AC into pulsating DC, commonly using diodes.'],
    ['regulator','A voltage regulator maintains a desired output voltage despite changes in input or load within its operating limits.'],
    ['optoisolator','An optocoupler transfers a signal using light while providing electrical isolation between circuits.'],
    ['ic','An integrated circuit contains electronic components and interconnections on a semiconductor chip.'],
    ['embedded system','An embedded system is a computer-based system designed for a dedicated function inside a larger product.'],
    ['iot','IoT connects physical devices, sensors and systems so they can exchange data and perform useful actions.'],
    ['antenna','An antenna converts electrical signals into electromagnetic waves and vice versa.'],
    ['rf','RF means radio frequency. RF circuits handle signals used for wireless communication and electromagnetic transmission.'],
    ['communication','Electronic communication transfers information using electrical, optical or electromagnetic signals.'],
    ['amplifier','An amplifier increases signal voltage, current or power according to its design.'],
    ['oscillator','An oscillator generates a periodic signal without requiring a periodic input signal.'],
    ['feedback','Feedback feeds part of a system output back to its input. Negative feedback often improves stability and linearity.'],
    ['digital','Digital electronics represents information using discrete logic levels, commonly binary 0 and 1.'],
    ['analog','Analog electronics processes continuously varying voltages or currents.'],
    ['logic','Logic circuits process binary states using Boolean rules and logic gates.'],
    ['flip flop','A flip-flop is a bistable digital circuit used to store one bit of information.'],
    ['counter','A digital counter advances through a sequence of states in response to clock pulses.'],
    ['register','A register is a group of flip-flops used to store or shift binary data.'],
    ['multiplexer','A multiplexer selects one of several input signals and connects the selected input to an output.'],
    ['demultiplexer','A demultiplexer routes one input signal to one of several outputs according to select signals.']
  ];

  const aliases={
    resistors:'resistor',caps:'capacitor',capacitors:'capacitor',condensers:'capacitor',
    mosfets:'mosfet',leds:'led',diodes:'diode',transistors:'transistor',
    arduinos:'arduino',sensors:'sensor',motors:'motor',amps:'op amp',
    microcontrollers:'microcontroller',pcbs:'pcb',batteries:'battery'
  };

  function normalize(s){
    return String(s).toLowerCase().replace(/[^a-z0-9+\-*/=. ?]/g,' ').replace(/\s+/g,' ').trim();
  }

  function add(text,who){
    const el=document.createElement('div');
    el.className=`chat-msg ${who}`;
    el.textContent=text;
    messages.appendChild(el);
    messages.scrollTop=messages.scrollHeight;
  }

  function calculate(text){
    let m=text.match(/(?:calculate|find|solve)\s+(?:current|i)\s+(?:if|when)?\s*v\s*=\s*([\d.]+)\s*(?:v)?\s*(?:and|,)\s*r\s*=\s*([\d.]+)\s*(?:ohm|Ω)?/i);
    if(m){const i=Number(m[1])/Number(m[2]);return `Using Ohm’s law I = V/R:\nI = ${m[1]} / ${m[2]} = ${i.toFixed(4)} A.`;}
    m=text.match(/(?:calculate|find|solve)\s+(?:voltage|v)\s+(?:if|when)?\s*i\s*=\s*([\d.]+)\s*(?:a)?\s*(?:and|,)\s*r\s*=\s*([\d.]+)\s*(?:ohm|Ω)?/i);
    if(m){const v=Number(m[1])*Number(m[2]);return `Using Ohm’s law V = I×R:\nV = ${m[1]} × ${m[2]} = ${v.toFixed(4)} V.`;}
    m=text.match(/(?:calculate|find|solve)\s+(?:resistance|r)\s+(?:if|when)?\s*v\s*=\s*([\d.]+)\s*(?:v)?\s*(?:and|,)\s*i\s*=\s*([\d.]+)\s*(?:a)?/i);
    if(m){const r=Number(m[1])/Number(m[2]);return `Using Ohm’s law R = V/I:\nR = ${m[1]} / ${m[2]} = ${r.toFixed(4)} Ω.`;}
    m=text.match(/(?:calculate|find)\s+(?:power|p)\s+(?:if|when)?\s*v\s*=\s*([\d.]+)\s*(?:v)?\s*(?:and|,)\s*i\s*=\s*([\d.]+)\s*(?:a)?/i);
    if(m){const p=Number(m[1])*Number(m[2]);return `Using P = V×I:\nP = ${m[1]} × ${m[2]} = ${p.toFixed(4)} W.`;}
    return null;
  }

  function localAnswer(q){
    const text=normalize(q);
    if(!text)return 'Type an electronics question to get started.';
    if(/^(hi|hello|hey|hii|good morning|good evening)\b/.test(text))return 'Hello! ⚡ Ask me any electronics question. I can explain components, circuits, formulas, analog/digital electronics, microcontrollers, sensors, communication, PCB design and troubleshooting.';

    const c=calculate(text); if(c)return c;

    if(/difference between|compare/.test(text)&&text.includes('ac')&&text.includes('dc'))return 'AC periodically changes direction; DC has a fixed polarity. AC is common in mains power systems, while DC is common in batteries and electronic circuits.';
    if(/series.*parallel|parallel.*series/.test(text))return 'In series, the same current flows through each element and voltages divide. In parallel, the same voltage appears across branches and currents divide.';
    if(/resistor.*led|led.*resistor/.test(text))return 'A resistor is normally placed in series with a basic LED to limit current. A common calculation is R = (Vsupply − VLED)/ILED.';
    if(/not working|doesn.?t work|troubleshoot|fault|problem/.test(text))return 'For an electronics fault, check power and ground first, then component orientation, wiring/continuity, shorts, expected voltages, and signal waveforms. Use a multimeter carefully and power off before resistance/continuity tests.';

    for(const [key,val] of knowledge){if(text.includes(key))return val;}
    for(const [alias,key] of Object.entries(aliases)){if(text.includes(alias))return knowledge.find(x=>x[0]===key)?.[1]||'';}
    return null;
  }

  async function webElectronicsAnswer(question){
    // Public Wikipedia search is used only as a broad fallback. No API key is stored in the website.
    try{
      const url='https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+encodeURIComponent(question+' electronics')+'&srlimit=3&format=json&origin=*';
      const res=await fetch(url,{headers:{Accept:'application/json'}});
      if(!res.ok)throw new Error('search failed');
      const data=await res.json();
      const hit=data?.query?.search?.[0];
      if(!hit)return null;
      const title=hit.title;
      const summaryRes=await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title.replace(/ /g,'_')));
      if(!summaryRes.ok)return null;
      const summary=await summaryRes.json();
      if(!summary?.extract)return null;
      return `${summary.title}\n\n${summary.extract}\n\nSource: Wikipedia`;
    }catch(e){return null;}
  }

  async function answer(q){
    const local=localAnswer(q);
    if(local)return local;
    const broad=await webElectronicsAnswer(q);
    if(broad)return `I found a related electronics reference:\n\n${broad}`;
    return 'I could not find a reliable answer for that question right now. Try rephrasing it with the electronics topic, component, circuit, formula, or application you mean. For calculations, include the values and units.';
  }

  async function ask(){
    const q=input.value.trim(); if(!q)return;
    add(q,'user'); input.value=''; send.disabled=true; input.disabled=true;
    const typing=document.createElement('div'); typing.className='chat-msg bot'; typing.textContent='Thinking…'; messages.appendChild(typing); messages.scrollTop=messages.scrollHeight;
    try{typing.textContent=await answer(q);}catch(e){typing.textContent='Sorry, I could not process that question. Please try again.';}
    send.disabled=false; input.disabled=false; input.focus(); messages.scrollTop=messages.scrollHeight;
  }

  start.addEventListener('click',()=>{panel.classList.add('open');input.focus()});
  close?.addEventListener('click',()=>panel.classList.remove('open'));
  send.addEventListener('click',ask);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask()}});
});
