import { Session } from 'meteor/session';

Template.modalDialogSmall.helpers({
  dialog: function () {
    // EGOR, оно тебе надо?
    console.log("helper tasks from template modalDialogSmall is fired");
    return Session.get('modalDialogContent');
  }
});
