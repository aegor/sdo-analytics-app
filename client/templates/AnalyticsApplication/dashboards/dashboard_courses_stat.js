import {municipalities} from '/imports/municipalities';
import { Session } from 'meteor/session';

Template.dashboardCoursesStat.helpers({
  dashboardTable: function () {
    console.log("РЕЗУЛЬТАТЫ ПРИШЛИ В ХЕЛПЕР");
    return Session.get('dashboardTable');
  }
});

Template.dashboardCoursesStat.onRendered(function() {

  var act = $('#sqlaction');
  // Initialize dashboard table on page render
  Session.set('dashboardTable', {values: [], count: 0});

  act.on('click', function(){

    // prepare request string
    var req = `C.id as course_id,
C.display_name,
C.enrollment_start,
C.enrollment_end,
C.display_org_with_default,
count(S.course_id) as count
from
course_overviews_courseoverview as C  
inner join student_courseenrollment as S 
ON S.course_id = C.id group by S.course_id order by count desc
`;

    act.css('background', '#bb1a3d');
    Meteor.call('mysql.query', {
      query: req,
      limit: 1999,
      offset: 0
    }, (err, res) => {
      $('#sqlaction').css('background', '#1ABB9C');
      if (err) {
        console.log("Error in mysql method request: ", err.message);
        Session.set('modalDialogContent', {
          label: 'Ошибка при запросе к базе данных!',
          head: 'Код ошибки:',
          text: err.message,
        });
        $(".modal-small").modal();
      } else {
        console.log("dashboardTable results");
        console.log(res);

        for (var i in res.values){
          res.values[i].enrollment_start = moment(res.values[i].enrollment_start).format('DD MMMM YYYY, hh:mm');
          res.values[i].enrollment_end = moment(res.values[i].enrollment_end).format('DD MMMM YYYY, hh:mm');
          if (res.values[i].enrollment_start === 'Invalid date') {res.values[i].enrollment_start = ''};
          if (res.values[i].enrollment_end === 'Invalid date') {res.values[i].enrollment_end = ''}
/*          if (res.values[i].is_staff === 1){
            res.values[i].role = "Преподаватель"
          }
          else {
            res.values[i].role = "Учащийся"
          }*/
        }
        Session.set('dashboardTable', res);
      }
    });
  });

});
