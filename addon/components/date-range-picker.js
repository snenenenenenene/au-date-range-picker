/* eslint-disable ember/jquery-ember-run */
/* eslint-disable ember/no-jquery */

import { assert } from '@ember/debug';
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
  @tracked start = undefined;
  @tracked end = undefined;
  @tracked minDate = undefined;
  @tracked maxDate = undefined;
  @tracked timePicker = false;
  @tracked timePicker24Hour = false;
  @tracked timePickerSeconds = false;
  @tracked timePickerIncrement = undefined;
  @tracked showWeekNumbers = false;
  @tracked showDropdowns = false;
  @tracked linkedCalendars = false;
  @tracked datelimit = false;
  @tracked parentEl = 'body';
  @tracked format = 'D MMM, YYYY';
  @tracked serverFormat = 'YYYY-MM-DD';

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
    console.log(
      moment(this.start, this.serverFormat).format(this.format) +
        this.separator +
        moment(this.end, this.serverFormat).format(this.format)
    );
    if (!isEmpty(this.start) && !isEmpty(this.end)) {
      return (
        moment(this.start, this.serverFormat).format(this.format) +
        this.separator +
        moment(this.end, this.serverFormat).format(this.format)
      );
    }
    return '';
  }
  @tracked opens = null;
  @tracked drops = null;
  @tracked regional = 'be-nl';
  @tracked separator = ' - ';
  @tracked singleDatePicker = false;
  @tracked placeholder = 'Aangepast bereik';
  @tracked containerClass = 'form-group au-c-content ';
  @tracked inputClass = 'form-control';
  get inputClasses() {
    return this.inputClass
      ? 'daterangepicker-input ember-text-field ember-view' + this.inputClass
      : 'daterangepicker-input ember-text-field ember-view';
  }
  @tracked buttonClasses = ['au-c-button'];
  @tracked applyClass = 'au-c-button--primary';
  @tracked cancelClass = 'au-c-button--secondary au-u-margin-right-tiny';
  @tracked labelClass = 'au-u-h5';
  @tracked direction = 'ltr';
  @tracked ranges = {
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
  @tracked daysOfWeek = moment.weekdaysMin();
  @tracked monthNames = moment.monthsShort();
  @tracked removeDropdownOnDestroy = false;
  @tracked cancelLabel = 'Terug';
  @tracked applyLabel = 'Verder';
  @tracked customRangeLabel = 'Aangepast bereik';
  @tracked showCustomRangeLabel = false;
  @tracked fromLabel = 'Van';
  @tracked toLabel = 'Tot';
  @tracked hideAction = null;
  @tracked applyAction = null;
  @tracked cancelAction = null;
  @tracked autoUpdateInput = true;
  @tracked autoApply = false;
  @tracked alwaysShowCalendars = true;
  @tracked context = undefined;
  @tracked firstDay = 0;
  @tracked isInvalidDate = noop;
  @tracked isCustomDate = noop;

  // Init the dropdown when the component is added to the DOM
  @action didInsertDateInputPicker() {
    // daterangepicker(this.getOptions());
    $('.daterangepicker-input').daterangepicker(this.getOptions());
    this.attachPickerEvents();
  }

  // Remove the hidden dropdown when this component is destroyed
  willDestroy() {
    super.willDestroy(...arguments);
    super.willDestroy(...arguments);

    run.cancel(this._setupTimer);

    if (this.removeDropdownOnDestroy) {
      $('.daterangepicker').remove();
    }
  }

  @action getOptions() {
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

  @action attachPickerEvents() {
    $('.daterangepicker-input').on('apply.daterangepicker', (_ev, picker) => {
      this.handleDateRangePickerEvent('applyAction', picker);
    });

    $('.daterangepicker-input').on('hide.daterangepicker', (_ev, picker) => {
      this.handleDateRangePickerEvent('hideAction', picker);
    });

    $('.daterangepicker-input').on('cancel.daterangepicker', () => {
      this.handleDateRangePickerEvent('cancelAction', undefined, true);
    });
  }

  @action handleDateRangePickerEvent(actionName, picker, isCancel = false) {
    let action = this.args.actionName;
    let start;
    let end;

    if (!isCancel) {
      start = picker.startDate.format(this.serverFormat);
      end = picker.endDate.format(this.serverFormat);
    }

    if (action) {
      assert(
        `${actionName} for date-range-picker must be a function`,
        typeof action === 'function'
      );
      // this.sendAction(actionName, start, end, picker);
    } else {
      if (!this.isDestroyed) {
        this.start = start;
        this.end = end;
      }
    }
  }
}
