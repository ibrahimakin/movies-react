import React from 'react';
import { Row, Col, Card } from 'antd';
import { lang_movies } from '../lang';

const { Meta } = Card;

const ItemContainer = ({ Title, imdbID, Poster, Year, setSelected, lang }) =>
    <Col className="item-container" span={4}>
        <Card onClick={() => setSelected({ show: true, id: imdbID })}
            cover={<img alt={Title} src={Poster === 'N/A' ? require('../images/ImageNotFound.png') : Poster} />}>
            <Meta title={Title} description={false} />
            <Row>
                <Col>
                    <div><span lang-tag="year">{lang_movies[lang]['year']}</span>: {Year}</div>
                </Col>
                <Col>
                    <div>IMDb ID: {imdbID}</div>
                </Col>
            </Row>
        </Card>
    </Col>;
export { ItemContainer };