import { execSync } from 'child_process';
import { Task, TaskUUID } from '../types';

export class TaskwarriorLib {
	constructor() {
	}

	/**
	 * Execute task command
	 * @param args Arguments
	 */
	executeCommand(args: string, input?: string) {
		const result = execSync(`task rc.confirmation=off ${args}`, {
			encoding: 'utf8',
			input
		});
		return result;
	}

	/**
	 * Calcuate an expression
	 * @param expression An expression
	 */
	calc(expression?: string) {
		return expression && this.executeCommand(`calc ${expression}`);
	}

	/**
	 * Load from taskwarrior
	 */
	load(filters = ''): Task[] {
		const rawData = this.executeCommand(`${filters} export`);
		return JSON.parse(rawData);
	}

	/**
	 * Delete tasks (use uuid)
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
			tasks.map(task => ({
				...task,
				due: this.calc(task.due),
				until: this.calc(task.until),
				wait: this.calc(task.wait),
				scheduled: this.calc(task.scheduled),
				start: this.calc(task.start)
			}))
		));
		return result;
	}
};
