var sucesso=0;
function refresh(){
  if(sucesso==2){
      window.location.reload(true);
  }
}
function distribuicaoSin(id,disttomap){
  var distSin=[];
  disttomap.forEach(function(d,i){
    distSin.push(d[0][id]);
    if(maior<Number(d[0][id])){
      maior=d[0][id];
    }
    if(menor>Number(d[0][id])){
      menor=d[0][id];
    }
  });
  return distSin;
}
var maior=0,menor=+Infinity;
// PREPARA A INFORMAÇÃO DO MAPA COM BASE NO DATA SET E SE TIVER ALGUM FILTRO DE MES, TRIMESTRE, OU DIA ATIVADO.
function infoprops(props){
  return '<h4> Informações gerais.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
}
// DESTACA O LAYER DE UM POLIGONO NOS MAPAS
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 1.5,
    color: 'black',
    fillOpacity: 0.7
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
function color(prob){
  if(colorScale == undefined){
    var cbf = palette('cb-BuGn', 9);
    var color;
    grades_distance.forEach(function(d,i){
        if(Number(prob)>=d){
      color=cbf[i];
        }
    });
    return color;
  }else{
     return colorScale(prob);
  }
}
// ALTERA A ORDEM DE OBJETOS EM UM ARRAY DE MODO ALEATÓRIO
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
  }
  return array;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// QUANDO O RECPATHCA É COMPLETADO SUBMETE OS FORMS.
function recaptcha_callback(){
  tempofinal= new Date();
  duracaoPerguntas= tempofinal-tempotutorial;
  duracaoPerguntas=math.round(((duracaoPerguntas/1000)/60)*100)/100;

  duracao= tempofinal-tempoinicial;
  duracao=math.round(((duracao/1000)/60)*100)/100;
  $('#duracaototal').val(duracao);
  $('#duracaotutorial').val(duracaotutorial);
  $('#duracaoperguntas').val(duracaoPerguntas);
  var valor= $('#pergunta_text').val();
  $('#PGT_TESTE').val(valor);

  $('#5Form').submit();
  $('#feedback').val($('#feedback2').val());
  $('#ordem').val(arr.join());
  $('#4Form').submit();
  $('#vis').css('display','none');
  $('#footer').css('display','');
}
function StartHOPS(){
  hops=true;
}
function StopHOPS(){
  hops=false;
}
function bring_front(map){
  for (l in map._layers) {
      if(map._layers[parseInt(l)].feature!=undefined && map._layers[parseInt(l)].feature.properties.highlight==1){
      map._layers[parseInt(l)].bringToFront();
    }
  }
}
function geraperguntas(perguntas,index,vis){
  var d1= document.createElement("div");
  var d2= document.createElement("div");
  d2.setAttribute('class','card');
  var pergunta= perguntas[index-1];
  var label = document.createElement("label");
  label.setAttribute('style',"font-weight:bold;");
  label.setAttribute('for',"pergunta1");
  label.setAttribute('id',"pergunta1");
  label.innerText= pergunta.question_text;
      var div1 = document.createElement("div");
      div1.setAttribute('class','col-sm-3 col-md-3 col-lg-3 col-xl-3');

      var input1= document.createElement("input");
      input1.setAttribute('type','hidden');
      input1.setAttribute('class','clicks');
      input1.setAttribute('id','CLC'+pergunta.id);
      input1.setAttribute('name','CLC'+pergunta.id);
      input1.setAttribute('value','');

      var input2= document.createElement("input");
      input2.setAttribute('type','hidden');
      input2.setAttribute('class','tempo');
      input2.setAttribute('id','TMP'+pergunta.id);
      input2.setAttribute('name','TMP'+pergunta.id);
      input2.setAttribute('value','');

      var inputR= document.createElement("input");
      inputR.setAttribute('type','hidden');
      inputR.setAttribute('id','ANS'+pergunta.id);
      inputR.setAttribute('name','ANS'+pergunta.id);
      inputR.setAttribute('value',''+pergunta.answer);

      if(pergunta.size.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','SIZE:'+pergunta.size);
      }else if(pergunta.variance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','VARIANCE:'+pergunta.variance);
      }else if(pergunta.distance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','DISTANCE:'+pergunta.distance);
      }else{
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','');
      }

      if(pergunta.size.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','SIZE:'+pergunta.size);
      }else if(pergunta.variance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','VARIANCE:'+pergunta.variance);
      }else if(pergunta.distance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','DISTANCE:'+pergunta.distance);
      }else{
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','');
      }

      var label2 = document.createElement("label");
      label2.setAttribute('for','CNFC'+pergunta.id);
      label2.setAttribute('style',"font-weight:bold;");
      label2.innerText='De 1 a 5 sendo 1 pouco confiante e 5 muito confiante, quão confiante você está da sua resposta?';

      var input3= document.createElement("input");
      input3.setAttribute('type','text');
      input3.setAttribute('class','ioRangerSlider');
      input3.setAttribute('id','CNFC'+pergunta.id);
      input3.setAttribute('name','CNFC'+pergunta.id);
      input3.setAttribute('value','');
      input3.required=true;

      var input8= document.createElement("input");
      input8.setAttribute('type','text');
      input8.setAttribute('id',""+pergunta.id);
      input8.setAttribute('name',"PGT"+pergunta.id);
      input8.setAttribute('class','form-control');
      input8.setAttribute('value','');
      input8.setAttribute('placeholder','Ex: 50');
      input8.required=true;
        var input4= document.createElement("div");
        var input7= document.createElement("br");
        var input6= document.createElement("p");
        input4.setAttribute('class','invalid-feedback');
        input6.innerText='Você Precisa Inserir um Valor.';
        input4.appendChild(input7);
        input4.appendChild(input6);
      div1.appendChild(input8);
      div1.appendChild(input4);
      d2.appendChild(label);
      d1.appendChild(div1);
      d2.appendChild(d1);

  d2.appendChild(label2);
  d2.appendChild(input3);
  var input5= document.createElement("div");
  input5.setAttribute('class','invalid-feedback');
  input5.innerText='Você precisa escolher um';
  d2.appendChild(input5);
  d2.appendChild(input1);
  d2.appendChild(input2);
  d2.appendChild(inputR);
  d2.appendChild(inputS);
  return d2;
}
function proxima_view(id){
  switch(id) {
  case "01":
    polygon='./synthetic-data/data/distance/distance_near.geojson';
    distribution='./synthetic-data/data/distance/distance_1.json';
    break;
  case "02":
    polygon='./synthetic-data/data/distance/distance_near.geojson';
    distribution='./synthetic-data/data/distance/distance_2.json';
    break;
  case "03":
    polygon='./synthetic-data/data/distance/distance_near.geojson';
    distribution='./synthetic-data/data/distance/distance_3.json';
    break;
  case "04":
    polygon='./synthetic-data/data/distance/distance_near.geojson';
    distribution='./synthetic-data/data/distance/distance_4.json';
    break;
  case "05": //01
    polygon='./synthetic-data/data/distance/distance_medium.geojson';
    distribution='./synthetic-data/data/distance/distance_1.json';
    break;
  case "06":
    polygon='./synthetic-data/data/distance/distance_medium.geojson';
    distribution='./synthetic-data/data/distance/distance_2.json';
    break;
  case "07":
    polygon='./synthetic-data/data/distance/distance_medium.geojson';
    distribution='./synthetic-data/data/distance/distance_3.json';
    break;
  case "08":
    polygon='./synthetic-data/data/distance/distance_medium.geojson';
    distribution='./synthetic-data/data/distance/distance_4.json';
    break;
  case "09":// Distance Far
    polygon='./synthetic-data/data/distance/distance_far.geojson';
    distribution='./synthetic-data/data/distance/distance_1.json';
    break;
  case "10":
    polygon='./synthetic-data/data/distance/distance_far.geojson';
    distribution='./synthetic-data/data/distance/distance_2.json';
    break;
  case "11":
    polygon='./synthetic-data/data/distance/distance_far.geojson';
    distribution='./synthetic-data/data/distance/distance_3.json';
    break;
  case "12":
    polygon='./synthetic-data/data/distance/distance_far.geojson';
    distribution='./synthetic-data/data/distance/distance_4.json';
    break;
  case "13":// Size Small
    polygon='./synthetic-data/data/size/size_small.geojson';
    distribution='./synthetic-data/data/size/size_1.json';
    break;
  case "14":
    polygon='./synthetic-data/data/size/size_small.geojson';
    distribution='./synthetic-data/data/size/size_2.json';
    break;
  case "15":
    polygon='./synthetic-data/data/size/size_small.geojson';
    distribution='./synthetic-data/data/size/size_3.json';
    break;
  case "16":
    polygon='./synthetic-data/data/size/size_small.geojson';
    distribution='./synthetic-data/data/size/size_4.json';
    break;
  case "17"://Size Medium
    polygon='./synthetic-data/data/size/size_medium.geojson';
    distribution='./synthetic-data/data/size/size_1.json';
    break;
  case "18":
    polygon='./synthetic-data/data/size/size_medium.geojson';
    distribution='./synthetic-data/data/size/size_2.json';
    break;
  case "19":
    polygon='./synthetic-data/data/size/size_medium.geojson';
    distribution='./synthetic-data/data/size/size_3.json';
    break;
  case "20":
    polygon='./synthetic-data/data/size/size_medium.geojson';
    distribution='./synthetic-data/data/size/size_4.json';
    break;
  case "21":// Size Large
    polygon='./synthetic-data/data/size/size_large.geojson';
    distribution='./synthetic-data/data/size/size_1.json';
    break;
  case "22":
    polygon='./synthetic-data/data/size/size_large.geojson';
    distribution='./synthetic-data/data/size/size_2.json';
    break;
  case "23":
    polygon='./synthetic-data/data/size/size_large.geojson';
    distribution='./synthetic-data/data/size/size_3.json';
    break;
  case "24":
    polygon='./synthetic-data/data/size/size_large.geojson';
    distribution='./synthetic-data/data/size/size_4.json';
    break;
  case "25":// Number Regions Small
    polygon='./synthetic-data/data/number_regions/number_regions_small.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_1.json';
    break;
  case "26":
    polygon='./synthetic-data/data/number_regions/number_regions_small.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_2.json';
    break;
  case "27":
    polygon='./synthetic-data/data/number_regions/number_regions_small.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_3.json';
    break;
  case "28":
    polygon='./synthetic-data/data/number_regions/number_regions_small.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_4.json';
    break;
  case "29"://Medium
    polygon='./synthetic-data/data/number_regions/number_regions_medium.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_1.json';
    break;
  case "30":
    polygon='./synthetic-data/data/number_regions/number_regions_medium.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_2.json';
    break;
  case "31":
    polygon='./synthetic-data/data/number_regions/number_regions_medium.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_3.json';
    break;
  case "32":
    polygon='./synthetic-data/data/number_regions/number_regions_medium.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_4.json';
    break;
  case "33"://Large
    polygon='./synthetic-data/data/number_regions/number_regions_large.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_1.json';
    break;
  case "34":
    polygon='./synthetic-data/data/number_regions/number_regions_large.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_2.json';
    break;
  case "35":
    polygon='./synthetic-data/data/number_regions/number_regions_large.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_3.json';
    break;
  case "36":
    polygon='./synthetic-data/data/number_regions/number_regions_large.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_4.json';
    break;
  default:
    // code block
  }
}