# companion-module-dcc-ex-commandstation

A bitfocus companion module for model railway control using DCC.

This code will allow you to control a [DCC++EX commandstation](https://dcc-ex.com/index.html) from [StreamDeck controllers](https://www.elgato.com/en/stream-deck) by making use of [Bitfocus Companion](https://bitfocus.io). This combination makes it very easy to make a dynamic and fully customisable push-button DCC controller. It is similar in concept to web/app throttles but uses a relatively cheap hardware interface. Any button can send one or more commands to the CommandStation-EX. Buttons can be arranged in multiple pages, allowing for example one page for each loco. Some [Example pages](EXAMPLES.md).

![](/images/IMG_4662.jpeg)

## Requirements
This is my setup, other combinations of hardware will work

* CommandStationEX running on Arduino 2560 with motorshield and WiFi
  * [Follow these instuctions](https://dcc-ex.com/get-started/index.html)
* RaspberryPi running Companion installed from source
  * [Follow these instuctions](https://github.com/bitfocus/companion/wiki/Manual-Install-on-Raspberry-Pi)
* Network connection between CommandStationEX and RaspberryPi
* This module in the Companion module-local-dev directory
  * Download all files in this repository and place in `companion/module-local-dev/companion-module-dcc++ex-commandstation`
* An instance of the DCC++EX module running in Companion
* StreamDeck connected to RaspberryPi USB port
* Desktop or laptop to view Companion web interface for setup
* JMRI for programming of DCC decoders

## Operation
When the system is up and running it is very easy to configure buttons in the Companion web interface.

![](/images/buttons.png)