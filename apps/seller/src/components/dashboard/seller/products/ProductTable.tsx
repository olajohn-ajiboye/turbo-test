import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useAppDispatch } from '@/services/hooks/useAppDispatch';
import TableComponent from '../../TableComponent';
import { SellerProduct } from '@/types/types';
import { truncateText } from '@/utils/textUtils';
import { deleteSellerProduct } from '@/services/redux/slices/sellers/productSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface ProductTableProps {
  products: SellerProduct[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteSellerProduct(productId));
    }
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    event.stopPropagation();
    navigate(`/seller-dashboard/product/edit/${productId}`);
  };

  const columns = [
    {
      header: 'Product ID',
      accessor: 'id',
      render: (row: SellerProduct) => (
        <span className="font-medium text-[#030A70]">{`#${row.id}`}</span>
      ),
    },
    {
      header: 'Product',
      accessor: 'name',
      render: (row: SellerProduct) => (
        <div className="flex items-center space-x-4">
          <img
            src={row.thumbnail || '/placeholder.png'}
            alt={row.name}
            className="h-12 w-12 rounded object-cover"
          />
          <span>{truncateText(row.name, 37)}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row: SellerProduct) => <span>{row.category}</span>,
    },
    {
      header: 'Price',
      accessor: 'price',
      render: (row: SellerProduct) => (
        <span>${parseFloat(row.price).toFixed(2)}</span>
      ),
    },
    {
      header: 'In stock',
      accessor: 'quantity',
      render: (row: SellerProduct) => <span>{row.quantity}</span>,
    },
    {
      header: 'Status',
      accessor: 'is_published',
      render: (row: SellerProduct) => (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            row.is_published
              ? 'bg-[#E5F9E7] text-[#1B5E20]'
              : 'bg-[#F8D7DA] text-[#721C24]'
          }`}
        >
          {row.is_published ? 'Published' : 'Unpublished'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row: SellerProduct) => (
        <div className="flex space-x-3">
          <button
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            onClick={event => handleEdit(event, row.id)}
          >
            <FiEdit size={16} />
          </button>
          <button
            className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            onClick={event => handleDelete(event, row.id)}
          >
            <FiTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  return <TableComponent data={products} columns={columns} title="Products" />;
};

export default ProductTable;
