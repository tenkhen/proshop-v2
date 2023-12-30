import { Row, Col } from 'react-bootstrap';
import Product from '../ui/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../ui/Loader';
import Message from '../ui/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../ui/Paginate';
import ProductCarousel from '../ui/ProductCarousel';

const HomePage = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <h1>
          <Loader />
        </h1>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to="/" className="btn btn-light mb-4">
              Go Back
            </Link>
          )}
          <h1>
            {keyword
              ? data.products.length > 0
                ? 'Search Results'
                : 'No Search Result'
              : 'Latest Products'}
          </h1>
          <Row className="mb-3">
            {data.products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomePage;
