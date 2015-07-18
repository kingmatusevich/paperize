/*****************************************************************************/
/* SitesList: Event Handlers */
/*****************************************************************************/
Template.SitesList.events({

});

Template.search.events({
});
Template.siteListContent.events({
  'click #addSubscription': function (e)
  {
    subscriptions = Meteor.user().subscriptions;
    if (subscriptions == undefined) subscriptions = [];
    subscriptions.push(this._id);
    Meteor.users.update({'_id': Meteor.userId()},{$set:{'subscriptions': subscriptions}});
  },
  'click #removeSubscription': function (e)
  {
    subscriptions = Meteor.user().subscriptions;
    if (subscriptions != undefined){
      remove(subscriptions, this._id);
      Meteor.users.update({'_id': Meteor.userId()},{$set:{'subscriptions': subscriptions}});
    }
  }
});

function remove(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }
}
/*****************************************************************************/
/* SitesList: Helpers */
/*****************************************************************************/
Template.searchExtras.helpers({
});
Template.SitesList.helpers({
  sites: function () {
    return Sites.find();
  },

  beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete site: "' + doc.url + '"?')) {
        this.remove();
      }
    };
  }
});

Template.siteListContent.helpers({
  isUserSubscribed: function () {
    subscriptions = Meteor.user().subscriptions;
    siteID = this._id;
    if (subscriptions)
    {
      for (var i= 0; i < subscriptions.length; i++)
      {
          if (subscriptions[i] == siteID)
          return true;
      }
    }
    return false;
  },
  formattedPublishingDate: function ()
  {
    var date = this.lastFetched;
    if (date && date != undefined){
      var iscurrentDate = moment(date).isSame(new Date(), "day");
      if (iscurrentDate)
      {
        return moment(date).format("H:mm");
      }
      var isCurrentWeek = moment(date).isSame(new Date(), "week");
      if (isCurrentWeek){
        return moment(date).format("dddd");
      }
      return moment(date).format("DD/MM/YY");
    }
    return false;
  }
})
/*****************************************************************************/
/* SitesList: Lifecycle Hooks */
/*****************************************************************************/
Template.SitesList.created = function () {
};

Template.SitesList.rendered = function () {
};

Template.SitesList.destroyed = function () {
};
