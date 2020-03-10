import sketch from 'sketch';
import { copySketch } from './send-to-queue'
import { getQueuePath } from './utils'

export default function() {
  const doc = sketch.getSelectedDocument()
  var queuePath = getQueuePath();
  if (queuePath)
    copySketch(queuePath, doc, false);
}