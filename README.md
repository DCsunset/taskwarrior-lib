# taskwarrior-lib

A Node.js library for interacting with taskwarrior

## Installation

```
npm install taskwarrior-lib
```

## Usage

To import the library:

```js
import { TaskwarriorLib } from 'taskwarrior-lib';
const taskwarrior = new TaskwarriorLib();
```

To add tasks:

```js
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
```

To load tasks:

```js
const tasks = taskwarrior.load('status:pending');
console.log(tasks);
```

To update tasks:

```js
const task = tasks[tasks.length - 1];
task.due = 'now+1d';
task.priority = 'H';
let msg = taskwarrior.update([task]);
console.log(msg);
```

To delete tasks:

```js
taskwarrior.del(tasks.slice(tasks.length - 1));
```

## License

MIT License
