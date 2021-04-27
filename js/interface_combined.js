


var int_flag
//import * as CMB from './cmb_script.js'


//import {total_age_of_universe , age_where_we_are} from './main.js';

var interface_disp = new Vue({
	el: '#interface-js-area',

	data: {
		//input
		om_m: 0.27,
		om_r: 0.0,
		om_v: 0.73,
		om_k: 0,
		T_0:2.7,
		H_0: 69.7,
		z: 0,
		
		//output
		age:0,
		look_back:0,
		cmb:0,
		com_dist:0,
		ang_dia:0,
		H_val:0,
		lum_dist:0,
		plot_1:[],
		plot_2:[],
		
		//flag_activate: false,
		description_modal:false,
		description_curve:"flat",
		modal_heading: "Welcome",
		modal_content: "Ushasi and Kumaran's Cosmology Calculator",
		notification:[],
		universe_status:[],
		year:0
		
	},

	methods: {
		calc_output() {
			this.om_k=1-parseFloat(this.om_v)-parseFloat(this.om_m)-parseFloat(this.om_r);
			
			int_flag=0;
			//checks here
			if(this.om_m<0 || this.om_m>1) {int_flag=1; this.notification="invalid matter density parameter,";}
			if(this.om_r<0 || this.om_r>1) {int_flag=1; this.notification+="\n invalid radiation density parameter,";}
			if(this.om_v<0 || this.om_v>1) {int_flag=1; this.notification+="\n invalid dark energy parameter,";}
			if(this.z<0) {int_flag=1; this.notification+="\n invalid redshifts";}
			if(int_flag==0)	{ 
				//this.flag_activate=true;
				this.posting_stuff();
				$("#slider_1").attr("checked", false);
				$("#slider_2").attr("checked", true);
				$("#slider_3").attr("checked", false);
				$("#s1").removeClass('slider-op3')
				$("#s2").removeClass('slider-op3')
				$("#s3").removeClass('slider-op3')
				$("#s1").addClass('slider-op2')
				$("#s2").addClass('slider-op2')
				$("#s3").addClass('slider-op2')
				
			}
			if(int_flag==1) {
					$('.hover_bkgr_fricc').show();
			}

			
		},
		
		other_curvatures() {
			this.om_k=1-parseFloat(this.om_v)-parseFloat(this.om_m)-parseFloat(this.om_r);
			var temp=this.om_k.toFixed(6);
			if(temp>0) this.description_curve="Open";
			if(temp<0) this.description_curve="Closed";
			if(temp==0) this.description_curve="Flat";
			
		},
		
		alter_status() {
			if(this.z<370000) this.universe_status="Hot soup of plasma";
			else if(this.z<150000000) this.universe_status="Pretty Dark!";
			else if(this.z<700000000) this.universe_status="Some stars, but pre-reionisation";
			else this.universe_status="Modern universe with galaxies and stuff...";
		},
		
		posting_stuff()	{
			var data_to_send = JSON.stringify({
				"zgal": parseFloat(this.z),
				"om_m": parseFloat(this.om_m),
				"om_r": parseFloat(this.om_r),
				"om_k": 0,
				"om_v": parseFloat(this.om_v),
				"T_0": parseFloat(this.T_0),
				"H_0": parseFloat(this.H_0)
			})
			
			axios.post(
				"https://ushasi.pythonanywhere.com/calc/get_all/", 
				data_to_send,
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
				)
				.then(response => {
					console.log(response);
					this.age=response.data.age;
					this.look_back=response.data.look_back;
					this.cmb=response.data.cmb;
					this.com_dist=response.data.com_dist;
					this.ang_dia=response.data.ang_dia;
					this.H_val=response.data.H_val;
					this.lum_dist=response.data.lum_dist;
					this.plot_1="data:image/png;base64,"+response.data.plot_1;
					this.plot_2="data:image/png;base64,"+response.data.plot_2;
					
					this.year=this.look_back-2021;
					toString(this.year);
					console.log(this.year);
					if(this.year>0)	this.year=JSON.stringify(this.year)+" BC";
					else this.year=JSON.stringify(-this.year)+" AD";
					this.alter_status();
					
					
				})
				.catch(e => {
					console.log(e);
				});
		},
		
		hide_notification() {
			$('.hover_bkgr_fricc').hide();
		},
		
		func_navigate(i) {
			if(i==1) {
				$("#slider_1").attr("checked", true);
				$("#slider_2").attr("checked", false);
				$("#slider_3").attr("checked", false);
				$("#s1").removeClass('slider-op2')
				$("#s2").removeClass('slider-op2')
				$("#s3").removeClass('slider-op2')
				$("#s1").removeClass('slider-op3')
				$("#s2").removeClass('slider-op3')
				$("#s3").removeClass('slider-op3')
			}
			if(i==2) {
				$("#slider_1").attr("checked", false);
				$("#slider_2").attr("checked", true);
				$("#slider_3").attr("checked", false);
				$("#s1").removeClass('slider-op3')
				$("#s2").removeClass('slider-op3')
				$("#s3").removeClass('slider-op3')
				$("#s1").addClass('slider-op2')
				$("#s2").addClass('slider-op2')
				$("#s3").addClass('slider-op2')
			}
			if(i==3) {
				$("#slider_1").attr("checked", false);
				$("#slider_2").attr("checked", false);
				$("#slider_3").attr("checked", true);
				$("#s1").removeClass('slider-op2')
				$("#s2").removeClass('slider-op2')
				$("#s3").removeClass('slider-op2')
				$("#s1").addClass('slider-op3')
				$("#s2").addClass('slider-op3')
				$("#s3").addClass('slider-op3')
			}
		},
		
		maneover_modals(i)	{
			this.description_modal=true;
			switch(i)	{
			case 1:this.modal_heading="MATTER DENSITY PARAMETER";
				   this.modal_content="The critical density is the density required to halt the expansion of the universe. i.e, just the right amount of matter and "+ 
				   "radiation and everything else to stop the universe from expanding. This parameter is a measure of how much of that density is taken up by matter. This includes all"+
				   " the atoms and molecules that make up the universe, along with the elusive dark matter.";
					break;
			case 2:this.modal_heading="REDSHIFT";
					this.modal_content="As everything in the universe moves away from everything else, the photons emitted from such stuff undergo redshift, i.e. the frequency "+
					"we observe them at is redder than what was emitted, or at a lower frequency. Thus this parameter is a measure of how much deviation from the actual frequency "+
					"or wavelength we observe.";
					break;
			case 3:this.modal_heading="DARK ENERGY DENSITY PARAMETER";
				   this.modal_content="The critical density is the density required to halt the expansion of the universe. i.e, just the right amount of matter and "+ 
				   "radiation and everything else to stop the universe from expanding. This parameter is a measure of how much of that density is taken up by dark energy. This was introduced"+
				   " in order to explain why the universe we live in is flat, despite it not having enough substance to make it so.";
					break;
			case 4:this.modal_heading="RADIATION DENSITY PARAMETER";
				   this.modal_content="The critical density is the density required to halt the expansion of the universe. i.e, just the right amount of matter and "+ 
				   "radiation and everything else to stop the universe from expanding. This parameter is a measure of how much of that density is taken up by radiation.";
					break;
			case 5:this.modal_heading="HUBBLE'S CONSTANT";
				   this.modal_content="The Hubble constant is a unit that describes how fast the universe is expanding at different distances from a particular point in space. "+
				   "All of the galaxies in the universe appeared to be moving away from our planet. Furthermore, the farther a galaxy was, the faster it was receding. "+ 
				   "This observation, which Hubble made in 1929, became the basis for what's known as Hubble's law, which states that there is a relationship between the distance "+ 
				   "an object in the cosmos is from us and the speed at which it is receding";
					break;
			case 6:this.modal_heading="COSMIC MICROWAVE BACKGROUND";
				   this.modal_content="According to Big Bang theory, temperatures and pressures for the first ~300,000 years of the Universe were such that atoms could not exist."+
				   "Matter was instead distributed as a highly ionised plasma which was very efficient at scattering radiation. The result was that information (photons) from the "+ 
				   "early Universe were effectively trapped in an inpenetrable ‘fog’ which, to this day, hides these early times from astronomers. "+
				   "As the Universe expanded, however, its temperature and density dropped to a point where the atomic nuclei and electrons were able to combine to form atoms. "+ 
				   "This is known as the epoch of recombination, and it is at this time that photons were finally able to escape the fog of the early Universe and travel freely. "+
				   "The Cosmic Microwave Background radiation (CMB) is the record of these photons at the moment of their escape. ";
					break;
			
			}
		},
		
		close_modals()	{
			this.description_modal=false;
		}
	},

	mounted() {
		////////////////////
		this.posting_stuff();



		///////////////////////

	},

	updated() {
		this.other_curvatures();
		//total_age_of_universe=this.age+this.lookback;
		//age_where_we_are=this.age;
		console.log("SETTING HALO POSITION")
		set_halo_loc(this.age);
	},

});














import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';

import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js'




import Stats from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/libs/stats.module.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/libs/dat.gui.module.js';


import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/UnrealBloomPass.js';

let composer, stats, clock;

const params = {
    exposure: 1.2,
    bloomStrength: 1.1,
    bloomThreshold: 0,
    bloomRadius: 1.0,
    HaloLoc: 80
};

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

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
//canvas.appendChild(stats.dom);

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
var bb_light = new THREE.PointLight('#ff2986', 100, 0);
bb_light.position.set(-width / 6, 0, 0);
scene.add(bb_light);

var bb_cold_light = new THREE.PointLight('#1111ff', 100, 0);
bb_cold_light.position.set(width / 6, 0, 0);
scene.add(bb_cold_light);



var cmb = new THREE.Object3D
var scatter_particle_set = new THREE.Object3D
var structure_formation = new THREE.Object3D

{
    const objLoader = new OBJLoader();
    objLoader.load('../model/cmb_v2.obj', (root) => {

        root.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = wire_mat;
            }
        });
        cmb = root;
        cmb.scale.set(1, 1, 1);
        cmb.position.set(-0.05 * width, 0, 0)
        scene.add(cmb);
    });
    objLoader.load('../model/dark_age.obj', (root) => {

        root.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material =  new THREE.MeshStandardMaterial({color: "#000000"})
            }
        });
        //cmb = root;
        //cmb.scale.set(1, 1, 1);
        root.position.set(-0.05 * width, 0, 0)
        scene.add(root);
    });
    objLoader.load('../model/scatter_particle.obj', (root) => {
        
        root.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material =  new THREE.MeshStandardMaterial({color: "#ffffff"})
            }
        });

        scatter_particle_set = root
        root.position.set(-0.05 * width, 0, 0)
        scene.add(root);
    });
    objLoader.load('../model/structure_formation.obj', (root) => {
        structure_formation = root
        root.position.set(-0.05 * width, 0, 0)
        scene.add(root);
    });
}

// adding position plane

const ring_geometry = new THREE.RingGeometry(160, 200, 64);
const ring_mat = new THREE.MeshStandardMaterial({ color:'#111111', side: THREE.DoubleSide });
const ring = new THREE.Mesh(ring_geometry, ring_mat);
ring.rotation.y = -Math.PI / 2;
ring.position.x = -80
scene.add(ring);

const loader = new THREE.FontLoader();


let loc_font_geom
loader.load('../fonts/helvetiker_regular.typeface.json', function (font) {

    const geometry = new THREE.TextGeometry('Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
    });
    loc_font_geom = font;
});

const font_mat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const address = new THREE.Mesh(loc_font_geom, font_mat);
address.rotation.y = -Math.PI / 2;
address.position.x = -80
scene.add(address);

// positipn plane ends here


const bb_center_geom = new THREE.SphereGeometry(10, 32, 32);
const bb_center_material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const bb_center = new THREE.Mesh(bb_center_geom, bb_center_material);
bb_center.position.x = -180;
scene.add(bb_center);


// position plane ends here
const star_material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
let star, star_geom, star_arr = []
var N_star = 2000
var i;

function randn_bm() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// BIG BANG EXPLOSION
i = 0
while (i < N_star) {
    star_geom = new THREE.SphereGeometry(1, 8, 8);
    star = new THREE.Mesh(star_geom, star_material);
    //star.position.x = Math.random() * 200 - 250 ;
    //star.position.y = Math.random() * 200 -100  ;
    var position_x = randn_bm() * 20 - 150
    if (position_x > -180) {
        star.position.x = position_x;
        star.position.y = randn_bm() * 35;
        star.position.z = randn_bm() * 35;
        star_arr.push(star);
        i++
    }
}

for (i = 0; i < N_star; i++) {
    scene.add(star_arr[i]);
}


/*



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

//gui.add(params, 'position', -80 , 80).onChange(function (value) {

//  ring.position.x = Number(value);

//});

gui.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange(function (value) {

    bloomPass.radius = Number(value);

});

*/



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
    scatter_particle_set.rotation.x += 0.002
    structure_formation.rotation.x += 0.002
    //cmb.rotation.y += 0.04;

    //stats.update();
    renderer.render(scene, camera);
    composer.render();
}
animate()



/*
let big_bang = 0 
let epoch_of_recom = 370*10^3
let dark_age = 150*10^6
let epoch_of_reion = 700*10^6
*/

const epoch_big_bang = 0 
const epoch_recom = 370*10**3
const epoch_dark_age = 150*10**6
const epoch_reion = 700*10**6
const epoch_now =  13935216939.08 

const halo_big_bang = -180 
const halo_recom = -100 
const halo_dark_age = -40
const halo_reion = 60 
const halo_now = 200


function linear_interp(x , x1,x2 , y1 , y2){
    var slope = (y2-y1)/(x2-x1)
    var y = y1+(x-x1)*slope
    return y
}

function interp_04(x){
    var y1 = halo_recom
    var y2 = halo_big_bang 
    var x1 = epoch_recom
    var x2 = epoch_big_bang
    var y = linear_interp(x , x1,x2,y1,y2)
 

	return y 
}


function interp_03(x){
    var y1 = halo_dark_age
    var y2 = halo_recom 
    var x1 = epoch_dark_age
    var x2 = epoch_recom
    var y = linear_interp(x , x1,x2,y1,y2)
    return y 
}
function interp_02(x){
    var y1 = halo_reion 
    var y2 = halo_dark_age
    var x1 = epoch_reion
    var x2 = epoch_dark_age
    var y = linear_interp(x , x1,x2,y1,y2)
    return y 
}
function interp_01(x){
    var y1 = halo_now 
    var y2 = halo_reion 
    var x1 = epoch_now 
    var x2 = epoch_reion
    var y = linear_interp(x , x1,x2,y1,y2)
    return y 
}




var current_loc_trial = 10 


//console.log('interpolation triAL' , trial_halo_loc)

function set_halo_loc(now) {
    var halo_loc
    console.log('inside halo' , now);
    if(now >= epoch_reion){
		console.log('inside REGION 01' , now , epoch_reion)
        halo_loc =  interp_01(now) ;
    } 
	if(now >= epoch_dark_age && now < epoch_reion){
		console.log('inside REGION 02')
		halo_loc =  interp_02(now) ;
	}
	if(now >= epoch_recom && now < epoch_dark_age){
		console.log('inside REGION 03')
		halo_loc =  interp_03(now) ;
	}
	if(now >= epoch_big_bang && now < epoch_recom){
		console.log('inside REGION 04')
		halo_loc =  interp_04(now) ;
	}
	console.log('current halo position' , halo_loc);
    ring.position.x = Number(halo_loc);
	
    //renderer.render(scene, camera);
    //composer.render();
};
//export {set_halo_loc}

//export {total_age_of_universe , age_where_we_are}
//set_halo_loc(age_where_we_are)