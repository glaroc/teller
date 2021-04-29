
$(document).ready(function(){
    MapZ.init()
})

var MapZ = {
    map: {}, layer1: {}, basemaps: {}, step: 0, layers: {}, scenes: {},

    init: function(){
        var self=this
        this.createMap();
    },   

    createMap: function(){
        var self = this
        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        layers = {}
        scenes = {}
        baselayer = {}
        $('.layers').each(function(){
            var thisl = this
            if($(this).attr('base-layer')){
                baselayer=$(this).attr("layer-name")
            }
            options = {}
            $('.layer-options').each(function(){
                if($(this).attr('layer')==$(thisl).attr("layer-name")){
                    options[$(this).attr("opt-name")] = $(this).attr("opt-value")
                }
            })
            styles = {}
            $('.layer-style').each(function(){
                if($(this).attr('layer')==$(thisl).attr("layer-name")){
                    styles[$(this).attr("style-name")] = $(this).attr("style-value")
                }
            })
            options.style=styles
            if ($(this).attr('layer')=='L.svgOverlay'){
                bounds=[ [ 45.3, -73.4 ], [ 45.13, -73.16 ] ]
                layer=eval($(this).attr("layer-type")+'(svgElement,'+bounds+','+JSON.stringify(options)+')')
            }else{
                layer=eval($(this).attr("layer-type")+'("'+decodeURI($(this).attr("layer-src"))+'",'+JSON.stringify(options)+')')
            }
            layers[$(this).attr("layer-name")] = {
                layer: layer,
                legend: $(this).attr("legend"),
            }
        })

        $('section').each(function(){
            lyr=[]
            l=$(this).attr("layers").split(",")
            $.each(l,function(){
                if(typeof this !== undefined){
                    lyr.push(layers[this])
                }
            })
            if(lyr.length==1 && lyr[0]==undefined){
                lyr=''
            }
            lat=parseFloat($(this).attr("lat"))
            lng=parseFloat($(this).attr("lng"))
            zoom=parseInt($(this).attr("zoom"))
            eval('var fn = function(){'+$(this).attr("init-js")+'}')
            scenes[$(this).attr("data-scene")] = {
                lat: lat,
                lng: lng,
                zoom: zoom,
                layers: lyr,
                name: $(this).attr("data-scene"),
                script: fn,
            }
        })

        $('#storymap').storymap({
            scenes: scenes,
            baselayer: layers[baselayer],
            legend: true,
            loader: true,
            flyto: true,
            credits:  "",
            scalebar: true,
            scrolldown: true,
            progressline: true,
            navwidget: true,
            mapinteraction: true,
            createMap: function () {
                var map = L.map($(".storymap-map")[0], {zoomControl: true}).setView([45, -73], 7);
                basemap = this.baselayer.layer.addTo(map);
                return map;
            }
        });
    },
}