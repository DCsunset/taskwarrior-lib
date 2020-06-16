export declare type TaskStatus = 'pending' | 'deleted' | 'completed' | 'waiting' | 'recurring';

export declare type TaskAnnotation = {
	entry: string,
	description: string
};

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
};

export declare interface TaskUUID {
	uuid: string
}
