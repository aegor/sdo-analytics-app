Template.sideleftMenu.helpers({
  tasks: function () {
    console.log("sideleft");
    return [
      {text: 'This is task 1'},
      {text: 'This is task 2'},
      {text: 'This is task 3'},
    ]
  }
});

Template.sideleftMenu.events({
  // Save value to the collection when it changes.
  'change input': function (event, template) {

  },

  // Auto-select text when user clicks in the input.
  'click input': function (event, template) {
    $(event.target).select();
  }
});
