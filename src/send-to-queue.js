import sketch from 'sketch';
import { spawnSync } from '@skpm/child_process';

var UI = require("sketch/ui");

var exportLayer = function( layer , path)
{
  const options = { output: path};
  if (layer.exportFormats && layer.exportFormats.length > 0)
   {
      if (layer.name)
        console.log("Exporting " + layer.name);
      sketch.export(layer, options);
   }      
   
  if (layer.layers)
  {
    layer.layers.forEach( child => exportLayer(child, path));
   
  }
}

export default function() {

   /*
  let payload = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method:'POST',
    body: {
      "FileName": "TestFile2",
      "FileContent" : "Hola Mundo sketch"
    }
  };
  fetch('https://apps5.genexus.com/Idd368f10b0d2207f732507442d8a165ef/rest/SketchFiles/TestFile2', payload);
*/
  const doc = sketch.getSelectedDocument()
  const queuePath = '/Volumes/cable/DesignOpsQueue/'

  var imageFolder =  queuePath + decodeURIComponent(doc.path).replace(/^.*[\\\/]/, '').replace(".sketch", "Images");
  console.log("Images to :" + imageFolder)
  doc.pages.forEach( page =>
    {
      page.layers.forEach( layer =>
        {
          exportLayer(layer, imageFolder);
        })
    });
  

  
 const spawn = spawnSync('cp', [
   "'" + decodeURIComponent(doc.path) + "'",
   queuePath
 ], { shell: true });

  
  
 if (spawn.status > 0)
 {
   console.log(Error(spawn.stderr));
   sketch.UI.message("😔 Some error occurs, see console for further details");
  }
 else
  sketch.UI.message("Copied to Design Ops Queue ! 💚")
  

}