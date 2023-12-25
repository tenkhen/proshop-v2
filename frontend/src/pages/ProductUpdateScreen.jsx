import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../ui/Message';
import Loader from '../ui/Loader';
import FormContainer from '../ui/FormContainer';
import toast from 'react-hot-toast';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../slices/productApiSlice';

const ProductUpdateScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  useEffect(() => {
    refetch();

    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [refetch, product]);

  if (isLoading || loadingUpdate) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  const submitHandler = async e => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);

    if (result.error) return toast.error(result.error);

    toast.success('Product updated');
    navigate('/admin/productlist');
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Form.Group>
          {/* Image input place holder */}
          <Form.Group controlId="brand" className="mt-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={e => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="countInStock" className="mt-3">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter count in stock"
              value={countInStock}
              onChange={e => setCountInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductUpdateScreen;
