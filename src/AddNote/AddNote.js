import React, { Component } from "react";
import config from "../config";
import ApiContext from "../ApiContext";
import "./AddNote.css";

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      name: e.target["note-name"].value,
      content: e.target["note-content"].value,
      folderId: e.target["selected-note-folder"].value,
      modified: new Date(),
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/`);
      })
      .catch((err) => {
        console.error({ err });
      });
  };
  render() {
    const { folders = [] } = this.context;
    return (
      <form className="add-note form" id="add-note-form">
        <label htmlFor="add-note-form">Add a Note</label>
        <br />
        <label htmlFor="note-title"> Title </label>
        <input
          id="note-title"
          type="text"
          className="input noteform title"
          defaultValue="Add a Title"
          name="note-title"
        />
        <label htmlFor="note-title"> Content </label>
        <input
          id="note-content"
          type="text"
          className="input noteform content"
          defaultValue="Type here"
          name="note-content"
        />
        <select id="select-note-folder" name="selected-note-folder">
          <option value={null}>Please Select</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
    );
  }
}
