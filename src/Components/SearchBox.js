import React from 'react';
import { Input, Row, Col } from 'antd';
import { langObjMovies } from '../Lang';

const { Search } = Input;

const SearchBox = ({ searchHandler, defaultValue, setPage, Lang }) =>
    <Row id="searchbox-container">
        <Col id="searchbox" span={12}>
            <Search enterButton={<span lang-tag="search">Search</span>}
                onSearch={value => { searchHandler(value); setPage(1); }}
                placeholder={langObjMovies[Lang]['placeholder']}
                defaultValue={defaultValue} size="large" />
        </Col>
    </Row>;
export { SearchBox };