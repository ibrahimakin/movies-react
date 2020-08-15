import React from 'react';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

const ItemContainer = ({ Title, imdbID, Poster, Year, ShowDetail, DetailRequest, ActivateModal, API_KEY }) => {
    const clickHandler = () => {

        ActivateModal(true);
        DetailRequest(true);
        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                DetailRequest(false);
                ShowDetail(response);
            })
            .catch(({ message }) => {
                DetailRequest(false);
            })
    }
    return (
        <Col style={{ margin: '20px 0' }} className="gutter-row" span={4}>
            <div className="gutter-box">
                <Card
                    style={{ width: 200 }}
                    cover={
                        <img
                            alt={Title}
                            src={Poster === 'N/A' ? require('../Images/ImageNotFound.png') : Poster}
                        />
                    }
                    onClick={() => clickHandler()}
                >
                    <Meta
                        title={Title}
                        description={false}
                    />
                    <Row style={{ marginTop: '10px', justifyContent: 'center' }} className="gutter-row">
                        <Col>
                            <div>ID: {imdbID} </div>
                            <div> Year: {Year}</div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </Col>
    )
};
export { ItemContainer };