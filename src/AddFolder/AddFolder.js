import React, { Component } from "react";
import config from "../config";
import ApiContext from "../ApiContext";
import "./AddFolder.css";

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const newFolder = {
      name: e.target["input-folder-title"].value,
    };

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFolder),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(Promise.reject(e));
        }
      })
      .then((data) => {
        this.context.addFolder(data);
        this.props.history.push(`/`);
      })
      .catch((err) => {
        console.error({ err });
      });
  };
  render() {
    return (
      <form
        className="add-folder form"
        id="add-folder-form"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="add-folder-form">Add a Folder</label>
        <br />
        <label htmlFor="folder-title"> Title </label>
        <input
          id="folder-title"
          type="text"
          className="input title"
          defaultValue="Add a Title"
          name="input-folder-title"
        />
        <input type="submit" />
      </form>
    );
  }
}
