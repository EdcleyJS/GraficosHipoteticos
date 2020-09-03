var left=200,right=500,database,interOn,opcoes=[],LayerRange,layerTuto4,dataset,max,featurename,selecionados=[],medias=[],hops=true;
var mapVis02 = L.map('vis02',{zoomControl: false,preferCanvas: true,attributionControl: false,crs: L.CRS.Simple}).setView([0.203125,0.6640625], 6);
var mapVisPerguntas = L.map('visPerguntas',{zoomControl: false,preferCanvas: true,attributionControl: false,crs: L.CRS.Simple}).setView([0.203125,0.6640625], 6);
mapVis02.doubleClickZoom.disable();
mapVis02.scrollWheelZoom.disable();
mapVisPerguntas.doubleClickZoom.disable();
mapVisPerguntas.scrollWheelZoom.disable();
var grades;
var bounds = [[0,0], [1000,1000]];
var geodata;

var firstTime = true;

var url_string = window.location.href
var url = new URL(url_string);
var polyfile,polygon;
var distributionfile;
var distribution,distribution_data;
var etapa_perguntas=false;
function Start_Update_data(){
  hops=false;
  if(!polyfile) {
    polyfile = "./data/polygons.geojson";
  }else{
    polyfile = polygon;
  }
  d3.json(polyfile,function(error,polygons_far){
    geodata=polygons_far;
  });
  if(!distributionfile) {
    distributionfile = "./data/distribuicao.json";
  }else{
    distributionfile = distribution;
  }
  d3.json(distributionfile,function(error,dist){
    menor = Infinity
    maior = -Infinity
    for(let key in dist){
      let values = dist[key];
      for(key2 in values){
          let value = values[key2];
          if(value < menor) menor = value;
          if(value > maior) maior = value;
      }
    }
    //
    colorScale = d3.scale.quantile().domain([menor,maior]).range(['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b']); 
    grades = d3.scale.linear().domain([menor,maior]).ticks(12);

    addLegend();
    distribution_data=Object.keys(dist).map(function(key) {
      return [dist[key]];
    });
  });
  if(etapa_perguntas==true){
    VisPerguntas();
    bring_front(mapVisPerguntas);
    mapVisPerguntas.invalidateSize();
  }
  hops=true;
}
var infoVis02=L.control();
var legendVis02 = L.control({position: 'bottomright'});
var infoVisPerguntas=L.control();
var legendVisPerguntas = L.control({position: 'bottomright'});
function addLegend(){
  infoVis02.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };
  legendVis02.onAdd = function (mapprob_gerada) {
    var div = L.DomUtil.create('div', 'info legend');
    for (var i = (grades.length-1); i >=0 ; i--) {
        div.innerHTML +='<i style="color:'+color(grades[i])+'; background:'+color(grades[i])+'"></i>'+grades[i]+'</br>';
    }
    return div;
  };
  legendVis02.addTo(mapVis02);
  infoVisPerguntas.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };
  legendVisPerguntas.onAdd = function (mapprob_gerada) {
    var div = L.DomUtil.create('div', 'info legend');
    for (var i = (grades.length-1); i >=0 ; i--) {
        div.innerHTML +='<i style="color:'+color(grades[i])+'; background:'+color(grades[i])+'"></i>'+grades[i]+'</br>';
    }
    return div;
  };
  legendVisPerguntas.addTo(mapVisPerguntas);
}
//-- FUNÇÃO QUE DESENHA E CONTROLA AS AREAS NO MAPA --
var layerTuto2,layerPerguntas;
function Vis02TutorialFunction(){
  if(layerTuto2!= undefined){
      layerTuto2.clearLayers();
    }
    layerTuto2=L.geoJson(geodata,
      {style: function(feature){
          //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
      if(amostraN!=undefined){
        var prob_gerada= distribuicaoSin(feature.properties.id,distribution_data)[amostraN];
      }else{
        var probArea= new distribuicaoTeste(distribuicaoSin(feature.properties.id,distribution_data),0);
        var prob_gerada= probArea.media().toFixed(2);
      }
      if(feature.properties.highlight==1){
          if(feature.properties.id==0){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: color(prob_gerada),
              fillOpacity: 0.9,
              color: '#e66101'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: color(prob_gerada),
              fillOpacity: 0.9,
              color: '#d01c8b'
            };
          }
        }else{
              return {
                weight: 0.5,
                opacity: 1,
                fillColor: color(prob_gerada),
                color: 'black',
                fillOpacity: 0.9
              };
          }
    },
    onEachFeature: function (feature, layer) {
          layer.on('mouseover', function (e) {
              highlightFeature(e);
          });
          layer.on('mouseout', function (e) {
              layerTuto2.resetStyle(e.target);
          });
      }
  }).addTo(mapVis02);
  if(amostraN!=undefined){
    infoVis02.update = function (props) {
      this._div.innerHTML= '<h5>Informações gerais.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Amostra Nº'+amostraN+'.');
    };
  }else{
    infoVis02.update = function (props) {
      this._div.innerHTML= infoprops(props);
    };
  }
  infoVis02.addTo(mapVis02);
}
function VisPerguntas(){
    if(layerPerguntas!= undefined){
      layerPerguntas.clearLayers();
    }
    layerPerguntas=L.geoJson(geodata,
      {style: function(feature){
      if(amostraN!=undefined){
        var prob_gerada= distribuicaoSin(feature.properties.id,distribution_data)[amostraN];
      }else{
        var probArea= new distribuicaoTeste(distribuicaoSin(feature.properties.id,distribution_data),0);
        var prob_gerada= probArea.media().toFixed(2);
      }
      if(feature.properties.highlight==1){
          if(feature.properties.id==0){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: color(prob_gerada),
              fillOpacity: 0.9,
              color: '#e66101'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: color(prob_gerada),
              fillOpacity: 0.9,
              color: '#d01c8b'
            };
          }
        }else{
              return {
                weight: 0.5,
                opacity: 1,
                fillColor: color(prob_gerada),
                color: 'black',
                fillOpacity: 0.9
              };
          }
    },
    onEachFeature: function (feature, layer) {
          layer.on('mouseover', function (e) {
              highlightFeature(e);
          });
          layer.on('mouseout', function (e) {
              layerPerguntas.resetStyle(e.target);
          });
      }
  }).addTo(mapVisPerguntas);
  if(amostraN!=undefined){
    infoVisPerguntas.update = function (props) {
      this._div.innerHTML= '<h5>Informações gerais.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Amostra Nº'+amostraN+'.');
    };
  }else{
    infoVisPerguntas.update = function (props) {
      this._div.innerHTML= infoprops(props);
    };
  }
  infoVisPerguntas.addTo(mapVisPerguntas);
}