// global helpers for iron router
Template.registerHelper('log', function(what) {
  // You can use `this` and/or `Template.instance()`
  // to get template data access
  console.log(what);
});

// this is usefull hook from: http://stackoverflow.com/questions/26281201/render-callback-to-all-templates-in-meteor-blaze
// make sure this code is executed after all your templates have been defined

Meteor.startup(function(){
  for(var property in Template){
    // check if the property is actually a blaze template
    if(Blaze.isTemplate(Template[property])){
      var template=Template[property];
      // assign the template an onRendered callback who simply prints the view name
      template.onRendered(function(){
        console.log("Rendered: ", this.view.name);
      });
    }
  }

});

