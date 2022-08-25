function findWeekNumber() {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));
       
  const weekNumber = parseInt(Math.ceil(days / 7));
  return weekNumber;
}


function createCubeCss(color, dir) {
    
  let paleColor = 'rgb(181, 231, 214)'
  let medColor = 'rgb(120, 193, 169)'
  let darkColor = 'rgb(78, 140, 120)'

  if (color === 'purple') {
    paleColor = '#9e6ce0';
    medColor = '#6b38ad';
    darkColor = '#431c76';
  }

  if (color === 'blue') {
    paleColor = '#53eafe';
    medColor = '#01adc4';
    darkColor = '#017a8a';
  }

  if (color === 'pink') {
    paleColor = '#EFA8B8';
    medColor = '#de6984';
    darkColor = '#ba3051';
  }

  if (color.length === 18) {
    paleColor = '#' + color.slice(0, 6)
    medColor = '#' + color.slice(6,12)
    darkColor = '#' + color.slice(12, 18)
  }


  let tableCss = `
  <script>
  table {
    transform-origin: top left;
    left:0;
    top:0;
  }


  td.progressBox {
    width: 20px;
    height: 20px;
    border: .03rem solid black;
  }
  
  
  .pale {
    background-color: ${paleColor};
  }
  
  .med {
    background-color: ${medColor};
  }
  
  
  .dark {
    background-color: ${darkColor};
  }
  
  
  .empty {
    background-color: transparent;
  }
  `

  if (dir === 'horizontal') {
    tableCss += `
    table {
      transform: rotate(90deg) translateY(-100%);
    }
    `
  }

  tableCss += `</script>`

  return tableCss
}


module.exports = {findWeekNumber, createCubeCss}

