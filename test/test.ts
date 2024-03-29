import { TaskwarriorLib, TaskError } from '../lib';
import * as path from 'path';

const taskwarrior = new TaskwarriorLib(
	path.join(__dirname, '.taskrc'),
	path.join(__dirname, '.task')
);

const config = taskwarrior.config();
console.log(config);

// Add tasks
const newTasks = new Array(16);
newTasks.fill({
	description: 'test',
	priority: 'L'
})
let msg = taskwarrior.update(newTasks);
console.log(msg);

try {
	// Must throw
	taskwarrior.update([
		{
			description: 'test 2',
			due: '1d',
			priority: 'M'
		}
	]);
	process.exit(1);
}
catch (err) {
	if (!(err instanceof TaskError))
		process.exit(1);
	console.log(err)
}

try {
	// Must throw
	taskwarrior.update([
		{
			description: 'test 2',
			due: 'now+1d',
			recur: 'now+1d',
			priority: 'M'
		}
	]);
	process.exit(1);
}
catch (err) {
	if (!(err instanceof TaskError))
		process.exit(1);
	console.log(err)
}

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
