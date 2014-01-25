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

App.ChecklistsShowView = Em.View.extend(ScrollWatcher, {
  classNames: 'checklist-container'

, templateName: 'checklist'

, classNameBindings: [
    'isSubmerged'
  , 'controller.isPendingDeletion:dim-list'
  , 'controller.isEditing'
  ]

, setMeasurements: function () {
    var listRect = this.$('.js-checklist-list-items')[0].getBoundingClientRect();
    var headerRect = this.$('.js-header-bar')[0].getBoundingClientRect();
    this.set('headerBottom', headerRect.bottom);
    this.set('listTop', listRect.top);
  }.on('didInsertElement')

, autoFocus: function () {
    var c = this.get('controller');
    if (c.get('isNew') && c.get('isEditing')) this.$('.checklist-title input').focus();
  }.on('didInsertElement')

, actions: {
    close: function () {
      this.$().transition({ scale: 1.2, opacity: 0 }, 200, function () {
        this.controller.transitionToRoute('index');
      }.bind(this));
    }

  , scrollWatcherDidScroll: function (scrollTop) {
      var threshold = this.get('listTop') - this.get('headerBottom');
      this.set('isSubmerged', scrollTop > threshold);
    }

  , childViewDidFocusOut: function () {
      this.get('controller').send('save');
    }
  }

});
