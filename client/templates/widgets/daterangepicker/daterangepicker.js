import {DateRangePicker} from '/imports/daterangepickerImpl';

Template.daterangepicker.onRendered(function() {
  const that = this;
  // onRendered is used to change rendered dom (for jquery methods, for example)
  console.log("Template daterangepicker is rendered");

  $.fn.daterangepicker = function(options, callback) {
    this.each(function() {
      var el = $(this);
      if (el.data('daterangepicker'))
        el.data('daterangepicker').remove();
      el.data('daterangepicker', new DateRangePicker(el, options, callback));
    });
    return this;
  };

  var cb = function(start, end, label) {
    console.log(start.toISOString(), end.toISOString(), label);
    $('#reportrange_right span').html(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'));
  };

  var optionSet1 = {
    startDate: moment().subtract(29, 'days'),
    endDate: moment(),
    minDate: '01/01/2016',
    maxDate: '12/31/2020',
/*    dateLimit: {
      days: 60
    },*/
    showDropdowns: false,
    // showWeekNumbers: true,
    // timePicker: false,
    // timePickerIncrement: 1,
    // timePicker12Hour: true,
    ranges: {
      'Сегодня': [moment(), moment()],
      'Вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'За неделю': [moment().subtract(6, 'days'), moment()],
      'За месяц': [moment().subtract(30, 'days'), moment()],
      'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
      'Пред. месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    opens: 'right',
    buttonClasses: ['btn btn-default'],
    applyClass: 'btn-small btn-primary',
    cancelClass: 'btn-small',
    format: 'DD-MM-YYYY',
    titleFormat: 'DD-MM-YYYY',
    language: 'ru',
    separator: ' - ',
    locale: {
      applyLabel: 'Готово',
      cancelLabel: 'Очистить',
      fromLabel: 'От',
      toLabel: 'До',
      format: 'DD-MM-YYYY',
      customRangeLabel: 'От и До',
      daysOfWeek: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      firstDay: 1
    }
  };

  $('#reportrange_right span').html(moment().subtract(29, 'days').format('DD-MM-YYYY') + ' - ' + moment().format('DD-MM-YYYY'));

  $('#reportrange_right').daterangepicker(optionSet1, cb);

  $('#reportrange_right').on('show.daterangepicker', function() {
    console.log("show event fired");
  });
  $('#reportrange_right').on('hide.daterangepicker', function() {
    console.log("hide event fired");
  });
  $('#reportrange_right').on('apply.daterangepicker', function(ev, picker) {
    console.log("apply event fired, start/end dates are " + picker.startDate.format('DD-MM-YYYY') + ' - ' + picker.endDate.format('DD-MM-YYYY'));
  });
  $('#reportrange_right').on('cancel.daterangepicker', function(ev, picker) {
    console.log("cancel event fired");
  });

  // $('#options1').click(function() {
  //   $('#reportrange_right').data('daterangepicker').setOptions(optionSet1, cb);
  // });
  //
  // $('#options2').click(function() {
  //   $('#reportrange_right').data('daterangepicker').setOptions(optionSet2, cb);
  // });
  //
  // $('#destroy').click(function() {
  //   $('#reportrange_right').data('daterangepicker').remove();
  // });

});

