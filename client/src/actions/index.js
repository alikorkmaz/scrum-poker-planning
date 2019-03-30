import { SESSION_FETCHED, SESSION_UPDATED } from "./types";

export const sessionFetched = session => dispatch => {
  dispatch({ type: SESSION_FETCHED, payload: session });
};

export const sessionUpdated = session => dispatch => {
  dispatch({ type: SESSION_UPDATED, payload: session });
};

export const createSession = (socket, values) => dispatch => {
  socket.emit("createSession", values);
};

export const fetchSession = (socket, id) => dispatch => {
  socket.emit("fetchSession", id);
};

export const voteMaster = (socket, sessionId, vote) => dispatch => {
  socket.emit("voteMaster", sessionId, vote);
};

export const voteDeveloper = (
  socket,
  browserId,
  sessionId,
  vote
) => dispatch => {
  socket.emit("voteDeveloper", sessionId, browserId, vote);
};

export const endVote = (socket, sessionId, finalScore) => dispatch => {
  socket.emit("endVote", sessionId, finalScore);
};
