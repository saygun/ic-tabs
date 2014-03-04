"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;
var computed = require("ember").computed;

exports["default"] = Component.extend({

  tagName: 'ic-tabs',

  activeTab: null,

  tabPanels: null,

  'selected-index': 0,

  // comes from queryParams, need to validate
  validateSelected: function() {
    // wait for everything to render so the panels length is correct
    Ember.run.schedule('afterRender', this, function() {
      var length = this.get('tabList.tabs.length');
      var index = parseInt(this.get('selected-index'), 10);
      if (isNaN(index) || index < 0 || index >= length) {
        this.set('selected-index', 0);
      }
    });
  }.on('didInsertElement'),

  createTabPanels: function(tabList) {
    this.set('tabPanels', ArrayProxy.create({content: []}));
  }.on('init'),

  select: function(tab) {
    this.set('activeTab', tab);
    this.set('selected-index', tab.get('index'));
  },

  registerTabList: function(tabList) {
    this.set('tabList', tabList);
  },

  registerTabPanel: function(tabPanel) {
    this.get('tabPanels').addObject(tabPanel);
  }

});