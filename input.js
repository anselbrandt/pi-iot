const HatKeys = require("./rpi-keys.js");

const hatKeys = new HatKeys();

function keyEvent(event) {
  if (event.pressed) {
    console.log("PRESSED: " + event.name);
  } else if (event.released) {
    console.log("RELEASED: " + event.name);
  }
}

hatKeys.setKeyEventHandler(keyEvent);

console.log("Press a Sense HAT key...");
