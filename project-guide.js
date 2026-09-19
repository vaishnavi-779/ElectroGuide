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
        <div class="detail-section-title"><span>02</span><h3>Components used & what each one does</h3></div>
        <div class="component-table">
          <div class="component-row component-head"><strong>Component</strong><strong>What it is used for</strong></div>
          ${list.map(c=>`<div class="component-row"><strong>${c}</strong><span>${componentUse(c)}</span></div>`).join("")}
        </div>
      </section>

      <section class="detail-section">
        <div class="detail-section-title"><span>03</span><h3>How to build it — step by step</h3></div>
        <ol class="build-steps">
          ${steps.map((s,i)=>`<li><span>${i+1}</span><div>${s}</div></li>`).join("")}
        </ol>
        <div class="project-specific">
          <strong>Project-specific wiring idea</strong>
          <p>${build}</p>
        </div>
      </section>

      <section class="detail-section two-col-detail">
        <div>
          <div class="detail-section-title"><span>04</span><h3>Test & troubleshoot</h3></div>
          <p>${test}</p>
          <ul class="check-list">
            <li>Check power and ground first.</li>
            <li>Check that every module has the correct supply voltage.</li>
            <li>Check sensor readings before checking the final output.</li>
            <li>If the output is wrong, test one block at a time.</li>
          </ul>
        </div>
        <div>
          <div class="detail-section-title"><span>05</span><h3>What you should see</h3></div>
          <p>When the project is working, changing the input condition should produce the expected output described in the project objective. Repeat the test several times so you know the result is reliable, not accidental.</p>
          <div class="result-note"><strong>Student tip:</strong> Take a photo of your circuit, record the sensor value and write down what happened. This makes debugging much easier.</div>
        </div>
      </section>

      <section class="detail-section safety-section">
        <div class="detail-section-title"><span>06</span><h3>Safety before you switch it on</h3></div>
        <p>Start with low-voltage battery or USB power whenever possible. Never connect a school prototype directly to mains electricity. Check polarity before powering the circuit, keep water away from electronics, and use a proper driver for motors, pumps, strips and other high-current loads.</p>
      </section>
    </div>`;
}
