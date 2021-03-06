# taskwarrior-lib

[![npm version](https://badgen.net/npm/v/taskwarrior-lib)](https://www.npmjs.com/package/taskwarrior-lib)
[![license](https://badgen.net/github/license/dcsunset/taskwarrior-lib)](https://github.com/DCsunset/taskwarrior-lib)


A Node.js library for interacting with taskwarrior

## Installation

```
npm install taskwarrior-lib
```

## Requirements

* [Taskwarrior](https://taskwarrior.org/) v2.4.5 or above (which supports `import` command)

## Usage

The following examples are using ES modules,
and CommonJS modules are also supported.

To import the library:

```js
import { TaskwarriorLib } from 'taskwarrior-lib';
const taskwarrior = new TaskwarriorLib();
```

Or you can specify the taskwarrior config path and data path:

```js
const taskwarrior = new TaskwarriorLib(
	'~/.taskrc',
	'~/.task'
);
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

To modify tasks:

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
