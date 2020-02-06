$(document).ready(function (){
  console.log('hello world');

  // handlebars
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var context = {
    text: "hello world",
  };
  var html = template(context);
  $('.movies').append(html);

});
