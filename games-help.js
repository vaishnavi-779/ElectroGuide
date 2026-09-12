(() => {
  const app = document.getElementById('games-app');
  if (!app) return;

  const help = {
    'Circuit Builder': {
      goal: 'Build the electrical path shown on the board and make the circuit pass its test.',
      steps: ['Read the Level Mission first.', 'Click one yellow terminal, then click the terminal you want to connect it to.', 'Build the required path in the correct order: source → switch → resistor → LED → return/ground.', 'When you have enough correct connections, press TEST CIRCUIT.'],
      rules: ['Only one wire is created between a pair of terminals.', 'Do not skip the required components in the path.', 'You need the minimum number of correct connections shown by the mission.', 'Complete a level to unlock the next level and earn XP.'],
      tip: 'Think like a real circuit: current needs a continuous path from the source and back.'
    },
    'LED Safety Lab': {
      goal: 'Choose the resistor value required for the level so the LED is driven safely.',
      steps: ['Read the target resistor value shown in the mission.', 'Select a resistor value from the buttons.', 'Look at the calculated LED current.', 'Press APPLY POWER to test your choice.'],
      rules: ['The target resistor must match the level exactly.', 'A resistor is required to limit LED current in this basic circuit.', 'Do not assume a smaller resistor is always better; too much current can damage an LED.', 'Complete the level to unlock the next challenge.'],
      tip: 'Use Ohm’s law: R = (Vsupply − VLED) / ILED.'
    },
    'Faulty Circuit Repair': {
      goal: 'Find the open connection and restore continuity between the fault terminals.',
      steps: ['Inspect the circuit and find the dashed/open trace.', 'Click the first yellow fault terminal.', 'Click the second yellow fault terminal to repair the connection.', 'Press TEST REPAIR.'],
      rules: ['Connect the actual fault terminals; random connections do not count.', 'Do not remove working parts of the circuit.', 'The repair must create continuity between the source and load.', 'Higher levels may require more diagnostic checks.'],
      tip: 'Troubleshoot systematically: source → connection → component → connection → load.'
    },
    'Power Supply Builder': {
      goal: 'Connect every power-supply stage in the correct sequence.',
      steps: ['Start at AC SOURCE.', 'Connect each stage to the next stage: rectifier → filter capacitor → regulator → load.', 'Click the two terminals for each adjacent stage.', 'Press RUN TEST when the complete chain is connected.'],
      rules: ['Stages must be connected left-to-right.', 'Every required stage-to-stage connection must exist.', 'Do not bypass the rectifier, filter or regulator.', 'Higher levels increase the challenge while keeping the same learning principle.'],
      tip: 'A typical DC supply converts AC, rectifies it, smooths it, regulates it and then feeds the load.'
    },
    'Digital Logic Builder': {
      goal: 'Set the digital inputs and gate so the circuit produces the required logic output.',
      steps: ['Read the target gate and input/output condition.', 'Toggle input A and input B as required.', 'Select the requested logic gate.', 'Run the test and compare the output with the target.'],
      rules: ['Use only the available digital inputs and gate controls.', 'Remember that 0 = LOW and 1 = HIGH.', 'The output must match the required truth-table result.', 'Levels progress from basic gates toward more complex logic.'],
      tip: 'AND needs all inputs HIGH; OR needs at least one HIGH; XOR is HIGH when the inputs are different.'
    },
    'Arduino Wiring Lab': {
      goal: 'Wire the Arduino project correctly so the required device can be controlled or read.',
      steps: ['Read which component must be connected.', 'Connect signal, power and ground to the appropriate Arduino pins shown in the challenge.', 'Check that inputs and outputs are not swapped.', 'Run the wiring test.'],
      rules: ['Use the pin assignments specified by the level.', 'Power and ground connections matter as much as signal connections.', 'Do not short power to ground.', 'Complete the level to unlock the next wiring task.'],
      tip: 'Before debugging code, verify VCC, GND and signal wiring first.'
    },
    'Communication Lab': {
      goal: 'Create a complete transmitter-to-receiver signal chain.',
      steps: ['Start at SIGNAL.', 'Connect each adjacent block: modulator → channel → demodulator → output.', 'Make sure no stage is skipped.', 'Press RUN TEST.'],
      rules: ['All adjacent stages must be connected.', 'Keep the signal direction from left to right.', 'A broken or skipped stage makes the communication chain incomplete.', 'Later levels increase the required understanding of the signal path.'],
      tip: 'A communication system generally has a source, transmitter, channel, receiver and destination.'
    },
    'Virtual Multimeter': {
      goal: 'Use the correct meter mode and probe placement for the measurement requested.',
      steps: ['Read the target measurement: voltage, current or resistance.', 'Select the matching meter mode.', 'Choose the correct probe arrangement: voltage is measured across a component; current is measured through a circuit path.', 'Run the measurement test.'],
      rules: ['Voltage is measured in parallel.', 'Current is measured in series.', 'Resistance should normally be measured with power removed from the circuit.', 'Never use the current mode directly across a powered voltage source in real hardware.'],
      tip: 'Always ask: “Am I measuring across something or through something?”'
    },
    'Oscilloscope Lab': {
      goal: 'Set the waveform measurement parameters correctly and stabilize the oscilloscope display.',
      steps: ['Read the required frequency, amplitude and waveform.', 'Choose the matching settings.', 'Check the waveform on the scope.', 'Run the test.'],
      rules: ['Frequency is measured in hertz.', 'Amplitude describes signal magnitude.', 'The waveform type must match the level requirement.', 'Higher levels may use different frequency and amplitude combinations.'],
      tip: 'Use time/div to see several cycles and voltage/div to fit the waveform vertically.'
    },
    'PCB Troubleshooter': {
      goal: 'Inspect the board clues and identify the faulty component or connection.',
      steps: ['Read the fault description carefully.', 'Inspect the component choices and board symptoms.', 'Select the part most likely responsible for the fault.', 'Run the diagnostic test.'],
      rules: ['Use the symptoms as evidence rather than guessing.', 'A correct diagnosis is required to complete the level.', 'Learn the relationship between common failures and symptoms.', 'Higher levels may contain more possible faults.'],
      tip: 'Check power first, then ground, connections, component orientation and finally the component itself.'
    }
  };

  function currentTitle() {
    const h = app.querySelector('.lab-head h2');
    if (!h) return '';
    return h.textContent.replace(/^\S+\s+/, '').trim();
  }

  function addHelp() {
    const lab = app.querySelector('.lab');
    if (!lab || lab.querySelector('.game-instructions')) return;
    const title = currentTitle();
    const data = help[title];
    if (!data) return;

    const box = document.createElement('details');
    box.className = 'game-instructions';
    box.innerHTML = `<summary>📖 How to Play & Rules</summary><div class="instructions-body"><div class="instruction-section"><h3>🎯 Goal</h3><p>${data.goal}</p></div><div class="instruction-section"><h3>▶ How to Play</h3><ol>${data.steps.map(x => `<li>${x}</li>`).join('')}</ol></div><div class="instruction-section"><h3>📜 Rules & Regulations</h3><ul>${data.rules.map(x => `<li>${x}</li>`).join('')}</ul></div><div class="instruction-tip"><b>💡 Tip:</b> ${data.tip}</div></div>`;
    const head = lab.querySelector('.lab-head');
    head?.insertAdjacentElement('afterend', box);
  }

  addHelp();
  new MutationObserver(addHelp).observe(app, { childList: true, subtree: true });
})();
