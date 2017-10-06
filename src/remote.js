class Remote {
  constructor(){
    this.drone = null;
  }

  static signals(){
    return {pitch:   "pitch",
            roll:    "roll",
            forward: "forward",
            back:    "back",
            left:    "left",
            right:   "right",
            up:      "up",
            down:    "down"};
  }

  sync_to(drone){
    this.drone = drone;
    drone.on_sync(this);
  }

  /**
   * @param signal_type, pitch, roll, forward, back, left, right, up, down.
   * @param amount, integer. could be positive or negative.
   */
  send_signal(signal_type, amount){
    drone.on_signal(signal_type, amount);
  }
}

export default Remote;
