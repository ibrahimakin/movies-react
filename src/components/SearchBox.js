import React, { useState } from 'react';
import { Input, Row, Col } from 'antd';
import { lang_movies } from '../lang';

const { Search } = Input;

const SearchBox = ({ onSearch, defaultValue, searchbox, lang }) => {
    const [value, setValue] = useState(defaultValue);
    const handleChange = e => setValue(e.target.value);
    searchbox.current = setValue;
    return (
        <Row id="searchbox-container">
            <Col id="searchbox" span={12}>
                <Search enterButton={<span lang-tag="search">{lang_movies[lang]['search']}</span>} size="large"
                    placeholder={lang_movies[lang]['placeholder']} defaultValue={defaultValue} value={value}
                    onSearch={onSearch} onChange={handleChange} lang-tag="placeholder" />
            </Col>
        </Row>
    );
}
export { SearchBox };