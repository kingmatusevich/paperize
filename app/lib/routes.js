Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'articlesRoute',
  controller: 'ArticlesController',
  action: 'list',
  where: 'client'
});

Router.route('/articles/:_id', {
  name: 'articleRoute',
  controller: 'ArticlesController',
  action: 'view',
  where: 'client'
});

Router.route('/sites/add', {
  name: 'addSite',
  controller: 'SitesController',
  action:'add',
  where: 'client'
});

Router.route('/sites/', {
  name: 'sitesList',
  controller: 'SitesController',
  action: 'list',
  where: 'client'
});

Router.onBeforeAction(function(){
  if (!Meteor.user()){
    this.render('Home');
  } else
  {
    this.next();
  }
}, {only:['articlesRoute', 'articleRoute']});

Router.onBeforeAction(function(){
  if (!Meteor.user()){
    this.render('AccessDenied');
  } else
  {
    this.next();
  }
}, {only:['sitesList', 'addSite']});
