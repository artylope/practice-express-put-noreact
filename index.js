const express = require('express');
const app = express();

const jsonfile = require('jsonfile')
const file = 'data.json'


// use files
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));



//routes
app.get('/banana',(request, response)=>{
  // response.render('myform');
  response.send('Hello');
})

app.get('/editsomething',(request, response) => {

  jsonfile.readFile(file, function (error, data) {
    if (error){
      console.error(error);
    } else {
      console.log('yay!');
      console.log(data.name);

      var person = data.name;



      let html = `<form method="POST" action="/putrequest?_method=put">
          <input name="name" type="text" value="${data.name}"/>
          <input type="submit" value="edit this"/>
      </form>`;


    // let html = '<form method="POST" action="/putrequest?_method=put">'+
    // '<input name="id" value="something"/>'+
    // '<input type="submit" value="delete this"/>'+
    // '</form>';
    //
      response.send(html);
    }
})


});

app.put("/putrequest", (request, response) => {

  //read the file in and write out to it

  var newName = request.body;
  console.log( 'request body is' + request.body);
  console.log(newName);

  // save in data file
  jsonfile.readFile(file, (error, data) => {
    if( error ){
      console.log(error)
    } else {



    // save data
    data.name = newName.name;

    jsonfile.writeFile(file, data, (error) => {
      if( error ){

        console.log(error)

      }else{

        response.send('yes');
      }

    });

    }
  });

});

app.listen(4444, () => console.log('~~~ Tuning in to the waves of port 4444 ~~~'));
