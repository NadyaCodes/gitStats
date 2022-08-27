const express = require('express');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT
const morgan = require("morgan");
const axios = require('axios').default;
app.set("view engine", "ejs");
// const htmlToImage = require('html-to-image');
const {findWeekNumber, createCubeCss} = require('./public/helpers');

// // const path = require('path')
// // app.use(express.static(path.join(__dirname, 'public')));
// // app.use(express.static(__dirname + '/public'));
// app.use("/styles", express.static(__dirname + '/styles'));

// //Serve static content for the app from the "public" directory in the application directory.

//     // GET /style.css etc
//     app.use(express.static(__dirname + '/public'));

// // Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static".

//     // GET /static/style.css etc.
//     app.use('/static', express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/styles'));
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));



app.use(morgan("dev"));
  


app.get('/', function (req, res) {
  console.log("req.params", req.params)
  res.render('display',{user:'Rahul'});
});

app.get('/:user/:weeks/bar', function (req, res) {

  const user = req.params.user
  const weeks = req.params.weeks
  const weeksData = []
  
  const currentYear = new Date().getFullYear()

  // const currentDate = new Date();
  // const startDate = new Date(currentDate.getFullYear(), 0, 1);
  // const days = Math.floor((currentDate - startDate) /
  //     (24 * 60 * 60 * 1000));
       
  // const weekNumber = parseInt(Math.ceil(days / 7));
  const weekNumber = findWeekNumber();


  axios.get(`https://skyline.github.com/${user}/${currentYear}.json`)
  .then(function (response) {
    const userData = response.data


    for (let i = weekNumber; i > (weekNumber - weeks); i--) {
      weeksData.push(userData.contributions[i].days)
    }
    
    const makeTableBody = function (i) {
      let tableBodyString = ''
      for (let j = 0; j < 7; j++) {
        tableBodyString += `<td class="bar" style="border-bottom: ${weeksData[i][j].count}rem solid rgb(120, 193, 169)"></td>`
      }
      return tableBodyString
    }


    let tableString = ''

    for (let i = 0; i < weeksData.length; i++) {
      tableString += `<tr><td>Week ${i}</td><td class="spacerTD"></td>`
      tableString += makeTableBody(i)
      tableString += `</tr>`
      tableString += `<tr class="spacerTR"></tr>`;
    }

    const tableCss = `
    <style>
    td.bar {
      background-color: transparent;
      width: 20px;
      -webkit-box-shadow: 0px 0px 3px -1px #000000; 
      box-shadow: 0px 0px 3px -1px #000000;
    }
    tr.spacerTR {
      background-color: transparent;
      width: 20px;
      height: 15px
    }
    td.spacerTD {
      background-color: transparent;
      width: 30px;
    }
    </style>
    `

    const table = `
    ${tableCss}
    <table id="progressBarTable">
    <thead>
      <tr>
        <th colspan="7"><h2>Bar</h2></th>
      </tr>
    </thead>
    <tbody>
    ${tableString}
    </tbody>
  </table>`

    res.send(table);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send("Refresh and try again")
  })

});




app.get('/:user/:weeks/cube/:dir/:color?', function (req, res) {

  const user = req.params.user
  const weeks = parseInt(req.params.weeks)
  const color = req.params.color || 'green'
  const dir = req.params.dir 
  const currentYear = new Date().getFullYear()

  axios.get(`https://skyline.github.com/${user}/${currentYear}.json`)
  .then(function (response) {
    const userData = response.data
    const median = userData.median
    const weeksData = []
    const weekNumber = findWeekNumber();
  
    for (let i = weekNumber; i > (weekNumber - weeks); i--) {
  
      weeksData.push(userData.contributions[i].days)
        
    }

    const tableCss = createCubeCss(color, dir)
  
    res.render('cube', {weeksData, tableCss, median});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send("Refresh and try again")
  })


  // const table = await createTable(user, weeks, color, dir, currentYear)


  // res.send(table)

  // res.send("Refresh and try again")
});


{/* <script>
window.Squarespace.onInitialize(Y, function() {
//   fetch('http://localhost:3000/nadyacodes/20/cube/horizontal/09BC8A004346172A3A')
// .then(response => {
//     return response.text()
// }).then(function (html) {
// document.body.innerHTML = html     
// .catch(err => {
//     console.log(err);
// });
  var fetchAndParse = async (url) => { let div = document.createElement("div"); div.innerHTML = await (await fetch(url)).text(); return div }

  fetchAndParse('http://localhost:3000/nadyacodes/20/cube/horizontal/09BC8A004346172A3A')
});
  
</script> */}





app.get('/:user/:weeks/:emoji/', function (req, res) {

  const user = req.params.user
  const weeks = req.params.weeks
  let singleEmoji = '';
  if (req.params.emoji !== 'app.css' && req.params.emoji !== 'app.js') {
    singleEmoji = req.params.emoji
  }

  const weeksData = []
  const daysArray = ["Sunday", "Monday", "Tuedsay", "Wednesday", "Thursday", "Friday", "Saturday"]
  
  const currentYear = new Date().getFullYear()

  // const currentDate = new Date();
  // const startDate = new Date(currentDate.getFullYear(), 0, 1);
  // const days = Math.floor((currentDate - startDate) /
  //     (24 * 60 * 60 * 1000));
       
  // const weekNumber = parseInt(Math.ceil(days / 7));
  const weekNumber = findWeekNumber();

  if (singleEmoji === 'smile') {
    singleEmoji = '🙂';
  } else if (singleEmoji === 'big-smile') {
    singleEmoji = '😀';
  } else if (singleEmoji === 'poop') {
    singleEmoji = '💩';
  } else if (singleEmoji === 'sunglasses') {
    singleEmoji = '😎'
  } else if (singleEmoji === 'nerd') {
    singleEmoji = '🤓'
  } else if (singleEmoji === 'imp') {
    singleEmoji = '👿'
  } else if (singleEmoji === 'cat') {
    singleEmoji = '😺'
  } else {
    singleEmoji = ''
  }

  // https://skyline.github.com/nadyacodes/2022.json


  axios.get(`https://skyline.github.com/${user}/${currentYear}.json`)
  .then(function (response) {
    const userData = response.data
    const median = userData.median


    let index = 0
    for (let i = weekNumber; i > (weekNumber - weeks); i--) {
      // let weeksData[index].weekEmojiString = ''

      weeksData.push(userData.contributions[i].days)
      weeksData[index].weekEmojiString = ''
      for (let j = 0; j < 7; j++) {
       

        if (weeksData[index][j].count > 0) {
          weeksData[index][j].type = "Good"
          weeksData[index][j].emojiString = singleEmoji
        }

        if (weeksData[index][j].count >= median) {
          weeksData[index][j].type = "Great";
          // emojiString += emoji;
          weeksData[index][j].emojiString += singleEmoji
        }
        if (weeksData[index][j].count > median) {
          weeksData[index][j].type = "Awesome";
          weeksData[index][j].emojiString += singleEmoji;
        }

        if (weeksData[index][j].emojiString){
          weeksData[index].weekEmojiString += weeksData[index][j].emojiString
        }
        
      }
      // weeksData.push(weekEmojiString)
      // console.log("weeksData: ", weeksData[index].weekEmojiString)
      // console.log("weekEmojiString:", weekEmojiString)
      index++
    }

    // console.log(weeksData)
    // const findType = (median, value) => {
//   if (value > median) {
//     return "AWESOME DAY!"
//   }
//   if (value === median) {
//     return "Day accomplished."
//   }
//   if (value < median) {
//     return "Fine, I guess..."
//   }
// }
    // console.log("weeksData:", weeksData)
    // console.log("weeksData length", weeksData[0].length)


    res.render('display',{user, weeks, weeksData, daysArray, median});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.send("Refresh and try again")
  })

  // res.send("Refresh and try again")
});










app.listen(PORT, (error) =>{
    if(!error) {console.log("Server is Successfully Running, and App is listening on port "+ PORT)}

    else {console.log("Error occurred, server can't start", error);}
        
    }
);