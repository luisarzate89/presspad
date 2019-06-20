import React from "react";

import { Badge, UpdateItem, BlueSpan, UpdateDate } from "./OrgDashboard.style";
import { Link } from "react-router-dom";

import { getStringTime } from "./../../../helpers";

export default ({ item }) => {
  const { user, type, secondParty, createdAt, seen, _id } = item;
  const timeString = getStringTime(createdAt);

  switch (type) {
    case "stayApproved":
      return (
        <UpdateItem key={_id}>
          {user.name} has matched with a{" "}
          <Link to={`/host/${secondParty._id}`}>
            <BlueSpan>{secondParty.name}</BlueSpan>
          </Link>{" "}
          - <UpdateDate>{timeString}</UpdateDate>
          {!seen && <Badge>new</Badge>}
        </UpdateItem>
      );

    case "getReview":
      return (
        <UpdateItem key={_id}>
          {user.name} has received a new review -{" "}
          <UpdateDate>{timeString}</UpdateDate>
          {!seen && <Badge>new</Badge>}
        </UpdateItem>
      );

    case "stayCompleted":
      return (
        <UpdateItem key={_id}>
          {user.name} has completed his stay -{" "}
          <UpdateDate>{timeString}</UpdateDate>
          {!seen && <Badge>new</Badge>}
        </UpdateItem>
      );

    default:
      return null;
  }
};
