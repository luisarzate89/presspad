import React from "react";
import { Tabs } from "antd";

import { CardContainer } from "./TabbedView.style";

const { TabPane } = Tabs;
const TabbedView = ({ tabsTitle = [], tabsContent = [] }) => {
  return (
    <CardContainer>
      <Tabs
        animated
        type="card"
        tabBarStyle={{
          border: "none",
          width: "97%",
          margin: "0 auto"
        }}
      >
        {tabsContent.map((Content, i) => (
          <TabPane tab={tabsTitle[i]} key={tabsTitle[i]}>
            <div
              style={{
                width: "97%",
                margin: "0 auto",
                padding: "1rem"
              }}
            >
              {Content}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </CardContainer>
  );
};
export default TabbedView;

// Example

/**
<TabbedView
tabsTitle={["Tab Pane 1", "Tab Pane 2", "Tab Pane 3"]}
tabsContent={[
  <div>
    <p>Content of Tab Pane 1</p>
    <p>Content of Tab Pane 1</p>
    <p>Content of Tab Pane 1</p>
  </div>,
  <div>
    <p>Content of Tab Pane 2</p>
    <p>Content of Tab Pane 2</p>
    <p>Content of Tab Pane 2</p>
  </div>,
  <div>
    <p>Content of Tab Pane 3</p>
    <p>Content of Tab Pane 3</p>
    <p>Content of Tab Pane 3</p>
  </div>
]}
/>
*/
