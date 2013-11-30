Session.setDefault('topic_search', '');
Session.setDefault('person_search', '');
Session.setDefault('tags_search', '');
Session.setDefault('excluded_topic', '');
Session.setDefault('excluded_tags', '');

Session.setDefault('forum_topic_id', '');
Session.setDefault('forum_topic', '');


Template.forumPage.getPreferredProfileTheme = function(){
  if(Meteor.userId()){
    return getPreferredTheme();
  }else{
    return 'panel-default';
  }
};
Template.forumPage.getPreferredButtonTheme = function(){
  return getPreferredButtonTheme();
};

Template.forumPage.posts = function(){
  return Posts.find({'topicId': Session.get('forum_topic_id')});
};
Template.forumPage.getForumTopic = function(){
  var record = Topics.findOne({_id: Session.get('forum_topic_id')});
  if(record){
    return record.topic;
  }else{
    return '---';
  }
};
Template.forumPage.getForumTopicId = function(){
  return Session.get('forum_topic_id');
};
Template.forumPage.showSearchPanel = function(){
  if(Session.get('show_search_panel')){
    return true;
  }else{
    false;
  }
};


//----------------------------------------------------
// postItem

Session.setDefault('selected_post_id', false);
Template.postItem.events({
  'click .list-group-item':function(){
    if(Session.get('selected_post_id') === this._id){
      Session.set('selected_post_id', false);
    }else if(Session.get('selected_post_id')){
      Session.set('selected_post_id', this._id);
    }else{
      Session.set('selected_post_id', this._id);
    }
  },
  'click .delete-btn': function(){
    Posts.remove(this._id);
    Topics.update(Session.get('forum_topic_id'), {$set: {replies:  Posts.find(Session.get('forum_topic_id')).fetch().count() }});
  },
  'click .edit-btn': function(){
    //alert('edit! ' + this._id);
    Router.go('/posts/' + this._id);
  },
  'click .downvote-btn': function(){
    alert('downvote! ' + this._id);
  },
  'click .upvote-btn': function(){
    alert('upvote! ' + this._id);
  }
});
Template.postItem.isSelectedItem = function(){
  if(Session.get('selected_post_id')  === this._id){
    return "selected-post";
  }else{
    return "";
  }
};


Template.postItem.getTopic = function(){
  if(this.topicId){
    return Topics.findOne(this.topicId).topic;
  }else{
    return '...';
  }
};

Template.postItem.getWebsite = function(){
  if(this.weblink){
    return this.weblink;
  }else{
    return '';
  }
};

Template.postItem.getPostAvatar = function(){
  if(Meteor.users.findOne(this.creatorId)){
    var user = Meteor.users.findOne(this.creatorId);
    if(user.profile.avatar){
      return user.profile.avatar;
    }else{
      return '/images/icons/Default_User.png';
    }
  }else{
    return '/images/icons/Default_User.png';
  }
};
Template.postItem.getPostCreatorId = function(){
  return this.creatorId;
};
Template.postItem.creatorName = function(){
  if(this.createdBy){
    return this.createdBy;
  }else{
    return '---';
  }
};
