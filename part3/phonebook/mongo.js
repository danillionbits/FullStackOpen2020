const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const [node, script, password, name, number] = process.argv

const url =
  `mongodb+srv://admin:${password}@cluster0.o4alk.mongodb.net/fullstack?retryWrites=true&w=majority`
  
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(name && number){
	const person = new Person({
		name: name,
		number: number,
	});

	person.save().then(result => {
		console.log(`added ${name} number ${number} to phonebook`);
		mongoose.connection.close();
  });
  
} else if (process.argv.length === 3){
	Person.find({}).then(result => {
		console.log('phonebook:');
    
    result.forEach(person => {
			console.log(`${person.name} ${person.number}`);
    })
    mongoose.connection.close();
	});
}
