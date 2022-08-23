const express = require('express');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT
const morgan = require("morgan");
const axios = require('axios').default;
app.set("view engine", "ejs");

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

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));
       
  const weekNumber = parseInt(Math.ceil(days / 7));

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


//AXIOS REQUEST IS HARD-CODED...WILL NEED TO BE CHANGE IN DEPLOYMENT

// app.get('/:user/:weeks/:emoji/json', function (req, res) {
//   const user = req.params.user
//   const weeks = req.params.weeks
//   const emoji = req.params.emoji

//   axios.get(`http://localhost:${PORT}/${user}/${weeks}/${emoji}`)
//   .then(function (response) {
//     console.log("HI")
//     console.log(response)
//     // const table1 = response.data.find('<table id="progressBarTable">')
//     // email.substring(email.indexOf('@') + 1)
//       // ("progressBarTable")

//       let tableString = ''
//       for (let i = 0; i < weeks; i++) {
//         tableString +=
//       } 

//       const table = '<table id="progressBarTable"><thead><tr><th><h2> PROGRESS BAR</h2></th></tr></thead><tbody><% for (let i = 0; i < weeksData.length; i++) { %><tr><td>Week <%= [i] %></td><% for (let j = 0; j < 7; j++) { %><td class="bar" style="border-bottom: <%= weeksData[i][j].count%>rem solid rgb(120, 193, 169)"></td><% } %></tr><% } %></tbody></table><hr />'
//       // const afterTable = response.data.split(tableStart).pop

//     res.send(table);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//     res.send("Refresh and try again")
//   })
// })

app.get('/:user/:weeks/:emoji/bar/json', function (req, res) {

  const user = req.params.user
  const weeks = req.params.weeks
  // let singleEmoji = '';
  if (req.params.emoji !== 'app.css' && req.params.emoji !== 'app.js') {
    singleEmoji = req.params.emoji
  }

  const weeksData = []
  // const daysArray = ["Sunday", "Monday", "Tuedsay", "Wednesday", "Thursday", "Friday", "Saturday"]
  
  const currentYear = new Date().getFullYear()

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));
       
  const weekNumber = parseInt(Math.ceil(days / 7));


  axios.get(`https://skyline.github.com/${user}/${currentYear}.json`)
  .then(function (response) {
    const userData = response.data


    for (let i = weekNumber; i > (weekNumber - weeks); i--) {
      weeksData.push(userData.contributions[i].days)
    }
    
    const makeTableBody = function (i) {
      let tableBodyString = ''
      for (let j = 0; j < 7; j++) {
        tableBodyString += `<td class="bar" style="border-bottom: ${weeksData[i][j].count}rem solid rgb(120, 193, 169); width: 20px"></td>`
      }
      console.log(tableBodyString)
      return tableBodyString
    }


    let tableString = ''

    for (let i = 0; i < weeksData.length; i++) {
      tableString += `<tr><td> Week ${i}</td>`
      tableString += makeTableBody(i)
      tableString += `</tr>`
    }

    const table = `<table id="progressBarTable">
    <thead>
      <tr>
        <th><h2> PROGRESS BAR</h2></th>
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

  // res.send("Refresh and try again")
});

app.listen(PORT, (error) =>{
    if(!error) {console.log("Server is Successfully Running, and App is listening on port "+ PORT)}

    else {console.log("Error occurred, server can't start", error);}
        
    }
);