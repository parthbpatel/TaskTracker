document.getElementById('taskInputForm').addEventListener('submit', saveTask);

function saveTask(e) {
  var taskId = chance.guid();
  var taskDesc = document.getElementById('taskDescInput').value;
  var taskPriority = document.getElementById('taskPriorityInput').value;
  var taskAssignedTo = document.getElementById('taskAssignedToInput').value;
  var taskStatus = 'Open';
  var task = {
    id: taskId,
    description: taskDesc,
    priority: taskPriority,
    assignedTo: taskAssignedTo,
    status: taskStatus
  }

  if (localStorage.getItem('tasks') === null) {
    var tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  document.getElementById('taskInputForm').reset();

  fetchTasks();

  e.preventDefault();
}

function setStatusClosed(id) {
  var tasks = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].status = 'Closed';
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  fetchTasks();
}

function deleteTask(id) {
  var tasks = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  fetchTasks();
}

function fetchTasks () {
  var tasks = JSON.parse(localStorage.getItem('tasks'));
  var tasksList = document.getElementById('tasksList');

  tasksList.innerHTML = '';

  for (var i = 0; i < tasks.length; i++) {
    var id = tasks[i].id;
    var desc = tasks[i].description;
    var priority = tasks[i].priority;
    var assignedTo = tasks[i].assignedTo;
    var status = tasks[i].status;

    tasksList.innerHTML +=   '<div class="well">'+
                              '<h6>Task ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + priority + ' '+
                              '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteTask(\''+id+'\')">Delete</a>'+
                              '</div>';
  }
}
