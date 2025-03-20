var express = require("express")
var app = express()
app.use(express.static(__dirname))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.port || 5500;
app.listen(port,()=>{
console.log("App listening to: "+port)
})

//Get request
app.get('/start', (req, res) => {
    res.send('Hello World!')
  })

  function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}
  

function substract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
  return parseFloat(num1) / parseFloat(num2);
}
  //get request
app.get('/add', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    const total = add(num1, num2);
    res.json({
      num1: parseFloat(num1),
      num2: parseFloat(num2),
      total: total,
      message: `The sum of ${num1} and ${num2} is ${total}.`
  });
});

  //get request
  app.get('/substract', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    const total = substract(num1, num2);
    res.send(`The total is ${total}`);
});

//get request
app.get('/multiply', (req, res) => {
  const num1 = req.query.num1;
  const num2 = req.query.num2;
  const total = multiply(num1, num2);
  res.send(`The total is ${total}`);
});

//get request
app.get('/divide', (req, res) => {
  const num1 = req.query.num1;
  const num2 = req.query.num2;
  const total = multiply(num1, num2);
  res.send(`The total is ${total}`);
});