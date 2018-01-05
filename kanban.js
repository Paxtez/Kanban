var listTypes = [
                {id:'toDo',
                 title:'To Do',
                 color:'Red',
                },
                {id:'inProgress',
                 title:'In Progress',
                 color:'Orange',
                },
                {id:'completed',
                 title:'Completed',
                 color:'LightGreen',
                },
                {id:'testing',
                 title:'Testing',
                 color:'FUCHSIA',
                },
                {id:'accepted',
                 title:'Accepted',
                 color:'Cyan',
                },
                {id:'archived',
                 title:'Archived',
                 color:'LightGray',
                }
          ];
var numTypes = listTypes.length - 1;

var selectedCard = null;

var cardList = [
  {
    title: 'DEMO1',
    desc: 'Test 1',
    owner: 'Bob',
    type: 'toDo'
  },
    {
    title: 'DEMO2',
    desc: 'Test 2',
    owner: 'Joe',
    type: 'inProgress'
  },
    {
    title: 'DEMO3',
    desc: 'Test 3',
    owner: 'Me',
    type: 'completed'
  },
    {
    title: 'DEMO4',
    desc: 'Test 4',
    owner: 'Mary',
    type: 'accepted'
  },
    {
    title: 'DEMO5',
    desc: 'Done Job5',
    owner: 'Suzie',
    type: 'archived'
  },
];

function getCardTypeNumber(type) {
  var ret = null;  
  for (var x = 0; x <= numTypes; x++) {
    if (type == listTypes[x].id) {
      return x;
    }
  }
  return ret;
}


function createCardElement(object){

  object.type = object.type || listTypes[0][id];
  var typeNum = getCardTypeNumber(object.type);

  var card = document.createElement('div');
  card.className = 'card';
  card.id = object.id;
 
  if (object.id == selectedCard) {
    var titleEdit = document.createElement('input');
    titleEdit.placeholder = 'Title';
    titleEdit.name = 'title';
    titleEdit.id = 'titleEdit';
    titleEdit.value = object.title;
    titleEdit.size = '12';
    titleEdit.required = true;
       
    var titleBox = document.createElement('div');
    titleBox.className = 'cardTitle';
    
    titleBox.appendChild(titleEdit);
    
    card.appendChild(titleBox);
    
    var descEdit = document.createElement('input');
    descEdit.placeholder = 'Description';
    descEdit.name = 'desc';
    descEdit.id = 'descEdit';
    descEdit.value = object.desc;
    descEdit.required = true;
    descEdit.size = '14';
    card.appendChild(descEdit);
    
    var ownerEdit = document.createElement('input');
    ownerEdit.placeholder = 'Owner';
    ownerEdit.name = 'owner';
    ownerEdit.id = 'ownerEdit';
    ownerEdit.value = object.owner;
    ownerEdit.required = true;
    ownerEdit.size = '14';
    card.appendChild(ownerEdit);
  
    var deleteTaskButton = document.createElement('button');
    deleteTaskButton.innerHTML = 'x';  
    deleteTaskButton.value = object.id;
    deleteTaskButton.onclick = deleteCard;
    deleteTaskButton.className = 'moveTaskButton';

    var saveTaskButton = document.createElement('button');
    saveTaskButton.innerHTML = '[SAVE]';  
    saveTaskButton.value = object.id;
    saveTaskButton.onclick = saveCard; 

    card.appendChild(deleteTaskButton);
    card.appendChild(saveTaskButton);

    if (typeNum > 0) {
      var downgradTask = document.createElement('button');
      downgradTask.innerHTML = '&#8592;';  
      downgradTask.value = object.id;
      downgradTask.onclick = downgradeCard;
      downgradTask.className = 'shiftTaskButton';
      card.appendChild(downgradTask);
    }

    if (typeNum < numTypes) {
      var upgradeTask = document.createElement('button');
      upgradeTask.innerHTML = '&#8594;';  
      upgradeTask.value = object.id;
      upgradeTask.onclick = upgradeCard;
      upgradeTask.className = 'shiftTaskButton';
      card.appendChild(upgradeTask);
    }
  } else {
    var cardTitle = document.createElement('div');
    cardTitle.innerHTML = object.title;
    cardTitle.className = 'cardTitle';
    cardTitle.onclick = selectCard;
    cardTitle.style.textDecoration = "underline";

    var cardDesc = document.createElement('p');
    cardDesc.innerHTML = object.desc;

    var cardOwner = document.createElement('p');
    cardOwner.innerHTML = 'OWNER: '+object.owner;
      card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(cardOwner);
  }
 

  return card;
}
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
function deleteCard(){
  var thisId = this.value;
  if (cardList[thisId] != null) {
    console.log('Deleted card #'+thisId);
    cardList.splice(thisId, 1)
    selectedCard = null;
    drawAllCards()
  } else {
    console.log('UNABLE TO LOCATE #'+thisId);
  }
}

function downgradeCard(){
  var thisId = this.value;
  console.log('Downgraded Card #'+thisId);
  if (cardList[thisId] != null) {
    var typeNum = getCardTypeNumber(cardList[thisId].type);
    if (listTypes[typeNum - 1] != null) {
      cardList[thisId].type = listTypes[typeNum - 1].id;
      drawAllCards();    
    }
  } else {
    console.log('UNABLE TO LOCATE #'+thisId);
  }
}

function upgradeCard(){
  var thisId = this.value;
  if (cardList[thisId] != null) {
    console.log('Upgraded Card #'+thisId);
    var typeNum = getCardTypeNumber(cardList[thisId].type);
    if (listTypes[typeNum + 1] != null) {
      cardList[thisId].type = listTypes[typeNum + 1].id;
      drawAllCards()
    }
  } else {
    console.log('UNABLE TO LOCATE #'+thisId);
  }
}

function saveCard() {
  var thisId = this.value;
  if (cardList[thisId] != null) {
    console.log('Saved Card #'+thisId);
    cardList[thisId].title = document.getElementById('titleEdit').value;
    cardList[thisId].desc = document.getElementById('descEdit').value;
    cardList[thisId].owner = document.getElementById('ownerEdit').value;
    selectedCard = null;
    drawAllCards()
  } else {
    console.log('UNABLE TO LOCATE #'+thisId);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  var newTaskObject = {
    title: event.target.title.value,
    desc: event.target.desc.value,
    owner: event.target.owner.value,
    type: listTypes[0].id,
  };
  cardList.push(newTaskObject);
  formSetup()
  drawAllCards()

}


function drawAllCards(){
  var Kanban = document.getElementById("KanBanBody");
  Kanban.innerHTML = '';
  listTypes.map(function(type){
    var column = document.createElement('div');
    column.className = 'taskColumn';
    column.id = type.id;

    var columnHeader = document.createElement('div');
    columnHeader.className = 'headerTitle';
    columnHeader.innerHTML = type.title;
    column.style.backgroundColor  = type.color;

    column.appendChild(columnHeader)
    Kanban.appendChild(column);
  })

  for (var x = 0; x < cardList.length; x++) {
    var cardType = cardList[x].type || listTypes[0].id;
    cardList[x].id = x;
    var card = createCardElement(cardList[x])
    var targetColumn = document.getElementById(cardType)
    targetColumn.appendChild(card)
  }
  listTypes.map(function(type){
    var target = document.getElementById(type.id);
    var cards = target.getElementsByClassName('card');
    if (cards.length > 0) {
      var header = target.getElementsByClassName('headerTitle');
      header[0].innerHTML += '<br> ['+cards.length+']';
    }

  })
}

function selectCard() {
   var thisId = this.parentElement.id;
  if (cardList[thisId] != null) {
    console.log('Selected Card #'+thisId);
    selectedCard = thisId;
    drawAllCards();
  } else {
    console.log('UNABLE TO LOCATE #'+thisId);
  }
}

function formSetup(){
  
  document.getElementById("formContainer").innerHTML = '';
  var newTaskForm = document.createElement('form');
  newTaskForm.onsubmit = handleSubmit;

  var titleInput = document.createElement('input');
  titleInput.placeholder = 'Title';
  titleInput.name = 'title';
  titleInput.id = 'titleInput';
  titleInput.required = true;

  var descInput = document.createElement('input');
  descInput.placeholder = 'Description';
  descInput.name = 'desc';
  descInput.id = 'descInput';
  descInput.required = true;

  var ownerInput = document.createElement('input');
  ownerInput.placeholder = 'Owner';
  ownerInput.name = 'owner';
  ownerInput.id = 'ownerInput';
  ownerInput.required = true;

  var submitButton = document.createElement('button');
  submitButton.innerHTML = 'Add task';
  submitButton.type = 'submit';

  newTaskForm.appendChild(titleInput);
  newTaskForm.appendChild(descInput);
  newTaskForm.appendChild(ownerInput);
  newTaskForm.appendChild(submitButton);
  formContainer.appendChild(newTaskForm);
}

formSetup()
drawAllCards()
