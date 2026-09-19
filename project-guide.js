/*
  ElectroGuide Project Guide
  Builds a school-student-friendly detailed view for every project in PROJECTS.
  PROJECTS remains the source of the 60 project definitions.
*/

const COMPONENT_USES = {
  "LDR":"Detects light level by changing resistance when light changes.",
  "10kΩ resistor":"Provides a known resistance for a sensor divider or input bias.",
  "330Ω resistor":"Limits LED current so the LED is not damaged.",
  "220Ω resistor":"Limits LED current and protects the Arduino/ESP32 output.",
  "BC547/NPN transistor":"Acts as an electronic switch so a small sensor signal can control a larger LED/load current.",
  "5V supply":"Provides low-voltage power to the circuit.",
  "Arduino Nano":"Small microcontroller board that reads sensors and controls outputs.",
  "Arduino":"Microcontroller board used to read inputs, run the program and control outputs.",
  "ESP32":"Microcontroller with GPIO, ADC, Wi-Fi and Bluetooth for sensing and control.",
  "3 level probes":"Sense whether water has reached each height in the tank.",
  "3×10kΩ resistors":"Give the water-level inputs a defined logic state.",
  "3×220Ω resistors":"Limit current for the three level LEDs.",
  "LEDs":"Give a simple visual indication of a circuit state.",
  "buzzer":"Produces an audible warning or confirmation.",
  "Sound sensor":"Converts sound/claps into an electrical signal the controller can detect.",
  "TTP223 module":"Provides a touch-sensitive digital output.",
  "push button":"Provides a manual trigger for the project.",
  "6 LEDs":"Represent the six possible dice results.",
  "6×220Ω resistors":"Limit current for the six dice LEDs.",
  "8 LEDs":"Create the moving pattern in an LED chaser.",
  "8×220Ω resistors":"Limit current for the LED chaser outputs.",
  "red/yellow/green LEDs":"Represent the three traffic-light states.",
  "3×220Ω resistors":"Limit current for the traffic-light LEDs.",
  "2 IR break-beam sensors":"Detect the order in which a person crosses a doorway.",
  "OLED/LCD":"Displays counts, measurements and messages.",
  "100kΩ and 33kΩ divider":"Reduces battery voltage to a safe range for an MCU ADC.",
  "LM35":"Temperature sensor whose output voltage changes predictably with temperature.",
  "capacitive soil sensor":"Estimates soil moisture without exposed metal electrodes.",
  "temperature sensor":"Measures temperature for display or control.",
  "optional pump driver":"Switches a small pump without loading the microcontroller pin.",
  "buzzer":"Gives an audible watering/alarm indication.",
  "logic-level MOSFET":"Efficiently switches a higher-current low-voltage load from a microcontroller.",
  "LED strip":"Provides the controlled light output.",
  "resistor divider":"Converts a sensor resistance change into a measurable voltage.",
  "DC fan":"Moves air; its speed can be controlled using PWM through a suitable driver.",
  "diode":"Protects the switching transistor from inductive voltage spikes produced by a motor or coil.",
  "gate resistor":"Controls MOSFET gate charging and reduces switching transients.",
  "pulldown":"Keeps a MOSFET control input at a known OFF state during startup.",
  "DS18B20":"Digital temperature sensor that communicates with a microcontroller.",
  "rain sensor":"Detects wetness or rain for an educational alarm/control circuit.",
  "MQ-series module":"Provides an analog response to certain gases; useful for demonstrations, not certified safety detection.",
  "IR sensor":"Detects nearby objects or interruption of an infrared beam.",
  "7-segment display":"Shows numbers using seven individually controlled LED segments.",
  "HC-SR04":"Measures distance by sending an ultrasonic pulse and timing its echo.",
  "servo":"Moves to a commanded angle for lids, locks, valves or mechanisms.",
  "IR proximity sensor":"Detects a nearby hand/object without physical contact.",
  "small pump":"Moves sanitizer, water or another low-voltage liquid.",
  "MOSFET driver":"Lets a microcontroller safely switch a load that needs more current than a GPIO can supply.",
  "RC522":"RFID reader used to read RFID card/tag identifiers.",
  "servo":"Converts a control signal into controlled mechanical position.",
  "4×4 keypad":"Provides sixteen push-button inputs using a row/column matrix.",
  "BME280":"Measures temperature, humidity and atmospheric pressure.",
  "RTC":"Keeps accurate time for scheduled operations.",
  "microSD":"Stores measurements or event records.",
  "isolated/current-rated voltage and current sensors":"Measure electrical quantities while keeping the low-voltage controller separated from hazardous circuits.",
  "container":"Holds the material being dispensed.",
  "buttons/display":"Provide local user controls and status information.",
  "IR proximity sensor":"Detects a hand or object near the dispenser.",
  "motor driver":"Provides the current and direction control needed by motors.",
  "2 DC gear motors":"Provide the two independently controlled wheels of a robot.",
  "chassis":"Provides the mechanical frame for the robot.",
  "battery":"Provides portable electrical power.",
  "HC-05":"Bluetooth serial module for short-range wireless commands.",
  "TB6612FNG/L298N":"Motor driver that handles motor current and direction signals from the controller.",
  "MPU6050":"Measures acceleration and angular motion for gesture or orientation detection.",
  "Bluetooth/RF link":"Carries control commands wirelessly between devices.",
  "markers":"Give a robot recognizable locations or stations.",
  "3–5 servos":"Provide multiple controlled joints for a small robotic arm.",
  "joystick/potentiometers":"Provide manual position commands for servo movement.",
  "flame/temperature sensor":"Detects a heat or flame-like signal for an educational demonstration.",
  "mini fan":"Produces airflow for the demonstration.",
  "ESP32-CAM":"Captures images and can be used to estimate the position of a visual target.",
  "ultrasonic sensors":"Measure distances to obstacles or parking boundaries.",
  "Wi-Fi":"Provides network communication between the controller and a dashboard/service.",
  "MQTT":"Lightweight messaging protocol commonly used for IoT telemetry.",
  "low-voltage loads":"Safe prototype loads such as LEDs, small fans or small motors.",
  "magnetic reed switch":"Detects whether a door/window is open or closed.",
  "BLE":"Bluetooth Low Energy for short-range sensor data to a phone.",
  "LoRa/nRF24 module":"Provides longer-range or low-power wireless communication depending on the module.",
  "battery-powered remote sensor":"Runs measurements away from the main receiver.",
  "small solar panel":"Provides the energy source for the MPPT experiment.",
  "buck converter":"Changes DC voltage efficiently while allowing control of the load seen by a solar panel.",
  "voltage/current sensors":"Measure electrical input/output so power can be calculated.",
  "load":"Consumes the generated electrical power.",
  "battery monitor/ADC":"Measures battery parameters so the controller can detect abnormal conditions.",
  "current sensor":"Measures load current without requiring the controller to carry the motor current.",
  "thermistor":"Measures temperature through a resistance change.",
  "power MOSFET":"Controls load current efficiently in a power stage.",
  "op-amp":"Amplifies or compares signals and can form the feedback controller in an electronic load.",
  "current-sense resistor":"Creates a small measurable voltage proportional to load current.",
  "heat sink":"Moves heat away from a power semiconductor.",
  "fan":"Removes heat from a power stage.",
  "MCU/DDS module":"Generates accurately timed digital waveforms or frequency settings.",
  "DAC/PWM filter":"Turns digital values/PWM into an approximate analog waveform.",
  "op-amp buffer":"Drives the signal into the intended load without heavily loading the waveform source.",
  "encoder":"Provides a convenient knob/input for changing settings.",
  "input divider/protection":"Scales and protects an ADC input from a higher external voltage.",
  "ADC":"Converts an analog voltage into a digital number.",
  "display or USB serial":"Shows sampled waveform data to the user.",
  "DC source":"Provides input power for a low-voltage power converter.",
  "encoder":"Lets the user adjust voltage/current settings.",
  "accelerometer":"Measures vibration and movement.",
  "SD card":"Stores measurement data for later analysis.",
  "RGB LED":"Provides a simple multi-state visual status indicator.",
  "5V regulator":"Creates a stable supply rail for low-voltage electronics.",
  "decoupling capacitors":"Supply short bursts of current locally and reduce supply noise near ICs.",
  "buttons":"Provide manual control inputs.",
  "sensors":"Provide information about the physical process being controlled.",
  "MOSFET/relay drivers":"Allow the MCU to control loads safely without driving them directly.",
  "isolated I/O modules":"Provide electrical separation between the controller and external signals."
};

function componentUse(name){
  const n=String(name).trim();
  if(COMPONENT_USES[n]) return COMPONENT_USES[n];

  const key=n.toLowerCase();
  const patterns=[
    [/arduino|esp32|stm32|nrf52|mcu/, "Runs the program, reads inputs, performs calculations and controls the project's outputs."],
    [/resistor/, "Sets or limits electrical current/voltage and helps create the required signal level."],
    [/capacitor/, "Stores a small amount of electrical energy and helps filter or stabilize the supply/signal."],
    [/led/, "Provides a visual indication of the current state."],
    [/oled|lcd|display/, "Shows measurements, status messages or user settings."],
    [/buzzer/, "Provides an audible indication or alarm."],
    [/sensor/, "Detects a physical condition and converts it into an electrical signal."],
    [/motor/, "Converts electrical energy into mechanical rotation or movement."],
    [/servo/, "Moves a mechanism to a commanded position."],
    [/pump/, "Moves liquid when the controller activates it."],
    [/mosfet|transistor/, "Works as an electronic switch so the controller can control a higher-current load."],
    [/relay/, "Electrically switches another circuit; use suitable isolation and ratings."],
    [/battery|supply|source/, "Provides electrical power to the project."],
    [/wireless|wifi|bluetooth|ble|rf|lora|mqtt/, "Carries information wirelessly between the project and another device."],
    [/driver/, "Provides the current/voltage drive needed by a load while keeping the MCU output lightly loaded."],
    [/op-amp/, "Amplifies, buffers or compares analog signals as required by the circuit."],
    [/diode/, "Provides one-way current flow or protects against inductive voltage spikes."],
    [/chassis|container/, "Provides the physical structure or holds the material used by the project."],
    [/joystick|button|keypad|encoder/, "Provides a manual command or setting from the user."]
  ];
  for(const [re,desc] of patterns) if(re.test(key)) return desc;
  return "This part provides the electrical, mechanical or sensing function described by its name; check its exact datasheet for ratings and pin connections.";
}

function splitComponents(raw){
  return String(raw||"").split(/,\s*/).map(x=>x.trim()).filter(Boolean);
}

function makeDetailedSteps(project){
  const title=project[2], build=project[5], test=project[6];
  const comps=splitComponents(project[4]);
  const steps=[
    `Understand the goal. In “${title}”, the controller/sensor circuit observes an input, makes a decision and produces the required output.`,
    `Collect the parts. Put the components on the table and identify each part before connecting power. Use the component list below to understand what every part is doing.`,
    `Build the power section first. Connect the correct supply and common ground. Do not power the circuit yet if you are unsure about a connection.`,
    `Connect the input section. Wire the sensor, button or communication module to the controller according to the module's pin labels and voltage requirements.`,
    `Connect the output section. LEDs need current-limiting resistors; motors, pumps and other higher-current loads must use an appropriate driver rather than a microcontroller GPIO directly.`,
    `Program the controller. The basic program should read the input, apply the project's decision rule and then control the output. Upload and open Serial Monitor if your board supports it.`,
    `Build the first working test. Start with the simplest condition: one sensor reading and one output. Confirm that the controller reacts before adding extra features.`,
    `Calibrate it. Adjust thresholds, timing or sensor offsets using real measurements instead of guessing values.`,
    `Finish the enclosure/mechanical part. Secure wires, keep liquids away from electronics, and make sure moving parts cannot hit people or wires.`
  ];
  return steps;
}

function projectMeta(project){
  const level=project[1], text=(project[4]+' '+project[5]).toLowerCase();
  let difficulty=level==='BEGINNER'?'Easy':level==='ANALOG & SENSORS'?'Easy–Moderate':level==='ARDUINO & EMBEDDED'?'Moderate':level==='ROBOTICS'?'Moderate':'Advanced';
  let time=level==='BEGINNER'?'2–4 hours':level==='ANALOG & SENSORS'?'3–5 hours':level==='ARDUINO & EMBEDDED'?'4–8 hours':level==='ROBOTICS'?'6–12 hours':'8–20 hours';
  let cost=level==='BEGINNER'?'₹300–₹800':level==='ANALOG & SENSORS'?'₹500–₹1,500':level==='ARDUINO & EMBEDDED'?'₹800–₹2,500':level==='ROBOTICS'?'₹1,500–₹4,000':'₹1,500–₹5,000';
  if(/esp32|wifi|bluetooth|lora|rf|mqtt/.test(text)) cost=level==='ADVANCED'?'₹2,000–₹6,000':'₹1,000–₹3,000';
  if(/servo|motor|pump|fan/.test(text)) time='4–10 hours';
  return {difficulty,time,cost};
}

function wiringGuide(project){
  const t=(project[4]+' '+project[5]).toLowerCase(), lines=[];
  if(/arduino/.test(t)) lines.push('Controller: use the Arduino as the main controller and connect every module GND to Arduino GND.');
  if(/esp32/.test(t)) lines.push('Controller: use the ESP32 as the main controller. Check module logic voltage before connecting signals.');
  if(/ldr/.test(t)) lines.push('Sensor: make the LDR part of a voltage divider and connect the divider output to an analog input.');
  if(/lm35|ds18b20|bme280|temperature/.test(t)) lines.push('Temperature sensor: connect power and ground first, then connect its signal/data pin to the required controller input.');
  if(/hc-sr04|ultrasonic/.test(t)) lines.push('Distance sensor: connect VCC/GND, TRIG to a digital output and ECHO to an input. With a 3.3 V controller, use level shifting where required.');
  if(/led/.test(t)) lines.push('LED: connect it through a current-limiting resistor. Verify polarity before powering.');
  if(/buzzer/.test(t)) lines.push('Buzzer: use a transistor/driver if it needs more current than a GPIO can safely provide.');
  if(/motor|pump|fan|led strip/.test(t)) lines.push('Load: never power a motor, pump, fan or LED strip directly from an MCU GPIO. Use a suitable MOSFET or motor driver and appropriate supply.');
  if(/servo/.test(t)) lines.push('Servo: use a suitable supply, connect signal to the controller and share ground. Avoid drawing high servo current through the MCU regulator.');
  if(/rc522|rfid/.test(t)) lines.push('RFID: follow the reader SPI pin labels and verify its voltage before wiring.');
  if(/hc-05|bluetooth|ble/.test(t)) lines.push('Wireless module: connect the correct power and serial/BLE interface and verify logic-level compatibility.');
  if(/bme280/.test(t)) lines.push('BME280: normally use I²C with SDA and SCL connected to the controller I²C pins.');
  if(/mosfet|relay/.test(t)) lines.push('Driver stage: the controller drives the control input; load current must flow through the driver, not through the GPIO.');
  if(!lines.length) lines.push('Connect power and ground first, then inputs, then outputs. Verify every connection before switching on.');
  return lines;
}

function starterCode(project){
  const title=project[2], t=(project[4]+' '+project[5]).toLowerCase();
  let code='// ElectroGuide starter program for: '+title+'\nvoid setup() {\n  Serial.begin(115200);\n  // Set input pins as INPUT and output pins as OUTPUT.\n}\n\nvoid loop() {\n  // 1. Read the sensor/button/communication input.\n  // 2. Apply the decision described in the project guide.\n  // 3. Control the output.\n  // 4. Print useful readings while testing.\n  delay(100);\n}';
  if(/arduino|esp32/.test(t) && /led/.test(t)) code='// Simple starting point for '+title+'\nconst int LED_PIN = 2;       // Change to your actual LED pin\nconst int INPUT_PIN = 4;     // Change to your actual input pin\n\nvoid setup() {\n  Serial.begin(115200);\n  pinMode(LED_PIN, OUTPUT);\n  pinMode(INPUT_PIN, INPUT);\n}\n\nvoid loop() {\n  int value = digitalRead(INPUT_PIN);\n  Serial.println(value);\n  digitalWrite(LED_PIN, value ? HIGH : LOW);\n  delay(100);\n}';
  if(/ldr|lm35|soil|rain|gas|sensor/.test(t)) code='// Sensor-reading starter for '+title+'\nconst int SENSOR_PIN = 34;   // Example ADC pin; change for your board\n\nvoid setup() {\n  Serial.begin(115200);\n}\n\nvoid loop() {\n  int raw = analogRead(SENSOR_PIN);\n  Serial.println(raw);\n  delay(500);\n}\n// Record normal minimum/maximum values first.\n// Then choose a threshold from your measurements.';
  return code;
}

function projectScience(project){
  const t=(project[4]+' '+project[5]).toLowerCase();
  if(/ldr|light|street light/.test(t)) return 'Light changes the sensor electrical value. The controller measures that change and decides when the output should turn on.';
  if(/temperature|lm35|ds18b20|bme280|therm/.test(t)) return 'Temperature is converted into an electrical or digital measurement. The controller compares that measurement with a limit or displays it.';
  if(/motor|robot|servo/.test(t)) return 'The controller normally cannot supply motor power directly. It sends control signals to a driver, which supplies the current needed by the motor.';
  if(/wifi|bluetooth|ble|lora|rf|mqtt/.test(t)) return 'Sensor data is converted into digital information, packaged as messages and transmitted through the selected wireless technology.';
  if(/ultrasonic/.test(t)) return 'The sensor measures the time taken for sound to travel to an object and return. Distance is estimated from that travel time.';
  if(/rfid/.test(t)) return 'The reader creates a radio-frequency field and exchanges data with a nearby tag. The controller then decides whether the tag is accepted.';
  if(/solar|mppt/.test(t)) return 'Solar power depends on voltage and current. MPPT searches for an operating point that produces more electrical power.';
  return 'This project demonstrates the engineering loop: sense or receive information, process it using a circuit or controller, and produce a useful output.';
}

function renderProjectDetail(project){
  const [num,level,title,description,components,build,test]=project;
  const list=splitComponents(components);
  const steps=makeDetailedSteps(project);

  return `
    <div class="project-detail-inner">
      <div class="project-detail-top">
        <div>
          <span class="detail-level">${level}</span>
          <h2>${title}</h2>
          <p class="detail-lead">${description}</p>
        </div>
        <button class="project-close" id="projectClose" aria-label="Close project guide">Close</button>
      </div>

      <section class="detail-section">
        <div class="detail-section-title"><span>01</span><h3>What this project does</h3></div>
        <p>${description} The idea is to make the electronics do one clear job: <strong>${build}</strong></p>
        <div class="working-box">
          <strong>In simple words</strong>
          <p>The input is sensed first. The controller or circuit then decides what should happen. Finally, the output device shows the result or performs the action. Build and test these three parts one at a time instead of trying to build everything at once.</p>
        </div>
      </section>

      <section class="detail-section">
        <div class="detail-section-title"><span>02</span><h3>Project at a glance</h3></div>
        <div class="project-meta-grid"><div><small>Difficulty</small><strong>${projectMeta(project).difficulty}</strong></div><div><small>Typical build time</small><strong>${projectMeta(project).time}</strong></div><div><small>Approx. student budget</small><strong>${projectMeta(project).cost}</strong></div></div>
        <div class="science-box"><strong>What you learn</strong><p>${projectScience(project)}</p></div>
      </section>

      <section class="detail-section">
        <div class="detail-section-title"><span>03</span><h3>Components used & what each one does</h3></div>
        <div class="component-table">
          <div class="component-row component-head"><strong>Component</strong><strong>What it is used for</strong></div>
          ${list.map(c=>`<div class="component-row"><strong>${c}</strong><span>${componentUse(c)}</span></div>`).join("")}
        </div>
      </section>

      <section class="detail-section">
        <div class="detail-section-title"><span>04</span><h3>Wiring guide</h3></div>
        <p>Follow this order instead of connecting everything at once:</p>
        <ol class="wiring-list">${wiringGuide(project).map((x,i)=>`<li><span>${i+1}</span>${x}</li>`).join("")}</ol>
        <div class="science-box"><strong>Before powering on</strong><p>Check VCC, GND, polarity and signal pins twice. High-current loads need a proper driver and suitable supply.</p></div>
      </section>

      <section class="detail-section">
        <div class="detail-section-title"><span>05</span><h3>How to build it — step by step</h3></div>
        <ol class="build-steps">
          ${steps.map((s,i)=>`<li><span>${i+1}</span><div>${s}</div></li>`).join("")}
        </ol>
        <div class="project-specific">
          <strong>Project-specific wiring idea</strong>
          <p>${build}</p>
        </div>
      </section>

      <section class="detail-section">
        <div class="detail-section-title"><span>06</span><h3>Starter code</h3></div>
        <p>This is a starting template. Change the pin numbers to match your actual board and module, then add the project logic step by step.</p>
        <pre class="project-code"><code>${starterCode(project)}</code></pre>
        <p><strong>Upload:</strong> Arduino IDE → select board → select COM port → paste code → compile → upload → open Serial Monitor at 115200 baud.</p>
      </section>

      <section class="detail-section two-col-detail">
        <div>
          <div class="detail-section-title"><span>07</span><h3>Test & troubleshoot</h3></div>
          <p>${test}</p>
          <ul class="check-list">
            <li>Check power and ground first.</li>
            <li>Check that every module has the correct supply voltage.</li>
            <li>Check sensor readings before checking the final output.</li>
            <li>If the output is wrong, test one block at a time.</li>
          </ul>
        </div>
        <div>
          <div class="detail-section-title"><span>08</span><h3>What you should see</h3></div>
          <p>When the project is working, changing the input condition should produce the expected output described in the project objective. Repeat the test several times so you know the result is reliable, not accidental.</p>
          <div class="result-note"><strong>Student tip:</strong> Take a photo of your circuit, record the sensor value and write down what happened. This makes debugging much easier.</div>
        </div>
      </section>

      <section class="detail-section safety-section">
        <div class="detail-section-title"><span>09</span><h3>Safety before you switch it on</h3></div>
        <p>Start with low-voltage battery or USB power whenever possible. Never connect a school prototype directly to mains electricity. Check polarity before powering the circuit, keep water away from electronics, and use a proper driver for motors, pumps, strips and other high-current loads.</p>
      </section>
    </div>`;
}


const PROJECT_LONG_DESCRIPTIONS = {
  "10": "Build a temperature alarm that continuously reads an LM35 and sounds a buzzer when the temperature crosses a chosen limit. You will learn analog sensor conversion, threshold comparison, averaging and how to separate sensing logic from the alarm output.",
  "11": "Make a smart plant monitor that measures soil moisture and temperature and displays the plant condition. You can extend it with a small low-voltage pump so the system demonstrates sensing, calibration, automatic decisions, hysteresis and basic closed-loop irrigation.",
  "12": "Build a low-voltage automatic street-light model that turns an LED strip on when the environment becomes dark. The project combines an LDR, analog measurement, a MOSFET power switch and hysteresis so the light does not rapidly flicker around the threshold.",
  "13": "Create an LDR-based security alarm that watches a beam of light and detects when the brightness suddenly changes. It demonstrates baseline measurement, filtering, threshold selection and alarm generation without requiring complicated hardware.",
  "14": "Build a temperature-controlled fan whose speed increases as the measured temperature rises. The project teaches analog-to-digital conversion, PWM control, MOSFET switching and why motors need a separate power path and protection diode.",
  "15": "Create a digital thermometer that measures temperature continuously and displays the result on an OLED or LCD. You can compare the readings with a reference thermometer and calculate measurement error, making the project useful for learning calibration and sensor accuracy.",
  "16": "Build a rain detector that senses wetness and activates an LED or buzzer. It introduces analog sensor thresholds and practical environmental sensing while also teaching why water must be kept away from exposed electronics and why a prototype should use safe low voltage.",
  "17": "Create an educational gas-sensing demonstrator using an MQ-series module and a microcontroller. The system establishes a baseline, observes changes in the sensor output and gives an alert when a calibrated threshold is exceeded; it is for learning, not certified safety protection.",
  "18": "Build a heat or fire-warning demonstration that watches temperature and raises an alarm when an abnormal condition is detected. You will learn threshold logic, rate-of-rise ideas, sensor filtering and the difference between an educational prototype and certified safety equipment.",
  "19": "Create an automatic soil-moisture controller that starts a small pump when the soil becomes dry and stops it after the moisture level recovers. The project teaches sensor calibration, hysteresis, timed control, MOSFET or relay driving and safe separation of water from electronics.",
  "20": "Build an IR object counter that counts objects passing a fixed sensing point and shows the total on a display. This is a useful introduction to edge detection, debounce, timing windows and reliable counting when several objects arrive close together.",
  "21": "Make a smart dustbin that opens its lid when a hand approaches. An ultrasonic sensor measures distance and a servo moves the lid, giving you practical experience with distance measurement, servo control, timing and mechanical-electrical integration.",
  "22": "Build a touch-free sanitizer dispenser using an IR proximity sensor and a small pump. When a hand is detected, the controller runs the pump for a controlled pulse and then waits before accepting another request, demonstrating automation and load switching.",
  "23": "Create a smart parking indicator that monitors several parking spaces and shows which bays are occupied. Ultrasonic sensors provide distance information while LEDs and an OLED provide status, teaching multi-sensor processing and simple real-time dashboards.",
  "24": "Build a low-voltage RFID door-lock demonstrator that recognizes an authorized RFID card and moves a servo when the card is accepted. The project introduces SPI communication, unique identifiers, access-control logic, timed outputs and the importance of protecting credentials.",
  "25": "Create a keypad-controlled electronic lock where a user enters a password before the servo opens the mechanism. You will learn matrix keypad scanning, string or code comparison, retry limits, user feedback and basic embedded security concepts.",
  "26": "Build a compact weather station using an ESP32 and BME280 to measure temperature, humidity and pressure. An OLED can display the readings locally while an RTC or microSD card can be added for timestamped data logging.",
  "27": "Create a safe educational energy monitor that samples appropriately isolated or current-rated voltage and current sensors, estimates power and accumulates energy over time. The project teaches sampling, multiplication of measured quantities, calibration and why mains measurements require certified isolation and protection.",
  "28": "Build an automatic pet feeder that releases a measured portion at scheduled times. An RTC controls the schedule, a servo moves the dispensing mechanism and buttons or a display can provide manual control, making this a good lesson in timing and electromechanical design.",
  "29": "Create a motion-based light controller that uses a PIR sensor to detect movement and turns a low-voltage lamp on for a configurable period. You will learn event-driven logic, timers, retrigger behavior and safe switching of a load through a driver.",
  "30": "Build an RFID-based classroom attendance demonstrator that identifies cards, records timestamps and prevents duplicate entries. With an ESP32, you can extend it with Wi-Fi or storage, while also learning about data privacy and responsible handling of personal information.",
  "31": "Build a line-following robot that uses an IR sensor array to detect a contrasting track and continuously correct its direction. The project introduces motor drivers, PWM, sensor error calculation and proportional or PID control in a very visual way.",
  "32": "Create an obstacle-avoiding robot that measures the distance in front of it and chooses a clear direction when an obstacle appears. A servo can sweep the ultrasonic sensor so the robot compares multiple directions before turning.",
  "33": "Build a Bluetooth-controlled robot car that receives commands from a phone and translates them into forward, reverse, left, right and stop actions. It teaches serial communication, motor-driver control, PWM speed control and communication timeouts.",
  "34": "Create a gesture-controlled robot using an MPU6050 to detect hand tilt or movement. The controller classifies the gesture, sends a wireless command and drives the robot, combining motion sensing, communication and robotics into one project.",
  "35": "Design an automatic delivery robot that travels between simple marked stations, stops for a delivery action and then continues. This project introduces state machines, sensor-based navigation, station detection and the importance of testing autonomous behavior one state at a time.",
  "36": "Build a maze-solving robot that follows a line maze, recognizes junctions and remembers turns. Start with sensor calibration and motor balancing, then implement a simple strategy such as the left-hand rule to understand how robots make navigation decisions.",
  "37": "Create a small robotic arm controlled by joysticks or potentiometers. Each input maps to a servo position, allowing you to learn coordinate-like control, software angle limits, external servo power and programmed motion sequences.",
  "38": "Build an educational fire-fighting robot that searches for a small heat or flame-like signal and activates a fan when it reaches the target. The project combines sensing, directional search, motor control and actuator control, but should never be treated as real fire-suppression equipment.",
  "39": "Create an object-tracking robot that estimates where a target is relative to the robot and steers toward it. An ESP32-CAM or sensor array can provide the target position, while proportional steering converts the tracking error into motor commands.",
  "40": "Build an autonomous parking robot that detects a suitable space and performs a simple parking maneuver. Ultrasonic sensors provide the distances while a state machine coordinates forward motion, turning, alignment and stopping at low speed.",
  "41": "Create an IoT temperature monitor that reads a sensor on an ESP32 and publishes measurements over Wi-Fi. A web dashboard or MQTT client can display the data, making this a practical introduction to connected sensing, networking and reconnect handling.",
  "42": "Build a Wi-Fi home-automation demonstrator that controls safe low-voltage loads from a browser. The ESP32 provides the web interface and output control while the project teaches safe startup states, network commands and the difference between prototype loads and mains appliances.",
  "43": "Create a connected energy-monitoring system that measures appropriately isolated voltage and current, calculates power and sends trends over Wi-Fi. You will learn calibration, sampling, energy integration and how measured data can be turned into useful visual information.",
  "44": "Build a battery-powered wireless sensor node that wakes, measures environmental conditions, transmits a packet and returns to sleep. This project introduces low-power design, wireless packets, acknowledgements, battery budgeting and the trade-off between measurement frequency and battery life.",
  "45": "Create an IoT water-tank monitor that measures the distance to the water surface and converts it into a level percentage. The ESP32 can display the level locally and send alerts remotely, teaching sensor calibration, geometry and connected monitoring.",
  "46": "Build a Wi-Fi security-system demonstrator using PIR and magnetic reed sensors. The controller combines events into an alarm state, activates local indicators and can send a network notification while teaching authentication and safe default behavior.",
  "47": "Create a Bluetooth Low Energy sensor monitor that sends measurements from an ESP32 to a phone. You will learn how sensor data is represented as digital characteristics, how BLE reduces power compared with traditional connections and how to build a simple mobile-readable telemetry link.",
  "48": "Build a wireless weather station with a remote sensor node and an indoor receiver. The remote ESP32 or LoRa node measures weather data and transmits packets, while the receiver validates them and displays the latest readings with stale-data detection.",
  "49": "Create a remote low-voltage appliance controller that accepts a network command, switches a load and reports feedback. The project goes beyond simple ON/OFF control by adding acknowledgement, fault reporting, timeout behavior and a safe default state.",
  "50": "Build an IoT plant-monitoring and irrigation system that combines soil moisture, light and temperature measurements with automatic watering. The ESP32 sends telemetry while a driver controls a small pump, giving you a complete example of sensing, networking and closed-loop control.",
  "51": "Build a low-voltage solar MPPT demonstrator to explore how a solar panel produces different amounts of power at different operating points. By measuring voltage and current and adjusting a converter, you can implement a simple perturb-and-observe algorithm and study the maximum-power region.",
  "52": "Create a battery-monitoring system that measures voltage, current and temperature and displays or logs the results. The project is intended for safe educational monitoring with protected cells or a certified BMS; it teaches measurement, limits, fault detection and the importance of proper battery protection.",
  "53": "Build a programmable mini electronic load that draws a controlled current from a low-voltage DC source. An op-amp and MOSFET form the control loop, a sense resistor measures current and a microcontroller can set the target while monitoring heat and power.",
  "54": "Create a portable signal generator capable of producing adjustable test waveforms. A DDS or MCU-based source generates the signal, an output stage buffers it and an encoder/display provides user control, giving you hands-on experience with frequency, amplitude and waveform verification.",
  "55": "Build a low-speed digital oscilloscope interface that samples an analog signal, stores a short buffer and displays the waveform. You will learn ADC sampling, trigger detection, voltage scaling, basic signal processing and why input protection is essential.",
  "56": "Create a digitally controlled low-voltage DC power-supply demonstrator using a proven buck-converter stage. The MCU reads voltage and current feedback, lets the user set targets and implements current, thermal and fault limits while an encoder and display provide the interface.",
  "57": "Build a motor-condition monitor that observes vibration and current while a small DC motor runs. By recording healthy baseline data and calculating features such as RMS or peak values, you can experiment with detecting changes that may indicate a developing fault.",
  "58": "Create a vibration fault detector that samples a MEMS accelerometer and compares machine behavior with a healthy baseline. You can begin with RMS and peak measurements and later add FFT-based frequency analysis to understand how vibration signatures reveal mechanical changes.",
  "59": "Design a compact PCB environmental monitor containing an ESP32, environmental sensor, light sensor, status LED and regulated power section. The project takes you from schematic and component placement through PCB routing, assembly, testing, decoupling and calibration.",
  "60": "Build a small PLC-style industrial automation controller for low-voltage educational experiments. It combines sensor inputs, buttons, driver outputs, indicators, an OLED and automatic/manual state machines with timers and interlocks, teaching the structure of real control systems without connecting to dangerous machinery.",
  "01": "Build a simple automatic lighting system that senses the surrounding brightness and switches an LED on when the room becomes dark. This project introduces LDR sensing, voltage dividers, transistor switching and the basic idea behind automatic street and night-light systems.",
  "02": "Create a three-level water indicator that tells you whether a tank is low, medium or full using simple probes and LEDs. It teaches digital inputs, level sensing, threshold decisions and how a microcontroller can turn physical conditions into an easy-to-read display.",
  "03": "Make a clap-controlled switch that listens for a sharp sound and toggles an LED. You will learn how microphone modules produce electrical signals, how software detects an event, and why debounce and timing are needed to avoid false triggers.",
  "04": "Build a touch-sensitive switch using a TTP223 touch module and an Arduino. Instead of a mechanical button, a finger touch becomes the input, giving you a simple introduction to capacitive touch sensing, digital signals and user interfaces.",
  "05": "Create an electronic dice that produces a random number from 1 to 6 when a button is pressed. Six LEDs represent the result, making this a practical way to learn buttons, random-number generation, LED outputs and simple embedded logic.",
  "06": "Build an eight-LED chaser where the LEDs light one after another to create a moving pattern. You will practice digital outputs, timing delays, arrays or loops, current-limiting resistors and basic pattern generation.",
  "07": "Design a miniature traffic-light controller with red, yellow and green LEDs and an optional pedestrian button. The project introduces state machines, timed sequences, safe startup behavior and the same control logic used in larger automated systems.",
  "08": "Build a digital visitor counter for a doorway using two IR break-beam sensors. By checking which sensor is interrupted first, the controller can estimate whether someone entered or left and show the count on an OLED or LCD.",
  "09": "Create a battery-level indicator that measures a battery through a resistor divider and converts the ADC reading into an approximate voltage and percentage. This teaches voltage scaling, ADC limits, calibration and safe measurement of a higher voltage with a microcontroller."
};

function projectLongDescription(project){ return PROJECT_LONG_DESCRIPTIONS[project[0]] || project[3]; }
