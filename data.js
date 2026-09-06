// ElectroGuide structured component data and search index.
// Detailed records can be expanded here without changing the page layout.

const electroGuideDetails = {
    "arduino-uno": {
        name: "Arduino Uno R3",
        category: "Microcontrollers",
        description: "A beginner-friendly development board based on the ATmega328P microcontroller, widely used for learning embedded systems, sensors, automation and robotics.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg",
        facts: [
            ["Microcontroller", "ATmega328P"],
            ["Operating Voltage", "5 V"],
            ["Digital I/O", "14 pins"],
            ["Analog Inputs", "6"],
            ["PWM Pins", "6"],
            ["Clock", "16 MHz"],
            ["Flash Memory", "32 KB"],
            ["SRAM", "2 KB"],
            ["EEPROM", "1 KB"]
        ],
        sections: {
            "What is Arduino Uno?": "Arduino Uno R3 is a development board built around the ATmega328P. It provides power, USB programming, digital and analog I/O, clocking, reset and other support circuitry so students can build embedded projects without wiring a microcontroller from scratch.",
            "How it Works": "A program is compiled on a computer and transferred through USB to the ATmega328P. The microcontroller executes the program and reads sensors or switches through its input pins while controlling LEDs, displays, motors and other devices through its outputs.",
            "Why is it Used?": "It is inexpensive, easy to program, well documented and has a large ecosystem of sensors, modules, libraries and example projects. It is especially useful for learning GPIO, ADC, PWM, serial communication and basic embedded programming.",
            "Where is it Used?": "Student laboratories, robotics prototypes, sensor monitoring, home automation demonstrations, control systems, IoT prototypes and electronics projects.",
            "Applications": "LED control, temperature monitoring, obstacle detection, servo control, LCD projects, Bluetooth projects, data logging and small automation systems.",
            "Important Note": "The Uno is a development board rather than only the ATmega328P chip. Its supporting circuitry is what makes programming and powering the microcontroller convenient."
        },
        internalComponents: [
            { id: "atmega328p", name: "ATmega328P", description: "The main 8-bit AVR microcontroller that runs the user's program and provides GPIO, timers, ADC, serial interfaces and memory." },
            { id: "atmega16u2", name: "ATmega16U2 USB Interface", description: "Handles USB-to-serial communication between the computer and the main ATmega328P on the Uno R3." },
            { id: "16mhz-resonator", name: "16 MHz Clock Resonator", description: "Provides the clock reference used by the ATmega328P so its instruction timing and peripherals can operate at the expected frequency." },
            { id: "5v-regulator", name: "5 V Voltage Regulator", description: "Regulates a suitable external input supply to provide the board's regulated 5 V rail." },
            { id: "3v3-regulator", name: "3.3 V Regulator", description: "Provides a lower-voltage supply rail for compatible external circuits connected to the board." },
            { id: "reset-circuit", name: "Reset Circuit", description: "Allows the microcontroller to restart execution, including reset control associated with programming and the reset button." },
            { id: "usb-connector", name: "USB Connector", description: "Connects the Uno to a computer for programming, serial communication and USB power." },
            { id: "dc-jack", name: "DC Barrel Jack", description: "Provides a convenient connection point for an external DC power source." },
            { id: "polyfuse", name: "USB Polyfuse", description: "A resettable protection device that helps protect the USB power path against excessive current." },
            { id: "power-led", name: "Power LED", description: "Indicates that the board is receiving power." },
            { id: "tx-rx-leds", name: "TX/RX LEDs", description: "Indicate serial data activity during communication through the USB serial interface." },
            { id: "passive-components", name: "Resistors & Capacitors", description: "Supporting passive components provide biasing, filtering, timing, decoupling and signal conditioning around the board's active devices." },
            { id: "headers", name: "Pin Headers", description: "Expose the microcontroller's power, digital, analog and communication signals so external circuits and modules can be connected." }
        ]
    }
};

const electroGuideInternalDetails = {
    "atmega328p": {
        name: "ATmega328P",
        category: "Arduino Uno Internal Component",
        description: "The main microcontroller used by the Arduino Uno R3. It executes the sketch and interfaces with external circuits through its pins.",
        facts: [["Architecture", "8-bit AVR"], ["Clock on Uno", "16 MHz"], ["Flash", "32 KB"], ["SRAM", "2 KB"], ["EEPROM", "1 KB"], ["ADC", "10-bit"]],
        sections: { "How it Works": "The CPU fetches and executes instructions stored in flash memory. GPIO, timers, ADC and serial peripherals allow the program to interact with the outside world.", "Why is it Used?": "It combines processing, memory and common embedded peripherals in one low-cost microcontroller.", "Where is it Used?": "Arduino Uno boards and many small embedded control and educational projects." }
    },
    "atmega16u2": {
        name: "ATmega16U2 USB Interface",
        category: "Arduino Uno Internal Component",
        description: "The USB interface microcontroller on the Uno R3 that manages communication between the USB connector and the ATmega328P serial interface.",
        facts: [["Type", "USB-capable AVR MCU"], ["Board Role", "USB-to-serial interface"]],
        sections: { "How it Works": "It handles USB communication from the computer and presents serial data to the main microcontroller.", "Why is it Used?": "It makes USB programming and serial communication practical on the Uno R3.", "Where is it Used?": "Arduino Uno R3 USB communication path." }
    },
    "16mhz-resonator": {
        name: "16 MHz Clock Resonator",
        category: "Arduino Uno Internal Component",
        description: "The clock reference component used by the Uno's main microcontroller for timing and instruction execution.",
        facts: [["Frequency", "16 MHz"], ["Role", "Clock reference"]],
        sections: { "How it Works": "It provides a stable oscillation used as the timing reference for the microcontroller.", "Why is it Used?": "Accurate timing is required for CPU operation, timers and communication peripherals." }
    },
    "5v-regulator": {
        name: "5 V Voltage Regulator",
        category: "Arduino Uno Internal Component",
        description: "A regulator in the power section that provides a regulated 5 V supply rail for the board and compatible circuits.",
        facts: [["Output", "5 V regulated rail"], ["Role", "Power regulation"]],
        sections: { "How it Works": "The regulator controls its output so the board can operate from a suitable external supply without directly applying that supply voltage to the 5 V rail.", "Why is it Used?": "The microcontroller and many Arduino accessories require a stable supply voltage." }
    },
    "3v3-regulator": {
        name: "3.3 V Regulator",
        category: "Arduino Uno Internal Component",
        description: "Provides the Uno's 3.3 V supply rail for compatible low-voltage peripherals.",
        facts: [["Output", "3.3 V"], ["Role", "Low-voltage supply"]],
        sections: { "How it Works": "It regulates the available input power to a lower 3.3 V rail.", "Why is it Used?": "Some sensors and modules require a lower supply voltage than the main 5 V rail." }
    },
    "reset-circuit": {
        name: "Reset Circuit",
        category: "Arduino Uno Internal Component",
        description: "Supporting circuitry that allows the ATmega328P to restart from its reset state and supports automatic reset during programming.",
        facts: [["Role", "Restart MCU"], ["User Control", "Reset button"]],
        sections: { "How it Works": "A reset signal places the microcontroller into its reset state and then allows normal program execution to begin again.", "Why is it Used?": "Reset is useful for restarting a program and for reliable programming workflows." }
    },
    "usb-connector": {
        name: "USB Connector",
        category: "Arduino Uno Internal Component",
        description: "The physical USB connection used for computer communication, programming and USB power.",
        facts: [["Interface", "USB"], ["Main Role", "Programming + serial"]],
        sections: { "How it Works": "A USB cable connects the board to a computer, allowing the USB interface circuitry to exchange data and provide USB power." }
    },
    "dc-jack": {
        name: "DC Barrel Jack",
        category: "Arduino Uno Internal Component",
        description: "A connector for supplying the board from an external DC adapter or battery source with an appropriate voltage range.",
        facts: [["Role", "External DC input"], ["Type", "Barrel connector"]],
        sections: { "Why is it Used?": "It provides a convenient power input when the board is not being powered from USB." }
    },
    "polyfuse": {
        name: "USB Polyfuse",
        category: "Arduino Uno Internal Component",
        description: "A resettable overcurrent protection component used on the USB power path.",
        facts: [["Type", "Resettable fuse"], ["Role", "USB power protection"]],
        sections: { "How it Works": "When excessive current causes the protection device to heat, its resistance increases and limits the current. After the fault is removed and it cools, it can return toward its normal state." }
    },
    "power-led": {
        name: "Power LED",
        category: "Arduino Uno Internal Component",
        description: "A visual indicator that shows the board is powered.",
        facts: [["Type", "LED"], ["Role", "Power indication"]],
        sections: { "Why is it Used?": "It gives the user a quick visual confirmation that power is reaching the board." }
    },
    "tx-rx-leds": {
        name: "TX/RX LEDs",
        category: "Arduino Uno Internal Component",
        description: "Indicator LEDs associated with serial transmit and receive activity.",
        facts: [["Indicators", "TX and RX"], ["Role", "Serial activity"]],
        sections: { "Why is it Used?": "They help users see when serial communication activity is occurring." }
    },
    "passive-components": {
        name: "Resistors & Capacitors",
        category: "Arduino Uno Internal Component",
        description: "Groups of supporting passive components used for biasing, filtering, decoupling, timing and signal conditioning.",
        facts: [["Types", "Resistors + capacitors"], ["Role", "Support circuitry"]],
        sections: { "How it Works": "Resistors set currents and voltage relationships, while capacitors store charge and help filter noise or stabilize supply and signal paths." }
    },
    "headers": {
        name: "Pin Headers",
        category: "Arduino Uno Internal Component",
        description: "The exposed connector rows that make the Uno's power, analog, digital and communication signals accessible to external circuits.",
        facts: [["Role", "External connections"], ["Signals", "Power + I/O"]],
        sections: { "Why is it Used?": "Headers make it easy to connect sensors, displays, drivers, breadboards and other modules to the board." }
    }
};

function buildSearchIndex() {
    const index = [];
    Object.entries(categories).forEach(([categoryKey, category]) => {
        category.items.forEach(id => {
            const detail = electroGuideDetails[id] || electroGuideInternalDetails[id];
            index.push({
                id,
                name: detail?.name || titleFromSlugForData(id),
                category: detail?.category || category.name,
                description: detail?.description || "Electronics component in the ElectroGuide library.",
                keywords: `${id} ${detail?.name || ""} ${category.name}`.toLowerCase()
            });
        });
    });
    Object.entries(electroGuideInternalDetails).forEach(([id, detail]) => {
        index.push({ id, name: detail.name, category: detail.category, description: detail.description, keywords: `${id} ${detail.name} ${detail.category}`.toLowerCase() });
    });
    return index;
}

function titleFromSlugForData(slug) {
    const special = { "hc-sr04": "HC-SR04", "hc-05-bluetooth": "HC-05 Bluetooth", "hc-06-bluetooth": "HC-06 Bluetooth", "mpu6050": "MPU6050", "bmp280": "BMP280", "mq-2": "MQ-2 Gas Sensor", "lm35": "LM35", "dht11": "DHT11", "dht22": "DHT22", "nrf24l01": "NRF24L01", "esp32-cam": "ESP32-CAM", "stm32-blue-pill": "STM32 Blue Pill", "pic16f877a": "PIC16F877A", "rp2040": "RP2040", "8051": "8051" };
    if (special[slug]) return special[slug];
    return slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

const electroGuideSearchIndex = buildSearchIndex();
