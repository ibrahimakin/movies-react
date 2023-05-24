import React from 'react';
import { Input, Row, Col } from 'antd';
import { lang_movies } from '../lang';

const { Search } = Input;

const SearchBox = ({ searchHandler, defaultValue, setPage, lang }) =>
    <Row id="searchbox-container">
        <Col id="searchbox" span={12}>
            <Search enterButton={<span lang-tag="search">{lang_movies[lang]['search']}</span>}
                placeholder={lang_movies[lang]['placeholder']} lang-tag="placeholder"
                onSearch={value => { searchHandler(value); setPage(1); }}
                defaultValue={defaultValue} size="large" />
        </Col>
    </Row>;
export { SearchBox };