'use client';
import axiosInstance from "@/libs/axios";
import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";

const SearchBarInput: React.FC<{ onChange: (query: string) => void }> = ({ onChange }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onChange(newQuery);
  };

  return (
    <div className="flex items-center space-x-2 p-3">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="px-3 py-2 rounded-md outline-none bg-slate-100 text-black"
      />
    </div>
  );
};

const SearchBar: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (query: string) => {
    if (query.length === 0) return;

    setIsLoading(true);
    try {
      const res = await axiosInstance.get('/api/search', { params: { query } });
      setData(res.data);
      toast.success(res.data.msg);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "Error during search");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = useCallback(
    debounce((query: string) => {
      fetchData(query);
    }, 300),
    []
  );

  return (
    <div>
      <SearchBarInput onChange={debouncedFetch} />
      <div>
        {data.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))
        }
      </div>
    </div>
  );
};

export default SearchBar;