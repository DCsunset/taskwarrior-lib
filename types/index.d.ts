export declare class TaskwarriorLib {
	/**
	 * Create a Taskwarrior instance 
	 * @param rcPath configuration path (default: ~/.taskrc)
	 * @param dataPath taskwarrior data path (default: ~/.task)
	 */
	constructor(rcPath?: string, dataPath?: string);

	/**
	 * Execute task command
	 * @param args Arguments
	 */
	executeCommand(args: string, input?: string): string;

	/**
	 * Calcuate an expression
	 * @param expression An expression
	 */
	calc(expression?: string): string | undefined;

	/**
	 * Load from taskwarrior
	 */
	load(filters?: string): Task[];

	/**
	 * Delete tasks (uuid must be present)
	 * 
	 * @param tasks Task[]
	 */
	del(tasks: Task[]): string;

	/**
	 * Update tasks:
	 *  add tasks if no uuid is specified;
	 *  modify tasks if the uuid exists.
	 * 
	 * @param tasks Task[]
	 */
	update(tasks: Task[]): string;
}

export declare type TaskStatus = 'pending' | 'deleted' | 'completed' | 'recurring'

export declare type TaskAnnotation = {
	entry: string,
	description: string
}

export declare type TaskPriority = 'H' | 'M' | 'L';

export declare type Task = {
	id?: number,
	status?: TaskStatus,
	uuid?: string,
	entry?: string,
	description?: string,
	start?: string,
	end?: string,
	due?: string,
	until?: string,
	wait?: string,
	modified?: string,
	scheduled?: string,
	recur?: string,
	mask?: string,
	imask?: number,
	parent?: string,
	project?: string,
	priority?: TaskPriority,
	depends?: string,
	tags?: string[],
	annotations?: TaskAnnotation[]
}
