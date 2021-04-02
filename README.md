# companion-module-dcc-ex-commandstation

A bitfocus companion module for model railway control using DCC.

This code will allow you to control a [DCC++EX CommandStation-EX](https://dcc-ex.com/index.html) from [StreamDeck hardware controllers](https://www.elgato.com/en/stream-deck) by making use of [Bitfocus Companion](https://bitfocus.io). This combination makes it very easy to make a dynamic and fully customisable push-button DCC controller. It is similar in concept to web/app throttles but uses a relatively cheap hardware interface. Any button can send one or more commands to the CommandStation-EX. Buttons can be arranged in multiple pages, allowing for example one page for each loco.

![](/images/IMG_4662.jpeg)

## Requirements
This is my setup, other combinations of hardware will work

* CommandStationEX running on Arduino Mega with motor shield and WiFi
  * [Follow these instuctions](https://dcc-ex.com/get-started/index.html)
* RaspberryPi running Companion installed from source
  * [Follow these instuctions](https://github.com/bitfocus/companion/wiki/Manual-Install-on-Raspberry-Pi)
* Network connection between CommandStationEX and RaspberryPi (both on same LAN)
* Code from this repo in the Companion module-local-dev directory
  * Download all files in this repository and place in `companion/module-local-dev/companion-module-dcc++ex-commandstation`
* An instance of the DCC++EX module running in Companion
  * Enter the IP address of the Arduino running CommandStation
* StreamDeck connected to RaspberryPi USB port
* Desktop or laptop to view Companion web interface for setup
  * Using a web browser connect to the IP address of the RaspberryPi on port 8000
* JMRI for programming of DCC decoders

## Companion Configuration
When the system is up and running it is very easy to create and configure StreamDeck buttons in the Companion web interface.

![](/images/buttons.png)

## Example StreamDeck Pages
The StreamDeck is completely configurable. Buttons can have any number of DCC commands assigned and can be set to latch. The button colour and text are also configurable.

### Homepage
Buttons to control track power, emergency stop and to put all locos in idle. The power and stop buttons are latching. Any loco can be moved forward or backwards at speed 1. PNG images can be added to buttons too!

![](/images/page1.png)

### Loco Page
For each loco a range of speeds are available along with lighting control. This page controls loco 31110. Up and Down buttons move between pages.

![](/images/page2.png)