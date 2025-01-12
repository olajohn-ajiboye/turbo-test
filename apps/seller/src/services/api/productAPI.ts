import axios from 'axios';
import { Product, ProductDetail } from '../../types/types';
import BASE_URL from './api';

// Base URL
const API_BASE_URL = `${BASE_URL}/products`;

// Fetch Products with pagination (returns only Product[])
export const fetchProducts = async (page: number): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/product_list/`, {
    params: { page },
  });
  return response.data.results;
};

// Fetch Product Details by ID
export const fetchProductDetail = async (
  productId: string
): Promise<ProductDetail> => {
  const response = await axios.get(`${API_BASE_URL}/detail/${productId}/`);
  return response.data;
};

// Search Products with pagination (returns only Product[])
export const searchProducts = async (
  search: string,
  page: number
): Promise<Product[]> => {
  const response = await axios.get(`${API_BASE_URL}/product_search/`, {
    params: { search, page },
  });
  return response.data.results;
};

// Fetch Products with pagination count (optional)
export const fetchProductsWithCount = async (
  page: number
): Promise<{ results: Product[]; count: number }> => {
  const response = await axios.get(`${API_BASE_URL}/product_list/`, {
    params: { page },
  });
  console.log(response.data);
  return response.data;
};
