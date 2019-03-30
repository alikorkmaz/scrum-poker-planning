import React from "react";
import "./style.scss";

class ScrumMasterPanel extends React.Component {
  state = { finalScore: "" };

  updateFinalScore = value => {
    this.setState({ finalScore: value });
  };

  isEndButtonDisabled = () => {
    if (this.state.finalScore === "") return true;
    if (this.state.finalScore <= 0) return true;
    return false;
  };

  handleEndVote = () => {
    this.props.endVoteHandler(this.state.finalScore);
    this.updateFinalScore("");
  };

  renderDeveloperVote = (developerVote, i) => (
    <div key={developerVote._id}>
      {`${i}. Voter (ID: ${developerVote.browserId}) : ${developerVote.vote}`}
    </div>
  );

  renderDeveloperVotes = () => {
    let i = 0;
    return (
      <div>
        {this.props.story.developerVotes.map(developerVote =>
          this.renderDeveloperVote(developerVote, ++i)
        )}
      </div>
    );
  };

  renderScrumMasterVote = () => {
    if (!this.props.story || !this.props.story.masterVote) return <div />;
    return <div>{`Scrum Master: ${this.props.story.masterVote}`}</div>;
  };

  render() {
    if (!this.props.story) return <div>Current session is done!</div>;
    return (
      <div className="master-panel">
        <h3>Scrum Master Panel</h3>
        {this.props.story.content} is active
        {this.renderDeveloperVotes()}
        {this.renderScrumMasterVote()}
        <div className="ui form">
          <label className="mt-2">Final Score</label>
          <input
            type="number"
            value={this.state.finalScore}
            onChange={e => this.updateFinalScore(e.target.value)}
          />
          <button
            className="btn btn-primary m-1"
            disabled={this.isEndButtonDisabled()}
            onClick={this.handleEndVote}
          >
            End Voting
          </button>
        </div>
      </div>
    );
  }
}

export default ScrumMasterPanel;
