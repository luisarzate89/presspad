import React, { Component } from "react";

import BookingSection from "./BookingSection";
import Update from "./Update";
import { SectionTitle } from "./InternDashboard.style";
import {
  PageWrapper,
  SectionWrapperContent,
  UpdateList
} from "../../Common/general";

export default class InternDashboard extends Component {
  state = {
    notifications: []
  };

  componentDidMount() {
    //ToDo fetch data from backend
    this.setState({
      notifications: [
        {
          createdAt: "2019-08-13T22:53:21.576Z",
          private: false,
          secondParty: {
            _id: "5d533f61075a7725dc840106",
            name: "Adam Appele",
            email: "adam@gmail.com",
            role: "host"
          },
          seen: false,
          seenForOrg: false,
          type: "completeProfileRemind",
          user: {
            _id: "5d533f61075a7725dc84010a",
            name: "Mone Dupree",
            email: "mone@gmail.com",
            role: "intern",
            organisation: "5d533f60075a7725dc8400fc"
          },
          _id: "5d533f61075a7725dc84013c"
        }
      ]
    });
  }

  render() {
    const bookingSectionData = {}; //from state
    const { notifications } = this.state;
    return (
      <PageWrapper>
        <BookingSection data={bookingSectionData} />
        <section>
          <SectionWrapperContent style={{ minHeight: 200 }}>
            <SectionTitle>Your updates</SectionTitle>
            <UpdateList>
              {notifications.map(item => (
                <Update item={item} key={item._id} />
              ))}
            </UpdateList>
          </SectionWrapperContent>
        </section>
        <section>
          <SectionWrapperContent style={{ minHeight: 200 }}>
            <SectionTitle>Your payments</SectionTitle>
          </SectionWrapperContent>
        </section>
      </PageWrapper>
    );
  }
}
