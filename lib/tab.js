import { Component, computed } from 'ember';

var alias = computed.alias;

export default Component.extend({

  tagName: 'ic-tab',

  role: 'tab',

  classNameBindings: ['active'],

  attributeBindings: ['aria-controls', 'aria-selected'],

  tabs: alias('parentView.parentView'),

  tabList: alias('parentView'),

  'aria-controls': alias('tabPanel.elementId'),

  'aria-selected': function() {
    // coerce to ensure a "true" or "false" attribute value
    return this.get('active')+'';
  }.property('active'),

  active: function(key, val) {
    if (val === true) return true;
    return this.get('tabs.activeTab') === this;
  }.property('tabs.activeTab'),

  activate: function() {
    this.get('tabs').activate(this);
  }.on('click'),

  tabPanel: function() {
    var index = this.get('tabList.tabs').indexOf(this);
    var panels = this.get('tabs.tabPanels');
    return panels && panels.objectAt(index);
  }.property('tabs.tabPanels.@each'),

  activateIfFirstOrActive: function() {
    if (this.get('active') || !this.get('tabs.activeTab')) this.activate();
  }.on('didInsertElement'),

  registerWithTabList: function() {
    this.get('tabList').registerTab(this);
  }.on('didInsertElement')

});
