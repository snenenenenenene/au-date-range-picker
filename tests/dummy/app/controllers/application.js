/* eslint-disable no-unused-vars */
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class ApplicationController extends Controller {
  @tracked dateRange = 'DATE';

  @action applyDatePicker(picker, start, end) {
    this.dateRange = start + ' - ' + end;
  }

  @action hideDatePicker(picker, start, end) {
    return this.start;
  }

  @action cancel(picker, start, end) {}
}
