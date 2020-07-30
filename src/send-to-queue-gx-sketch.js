import sketch from 'sketch';
import { copyFile, copyImages, getFileAndQueueName , getQueuePath, uploadToS3, copyFonts} from './utils';
import { spawnSync, execSync } from '@skpm/child_process';
import Settings from 'sketch/settings';
import {SettingKeys} from './constants'; 


export default function() {
  const doc = sketch.getSelectedDocument()
  var queuePath = getQueuePath();

  let fiber = require('sketch/async').createFiber()

  
    // after completion, tell the fiber we're done
    if (queuePath)
      return new Promise(resolve => { 
        copyGxSketch(queuePath, doc, true); 
        fiber.cleanup();

      });
  

  
}

export  function copyGxSketch(queuePath, doc, images) {
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
  console.log("copy to queue:" + queuePath);
  if (queuePath.localeCompare(path) != 0) {
     spawnSync('mkdir', ["-p", queuePath + "/gx/"], { shell: true });
  }
  if (images)
    copyImages(queuePath + "/gx/", fileName, doc);

  var fromCopyFile = decodeURIComponent(doc.path);
  var toCopyFile = queuePath + "/gx/" + fileName;
  const ret = copyFile(fromCopyFile, toCopyFile);

  spawnSync('mkdir', ["-p", queuePath + "/gx/fonts"], { shell: true });
  if (enableFonts)
    copyFonts(doc, queuePath + "/gx/fonts");

  if (!ret) {
    sketch.UI.message("😔 Some error occurs, see console for further details");
  }
  else {
    fileName = fileName.replace(".sketch", ".gxsketch");
    toCopyFile = queuePath + "/" + fileName;
    console.log("File To Copy:" + toCopyFile);
    execSync("pushd " + queuePath + " && zip -r '" + toCopyFile + "' " + "gx " + "&& popd " + queuePath , { shell: true });
    spawnSync('rm', ["-rf",  queuePath + "/gx/"], { shell: true }); 
    if (enableS3)
    {
      console.log("uploading " + toCopyFile)
      console.log("fileName " + fileName)
      var errors = [];
      if (uploadToS3(fileName, toCopyFile, s3Bucket, s3SecretKey, s3AccessKey , errors))
        sketch.UI.message("Copied to Design Ops Queue ! 💚");
      else
      {
        sketch.UI.alert("Upload to S3 failed 😔😔😔😔😔😔", JSON.stringify(errors));
        sketch.UI.message("😔😔😔😔😔😔 See log for more information 💚");
      }
    }
  }
}

