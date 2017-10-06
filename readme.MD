Code an application representing a flying drone with the following Acceptance Criterias:

* drone has n engines
* drone has one gyroscope
* drone has one orientation sensor
* drone takes command from only one remote
* orientation sensor gives the pitch and the roll
* gyroscope has 3 vectors (x, y ,z) and has value on these vectors if there is velocity
* an engine has a power indicator from 0 to 100
* an engine has a status (off, on)
* the drone has a status (off, on, hovering, moving)

for simplicity sake:
* the drone has 4 engines
* the pitch is aligned to the x axis
* the roll is aligned to the y axis
* forward, left, right, back is equally shared by 2 engines

methods to implement:
* take_off(take the drone in the air)
* move_[forward, left, right, back, up, down]
* stabilize(makes the drone hover)
* status(gives the current status of the drone)
* land(stabilizes and goes down at reduce speed)

if an engine breaks ( goes off ), the drone will send a distress signal and start landing (use STDOUT for distress signal)
if the drones fails to take off it sends a distress signal (use STDOUT for distress signal)
If I tap the drone with my hand it should correct itself

## Run
```
npm install ava --global
npm install
npm test   # or   npm run test:watch
```
