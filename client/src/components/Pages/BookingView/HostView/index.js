import React, { Component } from 'react';
import { Alert } from 'antd';

import InternInfo from './InternInfo';
import BookingRequestSection from '../BookingRequestSection';
import Checklist from '../Checklist';
import Reviews from '../../../Common/Reviews';

// styles
import {
  Wrapper,
  LinkDiv,
  BackLinkDiv,
  Arrow,
  BackLink,
  Card,
} from '../../../Common/Profile/Profiles.style';

import PaymentsTable from './PaymentsTable';

import { SectionWrapperContent } from '../../../Common/general';

import 'antd/dist/antd.css';

class HostView extends Component {
  state = {
    bookingStatus: '',
  };

  handleBooking = action => {
    this.setState({ bookingStatus: action });
  };

  render() {
    const { bookingStatus } = this.state;
    const { bookingInfo } = this.props;
    const { status, intern, installments = [] } = bookingInfo;
    const { _id: internId, name } = intern;

    return (
      <Wrapper>
        <LinkDiv>
          <BackLinkDiv
            role="button"
            onClick={() => this.props.history.goBack()}
          >
            <BackLink>
              <Arrow /> Back
            </BackLink>
          </BackLinkDiv>
        </LinkDiv>
        <InternInfo internId={internId} />
        {(status === 'canceled' || bookingStatus === 'canceled') && (
          <SectionWrapperContent mtop="20px">
            <Alert
              style={{ marginTop: '1.2rem', textAlign: 'center' }}
              message="Your booking is canceled"
              type="warning"
            />
          </SectionWrapperContent>
        )}

        {status === 'pending' && !bookingStatus && (
          <BookingRequestSection
            bookingInfo={bookingInfo}
            handleBooking={this.handleBooking}
          />
        )}

        {(status === 'confirmed' || bookingStatus === 'confirmed') && (
          <>
            <Checklist bookingInfo={bookingInfo} userRole="host" />
            <PaymentsTable installments={installments} />
          </>
        )}
        <Card>
          <Reviews userId={internId} name={name} userRole="intern" />
        </Card>
      </Wrapper>
    );
  }
}

export default HostView;
