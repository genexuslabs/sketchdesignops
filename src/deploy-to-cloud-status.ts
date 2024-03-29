import sketch from 'sketch';
import { openUrl, output, showOperationMessage, syncFetch, attachToConsole, startOperationContext, step, info, getFileAndQueueName, getQueuePath } from './utils';
import { execSync } from '@skpm/child_process';
import { runOnBackgroundAsync } from './utils-new';
import { getSettingsData, setCurrentProject } from './settings-helper';


async function runCommand() {
  attachToConsole();
  //  try
  {
    if (!await status()) {
      showOperationMessage("😔 Some error occurs, see console for further details", output);
    }
  }
  // catch (e)
  // {
  //  showOperationMessage("Error", "Something goes wrong", true);
  // }
}

export default async function () {
  await runOnBackgroundAsync(runCommand, "Build Status", "Press the 'Status' button to check job status", "Status");
}

export async function status() {
  startOperationContext("Checking status", 10);

  let fileName;
  ({ fileName } = getFileAndQueueName(sketch.getSelectedDocument(), getQueuePath()));
  
  step("Reading Settings");
  
  setCurrentProject(fileName);
  const settings = getSettingsData();
  const statusUrl = settings.serverUrl + 'status?id=' + settings.projectId;
  step("Checking Job Status");

  let isReady = false;
  let deployUrl;
  let pendingRetryCount = 3;
  let message = 'Unknown error';
  let failed = false;
  let waitingRetries = 0;
  let buildingRetries = 0;
  let buildingRetryCount = 12;
  const sleepSeconds = 5;
  while (!isReady && pendingRetryCount > 0 && !failed && buildingRetryCount > 0) {

    let response = '';
    try {
      response = syncFetch(statusUrl, 'GET', '', 'application/json');
    }
    catch (e) {
      console.error(e);
    }
    let statusCode = '';
    if (response) {
      const statusResponse = JSON.parse(response);
      statusCode = (statusResponse.status) ? statusResponse.status.status : 'UNKNOWN';

      switch (statusCode) {
        case 'PENDING':
        case 'WAITING_UPLOAD':
          pendingRetryCount--;
          waitingRetries++;
          let waitingSeconds = waitingRetries * sleepSeconds;
          sketch.UI.message(`Waiting for Build server to build project (elapsed time: ${waitingSeconds}s)`);
          info('Status: Waiting for Build');
          message = 'Build server may be offline, check with admininstrator';

          break;
        case 'BUILDING':
          waitingSeconds = buildingRetries * sleepSeconds;
          info(`Status: Build Server is building Sketch Project (elapsed time: ${waitingSeconds}s)`);
          sketch.UI.message(`Build Server is building Sketch Project (elapsed time: ${waitingSeconds}s)`);
          message = 'Build server is building, wait some minutes';
          buildingRetries++;
          buildingRetryCount--;
          break;
        case 'FAILED':
          failed = true;
          info('Build failed');
          message = 'The prototype could not be built with success';
          break;
        case 'FINISHED':
          info('Finished!');
          isReady = true;
          deployUrl = statusResponse.status.lastDeployUrl;
          break;
        default:
          break;
      }

      execSync(`sleep ${sleepSeconds}s`, { shell: false });
    }

  }
  if (isReady) {
    sketch.UI.alert("GeneXus", "Your prototype is ready! 💚. Your default browser will be launched now");
    openUrl(deployUrl);
    return true;
  }
  else {
    sketch.UI.alert("GeneXus", message + " 😔😔😔. Retry in some minutes");
    //sketch.UI.alert("GeneXus", "An error has ocurred. Check logs and retry 😔😔😔");
    return true;
  }
}
