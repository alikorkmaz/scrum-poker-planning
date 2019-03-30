import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import {
  fetchSession,
  sessionFetched,
  voteMaster,
  endVote,
  sessionUpdated
} from "../../actions";
import { SOCKET_URL, DEVELOPER_PAGE_URL } from "../../constants";
import StoryList from "../../components/StoryList";
import ActiveStory from "../../components/ActiveStory";
import ScrumMasterPanel from "../../components/ScrumMasterPanel";

class MasterVote extends React.Component {
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

  handleVote = vote => {
    this.props.voteMaster(this.socket, this.props.session._id, vote);
  };

  handleEndVote = finalScore => {
    this.props.endVote(this.socket, this.props.session._id, finalScore);
  };

  renderUrlForDevelopers = () => (
    <div>
      Url for developers: {`${DEVELOPER_PAGE_URL}${this.props.session._id}`}
    </div>
  );

  render() {
    if (!this.props.session) return <div>Loading...</div>;
    return (
      <div>
        <h2>Session name: {this.props.session.name}</h2>
        <div className="text-right">{this.renderUrlForDevelopers()}</div>
        <br />
        <br />
        <div className="row">
          <div className="col-12 border p-3">
            <StoryList stories={this.props.session.stories} isMaster />
          </div>
          <div className="col-6 border p-3">
            <ActiveStory voteHandler={this.handleVote} />
          </div>
          <div className="col-6 border p-3">
            <ScrumMasterPanel
              story={this.props.session.stories.find(story => story.isActive)}
              endVoteHandler={this.handleEndVote}
            />
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
  { fetchSession, sessionFetched, voteMaster, endVote, sessionUpdated }
)(MasterVote);
