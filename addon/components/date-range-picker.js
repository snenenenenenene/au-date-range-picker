/* eslint-disable ember/jquery-ember-run */
/* eslint-disable ember/no-jquery */

import { action } from '@ember/object';
import { run } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';
import moment from 'moment';
import layout from './date-range-picker';
const noop = function () {};

export default class DateRangePicker extends Component {
  //TODO: get all options from attr.
  @tracked layout = layout;
  @tracked classNameBindings = ['containerClass', 'au-c-content '];
  @tracked attributeBindings = ['start', 'end', 'serverFormat'];


  /* OPTIONS */

  // Options: Format 
  @tracked format = this.args.format || 'D MMM, YYYY';  // Foraaaamat
  @tracked serverFormat = this.args.serverFormat || 'YYYY-MM-DD';
  @tracked direction = this.args.direction || 'ltr';
  @tracked regional = this.args.regional || 'be-nl';
  @tracked separator = this.args.seperator || ' - ';
  

  // Options: Range
  @tracked singleDatePicker = this.args.singleDatePicker || false;
  @tracked minDate = this.args.minDate || undefined;
  @tracked maxDate = this.args.maxDate || undefined;
  @tracked datelimit = this.args.datelimit || false;
  @tracked ranges = this.args.ranges || {
    Vandaag: [moment().startOf('day'), moment().endOf('day')],
    Gisteren: [
      moment().subtract(1, 'days').startOf('day'),
      moment().subtract(1, 'days').endOf('day'),
    ],
    'Voorbije Week': [moment().subtract(7, 'days'), moment()],
    'Voorbije 30 Dagen': [moment().subtract(30, 'days'), moment()],
    'Deze Maand': [moment().startOf('month'), moment().endOf('month')],
    'Vorige Maand': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
  };

  // Options: Appearance
  @tracked firstDay = this.args.firstDay || 0;
  @tracked placeholder = this.args.placeholder || 'Aangepast bereik';
  @tracked daysOfWeek = this.args.daysOfWeek || moment.weekdaysMin();
  @tracked monthNames = this.args.monthNames || moment.monthsShort();
  @tracked cancelLabel = this.args.cancelLabel || 'Terug';
  @tracked applyLabel = this.args.applyLabel || 'Verder';
  @tracked customRangeLabel = this.args.customRangeLabel || 'Aangepast bereik';
  @tracked showCustomRangeLabel = this.args.showCustomRangeLabel || false;
  @tracked fromLabel = this.args.fromLabel || 'Van';
  @tracked toLabel = this.args.toLabel || 'Tot';
  @tracked showWeekNumbers = this.args.showWeekNumbers || false;
  @tracked showDropdowns = this.args.showDropdowns || false;
  

  // Options: Classes
  @tracked containerClass = this.args.containerClass || 'form-group au-c-content ';
  @tracked inputClass = this.args.inputClass || 'form-control';
  @tracked buttonClasses = this.args.buttonClasses || ['au-c-button'];  // Meow
  @tracked applyClass = this.args.applyClass || 'au-c-button--primary';
  @tracked cancelClass = this.args.cancelClass || 'au-c-button--secondary au-u-margin-right-tiny';
  @tracked labelClass = this.args.labelClass || 'au-u-h5';
    
  // Options: TimePicker
  @tracked timePicker = this.args.timePicker || false;  // Wao
  @tracked timePicker24Hour = this.args.timePicker24Hour || false; 
  @tracked timePickerSeconds = this.args.timePickerSeconds || false;
  @tracked timePickerIncrement = this.args.timePickerIncrement || undefined;

  // Options: Dom behaviour
  @tracked autoUpdateInput = this.args.autoUpdateInput || true;
  @tracked autoApply = this.args.autoApply || false;
  @tracked alwaysShowCalendars = this.args.alwaysShowCalendars || true;
  @tracked context = this.args.context || undefined;
  @tracked removeDropdownOnDestroy = this.args.removeDropdownOnDestroy || false;
  @tracked parentEl = this.args.parentEl || 'body';

  // Options: Other
  @tracked isInvalidDate = this.args.isInvalidDate || noop;
  @tracked isCustomDate = this.args.isCustomDate || noop;
  @tracked opens = this.args.opens || null;
  @tracked drops = this.args.drops || null;
  @tracked linkedCalendars = this.args.linkedCalendars || false;


  /* GETTERS */
  get inputClasses() {
    return this.inputClass
      ? 'daterangepicker-input ember-text-field ember-view' + this.inputClass
      : 'daterangepicker-input ember-text-field ember-view';
  }

  get start() {
    return this.args.start || undefined;
  }
  get end() {
    return this.args.end || undefined;
  }

  get width() {
    if (this.args.width == 'block') return 'au-c-input--block';
    else return '';
  }

  get error() {
    if (this.args.error) return 'au-c-input--error';
    else return '';
  }

  get warning() {
    if (this.args.warning) return 'au-c-input--warning';
    else return '';
  }

  get disabled() {
    if (this.args.disabled) return 'is-disabled';
    else return '';
  }

  get rangeText() {
    if (!isEmpty(this.start) && !isEmpty(this.end)) {
      return (
        moment(this.start, this.serverFormat).format(this.format) +
        this.separator +
        moment(this.end, this.serverFormat).format(this.format)
      );
    }
    return '';
  }

  /* WRAPPER CODE: all the code that is meant to interact with the wrapper date-range-picker */
  @action didInsertDateInputPicker() {
    console.log(this);
    $(this).on('cancel', function () {
      console.log('meowe');
    });
    // Init the dropdown when the component is added to the DOM
    // daterangepicker(this.getOptions());
    $('.daterangepicker-input').daterangepicker(this.getOptions());
    this.attachPickerEvents();
  }

  willDestroy() {
    // Remove the hidden dropdown when this component is destroyed
    super.willDestroy(...arguments);
    super.willDestroy(...arguments);

    run.cancel(this._setupTimer);

    if (this.removeDropdownOnDestroy) {
      $('.daterangepicker').remove();
    }
  }

  @action getOptions() {
    // get options to pass to the internal date-range-picker
    let momentStartDate = moment(this.start, this.serverFormat);
    let momentEndDate = moment(this.end, this.serverFormat);

    let startDate = momentStartDate.isValid() ? momentStartDate : undefined;
    let endDate = momentEndDate.isValid() ? momentEndDate : undefined;

    let momentMinDate = moment(this.minDate, this.serverFormat);
    let momentMaxDate = moment(this.maxDate, this.serverFormat);
    let minDate = momentMinDate.isValid() ? momentMinDate : undefined;
    let maxDate = momentMaxDate.isValid() ? momentMaxDate : undefined;

    let showCustomRangeLabel = this.showCustomRangeLabel;

    let options = {
      isInvalidDate: this.isInvalidDate,
      isCustomDate: this.isCustomDate,
      alwaysShowCalendars: this.alwaysShowCalendars,
      autoUpdateInput: this.autoUpdateInput,
      autoApply: this.autoApply,
      timePicker: this.timePicker,
      buttonClasses: this.buttonClasses,
      applyClass: this.applyClass,
      cancelClass: this.cancelClass,
      singleDatePicker: this.singleDatePicker,
      drops: this.drops,
      opens: this.opens,
      timePicker24Hour: this.timePicker24Hour,
      timePickerSeconds: this.timePickerSeconds,
      timePickerIncrement: this.timePickerIncrement,
      showWeekNumbers: this.showWeekNumbers,
      showDropdowns: this.showDropdowns,
      showCustomRangeLabel: this.showCustomRangeLabel,
      linkedCalendars: this.linkedCalendars,
      dateLimit: this.dateLimit,
      parentEl: this.parentEl,
    };

    let localeOptions = {
      applyLabel: this.applyLabel,
      cancelLabel: this.cancelLabel,
      customRangeLabel: this.customRangeLabel,
      daysOfWeek: this.daysOfWeek,
      regional: this.regional,
      direction: this.direction,
      firstDay: this.firstDay,
      format: this.format,
      fromLabel: this.fromLabel,
      monthNames: this.monthNames,
      separator: this.separator,
      toLabel: this.toLabel,
    };

    const defaultOptions = {
      locale: localeOptions,
      showCustomRangeLabel: showCustomRangeLabel,
      startDate: startDate,
      endDate: endDate,
      minDate: minDate,
      maxDate: maxDate,
    };

    if (!this.singleDatePicker) {
      options.ranges = this.ranges;
    }

    return { ...options, ...defaultOptions };
  }

  /* ACTIONS: all the code to run events from au-date-range-picker */
  @action hideAction() {
    // console.log(...this.args);
    return this.start;
  }
  @action applyAction(picker, start, end) {
    console.log(picker);
    console.log(start, end);
    return start, end;
  }

  @action attachPickerEvents() {
    $('.daterangepicker-input').on('apply.daterangepicker', (_ev, picker) => {
      this.handleDateRangePickerEvent('applyAction', picker);
    });

    $('.daterangepicker-input').on('hide.daterangepicker', (_ev, picker) => {
      this.handleDateRangePickerEvent('hideAction', picker);
    });

    $('.daterangepicker-input').on('cancel.daterangepicker', (_ev, picker) => {
      this.handleDateRangePickerEvent('cancelAction', picker);
    });
  }

  @action handleDateRangePickerEvent(actionName, picker) {
    let action = this.args[actionName];
    let start = picker.startDate.format(this.serverFormat);
    let end = picker.endDate.format(this.serverFormat);

    if (action) {
      // assert(
      //   `${actionName} for date-range-picker must be a function`,
      //   typeof action === 'function'
      // );
      action(this, start, end);
    } else {
      if (!this.isDestroyed) {
        this.start = start;
        this.end = end;
      }
    }
  }
}
