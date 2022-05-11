# Study Logger v2

This is a study logger made by me, which is just a pretty way to plan and see your progress. This was a recompilation of my skills, and how finished I can make a app, along with the UI in under 24 hours. However the previous version used too much maths, which was mostly usesless like telling you which subjects you found difficult and all, which can easily be thought of after looking at your accuracy, frequency and average time, but it used a lot of assumptions, using average times you input to tell it to you etc.

This version is much less complicated and is just a clone of the previous one, with a more aesthetically pleasing, customizeable way to deal with things in the `Spreadsheet` menu. A simple guide on how to get started can be found below. Here I show you what it looks like. 

![image](https://user-images.githubusercontent.com/71702390/167784295-7c468788-2e3b-45f6-b972-29d9f3ed966a.png)
Hovering over revise buttons shows "No. of days since last practiced, No. of times you have practiced" and clicking leads to embibe.

![image](https://user-images.githubusercontent.com/71702390/162895130-f8d50332-beb8-479a-9da2-4471de00ec7b.png)

![Image](https://user-images.githubusercontent.com/71702390/162895318-eaa99358-6b25-4620-b8dc-56e3109a8952.png)
You can input any name of any topic, and group it into a particular subject. If you want to add some subjects, other than PCM, you will have to do some work, but if you know programming, just open your_name_d.json and add the subject, and as you encounter errors, fix them :) but I would recommend against adding any subjects

![image](https://user-images.githubusercontent.com/71702390/162895941-4b4fecc4-cdd7-471e-aacb-182757d7e7c1.png)
Automatically groups the inputs if there are enough of them, and there is this aesthetic thing here.

![image](https://user-images.githubusercontent.com/71702390/162896097-985d87b4-f6bb-4d6b-8228-badf5a4de1f6.png)
Lastly the most lonely of all of these is this kiddo. It can be used to mention revision interval, which tells you which topics you haven't revised for a while. This appears in the first image where I set it to 0.

# Getting Started

The simplest way to get started is to first download the code by:
```
Open Repository > Code > Download ZIP
```
or if you have git installed, open a CLI/CMD and use:

```
git clone https://github.com/sjdevs01/study-logger-v2
```

After downloading the code if you already have `nodejs` installed then fine. Else download and install nodejs by following some tutorial (its 2 minutes of work) and then do:

```
npm i express cookie-parser
npm i -g pm2
```
Then you need to configure the app so it uses your name, to do this follow the steps:

1. In the `data` directory, rename the files `your_name_here_d.json` and `your_name_here.json`. Be SURE to have `_d` in the first JSON file, and dont remove it. Example: `shivansh_d.json` `shivansh`.json.
2. Open `index.js` and change the line 12, `let userList = ['your_name_here']` to the name you put in the file. For example if you put `shivansh_d.json` and `shivansh.json` change the line to `let userList = ['shivansh']`. Although not a necessity, I recommend you to use single words as the names, and if you want multiple words, separate them using a `_` and not a space, because I haven't tested full names.

After this, your name will have been configured. The app is fully configured too. To run the app, do 

```
pm2 start index.js
```

After this you can open the app on the site `http://127.0.0.1:1800` 

To run the app again on startup you will have to go to the directory where the app is, and do 

```
pm2 start index.js
```
again. To not have to do this you can either use the run.bat file in the folder, and make a shortcut for it on your desktop or you will have to setup a startup script using pm2, this is simple but doesn't work sometimes. If it doesn't work I recommend you to not try much since it won't work anyways. The simplest way is to paste this in your command line interface.

```
npm install pm2 -g
npm install pm2-windows-startup -g
pm2-startup install
pm2 start index.js --name Study
pm2 save
```
After which you should reboot. I haven't tested these instructions since I use linux. If you use linux, the simplest way would be to google `pm2 run on startup` and follow the tutorial by keymetrics. 

By this time the app should be fully functional, and runs on boot on the address `http://localhost:1800`
