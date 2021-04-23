
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
		modal_heading:[],
		modal_content:[],
		notification:[]
		
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
				   this.modal_content=" The density parameter, Ω, is defined as the ratio of the actual (or observed) density ρ to the critical density ρc."+
				   "For any quantity x the corresponding density parameter,it is Ωb=ρb/ρc";
					break;
			case 2:this.modal_heading="REDSHIFT";
					this.modal_content="Shift in wavelength of light due to relative motion betwee the observer and the source.";
					break;
			case 3:this.modal_heading="DARK ENERGY DENSITY PARAMETER";
				   this.modal_content=" The density parameter, Ω, is defined as the ratio of the actual (or observed) density ρ to the critical density ρc."+
				   "For any quantity x the corresponding density parameter,it is Ωb=ρb/ρc";
					break;
			case 4:this.modal_heading="RADIATION";
				   this.modal_content=" The density parameter, Ω, is defined as the ratio of the actual (or observed) density ρ to the critical density ρc."+
				   "For any quantity x the corresponding density parameter,it is Ωb=ρb/ρc";
					break;
			case 5:this.modal_heading="HUBBLE'S CONSTANT";
				   this.modal_content="The Hubble constant is a unit that describes how fast the universe is expanding at different distances from a particular point in space."+
				   "All of the galaxies in the universe appeared to be moving away from our planet. Furthermore, the farther a galaxy was, the faster it was receding."+ 
				   "This observation, which Hubble made in 1929, became the basis for what's known as Hubble's law, which states that there is a relationship between the distance an object in the cosmos is from us and the speed at which it is receding";
					break;
			case 6:this.modal_heading="COSMIC MICROWAVE BACKGROUND";
				   this.modal_content="According to Big Bang theory, temperatures and pressures for the first ~300,000 years of the Universe were such that atoms could not exist."+
				   "Matter was instead distributed as a highly ionised plasma which was very efficient at scattering radiation. The result was that information (photons) from the"+ 
				   "early Universe were effectively trapped in an inpenetrable ‘fog’ which, to this day, hides these early times from astronomers."+
				   "As the Universe expanded, however, its temperature and density dropped to a point where the atomic nuclei and electrons were able to combine to form atoms."+ 
				   "This is known as the epoch of recombination, and it is at this time that photons were finally able to escape the fog of the early Universe and travel freely."+
				   "The Cosmic Microwave Background radiation (CMB) is the record of these photons at the moment of their escape.";
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
	},

});