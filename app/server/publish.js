/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */
Meteor.publish('sites', function(userId){
  return Sites.find();
});

Meteor.publish('subscriptions', function(userId){
  return Subscriptions.find({createdBy: userId});
});

Meteor.publish("userSubscriptions", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'subscriptions': 1, 'history': 1}});
  } else {
    this.ready();
  }
});

Meteor.publish("userArticles", function (subscriptions){
  if (this.userId){
      if (subscriptions != undefined)
      {
        return Articles.find({siteID: {$in:subscriptions}},{sort: {insert_date: -1/*, date: -1*/}});
      }
  }
  this.ready();
});
