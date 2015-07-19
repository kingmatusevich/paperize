(function(){Sites = new Mongo.Collection('sites');
if (Meteor.isClient)
{
  Meteor.subscribe("userSubscriptions");
}
Sites.attachSchema(new SimpleSchema({
  brandName:{
    type: String,
    label: "Brand Name",
    max: 200,
    optional: true
  },
  description:{
    type: String,
    label: "Description",
    max: 1024,
    optional: true
  },
  favIconURL:{
    type: String,
    optional: true
  },
  createdBy:{
    type: String,
    autoValue: function(){
      return this.userId
    },
    optional: false
  },
  lastFetched:{
    type: Date,
    label: "Last Fetched",
    autoValue: function ()
    {
      return new Date();
    },
    optional: true
  },
  url:{
    type: String,
    label: "URL",
    optional: false,
    unique: true,
    regEx: SimpleSchema.RegEx.Url
  }
}));

Sites.initEasySearch(['brandName', 'url'], {
    'limit' : 20,
    'use' : 'mongo-db'
});

if (Meteor.isServer) {
  Sites.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
  Meteor.users.allow({
    update: function (userId, user, fields, modifier) {
      // can only change your own documents
      if(user._id === userId)
      {
        Meteor.users.update({_id: userId}, modifier);
        return true;
      }
      else return false;
    }
  })

  /*Sites.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });*/
}

})();
