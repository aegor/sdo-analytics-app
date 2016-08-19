import {municipalities} from '/imports/municipalities';
import {generateTemplateString, addFinder} from '/imports/clientUtils';
import { Session } from 'meteor/session';

Template.dashboardCommonStat.helpers({
  page: function(){
    console.log("PAGES ПРИШЛИ В ХЕЛПЕР");
    return Session.get('pageInfo');
  },
  m: function () {
    return municipalities
  },
  dashboardTable: function () {
    console.log("РЕЗУЛЬТАТЫ ПРИШЛИ В ХЕЛПЕР");
    return Session.get('dashboardTable');
  }
});

// EGOR, Оно тебе надо?
// Template.commonStat.events({
//   // Save value to the collection when it changes.
//   'change input': function (event, template) {
//     console.log('change input from commonStat is fired' );
//   },
//
//   // Auto-select text when user clicks in the input.
//   'click input': function (event, template) {
//     $(event.target).select();
//     console.log('input from commonStat is fired' );
//   }
// });

Template.dashboardCommonStat.onRendered(function() {
  var sc = $('#school');
  var act = $('#sqlaction');

  // Initialize dashboard table on page render
  Session.set('dashboardTable', {values: [], count: 0});
  // Initialize page table counts on page render
  var page = {start: 0, per: 30, count: 0};
  Session.set('pageInfo', page);

  $('#page_start').val(page.start);
  $('#page_per').val(page.per);
  readOnly="true"
  $('#page_count').val(page.count);

  act.on('click', function(){
    var d = $('#daterange').text().split('-');
    var rStartDate = d[2].trim() + '-' + d[1].trim() + '-' + d[0].trim();
    var rEndDate = d[5].trim() + '-' + d[4].trim() + '-' + d[3].trim();
    var rMun = $('#municipality').val();
    var rSc = $('#school').val();
    // page counts calculation
    // EGOR, need field validation !!!

    page.start = parseInt($('#page_start').val());
    page.per = parseInt($('#page_per').val());
    page.count = parseInt($('#page_count').val());

    // prepare request string
    var req = `TO_TIMESTAMP(time) as time, email, full_name, municipality, school, page_path FROM metrics as c WHERE
TO_TIMESTAMP(c.time) >= DATE("${rStartDate}") AND
TO_TIMESTAMP(c.time) <= DATE("${rEndDate}") AND
c.type = "identify" AND
COALESCE(c.email, "") != ""  AND
COALESCE(c.municipality, "") != ""        
` + addFinder('municipality', rMun) + addFinder('school', rSc);
    act.css('background', '#bb1a3d');
    Meteor.call('quasar.query', {
      query: req,
      limit: page.per,
      offset: page.start*page.per
    }, (err, res) => {
      $('#sqlaction').css('background', '#1ABB9C');
      if (err) {
        console.log("Error in quasar method request: ", err.message);
        Session.set('modalDialogContent', {
          label: 'Ошибка при запросе к базе данных!',
          head: 'Код ошибки:',
          text: err.message,
        });
        $(".modal-small").modal();
      } else {
        console.log("dashboardTable results");
        console.log(res);
        page.count = parseInt(Math.ceil(res.count/page.per));
        Session.set('pageInfo', page);
        for (var i in res.values){
          res.values[i].time = moment(res.values[i].time).format('DD MMMM YYYY, hh:mm');
          if (res.values[i].is_staff === 1){
            res.values[i].role = "Преподаватель"
          }
          else {
            res.values[i].role = "Учащийся"
          }
        }
        Session.set('dashboardTable', res);
      }
    });
  });

});

Template.dashboardCommonStat.onCreated(function() {
  // onCreated used to change virtual dom before it render to native dom
  console.log("Template commonStat is created");
//  if (!Meteor.userId() && !Meteor.user(Meteor.userId()) && !Meteor.user(Meteor.userId()).services.django && Meteor.user(Meteor.userId()).services.django.is_staff !== 1) {Router.go('/')}
});
