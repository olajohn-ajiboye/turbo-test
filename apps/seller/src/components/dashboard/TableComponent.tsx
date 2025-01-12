import { useState } from 'react';
import Pagination from '../Pagination';
import { useNavigate } from 'react-router';

interface Column {
  header: React.ReactNode;
  accessor: string;
  render?: (value: any) => React.ReactNode; // Optional render function for custom cell rendering
}
interface TableProps {
  data: any[];
  columns: Column[];
  rowsPerPage?: number;
  title?: string;
  viewAllLink?: string;
}

const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  rowsPerPage = 8,
  title = 'Table',
  viewAllLink = '#',
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-7 w-full rounded-lg bg-white py-6 shadow-md">
      <div className="mb-4 flex items-center justify-between px-5">
        <h2 className="text-lg font-semibold text-[#19183A]">{title}</h2>
        {viewAllLink && (
          <a href={viewAllLink} className="text-sm font-medium text-[#030A70]">
            View all
          </a>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-[#F6F6F6] text-sm font-medium text-gray-500">
              {columns.map((col, index) => (
                <th key={index} className="px-5 py-5 text-left">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                onClick={() => navigate(`/seller-dashboard/product/${row.id}`)} // Navigate using the product ID
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-5 py-4 text-[#19183A]">
                    {/* Pass the entire row to the render function */}
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
};

export default TableComponent;
