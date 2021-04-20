
import { ProjectState } from "./db-state-project";
import { StandardResponse } from "./standard-response";

export interface StatusResponse extends StandardResponse {
   status?: ProjectState;
}