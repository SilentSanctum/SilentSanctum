const express = require('express');
const app = express();
const env = require('dotenv').config();
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${db_username}:${db_password}@cluster0.upopivo.mongodb.net/silentsanctum?retryWrites=true&w=majority`);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const { v4: uuidv4 } = require('uuid');
const short = require('short-uuid');
const postLimit = 10;
const confLimit = 5;
const pollLimit = 2;
//Schemas
const loggedInSchema = new mongoose.Schema({
    email: String,
    loggedIn: Date,
    uniqueKey: String,
    username: String
});

loggedInSchema.path('loggedIn').index({ expires: 86400 });
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

usersSchema.path('created').index({ expires: 86400 });
const User = mongoose.model('User', usersSchema);


const postSchema = new mongoose.Schema({
    topic: String,
    created: Date,
    author: String,
    content: String,
    reactions: { type: Array, required: false },
    comments: { type: Array, required: false }
})
postSchema.path('created').index({ expires: 86400 });
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
commentSchema.path('created').index({ expires: 86400 });

const Comment = mongoose.model('Comment', commentSchema);

const checkUser = async (loginId) => {
    LoggedInUser.findOne({ "uniqueKey": loginId }).exec().then((data) => {
        if (!data) {
            return null;
        }
        return data;
    })
}

app.post("/login", (req, res) => {
    try {
        let key = req.body.sub;
        let emailAdd = req.body.email;
        let targetUsername = null;
        User.findOne({ email: emailAdd }).exec().then((docs) => {
            if (!docs) {
                //If user has a new user id or dead user id
                console.log("user has a new user id or dead user id");
                let newUsername = String(short.generate());
                targetUsername = newUsername;
                let newUser = new User({
                    username: newUsername,
                    email: emailAdd,
                    created: Date.now(),
                    auth0_key: key,
                    postCount: 0,
                    confCount: 0,
                    pollCount: 0
                })
                newUser.save().then((msg) => {
                    console.log(`User created ${newUsername}`)
                }).catch(e => { console.log(e); res.sendStatus(500); });
            }
            else {
                //If user id is still alive
                console.log("User id is alive");
                console.log(docs);
                targetUsername = docs.username;
            }
            LoggedInUser.findOne({ username: targetUsername }).exec().then((docs) => {
                if (!docs) {
                    //If Logged in user is not present
                    console.log("Logged in user is not present");
                    let loginId = String(uuidv4());
                    let loggedUser = new LoggedInUser({
                        email: emailAdd,
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
                        res.sendStatus(500);
                    })
                }
                else {
                    //If Logged in user is present
                    console.log("Logged in user is present");
                    let result = { "username": docs.username, "loginId": docs.uniqueKey }
                    res.send(result);
                }
            })
        }).catch(e => res.sendStatus(500));
    }
    catch (e) {
        console.error(e);
    }
})

app.post("/logout", (req, res) => {
    let userToLogout = req.body.loginId;
    LoggedInUser.deleteOne({ uniqueKey: userToLogout }).exec().then((doc) => {
        res.send(doc);
    }).catch(e => res.sendStatus(500));
})

app.post("/new_post", (req, res) => {
    let loginId = req.body.loginId;
    let postContent = req.body.postContent;
    let topicName = req.body.topic;
    LoggedInUser.findOne({ "uniqueKey": loginId }).exec().then((data) => {
        if (!data) {
            console.log("User not logged in");
            res.sendStatus(401);
        }
        //If user is logged in
        let newPost = new Post({
            topic: topicName,
            created: Date.now(),
            author: data.username,
            content: postContent,
            reactions: [],
            comments: []
        });
        newPost.save().then((docs) => {
            res.send(docs);
        }).catch(e => res.sendStatus(500));
    });
})

app.post("/posts", (req, res) => {
    let loginId = req.body.loginId;
    let topicName = req.body.topic;
    LoggedInUser.findOne({ "uniqueKey": loginId }).exec().then((data) => {
        if (!data) {
            console.log("User not logged in");
            res.sendStatus(401);
        }
        //If user is logged in
        if (topicName) {
            Post.find({ topic: topicName }).exec().then((docs) => {
                res.send(docs);
            }).catch(e => res.sendStatus(500));
        }
        else {
            Post.find().exec().then((docs) => {
                res.send(docs);
            }).catch(e => res.sendStatus(500));
        }
    });
})

app.listen(port, () => {
    console.log(`Listening on port - ${port}`);
})