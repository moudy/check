var App = require('../app').instance;

var ScrollWatcher = Em.Mixin.create({

  scrollWatcherSetup: function () {
    var eventNamespace = 'ember-scroll-watcher'+this.get('elementId');
    this.$().on('scroll.'+eventNamespace, this.scrollWatcherDidScroll.bind(this));
  }.on('didInsertElement')

, scrollWatcherTeardown: function () {
    var eventNamespace = 'ember-scroll-watcher'+this.get('elementId');
    this.$().off('scroll.'+eventNamespace);
  }.on('willDestroyElement')

, scrollWatcherDidScroll: function() {
    Em.run.debounce(this, function () {
      this.send('scrollWatcherDidScroll', this.get('element.scrollTop'));
    }, 100);
  }

});

App.ChecklistView = Em.View.extend(ScrollWatcher, {
  classNames: 'checklist-container'

, templateName: 'checklist'

, classNameBindings: 'isSubmerged'

, actions: {
    scrollWatcherDidScroll: function (scrollTop) {
      var threshold = this.get('listTop') - this.get('headerBottom');
      this.set('isSubmerged', scrollTop > threshold);
    }
  }

, setMeasurements: function () {
    var listRect = this.$('.js-checklist-items')[0].getBoundingClientRect();
    var headerRect = this.$('.js-header-bar')[0].getBoundingClientRect();
    this.set('headerBottom', headerRect.bottom);
    this.set('listTop', listRect.top);
  }.on('didInsertElement')

});
