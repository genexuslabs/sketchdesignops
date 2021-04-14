import sketch from 'sketch';
import { userOutput, showOperationMessage, syncFetch, attachToConsole, copyFile, copyImages, getFileAndQueueName, getQueuePath, syncS3PUT, copyFonts, startOperationContext, step } from './utils';
import { spawnSync, execSync } from '@skpm/child_process';
import Settings from 'sketch/settings';
import { SettingKeys } from './constants';
import { runOnBackgroundAsync } from './utils-new';


async function runCommand() {
  attachToConsole();
  //  try
  {
    const doc = sketch.getSelectedDocument()
    const queuePath = getQueuePath();
    if (queuePath) {
      if (!await publish(queuePath, doc, true)) {

        showOperationMessage("😔 Some error occurs, see console for further details", userOutput);
      }
    }
  }
  // catch (e)
  // {
  //  showOperationMessage("Error", "Something goes wrong", true);
  // }
}


export default async function () {
  await runOnBackgroundAsync(runCommand, "Build and Deploy Prototype", "Press the 'Build and Deploy' button to Test your design in the web browser", "Build and Deploy");
}


export async function publish(queuePath, doc, images) {
  startOperationContext("Build And Deploy Prototype", 10);

  step("Reading Settings");

  const projectId = Settings.settingForKey(SettingKeys.PROJECT_ID) || uuidv4();
  const projectName = Settings.settingForKey(SettingKeys.PROJECT_NAME) || '';
  const projectUserName = Settings.settingForKey(SettingKeys.PROJECT_USER_NAME) || '';
  const serverUrl = Settings.settingForKey(SettingKeys.SERVER_URL);

  const enqueueUrl = serverUrl + 'enqueue';

  let enableFonts = Settings.settingForKey(SettingKeys.ENABLE_FONTS) == 1

  var fileName;
  var path = queuePath;
  queuePath = "/var/TMP";
  ({ fileName, queuePath } = getFileAndQueueName(doc, path));

  if (queuePath.localeCompare(path) != 0) {
    var spawn = spawnSync('mkdir', ["-p", queuePath + "/gx/"], { shell: true });
    if (spawn.status > 0) {
      console.log(Error(spawn.stderr));
      return false;
    }
  }

  step("Copy Images");

  if (images) {
    copyImages(queuePath + "/gx/", fileName, doc);
  }

  step("Copy Sketch File");

  var fromCopyFile = decodeURIComponent(doc.path);
  var toCopyFile = queuePath + "/gx/" + fileName;
  const ret = copyFile(fromCopyFile, toCopyFile);
  if (!ret)
    return false;


  step("Copy Fonts");
  var spawn = spawnSync('mkdir', ["-p", queuePath + "/gx/fonts"], { shell: true });
  if (spawn.status > 0) {
    console.log(Error(spawn.stderr));
    return false;
  }

  if (enableFonts) {
    copyFonts(doc, queuePath + "/gx/fonts");
  }

  if (!ret) {
    sketch.UI.alert("GeneXus", "😔 Some error occurs, see console for further details");
    return false;
  }

  step("Creating Gx Sketch File");
  fileName = fileName.replace(".sketch", ".gxsketch");
  toCopyFile = queuePath + "/" + fileName;
  console.log("File To Copy:" + toCopyFile);
  var commandLine = "pushd '" + queuePath + "' && zip -r '" + toCopyFile + "' " + "gx " + "&& popd '" + queuePath + "'";
  console.log(commandLine);


  let exec = execSync(commandLine, { shell: true });
  if (!exec)
    return false;
  spawn = spawnSync('rm', ["-rf", "'" + queuePath + "/gx/'"], { shell: true });
  if (spawn.status > 0) {
    console.log(Error(spawn.stderr));
    return false;
  }

  sketch.UI.message("Communicating with Server");

  step("Communicating with Server");

  const enqueueRequest = {
    source: 'sketch',
    projectId: projectId,
    projectName: projectName,
    userName: projectUserName,
    overwrite: true
  }

  const enqueueRequestInfo =
  {
    method: 'POST',
    body: JSON.stringify(enqueueRequest),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log("Fetch: " + enqueueUrl);
  console.log(JSON.stringify(enqueueRequestInfo));

  let responseBody: any;

  let response;
  try {

    //response = await fetch(enqueueUrl, enqueueRequestInfo);
    response = syncFetch(enqueueUrl, enqueueRequestInfo.method, enqueueRequestInfo.body, 'application/json');
    responseBody = JSON.parse(response);
  }
  catch (e) {
    const COMM_FAILED = "Communication with server failed (err.1)";
    console.log('ERRROR: ' + e);
    console.error(COMM_FAILED, response.errors);
    sketch.UI.alert(COMM_FAILED, response.status);
    return false;
  }
  console.log("fetch response: " + JSON.stringify(responseBody));
  const enqueueResponse = responseBody;

  if (enqueueResponse.code != 1) {
    const COMM_FAILED = "Server could not handle job";
    console.error(COMM_FAILED, enqueueResponse);
    sketch.UI.alert(COMM_FAILED, enqueueResponse.description);
    return false;
  }

  const uploadUrl = enqueueResponse.uploadUrl;

  sketch.UI.message("Uploading Sketch file...");
  step("Uploading to S3");

  var errors = [];
  if (!upload(uploadUrl, toCopyFile)) {
    console.log(`failed to upload: ${uploadUrl}  ${toCopyFile}`);
    sketch.UI.alert("Upload to S3 failed 😔😔😔", JSON.stringify(errors));
    return false;
  }

  step('Job uploaded successfully');
  sketch.UI.alert("GeneXus", "Your prototype has been uploaded. 💚 Please check status page for work status.");

  return true;
}

function upload(url, filePath) {
  try {
    const response = syncS3PUT(url, filePath, 'application/octet-stream');
    console.log("upload response: ", response);
    return true;
  }
  catch (e) {
    console.error(e);
  }
  return false;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}