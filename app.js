//User Interface Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Event listeners global function

loadEventListeners();


function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', getTasks);

	form.addEventListener('submit', addTasks);

	taskList.addEventListener('click', removeTask);

	clearBtn.addEventListener('click', clearAllTasks);

	filter.addEventListener('keyup', filterTasks);

}

function getTasks(){
	let tasks = localStorageManager();

	tasks.forEach(function(task){
		createTaskLi(task);
	});
}

function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	
	document.querySelectorAll('.collection-item').forEach(function(task){
		const item = task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text) !== -1){
			task.style.display = 'block';
		}else{
			task.style.display = 'none';
		}
	});
}

function clearAllTasks(e) {
	let tasks = document.querySelectorAll('.delete-item');

	tasks.forEach(function (task) {
		task.parentElement.remove();
	});
}

function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {

		if (confirm("Sure about that?")) {
			e.target.parentElement.parentElement.remove();
		}
	}
}

function addTasks(e) {
	if (taskInput.value === '') {
		alert('add a task');
	}
	createTaskLi();

	
	localStorageManager(taskInput.value);

	taskInput.value = '';

	e.preventDefault();
}

function createTaskLi(task = null) {
	if(task === null) task = taskInput.value;
	const li = document.createElement('li');
	li.className = 'collection-item';
	li.appendChild(document.createTextNode(task));
	const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-minus"></i>';
	li.appendChild(link);
	taskList.appendChild(li);
}

function localStorageManager(task = null){
	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse( localStorage.getItem('tasks') );
	}

	if(task !== null){
	tasks.push(task);
	}

	localStorage.setItem('tasks', JSON.stringify(tasks));

	return tasks;
}