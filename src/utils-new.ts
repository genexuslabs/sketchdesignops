
import { UIDialog } from './uidialog';
import { attachToConsole, Delegate, setDialogFeedback} from './utils';


export async function runOnBackgroundAsync(runCommand, title, description, actionName) {
    UIDialog.setUp(context);
 
    const dialog = new UIDialog(title, NSMakeRect(0, 0, 400, 220), actionName, description, "Close")
    var step = 0;
    var progress = dialog.addProgress(true, 0, 10);
    // @ts-ignore: Types sketch error
    progress.setHidden(true);
    setDialogFeedback(dialog.addFullLabel("out", "", 100));
    
    var prc = new Delegate(
        {
            'next:': async function next() {
                if (!(step in steps)) {
                    return;
                }
                step++;
                await steps[step]();
                
            }
        }
    );
    var timer;
    var steps = {
        1: async function () {
            // @ts-ignore: Types sketch error
            progress.setHidden(false);
            // @ts-ignore: Types sketch error
            progress.startAnimation(true);
        },
        2: async function () {
        },
        3: async function () {
            console.log('running command..');
            await runCommand();
        },
        4: async function () {
            timer.invalidate();
            // @ts-ignore: Unreachable code error
            progress.stopAnimation(true);
        }
    };
    var onExport = function onExport() {
        step = 1;

        attachToConsole();
        // @ts-ignore: Types sketch error
        timer = NSTimer.scheduledTimerWithTimeInterval_target_selector_userInfo_repeats(0.5, prc.getInstance(), 'next:', nil, true);
        // @ts-ignore: Types sketch error
        NSRunLoop.currentRunLoop().addTimer_forMode(timer, NSModalPanelRunLoopMode);
    }
    dialog.setAction(onExport);
    
    // Run event loop
    while (true) {
        const result = dialog.run()
        if (!result) {
            dialog.finish()
            return false
        }
    }
}

export function normalize(name: string){
    return name.replace(' ', '').replace('.', '-');

}


export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }