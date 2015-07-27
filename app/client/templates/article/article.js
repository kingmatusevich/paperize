/*****************************************************************************/
/* Article: Event Handlers */
/*****************************************************************************/
Template.Article.events({
});

/*****************************************************************************/
/* Article: Helpers */
/*****************************************************************************/
Template.Article.helpers({
  siteName: function ()
  {
    var id = this.siteID;
    var site = Sites.findOne(id);
    return site.brandName.toUpperCase();
  },
  siteFavIcon: function ()
  {
    var id = this.siteID;
    var site = Sites.findOne(id);
    return 'http://www.google.com/s2/favicons?domain='+site.url;
    //return site.url+'/favicon.ico';
  },
  authorsConcat: function()
  {
    var authors = this.authors;
    return authors.join(', ');
  },
  formattedPublishingDate: function ()
  {
    var date = this.insert_date;
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
  },
  formattedLongDate: function ()
  {
    var date = this.insert_date;
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
      return moment(date).format("dddd H:mm, DD/MM/YY");
    }
    return false;
  }
});

/*****************************************************************************/
/* Article: Lifecycle Hooks */
/*****************************************************************************/
Template.Article.created = function () {
};

Template.Article.rendered = function () {
  this.autorun(function () {
    var context = Template.currentData();
    var id;
    if (context){
      id = context._id;
    }
    window.console.log(id);
    var history = Meteor.user().history;
    if (history == undefined) history = [];
    var notContains = ($.inArray(id, history) == -1);
    window.console.log($.inArray(id, history) == -1);
    if (id && notContains)
    {
      history.push(id);
      window.console.log('acá');
      window.console.log(Meteor.users.update({'_id': Meteor.userId()},{$set:{'history': history}}));
    }
  });
};

Template.Article.destroyed = function () {
};
