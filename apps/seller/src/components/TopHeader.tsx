import { useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import {
  useAppDispatch,
  useAppSelector,
} from '@/services/hooks/useAppDispatch';
import DotSeparator from './UI/dotSeperator';
import { Link } from 'react-router-dom';
import {
  fetchCurrencyRates,
  selectCurrencyRates,
  selectSelectedCurrency,
  setSelectedCurrency,
} from '@/services/redux/slices/buyers/currencySlice';

const TopHeader = () => {
  const dispatch = useAppDispatch();
  const rates = useAppSelector(selectCurrencyRates);
  const selectedCurrency = useAppSelector(selectSelectedCurrency);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const handleCurrencyChange = (currency: string) => {
    dispatch(setSelectedCurrency(currency));
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-[#19183A] px-7 py-2 font-archivo text-xs text-[#D2DAF0] lg:px-11">
        <Link to="/seller" className="text-[#D2DAF0]">
          Open a Giri store
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex gap-1">
            <FaGlobe className="mt-[2px]" />
            <span>Nigeria</span>
          </div>
          <DotSeparator />
          <select
            value={selectedCurrency}
            onChange={e => handleCurrencyChange(e.target.value)}
            className="border-none bg-transparent text-[#D2DAF0] focus:outline-none"
          >
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <DotSeparator />
          <span>ENG (UK)</span>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
