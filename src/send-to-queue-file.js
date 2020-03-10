import sketch from 'sketch';
import { copySketch } from './send-to-queue'
import { askQueuePath } from './utils'

export default function() {
  const doc = sketch.getSelectedDocument()
  var queuePath = askQueuePath(queuePath);
  if (queuePath)
    copySketch(queuePath, doc, false);
}