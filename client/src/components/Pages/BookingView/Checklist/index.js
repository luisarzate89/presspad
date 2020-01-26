import React, { Component } from "react";
import axios from "axios";
import { message, Skeleton, Alert } from "antd";

import Checkbox from "./Checkbox";
import HintText from "./HintText";

import { SectionWrapperContent, SectionTitle } from "../../../Common/general";
import { Paragraph } from "../../../Common/Profile/Profiles.style";

import { API_GET_CHECKLIST } from "../../../../constants/apiRoutes";

class Checklist extends Component {
  state = {
    isLoading: false,
    error: "",
    checklistObj: {},
  };

  async componentDidMount() {
    try {
      const { bookingInfo, userRole } = this.props;

      const url = API_GET_CHECKLIST.replace(
        ":bookingId",
        bookingInfo._id,
      ).replace(":userId", bookingInfo[userRole]._id);

      this.setState({ isLoading: true });

      const { data } = await axios.get(url);
      const checklistObj = data.reduce((acc, curr) => {
        acc[curr._id] = { ...curr };
        return acc;
      }, {});
      this.setState({ checklistObj, isLoading: false, error: "" });
    } catch (err) {
      const error = "Something went wrong, please try again later";
      message.error(error);
      this.setState({ isLoading: false, error });
    }
  }

  handleChecklistChange = (id, checked) => {
    this.setState(prevState => ({
      checklistObj: {
        ...prevState.checklistObj,
        [id]: { ...prevState.checklistObj[id], isChecked: checked },
      },
    }));
  };

  render() {
    const { checklistObj, isLoading, error } = this.state;
    const optionals = [];

    if (isLoading) {
      return (
        <section>
          <SectionWrapperContent>
            <Skeleton active />
          </SectionWrapperContent>
        </section>
      );
    }

    if (error) {
      return (
        <section>
          <SectionWrapperContent>
            <SectionTitle>Your checklist</SectionTitle>
            <Alert
              message="Fetching checklist error"
              description={error}
              type="error"
            />
          </SectionWrapperContent>
        </section>
      );
    }
    return (
      <section>
        <SectionWrapperContent>
          <SectionTitle>Your checklist</SectionTitle>
          <Paragraph>
            Please make sure to complete your checklist before your stay
          </Paragraph>
          {Object.keys(checklistObj).map(key => {
            if (checklistObj[key].question.isOptional) {
              optionals.push(checklistObj[key].question);
              return null;
            }
            return (
              <Checkbox
                key={key}
                checked={checklistObj[key].isChecked}
                handleChecklistChange={this.handleChecklistChange}
                text={checklistObj[key].question.text}
                data-id={checklistObj[key]._id}
                hintTextElement={
                  <HintText
                    hintText={checklistObj[key].question.hintText}
                    containsHostEmail={
                      checklistObj[key].question.containsHostEmail
                    }
                    containsInternEmail={
                      checklistObj[key].question.containsInternEmail
                    }
                    containsCalendlyLink={
                      checklistObj[key].question.containsCalendlyLink
                    }
                    hostEmail={checklistObj[key].hostEmail}
                    internEmail={checklistObj[key].internEmail}
                    links={checklistObj[key].question.links}
                  />
                }
              />
            );
          })}
          <div style={{ marginTop: "5vh", fontWeight: "bold" }}>
            <div style={{ fontSize: "25px" }}>Other things to do:</div>
            <div>
              {optionals.map(
                ({
                  text,
                  hintText,
                  containsHostEmail,
                  containsInternEmail,
                  containsCalendlyLink,
                  links,
                }) => (
                  <React.Fragment key={text}>
                    <div style={{ marginTop: "10px" }}>{text}</div>
                    <HintText
                      hintText={hintText}
                      containsHostEmail={containsHostEmail}
                      containsInternEmail={containsInternEmail}
                      containsCalendlyLink={containsCalendlyLink}
                      links={links}
                    />
                  </React.Fragment>
                ),
              )}
            </div>
          </div>
        </SectionWrapperContent>
      </section>
    );
  }
}

export default Checklist;
