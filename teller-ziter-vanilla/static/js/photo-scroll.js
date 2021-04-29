
var PhotoS = {
	photos: [], step: -1,

	init: function(){
		this.photos= [
			{
			img: "DSC_7681.jpeg",
			text: "<h2>Field notes are taken</h2><p> This is an interesting part of the project where random text is being written to fill some space.</p><p>Not sure what to write here, so just going along and writing anything. This really is a great project.</p><p>Not sure what to write here, so just going along and writing anything. This really is a great project.</p><p>Not sure what to write here, so just going along and writing anything. This really is a great project.</p><p>Not sure what to write here, so just going along and writing anything. This really is a great project.</p><p>Not sure what to write here, so just going along and writing anything. This really is a great project.</p><p>Not sure what to write here, so just going along and writing anything. This really is a great project.</p>",
			threshold: 0,
			},
			{
			img: "DSC_7751.jpeg",
			text: "<h2>Soil samples are also taken</h2><p> Soil is a fundamental component of ecosystem services provisioning.  This really is a great project." ,
			threshold: 0.5,
			}
		]
	},

	actOnScroll: function(pos){
		var self=this
		var newstep = 0
		self.photos.map(function(p,i){
			var pp=0 //next threshold
			if((i+1)==self.photos.length){
				pp=1
			}else{
				pp=self.photos[i+1].threshold
			}
			if(pos>p.threshold && pos<pp){
				newstep = i
			}
		})
		if(self.step !== newstep) {
			self.step=newstep
			$(".photos-scroll-left").fadeOut(5, function() {
				$(".photos-scroll-left").css({background: "url('/img/"+self.photos[self.step].img+"')"})
			}).fadeIn(2000)
			$(".photos-scroll-text").fadeOut(5, function() {
				$(".photos-scroll-text").html(self.photos[self.step].text)
			}).fadeIn(2000)
		}
		var in_p=pos-self.photos[self.step].threshold
		$(".photos-scroll-text").css({"margin-top":200+-1*$(window).height()*(in_p)})
		if(in_p<=0.05){
			$(".photos-scroll-text").css({opacity:0})
		}else{
			$(".photos-scroll-text").css({opacity:1})
		}
	}
}

