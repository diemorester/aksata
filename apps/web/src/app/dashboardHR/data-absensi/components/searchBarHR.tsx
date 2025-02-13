'use client';

interface SearchBarInputProps {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarInput: React.FC<SearchBarInputProps> = ({ search, onChange }) => {

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onChange}
        className="px-3 py-3 rounded-md outline-none text-black bg-broken-white"
      />
    </div>
  );
};

export default SearchBarInput