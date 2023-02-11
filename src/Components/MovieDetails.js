import React, { useEffect, useState } from 'react';
import { Row, Col, Tag, Alert, Typography } from 'antd';
import Loader from 'react-loader-spinner';
import { langObjMovies } from '../Lang';

const API_KEY = process.env.REACT_APP_API_KEY;
const TextTitle = Typography.Title;

const MovieDetails = ({ selected, lang }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.omdbapi.com/?i=${selected}&apikey=${API_KEY}`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                setData(response);
                setLoading(false);
            })
            .catch(({ message }) => {
                setData({ Error: message });
                setLoading(false);
            });
    }, [selected]);

    return loading ? <Loader className="loader" /> :
        data?.Error ? <Alert className="error" message={data.Error} type="error" /> :
            <div id="detail-container">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src={data?.Poster === 'N/A' ? require('../Images/ImageNotFound.png') : data?.Poster} alt={data?.Title} />
                            </td>
                            <td id="detail-col">
                                <Row>
                                    <Col span={21}><TextTitle level={4}>{data?.Title}</TextTitle></Col>
                                    <Col span={3}>
                                        <TextTitle level={4} className="imdb-rating">{data?.imdbRating}</TextTitle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Tag>{data?.Rated}</Tag>
                                        <Tag>{data?.Runtime}</Tag>
                                        <Tag>{data?.Genre}</Tag>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col><span lang-tag="director">{langObjMovies[lang]['director']}</span>: {data?.Director}</Col>
                                </Row>
                                <Row>
                                    <Col><span lang-tag="cast">{langObjMovies[lang]['cast']}</span>: {data?.Actors}</Col>
                                </Row>
                                <Row>
                                    <Col>{data?.Plot}</Col>
                                </Row>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
};
export { MovieDetails };