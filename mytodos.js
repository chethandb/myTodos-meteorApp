Todos = new Mongo.Collection('todos');

if(Meteor.isClient){
    // client code goes here

    //helper functions
    Template.todos.helpers({
        'todo': function(){
            return Todos.find();
        }
    });
}

if(Meteor.isServer){
    // server code goes here
}