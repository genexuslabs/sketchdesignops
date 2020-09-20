import sketch from 'sketch';
import { output, showOperationMessage, attachToConsole, runOnBackground, copyFile, copyImages, getFileAndQueueName , getQueuePath, uploadToS3, copyFonts, startOperationContext, step} from './utils';
import { spawnSync, execSync } from '@skpm/child_process';
import Settings from 'sketch/settings';
import {SettingKeys} from './constants'; 



function runCommand() {
  attachToConsole();
//  try
  {
    const doc = sketch.getSelectedDocument()
    var queuePath = getQueuePath();
    if (queuePath)
      if (!copyGxSketch(queuePath, doc, true))
        showOperationMessage("😔 Some error occurs, see console for further details", output);

  }
 // catch (e)
 // {
  //  showOperationMessage("Error", "Something goes wrong", true);
 // }
}

export default function (context) {
  runOnBackground(runCommand, "Create & Copy GeneXus Sketch file", "Press the 'Copy' button to create a gxsketch file and then copy it to the queue", "Copy");
}



export  function copyGxSketch(queuePath, doc, images) {

  startOperationContext("Copy Gx Sketch format", 10);

  step("Reading Settings");
  let enableS3 = Settings.settingForKey(SettingKeys.ENABLE_S3) == 1
  let s3Bucket = Settings.settingForKey(SettingKeys.S3_BUCKET)
  let s3SecretKey = Settings.settingForKey(SettingKeys.S3_SECRET_KEY)
  let s3AccessKey = Settings.settingForKey(SettingKeys.S3_ACCESS_KEY)
  let enableFonts = Settings.settingForKey(SettingKeys.ENABLE_FONTS) == 1
 
 
  var fileName;
  var path = queuePath;
  ({ fileName, queuePath } = getFileAndQueueName(doc, path));
  if (enableS3) {
    queuePath = "/var/TMP";
  }

 
  
  step("copy to queue:" + queuePath);
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
  if (enableFonts)
    copyFonts(doc, queuePath + "/gx/fonts");

  if (!ret) {
    sketch.UI.alert("GeneXus", "😔 Some error occurs, see console for further details");
  }
  else {

    step("Creating Gx Sketch File");
    fileName = fileName.replace(".sketch", ".gxsketch");
    toCopyFile = queuePath + "/" + fileName;
    console.log("File To Copy:" + toCopyFile); 
    var commandLine = "pushd '" + queuePath + "' && zip -r '" + toCopyFile + "' " + "gx " + "&& popd '" + queuePath + "'";
    console.log(commandLine);
  

    let exec = execSync(commandLine , { shell: true });
    if (!exec)
      return false;
    spawn = spawnSync('rm', ["-rf",  "'" + queuePath + "/gx/'"], { shell: true }); 
    if (spawn.status > 0) {
      console.log(Error(spawn.stderr));
      return false;
    }
    if (enableS3)
    {
      step("Uploading to S3");

      console.log("uploading " + toCopyFile)
      console.log("fileName " + fileName)
      var errors = [];
      if (uploadToS3(fileName, toCopyFile, s3Bucket, s3SecretKey, s3AccessKey , errors))
        {
          sketch.UI.alert("GeneXus", "Copied to Design Ops Queue ! 💚");
          return true;
        }
      else
      {
        sketch.UI.alert("Upload to S3 failed 😔😔😔😔😔😔", JSON.stringify(errors));
        return false;
      }
    }
    else
    {
      sketch.UI.alert("GeneXus", "Copied to Design Ops Queue ! 💚");
      return true;
    }
  }
}

