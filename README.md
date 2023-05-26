## Date Input Picker Ember Addon

This Ember addon serves as a date (range) input picker component, utilizing the [Daterangepicker](https://www.daterangepicker.com/) library. It was specifically developed under the commission of the [Agency of Home Affairs (ABB)](https://www.vlaanderen.be/agentschap-binnenlands-bestuur) for integration into the [BurgernabijeBesluitenDatabank](https://burgernabije-besluitendatabank-dev.s.redhost.be/) application.

### Installation

To install this addon, run the following command in your Ember project:

`ember install date-input-picker`

### Usage

To use the date input picker component in your Ember project, simply include it in your template:

`<DateInputPicker @start={{this.startDate}} @end={{this.endDate}} @actionName={{this.handleDateRangePickerEvent}} />`

You can pass in the following arguments to customize the behavior of the component:

- **start** : The initial start date for the date range.
- **end** : The initial end date for the date range.
- **actionName** : The name of the action to be called when the date range is changed. This action will be called with 3 args: **picker**, **start** and **end**

### Development

To run the tests for this addon, run the following command:

`ember test`

### Contributing

Contributions to this addon are welcome. Please submit a pull request with your changes.

### License

This addon is licensed under the MIT License. See the LICENSE file for details.
