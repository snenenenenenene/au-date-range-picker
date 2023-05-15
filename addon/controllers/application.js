import Controller from '@ember/controller';
import { action } from '@ember/object';
export default class ApplicationController extends Controller {
  @action cancelDatePicker() {
    console.log('hello');
  }
  @action hideDatePicker() {
    console.log('hello');
  }
  @action setDateRange() {
    console.log('hello');
  }
}
