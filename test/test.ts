import { TaskwarriorLib } from '../lib';
const taskwarrior = new TaskwarriorLib();

// Add tasks
/*
let msg = taskwarrior.update([
	{
		description: 'test 1',
		priority: 'L'
	},
	{
		description: 'test 2',
		priority: 'M'
	}
]);
console.log(msg);
*/

// Load tasks
const tasks = taskwarrior.load('status:pending');
console.log(tasks);

// Update tasks
/*
const task = tasks[tasks.length - 1];
task.due = 'now+1d';
task.priority = 'H';
let msg = taskwarrior.update([task]);
console.log(msg);
*/

// Delete tasks
taskwarrior.del(tasks.slice(tasks.length - 1));
