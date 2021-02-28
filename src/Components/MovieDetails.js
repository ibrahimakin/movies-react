import React from 'react';
import { Row, Col, Tag, Typography } from 'antd';

const TextTitle = Typography.Title;

const MovieDetails = ({ Title, Poster, Director, Actors, imdbRating, Rated, Runtime, Genre, Plot }) => {
    return (
        <div id="detail-container">
        <table><tr>
            <td>
                <img
                    src={Poster === 'N/A' ? require('../Images/ImageNotFound.png') : Poster}
                    alt={Title}
                />
            </td>
            <td id="detail-col">
                <Row>
                    <Col span={21}>
                        <TextTitle level={4}>{Title}</TextTitle></Col>
                    <Col span={3} style={{ textAlign: 'right' }}>
                        <TextTitle level={4}><span style={{ color: '#41A8F8' }}>{imdbRating}</span></TextTitle>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                    <Col>
                        <Tag>{Rated}</Tag>
                        <Tag>{Runtime}</Tag>
                        <Tag>{Genre}</Tag>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '10px' }}>
                    <Col>Director: {Director}</Col>
                </Row>
                <Row style={{ marginBottom: '10px' }}>
                    <Col>Cast: {Actors}</Col>
                </Row>
                <Row>
                    <Col>{Plot}</Col>
                </Row>
            </td>
        </tr></table>
        </div>
    )
};

export { MovieDetails };