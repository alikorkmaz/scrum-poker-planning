import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import {
  fetchSession,
  sessionFetched,
  voteDeveloper,
  sessionUpdated
} from "../../actions";
import { SOCKET_URL } from "../../constants";
import StoryList from "../../components/StoryList";
import ActiveStory from "../../components/ActiveStory";

class DeveloperVote extends React.Component {
  socket;
  constructor(props) {
    super(props);
    this.socket = io.connect(SOCKET_URL);

    this.socket.on("sessionFetched", session => {
      this.props.sessionFetched(session);
    });

    this.socket.on("sessionUpdated", session => {
      this.props.sessionUpdated(session);
    });
  }

  componentDidMount() {
    this.props.fetchSession(this.socket, this.props.match.params.id);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  validateSession = () => {
    if (this.props.match.params.id !== this.props.session._id)
      return "This session ended!";

    const connectedBrowsers = this.props.session.stories[0].developerVotes.map(
      developerVote => developerVote.browserId
    );
    if (
      connectedBrowsers.length >= this.props.session.numberOfVoters &&
      !connectedBrowsers.some(id => id === localStorage.getItem("browserId"))
    )
      return "Number of voters exceed, session is full.";

    return "";
  };

  handleVote = vote => {
    this.props.voteDeveloper(
      this.socket,
      localStorage.getItem("browserId"),
      this.props.session._id,
      vote
    );
  };

  render() {
    if (!this.props.session) return <div>Loading...</div>;
    if (this.validateSession() !== "")
      return <div>{this.validateSession()}</div>;
    return (
      <div>
        <h2>Session name: {this.props.session.name}</h2>
        <br />
        <br />
        <div className="row">
          <div className="col-12 border p-3">
            <StoryList
              stories={this.props.session.stories}
              browserId={localStorage.getItem("browserId")}
            />
          </div>
          <div className="col-6 border p-3">
            <ActiveStory voteHandler={this.handleVote} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.sessions.currentSession
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSession,
    sessionFetched,
    voteDeveloper,
    sessionUpdated
  }
)(DeveloperVote);
