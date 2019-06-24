import React from "react";

import { tagColors } from "./../../../theme";
import { Link } from "react-router-dom";
import { Badge, Icon } from "antd";

import { BlueLink } from "./OrgDashboard.style";
import DisabledPopOver from "../../Common/DisabledPopOver";

export default windowWidth => {
  const columnsObject = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        windowWidth <= 690 ? (
          <Link to={`/interns/${record._id}`}>
            <BlueLink>
              <Badge color={tagColors[record.status]} text={text} />
            </BlueLink>
          </Link>
        ) : (
          <BlueLink to={`/interns/${record._id}`}>{text}</BlueLink>
        )
    }
  ];
  if (windowWidth > 1110) {
    columnsObject.push({
      title: "Email",
      dataIndex: "email",
      key: "email"
    });
  }

  if (windowWidth > 400) {
    columnsObject.push({
      title: "Spent credits",
      dataIndex: "spentCredits",
      key: "spentCredits"
    });
  }

  columnsObject.push({
    title: "Available credits",
    dataIndex: "credits",
    key: "credits"
  });

  if (windowWidth > 800) {
    columnsObject.push({
      title: "Total credits",
      dataIndex: "credits",
      key: "totalCredits"
    });
  }
  if (windowWidth > 690) {
    columnsObject.push({
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: status => <Badge color={tagColors[status]} text={status} />
    });
  }

  columnsObject.push({
    title: "Action",
    key: "action",
    render: (text, record) =>
      windowWidth <= 590 ? (
        <DisabledPopOver>
          <Icon type="plus" />
        </DisabledPopOver>
      ) : (
        <span>
          <DisabledPopOver>
            <BlueLink>Add credits</BlueLink>
          </DisabledPopOver>
        </span>
      )
  });

  return columnsObject;
};
