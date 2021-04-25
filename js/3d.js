import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';

import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js'




import Stats from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/libs/stats.module.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/libs/dat.gui.module.js';


import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/UnrealBloomPass.js';

let composer, stats, clock ; 

const params = {
    exposure: 1.2,
    bloomStrength: 1.1,
    bloomThreshold: 0,
    bloomRadius: 1.0
};


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 45 , window.innerWidth / window.innerHeight, 0.1, 1000 )

var width = window.innerWidth;
var height = window.innerHeight;

//const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 10000000);


const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

renderer.setSize(window.innerWidth, window.innerHeight)
// sets renderer background color
renderer.setClearColor("#222222", 0)
//renderer.toneMapping = THREE.ReinhardToneMapping;



var canvas = document.getElementById('viewport');

stats = new Stats();
canvas.appendChild(stats.dom);

clock = new THREE.Clock();

canvas.appendChild(renderer.domElement);



//document.body.appendChild( renderer.domElement )
camera.position.z = 600







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

var bb_cold_light = new THREE.PointLight('#1111ff', 100, 0);
bb_cold_light.position.set(width / 6, 0, 0);
scene.add(bb_cold_light);



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
        cmb.scale.set(1, 1, 1);
        cmb.position.set(-0.05*width, 0, 0)


        scene.add(cmb);
    });
}

// adding position plane

const ring_geometry = new THREE.RingGeometry( 160, 200, 64 );
const ring_mat = new THREE.MeshStandardMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const ring = new THREE.Mesh( ring_geometry, ring_mat );
ring.rotation.y= -Math.PI/2;
ring.position.x = -80 
scene.add( ring );


const bb_center_geom = new THREE.SphereGeometry( 10, 32, 32 );
const bb_center_material = new THREE.MeshStandardMaterial( {color: 0xffff00} );
const bb_center = new THREE.Mesh( bb_center_geom, bb_center_material );
bb_center.position.x = -200 ;
scene.add( bb_center );


// position plane ends here
const star_material = new THREE.MeshStandardMaterial( {color: 0xffff00} );
let star , star_geom , star_arr = []
var N_star = 1000
var i;

function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}


for(i=0 ; i<N_star ; i++){
    star_geom = new THREE.SphereGeometry( 1 , 16, 16 );
    star = new THREE.Mesh( star_geom , star_material );
    //star.position.x = Math.random() * 200 - 250 ;
    //star.position.y = Math.random() * 200 -100  ;
    star.position.x = randn_bm() * 30 - 120 ;
    star.position.y = randn_bm() * 30 - 5  ;

    star_arr.push(star)
}

for(i=0;i<N_star;i++){
    scene.add(star_arr[i]);
}





const gui = new GUI();

gui.add(params, 'exposure', 0.1, 2).onChange(function (value) {

    renderer.toneMappingExposure = Math.pow(value, 4.0);

});

gui.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function (value) {

    bloomPass.threshold = Number(value);

});

gui.add(params, 'bloomStrength', 0.0, 3.0).onChange(function (value) {

    bloomPass.strength = Number(value);

});

gui.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function (value) {

    bloomPass.radius = Number(value);

});



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
   
    //stats.update();
    renderer.render(scene, camera);
    composer.render();
}
animate()