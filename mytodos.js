Todos = new Mongo.Collection('todos');

if(Meteor.isClient){
    // client code goes here

    //helper functions
    Template.todos.helpers({
        'todo': function(){
            return Todos.find({}, {sort: {createdAt: -1}});
        }
    });

    // helper to check the check box
    Template.todoItem.helpers({
        'checked': function(){
            var isCompleted = this.completed;
            if(isCompleted){
                return "checked";
            } else {
                return "";
            }
        }
    });

    //helper to count the completed todos
    Template.todosCount.helpers({
        'totalTodos': function(){
            return Todos.find().count();
        },
        'completedTodos': function(){
            return Todos.find({ completed: true }).count();
        }
    });

    //code for events
    Template.addTodo.events({
        /// events go here
        'submit form': function(event){
            event.preventDefault();
            var todoName = $('[name="todoName"]').val();
            Todos.insert({
                name: todoName,
                completed: false,
                createdAt: new Date()
            });
            $('[name="todoName"]').val('');
        }
    });

    // event for todo item
    Template.todoItem.events({
        // events go here
        'click .delete-todo': function(event){
            event.preventDefault();
            var documentId = this._id;
            var confirm = window.confirm("Delete this task?");
            if(confirm){
                Todos.remove({ _id: documentId });
            }
        },

        'keyup [name=todoItem]': function(event){
            if(event.which == 13 || event.which == 27){
                $(event.target).blur();
            } else {
                    var documentId = this._id;
                    var todoItem = $(event.target).val();
                    Todos.update({ _id: documentId }, {$set: { name: todoItem }});
            }
        },

        'change [type=checkbox]': function(){
            var documentId = this._id;
            var isCompleted = this.completed;
            if(isCompleted){
                Todos.update({ _id: documentId }, {$set: { completed: false }});
                console.log("Task marked as incomplete.");
            } else {
                Todos.update({ _id: documentId }, {$set: { completed: true }});
                console.log("Task marked as complete.");
            }
        }

    });
}

if(Meteor.isServer){
    // server code goes here
}