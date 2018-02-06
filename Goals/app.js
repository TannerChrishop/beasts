//it should take the goal name and display it to the webpage
//it should have a buttone for edit and a button for delete
//it should have a button for complete which alters the style
//delete button should delete
//edit button should edit

var goalsList = {
    goals: [],
    
    pushGoal: function(goalName){
        this.goals.push({
            goal: goalName,
            completed: false
        });
    },
    
    spliceGoal: function(position){
        this.goals.splice(position, 1);
    },
    
    replaceGoal: function(position, value){
        this.goals[position].goal = value;
    },
    
    toggleComplete: function(listItem){
        var goal = this.goals[listItem];
        goal.completed = !goal.completed;
    }
};
    
var handlers = { 
    createGoal: function(){
        var inputField = document.getElementById('inputField');
        var inputValue = inputField.value;
        if(inputValue.length > 0){
            goalsList.pushGoal(inputValue);
            inputField.value = "";
            inputField.placeholder = "Enter Goal";
            display.displayGoals();
        }
    },
    
    editGoal: function (position, value){
        goalsList.replaceGoal(position, value);
        display.displayGoals();
    },
    
    deleteGoal: function(listItem){
        goalsList.spliceGoal(listItem);
        display.displayGoals();
    },
    
    goalCheck: function(listItem){
        goalsList.toggleComplete(listItem);
        display.displayGoals();
    }
    
};
    
var display = {
    displayGoals: function(){
        var list = document.getElementById('list')
        list.innerHTML = " ";
        goalsList.goals.forEach(function(goals, index){
            var listItem = document.createElement('li');
            var completedBtn = document.createElement('button');
            var editBtn = document.createElement('button');
            var deleteBtn = document.createElement('button');
            deleteBtn.className = "Delete ion-trash-b";
            editBtn.className = "Edit ion-edit";
            completedBtn.className = "Completed ion-checkmark";
            listItem.id = index;
            listItem.textContent = goals.goal;
            listItem.appendChild(editBtn);
            listItem.appendChild(deleteBtn);
            list.appendChild(listItem);
            list.insertBefore(completedBtn, listItem);
            if (goals.completed){
                listItem.className = 'complete';
            }
        });
    },
    
    setUpEventListeners: function(){
        var list = document.getElementById('list');
        list.addEventListener('click', function(e){
            var listItem = e.target.parentElement;
            
            if (e.target.className === "Delete ion-trash-b"){
                handlers.deleteGoal(listItem.id);    
            }
            if (e.target.className === "Edit ion-edit"){
                e.target.parentElement.innerHTML= "<input id = 'editInput' type = 'text'><button class = 'confirmEdit'>Confirm</button>";
                var editInput = document.getElementById('editInput');
                editInput.placeholder = goalsList.goals[listItem.id].goal;;
                editInput.focus();
                    
            }
            if (e.target.className === "confirmEdit"){
                var editInput = document.getElementById('editInput').value;
                handlers.editGoal(listItem.id, editInput);
            }
            if (e.target.className === "Completed ion-checkmark"){
                var sibling = e.target.nextSibling;
                handlers.goalCheck(sibling.id);
            }
        });   
    }
};
display.setUpEventListeners();
    