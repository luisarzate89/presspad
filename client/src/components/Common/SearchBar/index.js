import React from "react";
import { Input } from "antd";

import { SectionWrapperContent } from "../../Common/general";

const SearchBar = props => {
  return (
    <SectionWrapperContent>
      <Input.Search
        onChange={props.handleSearchBar}
        enterButton
        style={{ maxWidth: "500px" }}
      />
    </SectionWrapperContent>
  );
};

export default SearchBar;
