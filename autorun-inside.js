if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  function syncVars(self) {
    Tracker.autorun(function (computation) {
      self.counter.set(Session.get('counter'));
    });
  }

  Template.hello.onCreated(function () {
    var self = this;

    self.counter = new ReactiveVar(0);
    self.autorun(function (computation) {
      syncVars(self);
    });
  })

  Template.hello.helpers({
    counter: function () {
      return Template.instance().counter.get();
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
