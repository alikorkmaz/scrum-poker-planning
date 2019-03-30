import React from "react";
import io from "socket.io-client";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createSession } from "../../actions";
import { SOCKET_URL } from "../../constants";
import "./style.scss";

class SessionCreate extends React.Component {
  socket;
  constructor(props) {
    super(props);
    this.socket = io.connect(SOCKET_URL);

    this.socket.on("sessionCreated", res => {
      this.props.history.push(`/masterVote/${res._id}`);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  renderField = ({ input, label, type, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <div>
          <input {...input} type={type} />
          {meta.touched && meta.error && (
            <div className="ui error message">
              <div className="header">{meta.error}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  renderStories = ({ fields, meta }) => (
    <ul>
      <li className="text-right">
        <button
          className="ui button  "
          type="button"
          onClick={() => fields.push({})}
        >
          Add Story
        </button>
        {meta.submitFailed && meta.error && (
          <div className="ui error message">
            <div className="header">{meta.error}</div>
          </div>
        )}
      </li>
      {fields.map((story, index) => (
        <li key={index}>
          <h4>Story #{index + 1}</h4>
          <Field
            name={`${story}.content`}
            type="text"
            component={this.renderField}
            label="Story"
          />
        </li>
      ))}
    </ul>
  );

  onSubmit = values => {
    values.stories[0].isActive = true;
    this.props.createSession(this.socket, values);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="name" label="Session Name" component={this.renderField} />
        <Field
          name="numberOfVoters"
          label="Number of Voters"
          type="number"
          component={this.renderField}
        />
        <FieldArray name="stories" component={this.renderStories} />
        <div className="text-center">
          <button className="ui button primary text-align-center">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Enter a name for session";
  } else {
    if (values.name.length > 200) {
      errors.name = "Name should be less then 200 character";
    }
  }

  if (!values.numberOfVoters) {
    errors.numberOfVoters = "Enter number of voters for session";
  } else {
    if (!(values.numberOfVoters > 0)) {
      errors.numberOfVoters = "Enter valid number of voters for session";
    }
  }

  if (!values.stories || !values.stories.length) {
    errors.stories = { _error: "At least one story must be entered" };
  } else {
    const storiesArrayErrors = [];
    values.stories.forEach((story, storyIndex) => {
      const storyErrors = {};
      if (!story || !story.content) {
        storyErrors.content = "Required";
        storiesArrayErrors[storyIndex] = storyErrors;
      }
    });
    if (storiesArrayErrors.length) {
      errors.stories = storiesArrayErrors;
    }
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "sessionCreate",
  validate
})(SessionCreate);

export default connect(
  null,
  { createSession }
)(formWrapped);
