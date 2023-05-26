import React, { useEffect, useState } from 'react';
import { Row, Col, Tag, Alert, Typography } from 'antd';
import Loader from 'react-loader-spinner';
import { lang_movies } from '../lang';

const API_KEY = process.env.REACT_APP_API_KEY;
const TextTitle = Typography.Title;

const MovieDetails = ({ selected, lang }) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const translate = async q => {
            const res = await (await
                fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&dj=1&q=${q}`)
            ).json();
            let translation = '';
            for (let sentence of res.sentences) translation += sentence.trans;
            return translation;
        }
        fetch(`https://www.omdbapi.com/?i=${selected}&apikey=${API_KEY}`)
            .then(resp => resp.json()).then(async response => {
                if (lang !== 'en') {
                    try {
                        response.Runtime = response.Runtime.replace('min', lang_movies[lang]['min']);
                        response.Genre = await translate(response.Genre);
                        response.Plot = await translate(response.Plot);
                    } catch (e) { }
                }
                setData(response);
                setLoading(false);
            })
            .catch(({ message }) => {
                setData({ Error: message });
                setLoading(false);
            });
    }, [selected, lang]);

    return loading ? <Loader className="loader" /> :
        data?.Error ? <Alert className="error" message={data.Error} type="error" /> :
            <div id="detail-container">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src={data?.Poster === 'N/A' ? require('../images/ImageNotFound.png') : data?.Poster} alt={data?.Title} />
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
                                    <Col><span lang-tag="director">{lang_movies[lang]['director']}</span>: {data?.Director}</Col>
                                </Row>
                                <Row>
                                    <Col><span lang-tag="cast">{lang_movies[lang]['cast']}</span>: {data?.Actors}</Col>
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