# presspad
Marketplace introducing diversity in media through mentorship &amp; hosting

## Getting Started
How to get a copy of the project up and running on your local machine.

Please ensure you have this software installed and running on your local machine before you attempt to run this webapp.

Node (via nvm recomended) see: https://github.com/creationix/nvm

MongoDB see: https://docs.mongodb.com/manual/installation/

Setup
1. Clone the repo
2. Install Dependencies
$ cd presspad
$ npm run init:both
3. Get Mongo running on your local computer
Connect to mongo in a separate terminal tab/window.
$ mongod
4. Add some more Environment Variables
Create a .env file in the root.

PLEASE CONTACT THE TEAM TO GET THE INFORMATION YOU NEED TO PUT INTO THE ENV FILE AS THIS INCLUDES SENSITIVE DATA

5. Build the Database
$ npm run build:data:dev

6. Run the Tests
To make sure everything is working as it should.
$ npm test

8. Run the Server
$ npm run dev
Wait for a compiled successfully message.

9. Have Fun
The webapp should now be running on localhost:3000 Now you can play with the code all you like 🎉

If you notice anything wrong with the instructions or the project isn't running as expected don't hesitate to raise an issue and we'll try to figure it out.
