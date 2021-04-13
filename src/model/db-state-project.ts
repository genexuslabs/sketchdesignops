export interface ProjectState {
    id: string;
    projectName: string;
    projectId: string;
    status: ProjectStatusEnum;
    lastUpdated: Date;
    lastWork: Date;
    lastWorkUri: String;
}


export enum ProjectStatusEnum {
    Pending = 'PENDING',
    WaitingForUpload = 'WAITING_UPLOAD',
    Building = 'BUILDING',
    Finished = 'FINISHED',
    Failed = 'FAILED',
    Cancelled = 'CANCELLED',
}