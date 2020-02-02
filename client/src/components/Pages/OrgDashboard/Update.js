import React from 'react';

import { Link } from 'react-router-dom';
import { Badge, UpdateItem, BlueSpan, UpdateDate } from './OrgDashboard.style';

import { getStringTime } from '../../../helpers';
import LoadingBallPulseSync from '../../Common/LoadingBallPulseSync';

const Update = ({ item }) => {
  const { user, type, secondParty, createdAt, seenForOrg, loading, _id } = item;
  const timeString = getStringTime(createdAt);

  switch (type) {
    case 'stayApproved':
      return (
        <UpdateItem key={_id}>
          {user.name} has matched with{' '}
          <Link to={`/host/${secondParty._id}`}>
            <BlueSpan>{secondParty.name}</BlueSpan>
          </Link>{' '}
          - <UpdateDate>{timeString}</UpdateDate>
          {!seenForOrg && !loading && <Badge>new</Badge>}
          {loading && !seenForOrg && <LoadingBallPulseSync />}
        </UpdateItem>
      );

    case 'getReview':
      return (
        <UpdateItem key={_id}>
          {user.name} has received a new review -{' '}
          <UpdateDate>{timeString}</UpdateDate>
          {!seenForOrg && !loading && <Badge>new</Badge>}
          {loading && !seenForOrg && <LoadingBallPulseSync />}
        </UpdateItem>
      );

    case 'stayCompleted':
      return (
        <UpdateItem key={_id}>
          {user.name} has completed his stay -{' '}
          <UpdateDate>{timeString}</UpdateDate>
          {!seenForOrg && !loading && <Badge>new</Badge>}
          {loading && !seenForOrg && <LoadingBallPulseSync />}
        </UpdateItem>
      );

    default:
      return null;
  }
};

export default Update;
