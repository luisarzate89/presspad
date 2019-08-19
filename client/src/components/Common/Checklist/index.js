import React, { Component } from "react";
import axios from "axios";
import { message } from "antd";

import Checkbox from "./Checkbox";

import { SectionWrapperContent, SectionTitle } from "../general";
import { Paragraph } from "../Profile/Profiles.style";

export default class Checklist extends Component {
  state = {
    checklist: {},
    error: null
  };

  handleChange = async e => {
    const {
      dataset: { id },
      checked
    } = e.target;
    const { checklist } = this.state;
    try {
      await axios.get("/update checklist url");
      this.setState({
        checklist: {
          ...checklist,
          [id]: { ...checklist[id], isChecked: checked }
        }
      });
    } catch (err) {
      message.destroy();
      message.error("Something went wrong, try again later");
    }
  };

  componentDidMount() {
    const { checklist } = this.props;
    const newChicklist = checklist.reduce((acc, curr) => {
      acc[curr.id] = { ...curr };
      return acc;
    }, {});

    this.setState({ checklist: newChicklist });
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props.checklist === state.checklist);
  //   return props;
  // }
  render() {
    const { checklist } = this.state;

    return (
      <section>
        <SectionWrapperContent>
          <SectionTitle>Your checklist</SectionTitle>
          <Paragraph>
            Please make sure to complete your checklist before your stay
          </Paragraph>
          {Object.keys(checklist).map(key => (
            <Checkbox
              key={checklist[key].id}
              checked={checklist[key].isChecked}
              onChange={this.handleChange}
              text={checklist[key].text}
              data-id={checklist[key].id}
            />
          ))}
        </SectionWrapperContent>
      </section>
    );
  }
}
