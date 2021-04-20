
export interface IJob {
  source: "sketch" | "adobe";
  projectId: string;
  projectName: string;
  userName: string;
  overwrite: boolean;
}
