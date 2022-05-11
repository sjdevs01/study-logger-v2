# Study Logger v2

This is a study logger made by me, which is just a pretty way to plan and see your progress. This was a recompilation of my skills, and how finished I can make a app, along with the UI in under 24 hours. However the previous version used too much maths, which was mostly usesless like telling you which subjects you found difficult and all, which can easily be thought of after looking at your accuracy, frequency and average time, but it used a lot of assumptions, using average times you input to tell it to you etc.

This version is much less complicated and is just a clone of the previous one, with a more aesthetically pleasing, customizeable way to deal with things in the `Spreadsheet` menu. A simple guide on how to get started can be found below. Here I show you what it looks like. 

![image](https://user-images.githubusercontent.com/71702390/167787702-1ae564ef-f90b-4be2-839f-4d14fcc811fa.png)
Hovering over revise buttons shows "No. of days since last practiced, No. of times you have practiced" and clicking leads to embibe.

![image](https://user-images.githubusercontent.com/71702390/162895941-4b4fecc4-cdd7-471e-aacb-182757d7e7c1.png)
Automatically groups the inputs if there are enough of them, and there is this aesthetic thing here.

# Getting Started

The simplest way to get started is to first download the code by:
```
Open Repository > Code > Download ZIP
```
or if you have git installed, open a CLI/CMD and use:

```
git clone https://github.com/sjdevs01/study-logger-v2
```

After downloading the code if you already have `nodejs` installed then fine. Else download and install nodejs by following some tutorial (its 2 minutes of work) and then navigate to the folder containing the files, and run the `init.bat` file. Alternatively, you can open the file and run the commands in that file yourself.

After this you can open the app on the site `http://127.0.0.1:1700` and whenever you start your machine, the app will be on.

## If you want your name to appear in that corner and not User.
Rename the files in `data` folder to your name in lowercase (keep the `_d` in the file which has it)
Then open `index.js` and on line 13, you will see `let userList = ['user']`, replace user with your name in lower case

Then do `pm2 restart` and your name will appear in the little corner over there.
