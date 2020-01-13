import React from "react";

import { Badge, UpdateItem, BlueSpan, UpdateDate } from "../general";
import { Link } from "react-router-dom";

import { getStringTime } from "../../../helpers";

const Update = ({ item, userRole }) => {
  const { type, secondParty, createdAt, seen } = item;
  const timeString = getStringTime(createdAt);
  switch (userRole) {
    case "intern":
      switch (type) {
        case "stayRejected":
          return (
            <UpdateItem>
              Your request to stay with&nbsp;
              <Link to={`/host/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp; has been rejected - <UpdateDate>{timeString}</UpdateDate>
              {!seen && <Badge>new</Badge>}
            </UpdateItem>
          );

        case "stayApproved":
          return (
            <UpdateItem>
              Your request to stay with&nbsp;
              <Link to={`/host/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp; has been approved - <UpdateDate>{timeString}</UpdateDate>
              {!seen && <Badge>new</Badge>}
            </UpdateItem>
          );

        case "stayCompleted":
          return (
            <UpdateItem>
              Your stay with&nbsp;
              <Link to={`/host/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp;has been completed - <UpdateDate>{timeString}</UpdateDate>
              {!seen && <Badge>new</Badge>}
            </UpdateItem>
          );

        case "completeProfileRemind":
          return (
            <Link to={`/my-profile`}>
              <UpdateItem>
                You’re so close to completing your profile! Just add a few more
                fields - <UpdateDate>{timeString}</UpdateDate>
                {!seen && <Badge>new</Badge>}
              </UpdateItem>
            </Link>
          );

        case "getReview":
          return (
            <Link to={`/booking/:bookingId/review`}>
              <UpdateItem>
                You have received a new review from&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan> -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && <Badge>new</Badge>}
              </UpdateItem>
            </Link>
          );

        case "giveReview":
          return (
            <Link to={`/booking/:bookingId/review`}>
              <UpdateItem>
                Please leave a review for&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan>&nbsp; -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && <Badge>new</Badge>}
              </UpdateItem>
            </Link>
          );

        default:
          return null;
      }
    case "host":
      switch (type) {
        case "stayRequest":
          return (
            <UpdateItem>
              <Link to={`/intern/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>{" "}
              &nbsp;requested to stay with you -{" "}
              <UpdateDate>{timeString}</UpdateDate>
              {!seen && <Badge>new</Badge>}
            </UpdateItem>
          );

        case "stayCompleted":
          return (
            <UpdateItem>
              <Link to={`/intern/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>{" "}
              &nbsp;has completed his stay with you -{" "}
              <UpdateDate>{timeString}</UpdateDate>
              {!seen && <Badge>new</Badge>}
            </UpdateItem>
          );

        case "completeProfileRemind":
          return (
            <Link to={`/my-profile`}>
              <UpdateItem>
                You’re so close to completing your profile! Just add a few more
                fields - <UpdateDate>{timeString}</UpdateDate>
                {!seen && <Badge>new</Badge>}
              </UpdateItem>
            </Link>
          );

        case "getReview":
          return (
            <Link to={`/booking/:bookingId/review`}>
              <UpdateItem>
                You have received a new review from&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan> -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && <Badge>new</Badge>}
              </UpdateItem>
            </Link>
          );

        case "giveReview":
          return (
            <Link to={`/booking/:bookingId/review`}>
              <UpdateItem>
                Please leave a review for&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan>&nbsp; -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && <Badge>new</Badge>}
              </UpdateItem>
            </Link>
          );

        default:
          return null;
      }

    default:
      break;
  }
};

export default Update;
