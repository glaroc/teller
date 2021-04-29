
var MapZ = {
	map: {}, layer1: {}, basemaps: {}, step: 0,

	init: function(){
		var self=this
		$('#splash-next').click(function(){
			$('html, body').animate({
			    scrollTop: $("#map1").offset().top
			}, 1500);		
		})
		$('#map-next').click(function(){

			$('#map-overlay').animate({
				'margin-right' : 0,
				opacity: 1,
			},1000)
		})
		this.createMap();
	},
	createMap: function(){
		var self=this
		self.basemaps = {
			osm: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			satellite: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
		}
		self.map = L.map('map1',{scrollWheelZoom: false}).setView([45.5,-73.3], 5);
		L.tileLayer(self.basemaps.satellite).addTo(self.map);
	},
	addLayer1: function(){
		var self=this
		if($.isEmptyObject(self.layer1)){
			$.get("https://cartodb.ecoconnect.net/user/resnet-admin/api/v2/sql?q=SELECT a.the_geom as the_geom, b.livestock as livestock FROM \"resnet-admin\".munic_shp_clean a LEFT JOIN \"resnet-admin\".final_all_es_join b ON a.muni_name=b.muni_name&api_key=_mn4R8PisfU7Y-3lBWmHMw&format=geojson", function(data){
				self.layer1 =  L.geoJson(data, {
					style: function(feature) {
					  return {
					    fillOpacity: 0,
					    opacity: 0.8,
					    color: '#99c63d',
					    fillColor: '#99c63d',
					    stroke: true
					  }
					},
					onEachFeature: function(feature,layer) {
					    layer.on('click',function() {
					    	alert(layer.feature.properties.livestock)
					    });
					}
				}).addTo(self.map).bringToFront();
			})
		}
	},
	actOnScroll: function(pos){
		if(pos >= 0.1 & pos< 0.5){
			if(this.step !== 1){
				this.map.flyTo([45.5,-73.3], 9);
				this.addLayer1()
				this.step = 1
				$('#map-overlay').animate({
				  opacity: 0,
				  "margin-right":-555
				},250)
			}
		}else if(pos >= 0.5){
			if(this.step !== 2){
				this.map.flyTo([45.2,-73], 12);
				$('#map-overlay').animate({
				  opacity: 1,
				  "margin-right":0
				},250)
				this.step = 2
			}
		}
	}
}

