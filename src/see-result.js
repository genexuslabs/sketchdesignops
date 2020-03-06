import sketch from 'sketch';
import { spawnSync } from '@skpm/child_process';


var UI = require("sketch/ui");




export default function () {

  const doc = sketch.getSelectedDocument()
  var queuePath = '/Volumes/cable/DesignOpsQueue/'
  
  var branch = "";
  var build = "";
  var path = doc.path;
  var fileName = decodeURIComponent(doc.path).replace(/^.*[\\\/]/, '').trim();
  var firstIndex = fileName.indexOf("(");
  var lastIndex = fileName.lastIndexOf(")");

  if (firstIndex > 0 && lastIndex > 0 && lastIndex > firstIndex) {
    var withoutVersionPath = fileName.substr(0, firstIndex).trim() + ".sketch";
    var branchAndBuild = fileName.substr(firstIndex + 1, lastIndex - firstIndex - 1).trim();
    var items = branchAndBuild.split("@");
    if (items.length == 2) {
      branch = items[0].trim();
      build = items[1].trim();
      queuePath = queuePath + branch + "/" + build + "/";
    
      fileName = withoutVersionPath;
    }
  }
  



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
      sketch.UI.message("Opening the result ! 💚")
 
}