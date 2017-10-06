import test from 'ava';
import Drone from '../src/drone';
import Engine from '../src/engine';

test("status", t => {
  let e = new Engine();
  t.is(e.status, "off");
});

test("toggle status", t => {
  let drone = new Drone();
  drone.power_on();

  let engine = drone.engines[0];
  engine.toggle_status();  // engine off, should print stress msg.
  t.is(engine.status, "off");
});
