class Gyro {
  constructor(drone){
    this.drone = drone;
    this.speed = 0;
  }


  /**
   * calculate speed based on drone's location.
   */
  updateSpeed(oldLoc, newLoc){
    // get distance diff
    delta = [newLoc.x - oldLoc.x,
             newLoc.y - oldLoc.y,
             newLoc.z - oldLoc.z];
    time_diff = (Date.now() - this.timestamp);
    speed = delta.map(x => x / time_diff);
    this.speed = speed;

    // save new location and time for next calculation
    this.location = newLoc;
    this.timestamp = (Date.now());


    return speed;
  }

  getSpeed(){
    return this.speed;
  }
}

export default Gyro;
