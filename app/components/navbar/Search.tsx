'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
        <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-6">
              where
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
              date
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block">
                  Add Guests
                </div>
                <div className="p-2 bg-slate-900 rounded-full text-white">
                  <BiSearch size={18}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search;