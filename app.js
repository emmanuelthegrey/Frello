//User Interface Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Event listeners global function

loadEventListeners();


function loadEventListeners(){
	form.addEventListener('submit', addTasks);

	taskList.addEventListener('click', removeTask);

	clearBtn.addEventListener('click', clearAllTasks);

	filter.addEventListener('keyup', filterTasks);

	function filterTasks(e){

	}
}

function clearAllTasks(e){
	let tasks = document.querySelectorAll('.delete-item');

	tasks.forEach(function(task){
		task.parentElement.remove();
	});
}

function removeTask(e){
	if(e.target.parentElement.classList.contains('delete-item')){

		if(confirm("Sure about that?")){
		e.target.parentElement.parentElement.remove();
		}
	}
}

function addTasks(e){
	if(taskInput.value === ''){
		alert('add a task');
	}
		const li = document.createElement('li');

		li.className = 'collection-item';
		li.appendChild(document.createTextNode(taskInput.value));
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-minus"></i>';

		li.appendChild(link);

		taskList.appendChild(li);
		taskInput.value = '';

	e.preventDefault();
}