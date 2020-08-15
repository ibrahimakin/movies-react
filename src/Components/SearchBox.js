import React from 'react';
import { Input, Row, Col } from 'antd';


const { Search } = Input;

const SearchBox = ({ searchHandler, defaultValue }) => {
    return (
        <Row>
            <Col span={12} offset={6}>
                <Search
                    placeholder="enter movie, series, episode name"
                    enterButton="Search"
                    size="large"
                    defaultValue={defaultValue}
                    onSearch={value => searchHandler(value)} />
            </Col>
        </Row>
    )
};

export { SearchBox };