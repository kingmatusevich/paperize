Template.MasterLayout.helpers({
  'click #top': function (){
    $('html, body').animate({
        scrollTop: $("#topAnchor").offset().top-$('#top').height
    }, 'fast');
  }
});

Template.MasterLayout.events({
});
