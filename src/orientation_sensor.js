class OrientationSensor {
  constructor(drone){
    this.drone = drone;
  }

  // amount positive, nose up.
  // engine location on the drone.
  //       4
  //     /   \
  //    3     1
  //     \  /
  //      2
  pitch(amount){
    if(amount > 0){
      this.drone.engines[4].power_up(amount); // gradually
      this.drone.engines[2].power_down(amount);
    }else{ //tail up
      this.drone.engines[4].power_down(amount);
      this.drone.engines[2].power_up(amount);
    }
  }

  /**
   * @param amount, positive roll right, negative to left
   */
  roll(amount){
    if(amount > 0){
      this.drone.engines[3].power_up(amount); // gradually
      this.drone.engines[1].power_down(amount);
    }else{ //tail up
      this.drone.engines[3].power_down(amount);
      this.drone.engines[1].power_up(amount);
    }
  }
}

export default OrientationSensor;
