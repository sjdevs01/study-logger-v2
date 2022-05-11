# Study Logger v2

Upgraded version of a 24 Hour Challenge, which is ironically less complicated. 
Screenshots:

![image](https://user-images.githubusercontent.com/71702390/167787702-1ae564ef-f90b-4be2-839f-4d14fcc811fa.png)
Hovering over revise buttons shows "No. of days since last practiced, No. of times you have practiced" and clicking leads to embibe.

![image](https://user-images.githubusercontent.com/71702390/167787853-06ae3e2e-5614-4c25-b5cd-34b85f28c486.png)
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

## Optional: Display Your Name
Rename the files in `data` folder to your name in lowercase (keep the `_d` in the file which has it)
Then open `index.js` and on line 13, you will see `let userList = ['user']`, replace user with your name in lower case

Then do `pm2 restart` then `pm2 save` and your name will appear in the little corner over there.
