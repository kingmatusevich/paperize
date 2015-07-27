/*****************************************************************************/
/* Articles: Event Handlers */
/*****************************************************************************/
Template.Articles.events({
  'mouseover .article': function (e){
    Session.set('isReading', true);
  },
  'mouseout .article': function (e){
    Session.set('isReading', false);
  },
  'click .articleLink': function (e){
    $('#articleColumn').scrollTop(0);
    $('html, body').animate({
        scrollTop: $("#articleColumn").offset().top-90
    }, 'fast');
  }
});

Router._scrollToHash = function(hash) {
  var section = $(hash);
  if (section.length) {
    var sectionTop = section.offset().top-90;
    $("html, body").animate({
      scrollTop: sectionTop
    }, "slow");
  }
};

/*****************************************************************************/
/* Articles: Helpers */
/*****************************************************************************/

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return this.length>n ? this.substr(0,n-1)+'...' : this;
      };


Template.Articles.helpers({
  displayArticles: function () {
    return !Session.get('isReading') || (Session.get('isReading') == false);
  },
  articles: function ()
  {
    var history = Meteor.user().history;
     var articles = Articles.find({_id:{$nin:history}},{sort: {insert_date: -1/*, date: -1*/}});
     return articles;
  },
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
/* Articles: Lifecycle Hooks */
/*****************************************************************************/
Template.Articles.created = function () {
};

Template.Articles.rendered = function () {
};

Template.Articles.destroyed = function () {
};
