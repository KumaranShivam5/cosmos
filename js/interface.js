
var interface_disp = new Vue({
	el: '#interface-js-area',

	data: {
		om_m: 0.5,
		om_r: 0.0,
		om_v: 0.5,
		k: 0,
		T_0:2.7,
		H_0: 69.7,
		z: 0,
		
		//flag_activate: false,
		description_modal:false,
		modal_heading:[],
		modal_content:[],
		notification:[]
		
	},

	methods: {
		calc_output() {
			int_flag=0;
			//checks here
			if(this.om_m<0 || this.om_m>1) {int_flag=1; this.notification="invalid matter density parameter,";}
			if(this.om_r<0 || this.om_r>1) {int_flag=1; this.notification+="\n invalid radiation density parameter,";}
			if(this.om_v<0 || this.om_v>1) {int_flag=1; this.notification+="\n invalid dark energy parameter,";}
			if(this.z<0) {int_flag=1; this.notification+="\n invalid redshifts";}
			if(int_flag==0)	{ 
				//this.flag_activate=true;
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
		

	},

	updated() {
	
	},

});