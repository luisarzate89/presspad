import React, { Component } from "react";

import BookingSection from "./BookingSection";

import { SectionTitle } from "./InternDashboard.style";
import { PageWrapper, SectionWrapperContent } from "../../Common/general";

export default class InternDashboard extends Component {
  componentDidMount() {
    //ToDo fetch data from backend
  }

  render() {
    const bookingSectionData = {}; //from state
    return (
      <PageWrapper>
        <BookingSection data={bookingSectionData} />
        <section>
          <SectionWrapperContent style={{ minHeight: 200 }}>
            <SectionTitle>Your updates</SectionTitle>
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
