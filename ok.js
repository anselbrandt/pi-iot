const sense = require("sense-hat-led");

const sleep = sense.sync.sleep;

let t = 1;

sense.sync.clear();
sense.sync.setRotation(90);

const X = [248, 248, 248]; // black
const O = [0, 0, 0]; // White

const ok = [
  O,
  O,
  O,
  O,
  O,
  O,
  O,
  O,
  X,
  X,
  X,
  O,
  X,
  O,
  O,
  X,
  X,
  O,
  X,
  O,
  X,
  O,
  X,
  O,
  X,
  O,
  X,
  O,
  X,
  X,
  O,
  O,
  X,
  O,
  X,
  O,
  X,
  X,
  O,
  O,
  X,
  O,
  X,
  O,
  X,
  O,
  X,
  O,
  X,
  X,
  X,
  O,
  X,
  O,
  O,
  X,
  O,
  O,
  O,
  O,
  O,
  O,
  O,
  O,
];

sense.sync.setPixels(ok);
sleep(t);
sense.sync.clear();

