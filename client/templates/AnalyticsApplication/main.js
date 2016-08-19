import { Session } from 'meteor/session';
import {municipalities} from '/imports/municipalities';

Tracker.autorun(function () {
  Meteor.subscribe("userData");
});

// global helpers for iron router
Template.registerHelper('log', function(what) {
  // You can use `this` and/or `Template.instance()`
  // to get template data access
  console.log(what);
});

// результат запроса -> на сессию
function mysqlReq(req, limit, offset, reactive){
  Meteor.call('mysql.query', {
    query: req,
    limit: limit,
    offset: offset,
  }, (err, res) => {
    if (err) {
      console.log("MySql method error: ", err.message);
      Session.set(reactive, err.message);
    } else {
      console.log("mysql method done vith session variable: ", reactive);
      Session.set(reactive, res);
    }
  });
}

// this is usefull hook from: http://stackoverflow.com/questions/26281201/render-callback-to-all-templates-in-meteor-blaze
// make sure this code is executed after all your templates have been defined

Meteor.startup(function(){
//  Цикл по всем шаблонам для расстановки обработчиков, jQuery, etc.
  for(var property in Template){
    // check if the property is actually a blaze template
    if(Blaze.isTemplate(Template[property])){
      var template=Template[property];
      // assign the template an onRendered callback who simply prints the view name
      template.onRendered(function(){
        const tmplName = this.view.name.substr(this.view.name.indexOf('.') +1);
        // EGOR for templates debug
        // console.log("Rendered: ", tmplName);
        if (tmplName.indexOf('dashboard') === 0) {
          // EGOR stuff to render common code for dashboards
          var sc = $('#school');
          sc.on('click', function() {
            var municipality = $('#municipality').val();
            if (municipality === '_default_') {
              Session.set('modalDialogContent', {
                label: 'НЕДОСТАТОЧНО ДАННЫХ!',
                head: 'Муниципалитет должен быть выбран',
                text: 'Перед выбором образовательного учреждения выбор муниципалитета обязателен'
              });
              $(".modal-small").modal();
            } else {
              var school = '';
              for (var j in municipalities) {
                if (municipalities[j].municipality === municipality) {
                  school = municipalities[j].school;
                  break;
                };
              };
              sc.empty();
              sc.children().add('<option value="_default_" selected>Образовательное учреждение</option>').appendTo($('#school'));
              for (var i in school) {
                sc.children().add('<option>' + school[i] + '</option>').appendTo($('#school'));
              }
            }
          });
        }
      });
    }
  }

  // Забираем все первичные данные в сессию
  //
  // Модели обучения
  // name as model from student_educationmodel
  // mysqlReq('name as model from student_educationmodel', 2000, 0, 'eduModel');

  // TODO муниципалитеты/школы

  // Курсы
  // id as name, display_name as label from course_overviews_courseoverview
  // mysqlReq('id as name, display_name as label from course_overviews_courseoverview', 2000, 0, 'eduCourses');
});

