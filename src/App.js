import React, { useEffect, useState } from 'react';
import { Layout, Row, Alert, Modal, Typography } from 'antd';
import 'antd/dist/antd.css';
import Loader from 'react-loader-spinner';
import { Pagination, SearchBox, ItemContainer, MovieDetails } from './Components';
import './App.css';


const API_KEY = 'b1fc3699';
const { Header, Content, Footer } = Layout;
const TextTitle = Typography.Title;



function App() {


  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState('Pokemon');
  const [p, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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
          setData(response.Search);
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

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (

    <div className="App">
      <Layout className="layout">
        <Header>
          <div style={{ textAlign: 'center' }}>
            <TextTitle style={{ color: '#ffffff', marginTop: '14px' }} level={3}>MOVIES</TextTitle>
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <SearchBox searchHandler={setQuery} defaultValue={q} />
            <br />
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
                <ItemContainer
                  ShowDetail={setShowDetail}
                  DetailRequest={setDetailRequest}
                  ActivateModal={setActivateModal}
                  key={index}
                  {...result}
                  API_KEY={API_KEY}
                />
              ))}
            </Row>
            {data !== null && data.length > 0 &&
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={totalResults}
                paginate={paginate}
                setPage={setPage}
              />}
          </div>


          <Modal
            title='Detail'
            centered
            visible={activateModal}
            onCancel={() => setActivateModal(false)}
            footer={null}
            width={800}
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


export default App;
