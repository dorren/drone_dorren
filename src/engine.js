class Engine {
  /**
   * @param position,
   */
  constructor(drone, position="unknown"){
    this.drone = drone;
    this.position = position;  // engine position on the drone.
    this.status = this.constructor.statuses().off;
    this.power = 0;  // 0 - 100
  }

  static statuses(){
    return {off: "off", on: "on"};
  }

  toggle_status(){
    if(this.status === this.constructor.statuses().off){
      this.status = this.constructor.statuses().on;
    }else{
      this.status = this.constructor.statuses().off;
    }

    this.drone.on_engine_status_change(this);
  }

  power_up(amount){
    if(this.power < 100){
      change_power(amount);
    }
  }

  power_down(amount){
    if(this.power > 0){
      change_power(amount);
    }
  }

  change_power(amount){
    this.power += amount;
    this.drone.on_power_change(this);
  }

  
}

export default Engine;
