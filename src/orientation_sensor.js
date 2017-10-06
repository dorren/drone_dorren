class OrientationSensor {
  constructor(drone){
    this.drone = drone;
    this.pitch = null;
    this.roll = null;
  }

  update_pitch(val){
    this.pitch = val;
    drone.on_sensor_update(this);
  }

  update_roll(val){
    this.roll = val;
    drone.on_sensor_update(this);
  }
}

export default OrientationSensor;
