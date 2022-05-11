const express = require('express');
const fs = require('fs');
const app = new express();
const cookieParser = require('cookie-parser')
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(cookieParser())
app.get('/', (req, res) => {
    res.redirect('/overview')
})

let userList = ['user'];

app.use('/', (req, res, next) => {
    if(req.originalUrl == '/fetch/users'){
        next();
    }else{
        if(!userList.includes(req.cookies.user)) return res.sendFile(__dirname + '/public/user.html');
        req.user = req.cookies.user;
        next(); 
    }
})

app.get('/fetch/users', (req, res) => {
    return res.send({
        code: 404,
        error: {
            'message':'Who is using this account?',
            'data':userList
        }
    })
})

function objectMap(obj, func) {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, func(v)]));
}

app.get('/fetch/overview', async (req, res) => {
    let data = await JSON.parse(fs.readFileSync(process.cwd() + `/data/${req.user}_d.json`, 'utf8'));
    let config = await JSON.parse(fs.readFileSync(process.cwd() + `/data/${req.user}.json`, 'utf8'));
    let revision_interval = config.configs.revision_interval; 
    
    let topics = [];
    Object.keys(data).map(i => {
        sub=i;
        if(i=='Physical'||i=='Organic'||i=='Inorganic'){
            sub='red'
        }else if(i=='Maths'){
            sub='green'
        }else if(i=='Physics'){
            sub='yellow'
        }
        Object.keys(data[i]).forEach(x => {
            if(data[i][x].active == 0) return;
            let y = data[i][x].data;
            let raw = Object.keys(y)[Object.keys(y).length-1];
            latest = y[raw];
            let difference = ((new Date() - new Date(+raw))/(1000*24*60*60)); 
            if(difference >= revision_interval){
                topics.push([[x, Object.keys(y).length, difference.toFixed(1), sub]])
            }
        })
    });

    let raw = {'Physics':{},'Chemistry':{},'Maths':{}};
    
    Object.keys(data).map(i => {
        let sub = (i == 'Physical' || i == 'Inorganic' || i == 'Organic') ? 'Chemistry' : i;
        Object.keys(data[i]).map(x => {
            Object.keys(data[i][x].data).forEach(k => {
                raw[sub].total = (raw[sub].total || 0) + data[i][x].data[k].total;
                raw[sub].solved = (raw[sub].solved || 0) + data[i][x].data[k].solved;
                raw[sub].time = (raw[sub].time || 0) + data[i][x].data[k].time;
            })
        })
    });

    res.send({
        topics: topics,
        graphing: raw
    })
})

app.get('/fetch/graph', async (req, res) => {
    let data = await JSON.parse(fs.readFileSync(process.cwd() + `/data/${req.user}_d.json`, 'utf8'));

    let {subject,topic} = req.query;
    let resp = data[subject][topic].data;
    console.log();
    let months = {};
    if(Object.keys(data).length > 6 && (new Date().getTime() - Object.keys(resp).map(i => +i).sort()[0])/1000*60*60*24*30 > 5){
        let raw = [...new Set(Object.keys(resp).sort((a,b)=>(+a)-(+b)).map(i => new Date(+i).toLocaleString('default',{month:'long',year:'2-digit'})))];
        raw.forEach(i => months[i] = [[],[],[]]);

        Object.keys(resp).forEach(i => {
            let arr = months[new Date(+i).toLocaleString('default',{month:'long',year:'2-digit'})];
            arr[1].push(resp[i].solved)
            arr[0].push(resp[i].total)
            arr[2].push(resp[i].time)
        })
    }else{
        let raw = Object.keys(resp).map(i => new Date(+i).toLocaleString('default',{month:'short',day:'numeric'}));

        raw.forEach(i => months[i] = [[],[],[]])
        Object.keys(resp).forEach(i => {
            let arr = months[new Date(+i).toLocaleString('default',{month:'short',day:'numeric'})];
            arr[1].push(resp[i].solved)
            arr[0].push(resp[i].total)
            arr[2].push(resp[i].time)
        })
    }

    res.send(months)
})

app.post('/addLog', async (req, res) => {
    let { topic, subject, total, time, errors } = req.body;

    let data = await JSON.parse(fs.readFileSync(process.cwd() + `/data/${req.user}_d.json`, 'utf8'));
    let object;
    if(data[subject][topic]){
        object = data[subject][topic];
    }else{
        data[subject][topic] = {"total":0,"co1":0,"co2":0,"dt1":0,"ca1":0,"ca2":0,"ca3":0,"ca4":0,"solved":0,"active":0,"time":0,"data":{}};
        object = data[subject][topic];
    }
    let stamp = new Date().getTime(), error_t = 0;

    object['total'] += +total;
    object['active'] = true;
    object['time'] += +time;

    Object.keys(errors).forEach(i => {
        object[i] += errors[i]
        error_t += errors[i];
    })

    let psuedoObj = {
        time: +time,
        total: (+total),
        solved: (+total) - error_t
    };
    
    object.data[stamp] = psuedoObj;

    data[subject][topic] = object;
    fs.writeFileSync(process.cwd() + `/data/${req.user}_d.json`,JSON.stringify(data),'utf8')
})

app.get('/fetch/update', async (req, res) => {
    let {subject,topic,status} = req.query;
    let data = await JSON.parse(fs.readFileSync(process.cwd() + `/data/${req.user}_d.json`, 'utf8'));
    let object = data[subject][topic];
    object['active'] = +(status);
    fs.writeFileSync(process.cwd() + `/data/${req.user}_d.json`,JSON.stringify(data),'utf8')
    res.send('done lol')
})

app.get('/fetch/log', async (req, res) => {
    let data = await JSON.parse(fs.readFileSync(process.cwd() + `/data/${req.user}_d.json`, 'utf8'));
    let subjects = Object.keys(data);
    let response = {};
    subjects.forEach((i) => {
        response[i] = Object.keys(data[i]);
    })
    res.send(response)
})

app.get('/fetch/spreadsheet', async (req, res) => {
    let data = await JSON.parse(fs.readFileSync(process.cwd() + `/data/${req.user}_d.json`, 'utf8'));
    res.send(data);
})

app.get('/fetch/preferences', async (req, res) => {
    let config = await JSON.parse(fs.readFileSync(process.cwd() + `/data/${req.user}.json`, 'utf8'));
    let { revision_interval } = config.configs;
    res.send({
        a: revision_interval
    })
})

app.post('/update/preferences', async (req, res) => {
    try{
        fs.writeFileSync(process.cwd() + `/data/${req.user}.json`, JSON.stringify(req.body));
        res.send({
            code: 200
        })
    }catch(err){
        res.send({
            code: 400,
            message: 'Unexpected error!'
        })
    }
})

app.get('/overview', (req, res) => {
    res.sendFile(__dirname + '/public/overview.html')
})

app.get('/preferences', (req, res) => {
    res.sendFile(__dirname + '/public/preferences.html')
})

app.get('/spreadsheet', (req, res) => {
    res.sendFile(__dirname + '/public/spreadsheet.html')
})

app.get('/log', (req, res) => {
    res.sendFile(__dirname + '/public/log.html')
})

app.listen(1800, 'localhost', () => {
    console.log('listening')
})
