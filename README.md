# companion-module-dcc-ex-commandstation
A bitfocus companion module for model railway control using DCC 

This module will allow you to control a [DCC++EX commandstation](https://dcc-ex.com/index.html) from [StreamDeck controllers](https://www.elgato.com/en/stream-deck) by using [Bitfocus Companion](https://bitfocus.io).

## Requirements
This is my setup, other combinations of hardware will work

* CommandStationEX running on Arduino 2560 with motorshield and WiFi
  * [Follow these instuctions](https://dcc-ex.com/get-started/index.html)
* RaspberryPi running Companion installed from source
* Network connection between CommandStationEX and RaspberryPi
  * [Follow these instuctions](https://github.com/bitfocus/companion/wiki/Manual-Install-on-Raspberry-Pi)
* This module in the Companion module-local-dev directory
  * Download all files in this repository and place in `companion/module-local-dev/companion-module-dcc++ex-commandstation`
* StreamDeck connected to RaspberryPi USB port
* Desktop or laptop to view Companion web interface for setup
