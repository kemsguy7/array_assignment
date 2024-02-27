
//creating a database connection
import { Sequelize } from "sequelize";

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite',
    logging: false, 
})

export default connection;  //export the connection so it can be used by other files


// synchronizes the database(models) connection to your app, it returns a promise

connection.sync().then(() => {
    console.log("database synced")
}).catch((err) => {
    console.log("failed to sync", err)
});

//force automatically synchronyses all the models at once if passed as a param to the sync function






//Using sequelize.define to define models

const { Sequelize, Dataypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {
    // Model attributes are defined here 
    firstName: {
        type: Dataypes.STRING,
        allowNull: false
    },
    lastName: {
        type: Dataypes.STRING

    },
});

console.log(User ===  sequelize.models.User);  //true 


// EXTENDING MODEL
const { Sequelize, Dataypes, Model } = require('sequelize');
const sequelize2 = new Sequelize('sqlite::memory');

class User1 {
    firstName;
    lastName;
    age;
}

class User2 extends User1(model) {}  // here a model or interface can be extended

User.init({ 
    // Model attribute are defined here
    firstName: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    lastName : {
        type: DataTypes.STRING
        // allowNull default to true

    }, 
   {
    // Other model options go here 
    sequelize2, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name

}); 

// the defined model is the class itself
console.log(User === sequelize.models.User);  // true 

//creating an express server 
const express = require('express');
const app = express()
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`server is running on at http://localhost:${port}`);
});




















/********************************** EXPRESS JS */
npm install express

/*


1. Routing:
Routing in Express allows you to define how your application responds to client requests based on the URL and HTTP method.
 Here's a simple example:
// Import Express
const express = require('express');
const app = express();

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Define a route for about page
app.get('/about', (req, res) => {
  res.send('About Page');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



2. Middleware:
Middleware functions have access to the request and response objects and 
can modify them or terminate the request-response cycle. A common example is logging:

// Middleware function
const logMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
};

// Use the middleware for all routes
app.use(logMiddleware);

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


3. Static Files:
You can use express.static to serve static files such as images, 
stylesheets, and scripts. Place your static files in a folder (e.g., 'public') and use the middleware:

// Serve static files
app.use(express.static('public'));

Now, files in the 'public' folder can be accessed directly. For example, a file 'public/style.css' can be linked in HTML 
as <link rel="stylesheet" href="/style.css">.


. Template Engines (Optional):
Template engines help generate dynamic HTML by 
embedding values from your server. Here's an example using EJS:

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Route rendering a dynamic view
app.get('/user/:name', (req, res) => {
  const { name } = req.params;
  res.render('user', { username: name });
});



5. Database Integration:
Integrate a database like MongoDB using Mongoose:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

// Create a model
const User = mongoose.model('User', userSchema);

// Route to get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});


6. Authentication:
Implement user authentication using Passport.js:

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Use the local strategy with a custom verification function
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Verify user credentials
    if (username === 'user' && password === 'pass') {
      return done(null, { username: 'user' });
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Route for login
app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
);



7. RESTful APIs:
Express makes it easy to create RESTful APIs.
 Here's a simple example:
 // Sample data
const books = [
  { id: 1, title: 'Book 1' },
  { id: 2, title: 'Book 2' },
];

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  res.json(book);
});


8. Error Handling:
Implementing error handling middleware helps manage errors more effectively:
// Custom error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});





/******************************************  SEQUELIZE */
/*
npx sequelize-cli init



3. Basic CRUD Operations:
3.1 Create a Record:
// In your application code
const { User } = require('./models');

User.create({ firstName: 'John', lastName: 'Doe', email: 'john@example.com' })
  .then(user => console.log('User created:', user.toJSON()))
  .catch(error => console.error('Error creating user:', error));



// Find all users
User.findAll()
  .then(users => console.log('All users:', users.map(user => user.toJSON())))
  .catch(error => console.error('Error fetching users:', error));

// Find a user by ID
User.findByPk(1)
  .then(user => console.log('User by ID:', user.toJSON()))
  .catch(error => console.error('Error fetching user by ID:', error));

3.3 Update Records:
 // Update a user's information
User.update({ firstName: 'Jane' }, { where: { id: 1 } })
  .then(() => console.log('User updated successfully'))
  .catch(error => console.error('Error updating user:', error));

  
  DELETE RECORDS
// Delete a user by ID
User.destroy({ where: { id: 1 } })
  .then(() => console.log('User deleted successfully'))
  .catch(error => console.error('Error deleting user:', error));


  // In your models
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
});

const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
});

User.hasMany(Post);
Post.belongsTo(User);

// Find a user and include their posts
User.findByPk(1, { include: Post })
  .then(user => console.log('User with Posts:', user.toJSON()))
  .catch(error => console.error('Error fetching user with posts:', error));



One-to-One (1:1):

This is a relationship where each record in the first table is associated with exactly one record in the second table, and vice versa.
Example: A User has one Profile.

// User model
const User = sequelize.define('User', {/*...*/});

// Profile model
const Profile = sequelize.define('Profile', {/*...*/});

// Define association
User.hasOne(Profile);
Profile.belongsTo(User);


One-to-Many (1:N):

This is a relationship where a single record in the first table can be associated with multiple records in the second table, but each record in the second table is associated with only one record in the first table.
Example: A User has many Posts.

// User model
const User = sequelize.define('User', {/*...*/});

// Post model
const Post = sequelize.define('Post', {/*...*/});

// Define association
User.hasMany(Post);
Post.belongsTo(User);



Many-to-Many (N:M):

This is a relationship where a single record in the first table can be associated with multiple records in the second table, and vice versa.
Example: A User can have many Roles, and a Role can be assigned to many Users.

// User model
const User = sequelize.define('User', {/*...*/});

// Role model
const Role = sequelize.define('Role', {/*...*/});

// Define association
User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });


// User model
const User = sequelize.define('User', {/*...*/});

// Role model
const Role = sequelize.define('Role', {/*...*/});

// Define association
User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });




Create Models and Associations:

Define models and associations in models/user.js and models/post.js:

// user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    });
  
    User.associate = (models) => {
      User.hasMany(models.Post);
    };
  
    return User;
  };
  
  // post.js
  module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    });
  
    Post.associate = (models) => {
      Post.belongsTo(models.User);
    };
  
    return Post;
  };
  
