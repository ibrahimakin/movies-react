import React, { useEffect, useState } from 'react';
import { Layout, Row, Alert, Modal, Typography, Pagination } from 'antd';
import Loader from 'react-loader-spinner';
import { SearchBox, ItemContainer, MovieDetails } from './components';
import { lang_movies, getLangMovies } from './lang';
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
    const lang = getLangMovies();

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.omdbapi.com/?s=${q}&page=${p}&apikey=${API_KEY}`)
            .then(resp => resp.json()).then(response => {
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
                    <span lang-tag="movies">{lang_movies[lang]['movies']}</span>
                </TextTitle>
            </Header>
            <Content>
                <SearchBox searchHandler={setQuery} defaultValue={q} setPage={setPage} lang={lang} />
                <Row gutter={24} type="flex" justify="center">
                    {loading ? <Loader className="loader" /> :
                        data?.Error ? <Alert className="error" message={data.Error} type="error" /> :
                            data?.Search?.length > 0 && data.Search.map((item, index) =>
                                <ItemContainer key={index} setSelected={setSelected} lang={lang} {...item} />
                            )}
                </Row>
                {data?.Search?.length > 0 &&
                    <Pagination total={parseInt(data?.totalResults)} itemRender={(p, t, e) => e.props.children}
                        onChange={setPage} showSizeChanger={false} current={p} responsive />
                }
                <Modal title={<span lang-tag="details">{lang_movies[lang]['details']}</span>}
                    onCancel={() => setSelected(s => ({ ...s, show: false }))}
                    open={selected.show} footer={null} width={800} centered>
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