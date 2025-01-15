'use client';

interface SearchBarInputProps {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarInput: React.FC<SearchBarInputProps> = ({ search, onChange }) => {

  return (
    <div className="flex items-center space-x-2 p-3">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={onChange}
        className="px-3 py-2 rounded-md outline-none bg-slate-100 text-black"
      />
    </div>
  );
};

export default SearchBarInput