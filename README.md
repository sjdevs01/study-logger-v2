# Study Logger v2

Upgraded version of a 24 Hour Challenge which I intended to take on to revise my skills as it had been a long time since I had worked on any web-based projects. 

Too lazy to make a documentation of all the features (this is the 2024 me), but the given video (from 2022) which is 2 minutes long, should suffice to show most of them, although it doesn't show all features. Adding gdrive link since its 20MB, github only supports 10MB. 

https://drive.google.com/file/d/1CSFo2xeF7BHouRClaMFJLSIjqLrbz-Ck/view?usp=sharing


# Getting Started

The simplest way to get started is to first download the code by:
```
Open Repository > Code > Download ZIP
```
And then unzip the folder, put the thing in a folder you want.

Then install nodejs. After that navigate to the folder containing these files, run `init.bat`. The app will start running, accessible at `http://127.0.0.1:1700` and will run on startup.

## Optional: Display Your Name
Rename the files in `data` folder to your name in lowercase (keep the `_d` in the file which has it). Then open `index.js` and on line 13, you will see `let userList = ['user']`, replace user with your name in lower case

Then do `pm2 restart` then `pm2 save` and your name will appear in the little corner over there. (This is to be done in command prompt, 2022 me forgot to write this haha)
