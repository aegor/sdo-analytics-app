import {municipalities} from '/imports/municipalities';
import {generateTemplateString, addFinder} from '/imports/clientUtils';
import { Session } from 'meteor/session';

Template.dashboardTeachersStat.helpers({
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

Template.dashboardTeachersStat.onRendered(function() {
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
    var rMun = $('#municipality').val();
    var rSc = $('#school').val();
    // page counts calculation
    // EGOR, need field validation !!!

    page.start = parseInt($('#page_start').val());
    page.per = parseInt($('#page_per').val());
    page.count = parseInt($('#page_count').val());

    // prepare request string
    var req = `count(ROLE.course_id) as a_count, R3.* from
	(select count(M.course_id) as e_count, R2.* from
		(select S.name as school, R1.* from 
		  (select R.*, M.name as municipality from 
		        (select
		             U.id as user_id,
				     U.email as email,
				     U.is_staff,
				     P.name as full_name,
				     P.municipality_id,
				     P.school_id
				     from auth_user as U
				     INNER JOIN auth_userprofile as P ON P.user_id = U.id
				     where is_staff = 1
			    )
			as R
			inner join student_municipality as M on M.id = R.municipality_id
		    )
		as R1
		inner join student_school as S on S.id = R1.school_id
		where 1
` + addFinder('municipality', rMun) /*+ addFinder('student_school', rSc)*/ +  `
)
	as R2
	inner join student_courseenrollment as M on R2.user_id = M.user_id
	group by M.course_id
) AS R3
inner join student_courseaccessrole as ROLE on R3.user_id = ROLE.user_id
where ROLE.role = "staff"
group by ROLE.course_id`;

    act.css('background', '#bb1a3d');
    Meteor.call('mysql.query', {
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
