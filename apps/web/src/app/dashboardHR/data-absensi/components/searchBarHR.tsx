'use client';

interface SearchBarInputProps {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarInput: React.FC<SearchBarInputProps> = ({ search, onChange }) => {

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onChange}
        className="px-3 py-2 rounded-md outline-none text-black bg-broken-white"
      />
    </>
  );
};

export default SearchBarInput