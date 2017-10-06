import test from 'ava';
import Drone from '../src/drone';
import Remote from '../src/remote';

test("status", t => {
  let drone = new Drone();
  t.is(drone.status, "off");
});

test("remote", t => {
  let drone = new Drone();
  let remote = new Remote();

  remote.sync_to(drone);

  t.is(drone.remote, remote);
});
