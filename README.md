
# Pixearth

Simple earth model for my compgraf classes using Three.js. Textures are sourced from [solar textures](https://www.solarsystemscope.com/textures/).

## Features
- **Planetary system** with textures and realistic scale.
- **Interactive camera controls**: rotate, zoom in/out, and switch between planets.
- **Keyboard inputs** to navigate and adjust the system's settings:
  - **Space**: Change the camera's position to the next planet in the sequence.
  - **Arrow keys**: Adjust the camera's zoom and speed.
  - **Scroll wheel**: Zoom in and out.
  
## Requirements
- **Three.js**: A JavaScript library to create 3D graphics in the browser.
- **WebGL**: For hardware-accelerated graphics rendering.

## Installation
To use the simulation, simply clone this repository and open the `index.html` file in a browser that supports WebGL (modern browsers like Chrome, Firefox, or Edge).

```bash
git clone https://github.com/yourusername/planetary-system-simulation.git
cd planetary-system-simulation
open index.html
```

## Setup

### 1. Install Three.js
You need to install the Three.js library. You can either include it from a CDN in your HTML file or download it and add it locally:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

### 2. Textures
The planets' textures are stored in the `textures/` folder. You can replace these textures with your own to customize the appearance of the planets.

### 3. Adjust the Camera and Planets
The positions, sizes, and distances of the planets are adjustable in the code. The current configuration follows the real scale, but feel free to modify them to suit your needs.

## Controls
- **Spacebar**: Move to the next planet.
- **Arrow Left**: Decrease the simulation speed.
- **Arrow Right**: Increase the simulation speed.
- **Arrow Up**: Zoom in.
- **Arrow Down**: Zoom out.
- **Mouse movement**: Rotate the camera around the solar system.

## Code Overview

### 1. Variables and Setup
```javascript
let mvx = 0;
let mvy = 0;  // Mouse movement
let d = 1000; // Distance from the Sun
let v = 100;  // Speed adjustment
let camp = 0; // Camera position (Planet index)
let r2 = new THREE.Vector3(0, 0, 0);
let r3 = new THREE.Vector3(0, 1, 0); // Rotation axes for planets
let ppositions = [0, (1/56) * d, (1/47) * d, ...]; // Planet positions
let psize = [10, 0.2, 0.6, ...]; // Planet sizes
```

### 2. Event Listeners
The event listeners handle keyboard and mouse inputs for camera control and interaction.

- **keydown**: Change planet, adjust speed, and zoom in/out.
- **mousemove**: Rotate camera based on mouse movement.
- **wheel**: Zoom in/out using the mouse wheel.
- **resize**: Adjust rendering when the window is resized.

### 3. Planet Initialization
Each planet is represented by a sphere with its respective texture loaded from a URL.

```javascript
const geometryneptune = new THREE.SphereGeometry(psize[8]);
const textureneptune = new THREE.TextureLoader().load("textures/2k_neptune.jpg");
const materialneptune = new THREE.MeshStandardMaterial({ map: textureneptune });
const neptune = new THREE.Mesh(geometryneptune, materialneptune);
scene.add(neptune);
neptune.position.x = ppositions[8];
```

### 4. Animation
The animation function updates the planets' rotation, applies the camera movement, and renders the scene:

```javascript
function animate() {
    mercury.rotateY(0.01);
    venus_surface.rotateY(0.01);
    // Update other planets

    rotateAboutPoint(mercury, r2, r3, -0.47/v, false);
    // Apply rotation to other planets

    pivot.rotation.y -= mvx * 0.001;
    pivot.rotation.x -= mvy * 0.001;

    pivot.position.set(planets[camp].position.x, planets[camp].position.y, planets[camp].position.z);
    camera.lookAt(planets[camp].position);

    mvx = lerp(mvx, 0, 0.1);
    mvy = lerp(mvy, 0, 0.1);

    renderer.render(scene, camera);
}
```

## License
This project is open source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute it.

## Contributing
Feel free to fork this project, submit issues, and create pull requests. Contributions are always welcome!

---

Enjoy exploring the solar system!