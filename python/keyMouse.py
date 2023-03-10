import keyboard
import mouse
import json
import time
import sys

sys.argv.pop(0)
clickMap = {
    1: 'left',
    2: 'right',
    3: 'middle'
}

if __name__ == '__main__':    
    f = open(sys.argv[0], "r")
    
    jsonFile = json.load(f)

    for action in jsonFile['steps']:
        match action['event']:
            case 'keyPress':
                keyboard.press(action['key'])
            case 'keyRelease':
                keyboard.release(action['key'])
            case 'mouseClick':
                mouse.click(clickMap[action['button']])
            case 'mouseMove':
                mouse.move(action['x'], action['y'])
            case _:
                print("Error: executing default action")

        time.sleep(action['nextEventDelay']/1000)

    f.close()

