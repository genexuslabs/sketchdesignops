import sketch from 'sketch';


import { spawnSync , execSync} from '@skpm/child_process';
import { copyFonts } from './utils';

var UI = require("sketch/ui");
var zip = require("jszip");


function getFonts() {
  var fontManager = NSFontManager.sharedFontManager();
  var fonts = [];
  var sys_fonts = fontManager.availableFonts();
  //has to convert them to normal array, as {sys_fonts} is array-like object, and is persistent, so when modified, changes stay between runs of script
  for (var i = 0; i < sys_fonts.length; ++i) {
      fonts.push(sys_fonts[i]);
  }
  return fonts;
}


export default function (context) {
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



