import sketch from 'sketch';
import { copySketch } from './send-to-queue'
import { getQueuePath, attachToConsole, runOnBackground } from './utils'


function runCommand() {
  attachToConsole();
  try
  {
    const doc = sketch.getSelectedDocument()
    var queuePath = getQueuePath();
    if (queuePath)
      copySketch(queuePath, doc, false);
  }
  catch (e)
  {
    showOperationMessage("Error", "Something goes wrong", true);
  }
}

export default function (context) {
  runOnBackground(runCommand, "Copy only Sketch file", "Press 'Copy' button to copy this file to the specified queue location", "Copy");
}