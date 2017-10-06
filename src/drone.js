import Engine from './engine';
import OrientationSensor from './orientation_sensor';
import Gyro from './gyro';
import Point from './point';
import Remote from './remote';

class Drone {
  constructor(){
    this.status = this.constructor.statuses().off;

    // engine location on the drone.
    //       4
    //     /   \
    //    3     1
    //     \  /
    //      2
    this.engines = [new Engine(this, "1"), // engine number
                    new Engine(this, "2"), //
                    new Engine(this, "3"),
                    new Engine(this, "4")]

    // i assume remote sends signal to sensor about pitch/roll, then sensor
    // translate signal to correct drone's engines.
    this.sensor = new OrientationSensor(this);

    this.gyro = new Gyro(this);

    // drone's current location on xyz axis.
    this.location = new Point(0,0,0);

    this.remote = null; // no remote synced.
  }

  static statuses(){
    return {off: "off", on: "on", hovering: "hovering", moving: "moving"};
  }

  power_on(){
    this.status = this.constructor.statuses().on;
    this.engines.map( engine => engine.toggle_status());  // off to on.

    // constantly update drone stats
    this. intervalId = setInterval(() => {
      this.update_drone_stats();
    }, 1000);
  }

  // this should be called by a periodic process to constantly update
  // drone's location, speed, etc.
  update_drone_stats(){
    this.update_location(new_location);
    this.update_sensor();
    this.update_battery();  // send drone info to remote maybe
  }

  update_location(newLoc){
    this.gyro.update_speed(this.location, newLoc);
    this.location = newLoc;
  }

  update_sensor(){
    let pitch_info = {}; // collected from real sensor.
    let roll_info = {};
    this.sensor.update_pitch(pitch_info);
    this.sensor.update_roll(roll_info);
  }

  // react to sensor update
  on_sensor_update(sensor){
    // sensor.pitch
    // sensor.roll
  }

  // connect with remote control
  on_sync(remote){
    if(this.remote === null){
      this.remote = remote;
    }
  }

  // change drone's status.
  change_status(new_status) {
    this.status = new_status;
  }

  // called by engine instances
  on_engine_status_change(engine) {
    if(engine.status === Engine.statuses().off){
      console.log(`Engine ${engine.position} is off, landing drone.`);
      this.land();
    }
  }

  // when drone receives signal from remote,
  on_signal(signal_type, amount){
    // amount positive, nose up.
    // engine location on the drone.
    //       4
    //     /   \
    //    3     1
    //     \  /
    //      2
    if(signal_type === Remote.signals().pitch){
      if(amount > 0){
        this.drone.engines[4].power_up(amount); // gradually
        this.drone.engines[2].power_down(amount);
      }else{ //tail up
        this.drone.engines[4].power_down(amount);
        this.drone.engines[2].power_up(amount);
      }
    }else if(signal_type === Remote.signals().roll){
      if(amount > 0){
        this.drone.engines[3].power_up(amount); // gradually
        this.drone.engines[1].power_down(amount);
      }else{
        this.drone.engines[3].power_down(amount);
        this.drone.engines[1].power_up(amount);
      }
    }else if(signal_type === Remote.signals().forward){
      let engines = [this.engines[0], this.engines[1], this.engines[2]];
      engines.map(engine => engine.power_up(amount));

      // .... similar for back, left, right, etc.
    }else if(signal_type === Remote.signals().hover){
      this.stabilize(this.location);
    }
  }


  on_power_change(engine){
    // engine full power and still on ground
    let all_full_power = this.engines.reduce((acc, x) => {
                           return x.power === 100;
                         } , true);

    if(all_full_power &&
       this.gyro.getSpeed() === [0,0,0] &&
       this.location[2] === 0){  // z === 0
      console.log("drone fails to take off");
    }
  }

  speed(){
    this.gyro.getSpeed();
  }


  // take the drone in the air
  take_off(){
    this.on_signal(Remote.signals().up, 100);
  }

  // move_[forward, left, right, back, up, down]
  move(direction, amount=1){
    this.on_signal(direction, amount);
  }

  // stabilize(makes the drone hover)
  // @param location, try to stabilize for a give location
  stabilize(location){
    while(this.drone.location !== location){
      // then try to nudge close to given location.
      let dx = this.drone.location.x - location.x;
      let dy = this.drone.location.y - location.y;
      let dz = this.drone.location.z - location.z;

      if(dx > 0){
        this.on_signal(Remote.signals().left, 1);
      }else if (dx < 0){
        this.on_signal(Remote.signals().right, 1);
      }

      if(dy > 0){
        this.on_signal(Remote.signals().forward, 1);
      }else if (dy < 0){
        this.on_signal(Remote.signals().back, 1);
      }

      if(dz > 0){
        this.on_signal(Remote.signals().up, 1);
      }else if (dz < 0){
        this.on_signal(Remote.signals().down, 1);
      }
    }
  }

  // land(stabilizes and goes down at reduce speed)
  land(){
    while(this.location[2] > 0){  // z > 0
      let dz = this.location[2];
      // dz in feet i assume. 1 < power < 100
      let power = Math.max(1, Math.min(100, dz / 10));
      this.on_signal(Remote.signals().down, power);
    }
  }
}

export default Drone;
