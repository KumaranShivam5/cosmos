import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js'


cmb_disp();

function cmb_disp() {
    var canvas = document.getElementById('cmb_viewport');
    var width = canvas.offsetWidth - 5;
    console.log(width);
    var height = canvas.offsetHeight - 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height);
    canvas.appendChild(renderer.domElement);


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)


    function add_sphere() {
        const sphere_geom = new THREE.SphereGeometry(3, 32, 32);
        const sphere_mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const sphere = new THREE.Mesh(sphere_geom, sphere_mat);
        scene.add(sphere);
    }
    add_sphere();



    var loader = new GLTFLoader();
    loader.load(
        "/cmb.glb",
        function (gltf) {
            var scale = 5.6;
            bus.body = gltf.scene.children[0];
            bus.body.name = 'body';
            bus.body.rotation.set(0, -1.5708, 0);
            bus.body.scale.set(scale, scale, scale);
            bus.body.position.set(0, 3.6, 0);
            bus.body.castShadow = true;
            bus.frame.add(bus.body);
        },
    ); 
    scene.add(bus.frame)




    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(25, 50, 25);
    scene.add(pointLight);


    renderer.render(scene, camera)


    camera.position.z = 10




    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = 0.9 * Math.PI / 2;
    controls.enableZoom = true;



    window.addEventListener('resize', () => {
        console.log('updating');
        let width = document.getElementById('cmb_viewport').offsetWidth - 5;
        let height = document.getElementById('cmb_viewport').offsetHeight - 5;
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