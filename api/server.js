const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const socketServer = require("socket.io");

const app = express();

const sessionModal = require("./models/sessionModal");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/local");

const db = mongoose.connection;
db.on("error", () => {
  console.log("Failed to connect Mongoose");
});
db.once("open", () => {
  console.log("Connected to Mongoose");
});

const serve = http.createServer(app);
const io = socketServer(serve);
serve.listen(3001, () => {
  console.log("Express Server with Socket running on port 3001");
});

const connections = [];
io.on("connection", function(socket) {
  console.log("Connected to Socket with ID: " + socket.id);
  connections.push(socket);
  socket.on("disconnect", function() {
    console.log("Disconnected Socket with ID: " + socket.id);
  });

  socket.on("fetchSession", id => {
    sessionModal.findOne({ _id: id }, (err, result) => {
      if (err) {
        console.log("FAIL - fetchSession");
      } else {
        socket.emit("sessionFetched", result);
      }
    });
  });

  socket.on("createSession", session => {
    var session = new sessionModal({
      name: session.name,
      numberOfVoters: session.numberOfVoters,
      stories: session.stories
    });
    session.save((err, result) => {
      if (err) {
        console.log("FAIL - createSession");
      } else {
        socket.emit("sessionCreated", result);
      }
    });
  });

  socket.on("voteMaster", (sessionId, vote) => {
    sessionModal.findById(sessionId, function(err, session) {
      for (var i = 0; i < session.stories.length; i++) {
        if (session.stories[i].isActive) {
          session.stories[i].masterVote = vote;
          break;
        }
      }
      session.save((err, result) => {
        io.sockets.emit("sessionUpdated", result);
      });
    });
  });

  socket.on("voteDeveloper", (sessionId, browserId, vote) => {
    var item = { browserId, vote };
    sessionModal.findById(sessionId, function(err, session) {
      for (var i = 0; i < session.stories.length; i++) {
        if (session.stories[i].isActive) {
          session.stories[i].developerVotes = session.stories[
            i
          ].developerVotes.filter(item => !(item.browserId === browserId));
          session.stories[i].developerVotes.push(item);
          break;
        }
      }
      session.save((err, result) => {
        io.sockets.emit("sessionUpdated", result);
      });
    });
  });

  socket.on("endVote", (sessionId, finalScore) => {
    sessionModal.findById(sessionId, function(err, session) {
      for (var i = 0; i < session.stories.length; i++) {
        if (session.stories[i].isActive) {
          session.stories[i].isActive = false;
          session.stories[i].finalScore = finalScore;
          if (session.stories.length - 1 !== i)
            session.stories[i + 1].isActive = true;
          break;
        }
      }
      session.save((err, result) => {
        io.sockets.emit("sessionUpdated", result);
      });
    });
  });
});
