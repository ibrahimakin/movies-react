import React, { useEffect, useState } from 'react';
import { Layout, Row, Alert, Modal, Typography } from 'antd';
import Pagination from 'react-js-pagination';
import Loader from 'react-loader-spinner';
import { SearchBox, ItemContainer, MovieDetails } from './Components';
import { getLangMovies } from './Helpers';
import { langObjMovies } from './Lang';
import 'antd/dist/antd.css';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const { Header, Content, Footer } = Layout;
const TextTitle = Typography.Title;

function Movies() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState({ show: false, id: '' });
    const [q, setQuery] = useState('Pokemon');
    const [p, setPage] = useState(1);

    let lang = getLangMovies();

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.omdbapi.com/?s=${q}&page=${p}&apikey=${API_KEY}`)
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
    }, [q, p]);

    return (
        <Layout>
            <Header>
                <TextTitle level={3}>
                    <span lang-tag="movies">MOVIES</span>
                </TextTitle>
            </Header>
            <Content>
                <div>
                    <SearchBox searchHandler={setQuery} defaultValue={q} setPage={setPage} Lang={lang} />
                    <Row gutter={16} type="flex" justify="center">
                        {loading ? <Loader className="loader" /> :
                            data?.Error ? <Alert className="error" message={data.Error} type="error" /> :
                                data?.Search && data.Search.length > 0 && data.Search.map((item, index) =>
                                    <div key={index}>
                                        <ItemContainer setSelected={setSelected} lang={lang} {...item} />
                                    </div>
                                )}
                    </Row>
                    {data?.Search && data.Search.length > 0 &&
                        <Pagination totalItemsCount={parseInt(data?.totalResults)}
                            itemsCountPerPage={10} pageRangeDisplayed={5}
                            onChange={setPage} activePage={p}
                            itemClass="item" linkClass="link"
                            activeLinkClass="active-link" />
                    }
                </div>
                <Modal title={<span lang-tag="details">{langObjMovies[lang]['details']}</span>}
                    visible={selected.show} footer={null} width={800} centered
                    onCancel={() => setSelected(s => ({ ...s, show: false }))}>
                    <MovieDetails selected={selected.id} lang={lang} />
                </Modal>
            </Content>
            <Footer>
                <a href='https://github.com/ibrahimAKIN' target='_blank' rel="noreferrer">github.com/ibrahimAKIN</a>
            </Footer>
        </Layout>
    );
}
export default Movies;