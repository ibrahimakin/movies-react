import React, { useEffect, useState } from 'react';
import { Layout, Row, Alert, Modal, Typography } from 'antd';
import Loader from 'react-loader-spinner';
import Pagination from "react-js-pagination";
import { SearchBox, ItemContainer, MovieDetails } from './Components';
import 'antd/dist/antd.css';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const { Header, Content, Footer } = Layout;
const TextTitle = Typography.Title;

function Movies() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState('Pokemon');
  const [p, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [activeLink, setActiveLink] = useState(1);
  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`https://www.omdbapi.com/?s=${q}&page=${p}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        if (response.Response === 'False') {
          setError(response.Error);
        }
        else {
          setData(response.Search.sort((a, b) => (a.Year > b.Year) ? 1 : -1));
          setTotalResults(response.totalResults);
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      })
  }, [q, p]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = data ? data.slice(indexOfFirstPost, indexOfLastPost) : null;

  const paginate = pageNumber => {
    setActiveLink(pageNumber);
    if (postsPerPage < 10) {
      if ((pageNumber % 2) === 1) {
        setPage((pageNumber / 2) + 1); pageNumber = 1
      }
      else {
        setPage(pageNumber / 2);
        pageNumber = 2
      }
      setCurrentPage(pageNumber);
    }
    setPage(pageNumber);
  };

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div style={{ textAlign: 'center' }}>
            <TextTitle style={{ color: '#ffffff', marginTop: '14px' }} level={3}><span lang-tag="movies">MOVIES</span></TextTitle>
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <SearchBox searchHandler={setQuery} defaultValue={q} setPage={setPage} setCurrentPage={setCurrentPage} setActiveLink={setActiveLink} />
            <Row gutter={16} type="flex" justify="center">
              {loading &&
                <Loader />
              }
              {error !== null &&
                <div style={{ margin: '20px 0' }}>
                  <Alert message={error} type="error" />
                </div>
              }
              {currentPosts !== null && currentPosts.length > 0 && currentPosts.map((result, index) => (
                <div key={index}>
                  <ItemContainer
                    ShowDetail={setShowDetail}
                    DetailRequest={setDetailRequest}
                    ActivateModal={setActivateModal}
                    {...result}
                    API_KEY={API_KEY}
                  />
                </div>
              ))}
            </Row>
            {data !== null && data.length > 0 &&
              <Pagination
                activePage={activeLink}
                itemsCountPerPage={postsPerPage}
                totalItemsCount={parseInt(totalResults)}
                pageRangeDisplayed={5}
                onChange={paginate}
                itemClass="item"
                linkClass="link"
                activeLinkClass="activeLink"
              />
            }
          </div>
          <Modal
            title={<span lang-tag="details">Details</span>}
            centered visible={activateModal}
            onCancel={() => setActivateModal(false)}
            footer={null} width={800}
          >
            {detailRequest === false ?
              (<MovieDetails {...detail} />) :
              (<Loader />)
            }
          </Modal>
        </Content>
        <Footer style={{ textAlign: 'center' }}><a href='https://github.com/ibrahimAKIN' >github.com/ibrahimAKIN</a></Footer>
      </Layout>
    </div >
  );
}


export default Movies;
