import React from 'react';
import { Row, Col, Tag, Typography } from 'antd';
import { langObjMovies } from '../Lang';

const TextTitle = Typography.Title;

const MovieDetails = ({ Title, Poster, Director, Actors, imdbRating, Rated, Runtime, Genre, Plot, Lang }) => {
    return (
        <div id="detail-container">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={Poster === 'N/A' ? require('../Images/ImageNotFound.png') : Poster} alt={Title}/>
                        </td>
                        <td id="detail-col">
                            <Row>
                                <Col span={21}><TextTitle level={4}>{Title}</TextTitle></Col>
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
                                <Col><span lang-tag="director">{langObjMovies[Lang]['director']}</span>: {Director}</Col>
                            </Row>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col><span lang-tag="cast">{langObjMovies[Lang]['cast']}</span>: {Actors}</Col>
                            </Row>
                            <Row>
                                <Col>{Plot}</Col>
                            </Row>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export { MovieDetails };