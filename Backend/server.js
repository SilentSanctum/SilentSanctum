const express = require('express');
const app = express();
const env = require('dotenv').config();
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${db_username}:${db_password}@cluster0.upopivo.mongodb.net/?retryWrites=true&w=majority`);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const { v4: uuidv4 } = require('uuid');
const short = require('short-uuid');
//Schemas
const loggedInSchema = new mongoose.Schema({
    email: String,
    loggedIn: Date,
    uniqueKey: String,
    username: String
});

const LoggedInUser = mongoose.model('LoggedInUser', loggedInSchema);

const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    created: Date,
    auth0_key: String,
    postCount: Number,
    confCount: Number,
    pollCount: Number
});

const User = mongoose.model('User', usersSchema);

const postSchema = new mongoose.Schema({
    topic: String,
    created: Date,
    author: String,
    content: String,
    reactions: { type: Array, required: false },
    comments: { type: Array, required: false }
})
const Post = mongoose.model('Post', postSchema);

const commentSchema = new mongoose.Schema({
    parentId: { type: mongoose.Schema.ObjectId, required: false },
    topic: String,
    created: Date,
    author: String,
    content: String,
    reactions: {
        type: Array,
        required: false
    },
    comments: Array
})

const Comment = mongoose.model('Comment', commentSchema);




const initDB = () => {
    let testLoggedUsers = new User({
        username: "test",
        email: "test@test.com",
        created: Date.now()
    })
    testLoggedUsers.save().then((msg) => {
        console.log(msg);
    }).catch(e => console.log(e));
}


app.post("/login", (req, res) => {
    try {
        let key = req.body.auth0_key;
        let email = req.body.email;
        let targetUsername = null;
        User.findOne({ email: email }).exec().then((docs) => {
            if (!docs) {
                let newUsername = String(short.generate());
                targetUsername = newUsername;
                let newUser = new User({
                    username: newUsername,
                    email: email,
                    created: Date.now(),
                    auth0_key: key,
                    postCount: 0,
                    confCount: 0,
                    pollCount: 0
                })
                newUser.save().then((msg) => {
                    console.log(`User created ${newUsername}`)
                }).catch(e => console.log(e));
            }
            else {
                console.log(docs);
                targetUsername = docs.username;
            }
            let loginId = String(uuidv4());
            let loggedUser = new LoggedInUser({
                email: email,
                loggedIn: Date.now(),
                uniqueKey: loginId,
                username: targetUsername
            });
            loggedUser.save().then(() => {
                let loggedResponse = {
                    "username": targetUsername,
                    "loginId": loginId
                }
                res.send(loggedResponse);
            }).catch((e) => {
                console.log(e);
            })
        }).catch(e => console.log(e))
    }
    catch (e) {
        console.error(e);
    }
})

app.listen(port, () => {
    console.log(`Listening on port - ${port}`);
})