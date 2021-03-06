# companion-module-dcc-ex-commandstation

A bitfocus companion module for model railway control using DCC.

This module will allow you to control a [DCC++EX CommandStation-EX](https://dcc-ex.com/index.html) from [StreamDeck hardware controllers](https://www.elgato.com/en/stream-deck) by making use of [Bitfocus Companion](https://bitfocus.io). This combination makes it very easy to make a dynamic and fully customisable push-button DCC controller. It is similar in concept to web/app throttles but uses a relatively cheap hardware interface. Any button can send one or more commands to the CommandStation-EX. Buttons can be arranged in multiple pages, allowing for example one page for each loco.

![](/images/IMG_4662.jpeg)

## Requirements

_Updated 2nd May 2021: Companion now includes the DCC++EX module in the beta so there is no longer any need to install Companion from source._

* CommandStation-EX running on Arduino Mega with motor shield and WiFi
  * [Follow these instuctions](https://dcc-ex.com/get-started/index.html)
* Track power and external PSU wired to motor shield
* PC/Mac/Linux/Pi computer running Companion version 2.2.0-6e48e317-3282 or later
  * [Register for a free account and download the latest Companion beta](https://bitfocus.io/companion/download/builds/)
* Network connection between CommandStationEX and Companion (both on same LAN)
* An instance of the DCC++EX module running in Companion
  * Enter the IP address of the Arduino running CommandStation ([Example](/images/instance.png))
* StreamDeck controller connected to Companion PC USB port
* Desktop or laptop to view Companion web interface for setup
  * Using a web browser connect to Companion on port 8000
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

## Comments and Issues
Please [open an issue](https://github.com/bitfocus/companion-module-dcc-ex-commandstation/issues) if you have any problems or suggestions.

## Updates
As the code for this module is now bundled with Companion it is held in a different Repo, [please head here if you wish to access the code](https://github.com/bitfocus/companion-module-dcc-ex-commandstation).
