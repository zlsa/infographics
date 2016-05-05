
var templates = [
  'infographic',
  'category'
];

function create_infographic(parent, data) {
  var image_url = 'data/images/' + data.image + '.png';
  var image_url_thumb = 'data/images/thumbs/' + data.image + '.jpg';

  parent.append(templates.infographic({
    name: data.name,
    type: data.type,
    image_url: image_url,
    image_url_thumb: image_url_thumb
  }));
}

$(document).ready(function() {

  var t = {};
  for(var i=0; i<templates.length; i++) {
    t[templates[i]] = doT.template($('script[data-template=' + templates[i] + ']').text());
  }

  templates = t;
  
  $.getJSON('data/list.json')
   .done(function(data) {

     var i;
     var categories = {};
     
     for(i=0; i<data.order.length; i++) {
       categories[data.order[i][0]] = []
     }
     
     for(i=0; i<data.infographics.length; i++) {
       var ig = data.infographics[i];
       categories[ig.category].push(ig);
     }

     for(i=0; i<data.order.length; i++) {

       var category = $(templates.category({
         name: data.order[i][1]
       }));
       
       $('body #infographics').append(category);
       
       for(var j=0; j<categories[data.order[i][0]].length; j++) {
         create_infographic(category.find('.infographics'), categories[data.order[i][0]][j]);
       }
     }
     
   })
   .fail(function() {
     console.log('fail', arguments);
   });
  
});
