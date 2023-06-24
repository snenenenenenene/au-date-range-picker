## Date Input Picker Ember Addon

This Ember addon serves as a date (range) input picker component, utilizing the [Daterangepicker](https://www.daterangepicker.com/) library. It was specifically developed under the commission of the [Agency of Home Affairs (ABB)](https://www.vlaanderen.be/agentschap-binnenlands-bestuur) for integration into the [BurgernabijeBesluitenDatabank](https://burgernabije-besluitendatabank-dev.s.redhost.be/) application.

### Installation

To install this addon, run the following command in your Ember project:

`ember install au-date-range-picker`

### Usage

To use the date input picker component in your Ember project, simply include it in your template:

```hbs
<AuDateRangePicker
  @label="Optional label"
  @start="2023-01-01"
  @end="2023-12-31"
  @width="block"
  @cancelAction={{action this.cancelDatePicker}}
  @applyAction={{action this.applyDatePicker}}
  @hideAction={{action this.hideDatePicker}}
/>
```

```js
@action applyDatePicker(picker, start, end) {
    this.dateRange = start + ' - ' + end;
}

@action hideDatePicker(picker, start, end) {
    return this.start;
}

@action cancel(picker, start, end) {}
```

You can pass in the following arguments to customize the behavior of the component:

- **start** : The initial start date for the date range.
- **end** : The initial end date for the date range.
- **actionName** : The name of the action to be called when the date range is changed. This action will be called with 3 args: **picker**, **start** and **end**

### Configuration

The following options can be passed to `<AuDateRangePicker>`:



#### Format 

| Name     | Default value | Description |
| -------- | ------------- | ----------- |
| @format | `'D MMM, YYYY'` |  |
| @serverFormat | `'YYYY-MM-DD'` |  |
| @direction | `'ltr'` | Locale setting for text direction |
| @regional | `'be-nl'` | Selected region |
| @separator | `' - '` | What character(s) to put between range |


#### Range

| Name     | Default value | Description |
| -------- | ------------- | ----------- |
| @singleDatePicker | `false` | Whether to only select a single date (instead of the default two) |
| @minDate | `undefined` | Lowest possible date. If undefined, no limit is set |
| @maxDate | `undefined` | Highest possible date. If undefined, no limit is set |
| @datelimit | `false` |  |


#### Appearance

| Name     | Default value | Description |
| -------- | ------------- | ----------- |
| @firstDay | `0` | What day of the week to start with. 0 = sunday, 1 = monday... |
| @placeholder | `'Aangepast bereik'` |  |
| @daysOfWeek | `moment.weekdaysMin()` |  |
| @monthNames | `moment.monthsShort()` |  |
| @cancelLabel | `'Terug'` | Text on the cancel button |
| @applyLabel | `'Verder'` | Text on the apply button |
| @customRangeLabel | `'Aangepast bereik'` |  |
| @showCustomRangeLabel | `false` |  |
| @fromLabel | `'Van'` |  |
| @toLabel | `'Tot'` |  |
| @showWeekNumbers | `false` |  |
| @showDropdowns | `false` |  |


#### Classes

| Name     | Default value | Description |
| -------- | ------------- | ----------- |
| @containerClass | `'form-group au-c-content '` | Class for the container |
| @inputClass | `'form-control'` | Class for the input |
| @buttonClasses | `['au-c-button']` | Classes for the buttons |
| @applyClass | `'au-c-button--primary'` | Class for the apply button |
| @cancelClass | `'au-c-button--secondary au-u-margin-right-tiny'` | Class for the cancel button |
| @labelClass | `'au-u-h5'` | Class for all labels/buttons |


#### TimePicker

| Name     | Default value | Description |
| -------- | ------------- | ----------- |
| @timePicker | `false` | Whether to enable the timePicker |
| @timePicker24Hour | `false` |  |
| @timePickerSeconds | `false` |  |
| @timePickerIncrement | `undefined` |  |


#### Dom behaviour

| Name     | Default value | Description |
| -------- | ------------- | ----------- |
| @autoUpdateInput | `true` |  |
| @autoApply | `false` |  |
| @alwaysShowCalendars | `true` |  |
| @context | `undefined` |  |
| @removeDropdownOnDestroy | `false` |  |
| @parentEl | `'body'` |  |


#### Other

| Name     | Default value | Description |
| -------- | ------------- | ----------- |
| @isInvalidDate | `noop` |  |
| @isCustomDate | `noop` |  |
| @opens | `null` |  |
| @drops | `null` |  |
| @linkedCalendars | `false` |  |

#### Ranges
`@ranges` defines the preset ranges on the left of the date picker.
The following format has to be passed:

```js
{
    PRESET-NAME: [STARTDATE, ENDDATE]
}
```


You can optionally use moment.js for dynamic assignment
```js
{
    Yesterday: [
        moment().subtract(1, 'days').startOf('day'),
        moment().subtract(1, 'days').endOf('day'),
    ],
    'Last week': [moment().subtract(7, 'days'), moment()],
}
```


### Development

To run the tests for this addon, run the following command:

`ember test`

### Contributing

Contributions to this addon are welcome. Please submit a pull request with your changes.

### License

This addon is licensed under the MIT License. See the LICENSE file for details.
