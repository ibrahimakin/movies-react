import React from 'react';
import { Input, Row, Col } from 'antd';
import { langObjMovies } from '../lang';

const { Search } = Input;

const SearchBox = ({ searchHandler, defaultValue, setPage, lang }) =>
    <Row id="searchbox-container">
        <Col id="searchbox" span={12}>
            <Search enterButton={<span lang-tag="search">{langObjMovies[lang]['search']}</span>}
                onSearch={value => { searchHandler(value); setPage(1); }}
                placeholder={langObjMovies[lang]['placeholder']}
                defaultValue={defaultValue} size="large" />
        </Col>
    </Row>;
export { SearchBox };