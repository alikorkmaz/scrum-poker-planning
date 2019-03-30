import React from "react";
import "./style.scss";

class ActiveStory extends React.Component {
  potentialVotes = [
    "1",
    "2",
    "3",
    "5",
    "8",
    "13",
    "21",
    "34",
    "55",
    "89",
    "134",
    "?"
  ];

  renderVote = vote => (
    <div className="col-3" key={vote}>
      <button
        onClick={() => this.props.voteHandler(vote)}
        className="btn btn-sq btn-success m-1"
      >
        {vote}
      </button>
    </div>
  );

  renderVotes = () => (
    <div className="row">
      {this.potentialVotes.map(vote => this.renderVote(vote))}
    </div>
  );

  render() {
    return (
      <div>
        <h3>Active Story</h3>
        {this.renderVotes()}
      </div>
    );
  }
}

export default ActiveStory;
