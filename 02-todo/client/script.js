todoForm.title.addEventListener('keyup', (e) => validateField(e.target));
todoForm.title.addEventListener('blur', (e) => validateField(e.target));

todoForm.description.addEventListener('input', (e) => validateField(e.target));
todoForm.description.addEventListener('blur', (e) => validateField(e.target));

todoForm.dueDate.addEventListener('input', (e) => validateField(e.target));
todoForm.dueDate.addEventListener('blur', (e) => validateField(e.target));

todoForm.addEventListener('submit', onSubmit);

const todoListElement = document.getElementById('todoList');

let titleValid = true;
let descriptionValid = true;
let dueDateValid = true;

const api = new Api('http://localhost:5000/tasks');

function validateField(field) {
  const { name, value } = field;

  let = validationMessage = '';
  switch (name) {
    case 'title': {
      if (value.length < 2) {
        titleValid = false;
        validationMessage = "Fältet 'Titel' måste innehålla minst 2 tecken.";
      } else if (value.length > 100) {
        titleValid = false;
        validationMessage = "Fältet 'Titel' får inte innehålla mer än 100 tecken.";
      } else {
        titleValid = true;
      }
      break;
    }
    case 'description': {
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage = "Fältet 'Beskrvining' får inte innehålla mer än 500 tecken.";
      } else {
        descriptionValid = true;
      }
      break;
    }
    case 'dueDate': {
      if (value.length === 0) {
        dueDateValid = false;
        validationMessage = "Fältet 'Slutförd senast' är obligatorisk.";
      } else {
        dueDateValid = true;
      }
      break;
    }
  }

  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove('hidden');
}

function onSubmit(e) {
  e.preventDefault();
  if (titleValid && descriptionValid && dueDateValid) {
    console.log('Submit');
    saveTask();
  }
}

function saveTask() {
  const task = {
    title: todoForm.title.value,
    description: todoForm.description.value,
    dueDate: todoForm.dueDate.value,
    completed: false
  };

  api.create(task).then((task) => {
    if (task) {
      renderList();
    }
  });
}

function renderList() {
  console.log('rendering');
  api.getAll().then((tasks) => {
    todoListElement.innerHTML = '';

    tasks.sort((b, a) => (a.dueDate < b.dueDate) ? 1 : (a.dueDate > b.dueDate) ? -1 : 0);
    if (tasks && tasks.length > 0) {
    tasks.sort(function (a, b) {
    return a.dueDate > b.dueDate;
  });

  tasks.sort((b, a) => (a.completed < b.completed) ? 1 : (a.completed > b.completed) ? -1 : 0);
  tasks.sort(function (a, b) {
    return a.completed > b.completed;
  });
  
  tasks.forEach((task) => {
    todoListElement.insertAdjacentHTML("beforeend", renderTask(task));
  });
}
});
}

function renderTask({ id, title, description, dueDate, completed }) {
  let CheckBoxStatus = "";
  if (completed) {
    CheckBoxStatus = "checked"; }
    
  let html = "";
  if (completed) {
    html = `  <li class="select-none mt-2 py-2 border-b border-gray-300 bg-gray-300">
    <div class="flex items-center">
      <h3 class="mb-3 flex-1 text-xl font-bold text-pink-900 italic uppercase">${title}</h3>
      <div>
        <div>
          <span>${dueDate}</span>
          <button onclick="deleteTask(${id})" class="inline-block bg-green-500 text-xs border border-white px-3 py-1 rounded-md ml-2 hover:bg-green-400">Ta bort</button>
        </div>  
        <div>
          <label>Utförd</label>
          <input class="checkedBox" type="checkbox" onclick="updateTask(${id}, event)"${CheckBoxStatus}>
        </div> 
      </div>
    </div>`; } 
    
    else {
    html = `  <li class="select-none mt-2 py-2 border-b border-amber-300">
    <div class="flex items-center">
      <h3 class="mb-3 flex-1 text-xl font-bold text-pink-700 uppercase">${title}</h3>
      <div>
        <div>
          <span>${dueDate}</span>
          <button onclick="deleteTask(${id})" class="inline-block bg-amber-500 text-xs text-amber-900 border border-white px-3 py-1 rounded-md ml-2 hover:bg-yellow-400">Ta bort</button>
        </div>  
        <div>
          <label>Utförd</label>
          <input class="checkedBox" type="checkbox" onclick="updateTask(${id}, event)"${CheckBoxStatus}>
        </div> 
      </div>
    </div>`; }

    description &&
    (html += `<p class="ml-8 mt-1 text-xs italic">${description}</p>`);

  html += `</li>`;

  /* const checkCompleted =  completed == true ? "checked" : "";
  const bgColor = completed == true ? "bg-gray-100 rounded" : "";

  let html =    `<li class="select-none mt-2 py-2 border-b border-amber-300 ${bgColor}">
  <div class="flex items-center" id=${id}>
    <h3 class="mb-3 flex-1 text-xl font-bold text-pink-800 uppercase">${title}</h3>
    <div>
      <span>${dueDate}</span>
      <button onclick="deleteTask(${id})" class="inline-block bg-amber-500 text-xs text-amber-900 border border-white px-3 py-1 rounded ml-2">Ta bort</button>
      <br>
      <input onclick="finishedTask(${id})" type="checkbox" id="completeBox" name="completeBox"${checkCompleted}>
      <label for="completedBox">Utförd</label><br>
    </div>
  </div>`;

  description &&
    (html += `
      <p class="ml-8 mt-1 text-xs italic">${description}</p>`);

  html += `
    </li>`; */
    
  return html;
}

  /***********************Labb 2 ***********************/
  /* I ovanstående template-sträng skulle det vara lämpligt att sätta en checkbox, eller ett annat element som någon kan 
  klicka på för att markera en uppgift som färdig. Det elementet bör, likt knappen för delete, också lyssna efter ett event 
  (om du använder en checkbox, kolla på exempelvis w3schools vilket element som triggas hos en checkbox när dess värde förändras.). 
  Skapa en eventlyssnare till det event du finner lämpligt. Funktionen behöver nog ta emot ett id, 
  så den vet vilken uppgift som ska markeras som färdig. 
  Det skulle kunna vara ett checkbox-element som har attributet on[event]="updateTask(id)". */
  /***********************Labb 2 ***********************/


function completedTask(id) {
  api.update(id);
}

function deleteTask(id) {
  api.remove(id).then((result) => {
    renderList();
  });
}

function updateTask(id, event) {
  event.preventDefault();
  let taskChecked = event.target.checked;
  console.log("Update task");
  console.log("Checkedbox:", taskChecked);
  const data = {
    completed: taskChecked, };
  api.update(id, data).then((result) => renderList());
}

renderList();

/***********************Labb 2 ***********************/
/* Här skulle det vara lämpligt att skriva den funktion som angivits som eventlyssnare för när någon markerar en uppgift som färdig. 
Jag pratar alltså om den eventlyssnare som angavs i templatesträngen i renderTask. Det kan t.ex. heta updateTask. 
  
Funktionen bör ta emot ett id som skickas från <li>-elementet.
*/

/* Inuti funktionen kan ett objekt skickas till api-metoden update. Objektet ska som minst innehålla id på den 
uppgift som ska förändras, samt egenskapen completed som true eller false, beroende på om uppgiften markerades som färdig eller ofärdig i gränssnittet. 

Det finns några sätt att utforma det som ska skickas till api.update-metoden. 

Alternativ 1: objektet består av ett helt task-objekt, som också inkluderar förändringen. 
Exempel: {id: 1,  title: "x", description: "x", dueDate: "x", completed: true/false}

Alternativ 2: objektet består bara av förändringarna och id på den uppgift som ska förändras. 
Exempel: {id: 1, completed: true/false } 

Om du hittar något annat sätt som funkar för dig, använd för all del det, så länge det uppnår samma sak. :)
*/

/* Anropet till api.update ska följas av then(). then() behöver, som bör vara bekant vid det här laget, 
en callbackfunktion som ska hantera det som kommer tillbaka från servern via vår api-klass. 
Inuti den funktionen bör listan med uppgifter renderas på nytt, så att den nyligen gjorda förändringen syns. */

/***********************Labb 2 ***********************/