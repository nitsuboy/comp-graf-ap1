import * as THREE from 'three';

let mvx = 0;
let mvy = 0; // movimentos do mouse
let d = 1000 // distancia
let v = 100  // ajuste de velocidade geral
let camp = 0 // posição da camera -> mudar para o planeta em questão
let r2 = new THREE.Vector3(0,0,0)
let r3 = new THREE.Vector3(0,1,0) // eixos para calculo de rotação
let ppositions = [0,(1/56)*d,(1/47)*d,(1/38)*d,(1/32)*d,(1/8)*d,(1/4)*d,(1/2)*d,(3/4)*d,0] // posições dos planetas
let psize = [10,.2,.6,.6,.3,6.9,5.8,2.5,2.4,100] // tamanho dos planetas

// Logica para cada vez que o usuario apertar espaço, a camera muda de planeta
addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        camp = camp + 1;
        if ( camp > ppositions.length()) {
            camp = 0;
        }
    }
    if (event.code === "ArrowRight") {
        if(v > 10){
            v -= 10
        }
    }
    if (event.code === "ArrowLeft") {
        if(v < 100){
            v += 10
        }
    }
    if (event.code === "ArrowUp") {
        if(camera.position.z < 100){
            camera.position.z += .3
        }
    }
    if (event.code === "ArrowDown") {
        if(camera.position.z > psize[camp] + (psize[camp]*1.5)){
            camera.position.z -= .3
        }
    }
});

// mudar rederização quando mudar tamanhoi da janela
addEventListener("resize",(event) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

// movimento de camera
addEventListener("mousemove", (event) => {
    if (event.buttons){
        mvx = event.movementX;
        mvy = event.movementY;
    }
});

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();

const pivot = new THREE.Object3D()
// Camera deve ficar posicionada apontando pro Sol
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2500 );
pivot.add(camera)
scene.add(pivot)

const spotLight = new THREE.AmbientLight( 0xffffff ,.5);
spotLight.position.set( 10, 0, 0 );
scene.add(spotLight)

const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, .05 );

// netuno
const geometryneptune = new THREE.SphereGeometry(psize[8]);
const textureneptune = new THREE.TextureLoader().load( "textures/2k_neptune.jpg" );
const materialneptune = new THREE.MeshStandardMaterial({map:textureneptune});
const neptune = new THREE.Mesh( geometryneptune, materialneptune );
scene.add( neptune );
neptune.position.x = ppositions[8]

// urano
const geometryuranus = new THREE.SphereGeometry(psize[7]);
const textureuranus = new THREE.TextureLoader().load( "textures/2k_uranus.jpg" );
const materialuranus = new THREE.MeshStandardMaterial({map:textureuranus});
const uranus = new THREE.Mesh( geometryuranus, materialuranus );
scene.add( uranus );
uranus.position.x = ppositions[7]

// saturno
const geometrysaturn = new THREE.SphereGeometry(psize[6]);
const texturesaturn = new THREE.TextureLoader().load( "textures/2k_saturn.jpg" );
const materialsaturn = new THREE.MeshStandardMaterial({map:texturesaturn});
const saturn = new THREE.Mesh( geometrysaturn, materialsaturn );
saturn.position.x = ppositions[6]

const geometryring = new THREE.RingGeometry(7, 10, 64,1);
let pos = geometryring.attributes.position;
let v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    geometryring.attributes.uv.setXY(i, v3.length() < 8 ? 0 : 1, 1);
}
const texturering = new THREE.TextureLoader().load( "textures/2k_saturn_ring_alpha.png" );
const materialring = new THREE.MeshStandardMaterial({map:texturering ,side:THREE.DoubleSide,transparent:true});
const ring = new THREE.Mesh( geometryring, materialring );
ring.rotation.x = 1.3
saturn.add( ring );
scene.add( saturn );

// jupiter
const geometryjupiter = new THREE.SphereGeometry(psize[5]);
const texturejupiter = new THREE.TextureLoader().load( "textures/2k_jupiter.jpg" );
const materialjupiter = new THREE.MeshStandardMaterial({map:texturejupiter});
const jupiter = new THREE.Mesh( geometryjupiter, materialjupiter );
scene.add( jupiter );
jupiter.position.x = ppositions[5]

// marte
const geometrymars = new THREE.SphereGeometry(psize[4]);
const texturemars = new THREE.TextureLoader().load( "textures/2k_mars.jpg" );
const materialmars = new THREE.MeshStandardMaterial({map:texturemars});
const mars = new THREE.Mesh( geometrymars, materialmars );
scene.add( mars );
mars.position.x = ppositions[4]

// terra
const geometrye = new THREE.SphereGeometry(psize[3]);
const texturee = new THREE.TextureLoader().load( "textures/2k_earth_daymap.jpg" );
texturee.magFilter = THREE.NearestFilter
const materiale = new THREE.MeshStandardMaterial({map:texturee});
const earth = new THREE.Mesh( geometrye, materiale );
scene.add( earth );

const geometryc = new THREE.SphereGeometry(psize[3]+0.01);
const texturec = new THREE.TextureLoader().load( "textures/2k_earth_clouds.jpg" );
texturec.magFilter = THREE.NearestFilter
texturec.wrapS = THREE.RepeatWrapping
const materialc = new THREE.MeshStandardMaterial({map:texturec,alphaMap:texturec,transparent:true});
const clouds = new THREE.Mesh( geometryc, materialc );
earth.add( clouds );
earth.position.x = ppositions[3]

const geometrym = new THREE.SphereGeometry(.1,5,5);
const texturem = new THREE.TextureLoader().load( "textures/2k_moon.jpg" );
texturem.magFilter = THREE.NearestFilter
const materialm = new THREE.MeshStandardMaterial({map:texturem});
const moon = new THREE.Mesh( geometrym, materialm );
moon.position.x = 4
scene.add( moon );
earth.add( moon )

// venus
const geometryvenus_surface = new THREE.SphereGeometry(psize[2]);
const texturevenus_surface = new THREE.TextureLoader().load( "textures/2k_venus_surface.jpg" );
const materialvenus_surface = new THREE.MeshStandardMaterial({map:texturevenus_surface});
const venus_surface = new THREE.Mesh( geometryvenus_surface, materialvenus_surface );
scene.add( venus_surface );
venus_surface.position.x = ppositions[2]

// mercurio
const geometrymercury = new THREE.SphereGeometry(psize[1]);
const texturemercury = new THREE.TextureLoader().load( "textures/2k_mercury.jpg" );
const materialmercury = new THREE.MeshStandardMaterial({map:texturemercury});
const mercury = new THREE.Mesh( geometrymercury, materialmercury );
scene.add( mercury );
mercury.position.x = ppositions[1]

// sol
const geometrysun = new THREE.SphereGeometry(psize[0]);
const texturesun = new THREE.TextureLoader().load( "textures/2k_sun.jpg" );
const materialsun = new THREE.MeshStandardMaterial({map:texturesun});
const sun = new THREE.Mesh( geometrysun, materialsun );
scene.add( sun );
sun.position.x = ppositions[0]

const geometrys = new THREE.SphereGeometry(-2000,4,4);
const textures = new THREE.TextureLoader().load( "textures/2k_stars_milky_way.jpg" );
const materials = new THREE.MeshStandardMaterial({map:textures,lightMap:textures,lightMapIntensity:5});
const stars = new THREE.Mesh( geometrys, materials );
scene.add( stars );

document.body.appendChild( renderer.domElement );

let planets = [sun,mercury,venus_surface,earth,mars,jupiter,saturn,neptune,uranus,sun]

renderer.setSize( window.innerWidth, window.innerHeight );

pivot.position.x = ppositions[camp]
camera.position.z = psize[camp] + psize[camp]*1.5

function lerp(a, b, alpha) {
    return a+alpha*(b-a);
}

function rotateAboutPoint(obj, point, axis, theta, pointIsWorld = false){
  
    if(pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }
  
    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset
    
    if(pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }
    
    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}


function animate() {
    rotateAboutPoint(mercury,r2,r3,-.47/v,false)
    rotateAboutPoint(venus_surface,r2,r3,-.35/v,false)
    rotateAboutPoint(earth,r2,r3,-.29/v,false)
    rotateAboutPoint(mars,r2,r3,-.24/v,false)
    rotateAboutPoint(jupiter,r2,r3,-.13/v,false)
    rotateAboutPoint(saturn,r2,r3,-.09/v,false)
    rotateAboutPoint(neptune,r2,r3,-.06/v,false)
    rotateAboutPoint(uranus,r2,r3,-.05/v,false)
    
    pivot.rotation.y -= mvx * 0.001
    pivot.rotation.x -= mvy * 0.001
    
    pivot.position.set(planets[camp].position.x,planets[camp].position.y,planets[camp].position.z) 
    camera.lookAt(planets[camp].position)
    
    mvx = lerp(mvx,0,.1);
    mvy = lerp(mvy,0,.1);
    
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );