import React from 'react';
import { Input } from 'antd';

import { SectionWrapperContent } from '../general';

const SearchBar = props => (
  <SectionWrapperContent>
    <Input.Search
      onChange={props.handleSearchBar}
      enterButton
      style={{ maxWidth: '500px' }}
    />
  </SectionWrapperContent>
);

export default SearchBar;
