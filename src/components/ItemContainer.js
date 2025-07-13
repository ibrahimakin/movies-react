import { Row, Col, Card } from 'antd';
import { lang_movies } from '../lang';

const { Meta } = Card;

const ItemContainer = ({ Title, imdbID, Poster, Year, setSelected, lang }) =>
    <Col className="item-container" span={4} title={Title}>
        <Card onClick={() => setSelected({ show: true, id: imdbID })}
            cover={Poster === 'N/A' ? <div className="not-found" lang-tag="not_found">{lang_movies[lang]['not_found']}</div> : <img alt={Title} src={Poster} />}>
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