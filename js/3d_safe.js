import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';

import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js'




import Stats from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/libs/stats.module.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/libs/dat.gui.module.js';


import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/UnrealBloomPass.js';

let composer

const params = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0,
    bloomRadius: 0
};


const scene = new THREE.Scene()
//const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

var width = window.innerWidth;
var height = window.innerHeight;
const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

renderer.setSize(window.innerWidth, window.innerHeight)
// sets renderer background color
renderer.setClearColor("#222222", 0)
renderer.toneMapping = THREE.ReinhardToneMapping;



var canvas = document.getElementById('viewport');

canvas.appendChild(renderer.domElement);



//document.body.appendChild( renderer.domElement )
camera.position.z = 5







const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = 0.9 * Math.PI / 2;
controls.enableZoom = true;





scene.add(new THREE.AmbientLight(0x404040));

const pointLight_02 = new THREE.PointLight(0xffffff, 1);
camera.add(pointLight_02);


const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);









// resize canvas on resize window

// basic cube
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshStandardMaterial({ color: 0xff0051, flatShading: true, metalness: 0, roughness: 1 })
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// wireframe cube
var geometry = new THREE.BoxGeometry(3, 3, 3)
var material = new THREE.MeshBasicMaterial({
    color: "#dadada", wireframe: true, transparent: true
})



var wireframeCube = new THREE.Mesh(geometry, material)
scene.add(wireframeCube)

// ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

// point light
var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);




/*
const loader = new GLTFLoader();

loader.load( '../model/untitled.glb', function ( gltf ) {
 
    scene.add( gltf.scene );
 
}, undefined, function ( error ) {
 
    console.error( error );
 
} );

*/

var wire_mat = new THREE.MeshStandardMaterial({
    color: "#000000", wireframe: false, transparent: false
})

// point light
var bb_light = new THREE.PointLight('#ff1100', 100, 0);
bb_light.position.set(-width / 6, 0, 0);
scene.add(bb_light);



var cmb = new THREE.Object3D

{
    const objLoader = new OBJLoader();
    objLoader.load('../model/cmb.obj', (root) => {

        root.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = wire_mat;
            }
        });



        cmb = root;
        cmb.scale.set(2.8, 2.8, 2.8);
        cmb.position.set(-width / 6, 0, 0)


        scene.add(cmb);
    });
}




window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
    camera.left = width / - 2;
    camera.right = width / 2;
    camera.top = height / 2
    camera.bottom = height / -2
    camera.updateProjectionMatrix()
})


function animate() {
    requestAnimationFrame(animate)
    cmb.rotation.x += 0.002;
    //cmb.rotation.y += 0.04;
    wireframeCube.rotation.x -= 0.01;
    wireframeCube.rotation.y -= 0.01;
    renderer.render(scene, camera)
}
animate()