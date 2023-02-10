const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async ()=> {
    const newRecipe = await Recipe.create({
      title: "risotto",
      level: "Easy Peasy",
      ingredients: ["rice", "creamcheese", "parmesan", "black pepper"],
      cuisine: "italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 30,
      creator: "me",
      created: new Date(2013, 0, 1),
    })
    console.log(`Recipe: ${newRecipe.title}`)
  })

  .then(async () => {
    const dataRecipe = await Recipe.insertMany(data)
    dataRecipe.forEach(one => {
      console.log(`${one.title}`);
    });
  })

  .then(async ()=> {
    const updateRecipe = await Recipe.findOneAndUpdate(
    { title: 'Rigatoni alla Genovese', duration:220 },
    { duration: 100},
    { new: true}
  )
  console.log(updateRecipe)
  })

  .then(async() => {
    const rmvRecipe = await Recipe.deleteOne(
      {title:"Carrot Cake"}
    )
    console.log(rmvRecipe)
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })


   .finally(() => {
      mongoose.connection.close()
  });
    



  