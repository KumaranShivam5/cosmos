
var interface_disp = new Vue({
	el: '#interface-js-area',

	data: {
		om_m: 0.5,
		om_r: 0.0,
		om_v: 0.5,
		k: 0,
		H_0: 69.7,
		z: 0,
		flag_activate: false,
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
				this.flag_activate=true;
				$(".slide-radio1").attr("checked", false);
				$(".slide-radio2").attr("checked", true);
				$(".slide-radio3").attr("checked", false);
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
				$(".slide-radio1").attr("checked", true);
				$(".slide-radio2").attr("checked", false);
				$(".slide-radio3").attr("checked", false);
				$("#s1").removeClass('slider-op2')
				$("#s2").removeClass('slider-op2')
				$("#s3").removeClass('slider-op2')
				$("#s1").removeClass('slider-op3')
				$("#s2").removeClass('slider-op3')
				$("#s3").removeClass('slider-op3')
			}
			if(i==2) {
				$(".slide-radio1").attr("checked", false);
				$(".slide-radio2").attr("checked", true);
				$(".slide-radio3").attr("checked", false);
				$("#s1").removeClass('slider-op3')
				$("#s2").removeClass('slider-op3')
				$("#s3").removeClass('slider-op3')
				$("#s1").addClass('slider-op2')
				$("#s2").addClass('slider-op2')
				$("#s3").addClass('slider-op2')
			}
			if(i==3) {
				$(".slide-radio1").attr("checked", false);
				$(".slide-radio2").attr("checked", false);
				$(".slide-radio3").attr("checked", true);
				$("#s1").removeClass('slider-op2')
				$("#s2").removeClass('slider-op2')
				$("#s3").removeClass('slider-op2')
				$("#s1").addClass('slider-op3')
				$("#s2").addClass('slider-op3')
				$("#s3").addClass('slider-op3')
			}
		},
	},

	mounted() {
		

	},

	updated() {
	
	},

});