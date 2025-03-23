
//import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import * as THREE from 'three';
//import * as THREE from './three.module.js';
//import { TrackballControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/TrackballControls.js'; 
import { GLTFLoader } from './GLTFLoader.js';
//import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';



const waypoints = [
    { x: 0, y: 3, z: 25},
    { x: 0, y: 3, z: 10 },
    { x: 0, y: 3, z: 3 },
    { x: 0, y: 3, z: -3 },
    { x: -7, y: 3, z: -2, rotationY: Math.PI / 2 },
    {x:-7,y:4,z:-9,rotationY:Math.PI/2},
    {x:-6,y:3,z:-13},
    {x:-6,y:3,z:-18,rotationY:Math.PI/2},
    {x:-9,y:4,z:-18,rotationY:Math.PI},
    {x:-9,y:8,z:-13,rotationY:Math.PI},
    {x:-5,y:8,z:-13,rotationY:Math.PI/-2},
    {x:3,y:8,z:-15,rotationY:Math.PI/-2},
    {x:5,y:8,z:-17},
    {x:7,y:8,z:-17},
    {x:3,y:8,z:-13,rotationY:Math.PI/-3},
    {x:1,y:8,z:-10,rotationY:Math.PI/-2},
    {x:1,y:8,z:-8,rotationY:Math.PI/-2}
];

let currentWaypointIndex=0;
let isMoving=false;
function moveToNextWayPoint(direction) {
    const nextWaypointIndex = currentWaypointIndex + direction;

    if (nextWaypointIndex < 0 || nextWaypointIndex >= waypoints.length) {
       
        return;
    }

    const targetWaypoint = waypoints[nextWaypointIndex];
    isMoving = true;

    function animationWaypointMovement(){

        const step = 0.1; // Adjusted step size.
        camera.position.x += (targetWaypoint.x - camera.position.x) * step;
        camera.position.y += (targetWaypoint.y - camera.position.y) * step;
        camera.position.z += (targetWaypoint.z - camera.position.z) * step;
        camera.rotation.y+=((targetWaypoint.rotationY||0)-camera.rotation.y)*step

        renderer.render(scene, camera); // Ensure rendering updates.

        if (
            Math.abs(camera.position.x - targetWaypoint.x) < 0.05 &&
            Math.abs(camera.position.y - targetWaypoint.y) < 0.05 &&
            Math.abs(camera.position.z - targetWaypoint.z) < 0.05
            ) {
            isMoving = false;
            currentWaypointIndex = nextWaypointIndex;

            return;
            }
       requestAnimationFrame(animationWaypointMovement);
    }
    animationWaypointMovement()
}

const loader=new GLTFLoader();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//const geometry =new THREE.TorusGeometry(10,3,15,200);

//const material =new THREE.MeshStandardMaterial({color:0xFF6347});
//const torus=new THREE.Mesh(geometry,material);

//scene.add(torus)

const pointLight=new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const adLight=new THREE.AmbientLight(0xffffff);

scene.add(pointLight,adLight);
const lightHelper=new THREE.PointLightHelper(pointLight);
const girdHelper=new THREE.GridHelper(200,50);
scene.add(lightHelper,girdHelper);

//const controls=new TrackballControls(camera,renderer.domElement);
//controls.nRotation=true;

// function addstar(){
//     const geometry=new THREE.SphereGeometry(0.25);
//     const material=new THREE.MeshStandardMaterial({color:0xffff});
//     const star =new THREE.Mesh(geometry,material);

//     const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));


//     star.position.set(x,y,z);
    //scene.add(star);


//}
const spaceTexture =new THREE.TextureLoader().load('./space.jpg');
scene.background=spaceTexture;

//const picMaterial=new THREE.TextureLoader().load('cat.jpg');

//const pic=new THREE.Mesh(
    //new THREE.BoxGeometry(3,3,3),
    ///new THREE.MeshBasicMaterial({map:picMaterial})
//);
//scene.add(pic);
const plane=new THREE.PlaneGeometry(200,200);
const plane_1=new THREE.TextureLoader().load('../Portfolio/10450_Rectangular_Grass_Patch_v1_Diffuse.jpg',undefined,undefined,
    // function(error){
    //     console.error('error:',error);
    // }
)

const planeMaterial=new THREE.MeshStandardMaterial({
     map:plane_1,
    side:THREE.DoubleSide
 })
 const pln=new THREE.Mesh(plane,planeMaterial);

pln.position.set(0,0,0)
pln.rotation.x=Math.PI/2
scene.add(pln)

// let targetZ=camera.position.z;

document.addEventListener('keydown',(event)=>{
    if(event.key==='w' && !isMoving){
        moveToNextWayPoint(1);
    }
    if(event.key==='s'&& !isMoving){
        moveToNextWayPoint(-1);
    }
});

function animate(){
    requestAnimationFrame(animate);
    // torus.rotation.x+=0.01;
    // torus.rotation.y+=0.005;
    // torus.rotation.z+=0.01;
   
    //controls.update();
    // const step=0.1;
    // camera.position.z += (targetZ - camera.position.z) * step;
    renderer.render(scene,camera);
}

// const moonTexture=new THREE.TextureLoader().load('moon.jpg');

// const moon=new THREE.Mesh(
//     new THREE.SphereGeometry(3,32,32),
//     new THREE.MeshStandardMaterial({map:moonTexture})
// );
// //scene.add(moon);
// moon.position.z=30;
// moon.position.setX(-10);

function movecamera(offset){
    const t=document.documentElement.getBoundingClientRect().top;
    //moon.rotation.x +=0.05;
    //moon.rotation.y+=0.075;
    //moon.rotation.z+=0.05;

    // pic.rotation.y+=0.01;
    // pic.rotation.z+=0.01;
    
     targetZ=camera.position.z+offset.z

    // const interval=setInterval(()=>{
    //     camera.position.z+=(targetZ-camera.position.z)*step;

    //     // if(Math.abs(camera.position.z-targetZ)<0.01){
    //     //     clearInterval(interval);
    //     // }
    // },10);

    // camera.position.z=t*-0.01;     //here the camera position is been completely calculated so when we try moving front it 1st comes here nd places it 
    // camera.position.x=t*-0.0002;        to start point nd which might lag alot here of removing this completly makes it move smoother//
    // camera.rotation.y=t*-0.0002;
}

document.body.onscroll=movecamera
loader.load(
    '../Portfolio/untitled.glb',
    function(gltf){
        const a=gltf.scene;
        scene.add(a);
        a.position.set(-9.6,0,0);
        a.scale.set(2,2,2)
    },
    undefined,
    function(error){
        console.error('model error',error)
    }    
)
camera.position.y=3
camera.rotation.x=-0.009


animate();
//Array(200).fill().forEach(addstar);


fetch('http://localhost:3000/api/employee')
.then(response=>response.json())
.then(data=>console.log('data from server:',data))
.catch(error=>console.error('error',error));


