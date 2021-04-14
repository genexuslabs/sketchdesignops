import { ProjectState } from "./db-state-project";
import { StandardResponse } from "./standard-response";

export interface EnqueueResponse extends StandardResponse {
    status? : ProjectState;
    statusUrl: string;
    uploadUrl: string;
}