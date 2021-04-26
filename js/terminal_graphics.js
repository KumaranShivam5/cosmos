import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js'


cmb_disp();

function cmb_disp() {
    var canvas = document.getElementById('cmb_viewport');
    var width = canvas.offsetWidth;
    console.log(width);
    var height = canvas.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)



    window.addEventListener('resize', () => {
        console.log('updating');
        let width = document.getElementById('cmb_viewport').offsetWidth;
        let height = document.getElementById('cmb_viewport').offsetHeight;
        renderer.setSize(width, height)
        camera.left = width / - 2;
        camera.right = width / 2;
        camera.top = height / 2
        camera.bottom = height / -2
        camera.updateProjectionMatrix()
    })


    function animate() {
        requestAnimationFrame(animate)
        //cmb.rotation.x += 0.002;
        //cmb.rotation.y += 0.04;

        //stats.update();
        renderer.render(scene, camera);

    }
    animate()

}