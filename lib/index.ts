import { execSync } from 'child_process';
import { Task, TaskRc, TaskRcItem } from '../types';

export class TaskError extends Error {
}

function isISODate(str: string) {
	return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)
}

export class TaskwarriorLib {
	private env: string;

	constructor(rcPath?: string, dataPath?: string) {
		const rcEnv = rcPath ? `TASKRC=${rcPath}` : "";
		const dataEnv = dataPath ? `TASKDATA=${dataPath}` : "";
		this.env = `${rcEnv} ${dataEnv}`;
	}

	/**
	 * Execute task command
	 * @param args Arguments
	 */
	executeCommand(args: string, input?: string) {
		try {
			const result = execSync(`${this.env} task rc.confirmation=no rc.recurrence.confirmation=no rc.dependency.confirmation=no rc.json.depends.array=yes rc.bulk=0 ${args}`, {
				encoding: 'utf8',
				maxBuffer: 200 * 1024 * 1024,
				input
			});
			return result;
		}
		catch (err) {
			throw new TaskError('Task command error');
		}
	}

	/**
	 * Calcuate an expression
	 * @param expression An expression
	 */
	calc(expression?: string) {
		return expression && this.executeCommand(`calc ${expression}`);
	}

	/**
	 * Calcuate an expression
	 * @param expression An expression
	 */
	calcDate(expression?: string) {
		const result = this.calc(expression);
		if (result && !isISODate(result)) {
			throw new TaskError(`Invalid date string '${expression}'`);
		}
		return result;
	}

	/**
	 * Check the period format
	 * @param period An expression
	 */
	checkPeriod(period?: string) {
		const result = this.calc(period);
		if (result && result.charAt(0) !== 'P') {
			throw new TaskError(`Invalid period string '${period}'`);
		}
	}

	/**
	 * Parse TaskWarrior configuration.
	 */
	config() {
		const result = this.executeCommand("_show");
		const config: TaskRc = {};
		if (result) {
			for (const line of result.split('\n')) {
				var separator = line.indexOf("=");
				const [key, value] = [
					line.substr(0, separator),
					line.substr( separator + 1)
				];
				const path = key.split(".");
				let obj = config;
				for (let i = 0; i < path.length - 1; ++i) {
					const objKey = path[i] + '.';
					if (!obj[objKey]) {
						obj[objKey] = {};
					}
					obj = obj[objKey] as TaskRc;
				}
				obj[path[path.length - 1]] = value;
			}
		}
		return config;
	}

	/**
	 * Load from taskwarrior
	 */
	load(filters = ''): Task[] {
		const rawData = this.executeCommand(`${filters} export`);
		return JSON.parse(rawData);
	}

	/**
	 * Delete tasks (uuid must be present)
	 * 
	 * @param tasks Task[]
	 */
	del(tasks: Task[]) {
		const args = `${tasks.map(task => task.uuid).join(' ')} delete`;
		const result = this.executeCommand(args);
		return result;
	}

	/**
	 * Update tasks:
	 *  add tasks if no uuid is specified;
	 *  modify tasks if the uuid exists.
	 * 
	 * @param tasks Task[]
	 */
	update(tasks: Task[]) {
		const result = this.executeCommand('import', JSON.stringify(
			tasks.map(task => {
				this.checkPeriod(task.recur);
				return {
					...task,
					due: this.calcDate(task.due),
					until: this.calcDate(task.until),
					wait: this.calcDate(task.wait),
					scheduled: this.calcDate(task.scheduled),
					start: this.calcDate(task.start)
				};
			})
		));
		return result;
	}
};
