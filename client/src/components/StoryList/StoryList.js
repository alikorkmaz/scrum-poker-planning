import React from "react";

class StoryList extends React.Component {
  getVote = story => {
    if (this.props.isMaster) return story.masterVote;

    const developerVote = story.developerVotes.find(
      developerVote => developerVote.browserId === this.props.browserId
    );
    if (developerVote) return developerVote.vote;
  };

  getStatus = story => {
    if (story.isActive) return "Active";
    if (story.finalScore) return "Voted";
    return "Not Voted";
  };

  renderStory = story => (
    <tr key={story._id}>
      <td>{story.content}</td>
      <td>{this.getVote(story)}</td>
      <td>{story.finalScore}</td>
      <td>{this.getStatus(story)}</td>
    </tr>
  );

  renderStories = () => (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Story</th>
          <th scope="col">Story Point</th>
          <th scope="col">Final Score</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>{this.props.stories.map(story => this.renderStory(story))}</tbody>
    </table>
  );

  render() {
    return (
      <div>
        <h3>Story List</h3>
        {this.renderStories()}
      </div>
    );
  }
}

export default StoryList;
