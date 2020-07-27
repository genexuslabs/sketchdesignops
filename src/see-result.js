import sketch from 'sketch';


import { spawnSync , execSync} from '@skpm/child_process';
import { getFileAndQueueName, getQueuePath } from './utils';
import { os } from '@skpm/os';

var UI = require("sketch/ui");
var zip = require("jszip");




export default function () {
  
  sketch.UI.message("Post the result ! 💚")

/*
  var dateValue = execSync("date -R").toString().replace(/\r?\n|\r/, "");
  console.log("Date:" + dateValue);
  var bucket = "gx-designops"
  var fileName = "SketchSampleBrasil.sketch";
  var file = `/Users/gmilano/Documents/DesignSketchs/${fileName}`;
  var s3Secret = "yU11uEqs3LLKVeT7t6YAZvzr+Y7W4UiUjH2Re+5B";
  var resource = `/${bucket}/${fileName}`;
  var contentType = "application/x-compressed-tar";
  var s3Secret = "yU11uEqs3LLKVeT7t6YAZvzr+Y7W4UiUjH2Re+5B";
  var signature;
  var stringToSign = `"PUT\n\napplication/x-compressed-tar\n${dateValue}\n${resource}"`;
  console.log(stringToSign);
  var signMethod = `echo -en ${stringToSign} | openssl sha1 -hmac ${s3Secret} -binary | base64`;
  console.log(signMethod);
  var signatureObj = execSync(signMethod);
  if (signatureObj)
  {
    signature = signatureObj.toString().replace(/\r?\n|\r/, "");
    console.log("Signature: " + signature.toString());

  }  
  var s3Key = "AKIAQQE2R2N2I3ZJ2OLW";
  const curl_command =  `curl -X PUT -T "${file}" -H "Host: ${bucket}.s3.amazonaws.com" -H "Date: ${dateValue}" -H "Content-Type: ${contentType}" -H "Authorization: AWS ${s3Key}:${signature}" https://${bucket}.s3.amazonaws.com/${fileName}`;
  console.log(curl_command);
  var test = execSync(curl_command);
  if (test)
    console.log(test.toString()); 
    */
  
  //const curl_command = 'curl -X PUT -T ${file} -H "Host: ${bucket}.s3.amazonaws.com"  -H "Date: ${dateValue}" -H "Content-Type: ${contentType}" -H "Authorization: AWS ${s3Key}:${signature}" https://${bucket}.s3.amazonaws.com/${bucketfilename}';
  //var p = execSync("echo hola");
  //const curl_command_2 = "echo hola"
  //var p = execSync(curl_command_2, {
   // shell: true,
   // stdio: true,
   
  //});
  //if (p)
   // console.log(p);
  
  sketch.UI.message("Opening the result ! 💚");
}

 /* const doc = sketch.getSelectedDocument()
  var queuePath = getQueuePath(queuePath);
  var fileName;
  ({ fileName, queuePath } = getFileAndQueueName(doc, queuePath));

  const urlPath = queuePath + fileName.replace(".sketch", ".url");
  console.log("open !! " + urlPath);

  const spawn = spawnSync('open', [
    "'" + urlPath + "'"
  ], { shell: true });

  if (spawn.status > 0) {
    console.log(Error(spawn.stderr));
    sketch.UI.message("😔 Some error occurs, see console for further details");
  }
  else
    sketch.UI.message("Opening the result ! 💚");
}
*/


