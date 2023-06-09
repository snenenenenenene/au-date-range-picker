/* eslint-disable n/no-unpublished-require */
/* eslint-env node */
'use strict';
var path = require('path');

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var fbTransform = require('fastboot-transform');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/daterangepicker/daterangepicker.js');
    this.import('vendor/daterangepicker/daterangepicker.css');
  },

  options: {
    babel: {
      plugins: ['transform-object-rest-spread'],
    },
  },

  treeForVendor(vendorTree) {
    var trees = [];
    var daterangepickerPath = path.dirname(require.resolve('daterangepicker'));

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      fbTransform(
        new Funnel(daterangepickerPath, {
          destDir: 'daterangepicker',
          include: [new RegExp(/\.js$/)],
          exclude: ['moment', 'moment.min', 'package', 'website'].map(function (
            key
          ) {
            return new RegExp(key + '\\.js$');
          }),
        })
      )
    );
    trees.push(
      new Funnel(daterangepickerPath, {
        destDir: 'daterangepicker',
        include: [new RegExp(/\.css$/)],
      })
    );

    return mergeTrees(trees);
  },
};
