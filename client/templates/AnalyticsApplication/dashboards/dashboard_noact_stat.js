Template.dashboardNoactStat.helpers({
  tasks: function () {
    console.log("helper tasks from template dashboardNoactStat is fired");
    return [
      {text: 'This is task 1'},
      {text: 'This is task 2'},
      {text: 'This is task 3'},
    ]
  }
});

Template.dashboardNoactStat.events({
  // Save value to the collection when it changes.
  'change input': function (event, template) {
    console.log('change input from dashboardNoactStat is fired' );
  },

  // Auto-select text when user clicks in the input.
  'click input': function (event, template) {
    $(event.target).select();
    console.log('input from dashboardNoactStat is fired' );
  }
});

Template.dashboardNoactStat.onRendered(function() {
  // onRendered is used to change rendered dom (for jquery methods, for example)
  console.log("Template dashboardNoactStat is rendered");
});

Template.dashboardNoactStat.onCreated(function() {
  // onCreated used to change virtual dom before it render to native dom
  console.log("Template dashboardNoactStat is created");
});

