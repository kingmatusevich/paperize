Articles = new Mongo.Collection('articles');

if (Meteor.isClient)
{
  Deps.autorun(function(){
    if (Meteor.user() && Meteor.user().subscriptions != undefined)
    {
      Meteor.subscribe('userArticles', Meteor.user().subscriptions);
    }
  })
}
Articles.attachSchema(new SimpleSchema({
  title:{
    type: String,
    label: "Title",
    max: 200,
    optional: false
  },
  summary:{
    type: String,
    label: "Summary",
    max: 1024,
    optional: true
  },
  url:{
    type: String,
    label: "URL",
    optional: true
  },
  keywords:{
    type: [String],
    label: "keywords",
    optional: true
  },
  authors:{
    type: [String],
    label: "Authors",
    optional: true
  },
  text:{
    type: String,
    label: "Full Text",
    optional: true
  },
  date:{
    type: Date,
    label: "Date",
    optional: true
  },
  insert_date:{
    type: Date,
    label: "Insert Date",
    optional: true
  },
  html:{
    type: String,
    label: "HTML",
    optional: true
  },
  siteID:{
    type: String,
    optional: true
  }
}));


if (Meteor.isServer) {
  Articles.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Articles.deny({
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
}
