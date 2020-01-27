import React from "react";

import { Link } from "react-router-dom";
import { Badge, UpdateItem, BlueSpan, UpdateDate } from "../general";
import LoadingBallPulseSync from "../LoadingBallPulseSync";

import { getStringTime } from "../../../helpers";

const Update = ({ item, userRole }) => {
  const { type, secondParty, createdAt, seen, booking, loading } = item;

  const timeString = getStringTime(createdAt);
  switch (userRole) {
    case "intern":
      switch (type) {
        case "stayRejected":
          return (
            <UpdateItem>
              Your request to stay with&nbsp;
              <Link to={`/hosts/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp; has been rejected - <UpdateDate>{timeString}</UpdateDate>
              {!seen && !loading && <Badge>new</Badge>}
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdateItem>
          );

        case "stayApproved":
          return (
            <UpdateItem>
              Your request to stay with&nbsp;
              <Link to={`/hosts/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp; has been approved - <UpdateDate>{timeString}</UpdateDate>
              {!seen && !loading && <Badge>new</Badge>}
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdateItem>
          );

        case "stayCompleted":
          return (
            <UpdateItem>
              Your stay with&nbsp;
              <Link to={`/hosts/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp;has been completed - <UpdateDate>{timeString}</UpdateDate>
              {!seen && !loading && <Badge>new</Badge>}
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdateItem>
          );

        case "completeProfileRemind":
          return (
            <Link to="/my-profile">
              <UpdateItem>
                You’re so close to completing your profile! Just add a few more
                fields - <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
              </UpdateItem>
            </Link>
          );

        case "getReview":
          return (
            <Link to={`/booking/${booking}`}>
              <UpdateItem>
                You have received a new review from&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan> -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
              </UpdateItem>
            </Link>
          );

        case "giveReviewReminder":
          return (
            <Link to={`/review-info/${booking}`}>
              <UpdateItem>
                Please leave a review for&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan>&nbsp; -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
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
              <Link to={`/interns/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>{" "}
              &nbsp;requested to stay with you -{" "}
              <UpdateDate>{timeString}</UpdateDate>
              {!seen && !loading && <Badge>new</Badge>}
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdateItem>
          );

        case "stayCompleted":
          return (
            <UpdateItem>
              <Link to={`/interns/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>{" "}
              &nbsp;has completed his stay with you -{" "}
              <UpdateDate>{timeString}</UpdateDate>
              {!seen && !loading && <Badge>new</Badge>}
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdateItem>
          );

        case "completeProfileRemind":
          return (
            <Link to="/my-profile">
              <UpdateItem>
                You’re so close to completing your profile! Just add a few more
                fields - <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
              </UpdateItem>
            </Link>
          );

        case "getReview":
          return (
            <Link to={`/booking/${booking}`}>
              <UpdateItem>
                You have received a new review from&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan> -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
              </UpdateItem>
            </Link>
          );

        case "giveReviewReminder":
          return (
            <Link to={`/review-info/${booking}`}>
              <UpdateItem>
                Please leave a review for&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan>&nbsp; -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
              </UpdateItem>
            </Link>
          );

        default:
          return null;
      }

    default:
      return null;
  }
};

export default Update;
