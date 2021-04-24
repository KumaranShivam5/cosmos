import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';

import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js'

// We need 3 things everytime we use Three.js
 // Scene + Camera + Renderer
 const scene = new THREE.Scene()
 //const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

 var width = window.innerWidth;
 var height = window.innerHeight;
 const camera = new THREE.OrthographicCamera( width / - 2 , width / 2, height / 2, height / - 2, 1, 1000);
 const renderer = new THREE.WebGLRenderer({ antialias: true})
 
 renderer.setSize( window.innerWidth, window.innerHeight )
 // sets renderer background color
 //renderer.setClearColor("#222222")




 var canvas = document.getElementById( 'viewport' );

 canvas.appendChild( renderer.domElement );



 //document.body.appendChild( renderer.domElement )
 camera.position.z = 5
 






 const controls = new OrbitControls( camera, renderer.domElement );
 controls.maxPolarAngle = 0.9 * Math.PI / 2;
 controls.enableZoom = true;



 // resize canvas on resize window
 window.addEventListener( 'resize', () => {
     let width = window.innerWidth
     let height = window.innerHeight
     renderer.setSize( width, height )
     camera.left = width / - 2;
     camera.right = width / 2;
     camera.top = height / 2 
     camera.bottom =  height / -2 
     camera.updateProjectionMatrix()
 })

 // basic cube
 var geometry = new THREE.BoxGeometry( 1, 1, 1)
 var material = new THREE.MeshStandardMaterial( { color: 0xff0051, flatShading: true, metalness: 0, roughness: 1 })
 var cube = new THREE.Mesh ( geometry, material )
 scene.add( cube )
 
 // wireframe cube
 var geometry = new THREE.BoxGeometry( 3, 3, 3)
 var material = new THREE.MeshBasicMaterial( {
     color: "#dadada", wireframe: true, transparent: true
 })



 var wireframeCube = new THREE.Mesh ( geometry, material )
 scene.add( wireframeCube )
 
 // ambient light
 var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2)
 scene.add( ambientLight )
 
 // point light
 var pointLight = new THREE.PointLight( 0xffffff, 1 );
 pointLight.position.set( 25, 50, 25 );
 scene.add( pointLight );
 



 /*
 const loader = new GLTFLoader();

 loader.load( '../model/untitled.glb', function ( gltf ) {
 
     scene.add( gltf.scene );
 
 }, undefined, function ( error ) {
 
     console.error( error );
 
 } );

 */

 var wire_mat = new THREE.MeshBasicMaterial( {
    color: "#4fffca", wireframe: false, transparent: false
})

var cmb = new THREE.Object3D

 {
    const objLoader = new OBJLoader();
    objLoader.load('../model/cmb.obj', (root) => {
        
        root.traverse( function (child)
                {
                    if ( child instanceof THREE.Mesh )
                    {
                        child.material =  wire_mat;
                    }
                });



        cmb = root;
        cmb.scale.set(2.8,2.8,2.8);
        cmb.position.set(-width/6,0,0)


        scene.add(cmb);
    });
  }

 
  function animate() {
    requestAnimationFrame( animate )
    cmb.rotation.x += 0.002;
    //cmb.rotation.y += 0.04;
    wireframeCube.rotation.x -= 0.01;
    wireframeCube.rotation.y -= 0.01;
    renderer.render( scene, camera )
}
animate()