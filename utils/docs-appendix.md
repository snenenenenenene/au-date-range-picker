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