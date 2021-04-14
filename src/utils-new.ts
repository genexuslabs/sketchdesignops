
import { UIDialog } from './uidialog';
import { attachToConsole, Delegate, setDialogFeedback} from './utils';


export async function runOnBackgroundAsync(runCommand, title, description, actionName) {
    UIDialog.setUp(context);
 
    const dialog = new UIDialog(title, NSMakeRect(0, 0, 400, 180), actionName, description, "Close")
    var step = 0;
    var progress = dialog.addProgress(true, 0, 10);
    // @ts-ignore: Types sketch error
    progress.setHidden(true);
    setDialogFeedback(dialog.addFullLabel("out", "", 100));
    
    var prc = new Delegate(
        {
            'next:': async function next() {
                if (!(step in steps)) {
                    // @ts-ignore: Types sketch error
                    //lbl.setString(userOutput);
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
            // @ts-ignore: Types sketch error
            //lbl.setString(userOutput);
        },
        2: async function () {
            // @ts-ignore: Types sketch error
           // lbl.setString(userOutput);
        },
        3: async function () {
            console.log('running command..');
            await runCommand();
            // @ts-ignore: Types sketch error
            //lbl.setString(userOutput);
        },
        4: async function () {
            timer.invalidate();
            // @ts-ignore: Types sketch error
            progress.stopAnimation(true);
            // @ts-ignore: Unreachable code error
            //lbl.setString(userOutput);
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