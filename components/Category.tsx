"use client";

import { useRouter,usePathname,useSearchParams } from 'next/navigation'
import { categoryFilters } from '@/constants';

const Category = () => {
  const pathName  =usePathname();
  const searchParams = useSearchParams();
  const router = useRouter()
  const selectedCategory = searchParams.get(`category`)
  const handleCategoryChange=(filter:string)=>{
    router.push(`${pathName}?category=${filter}`);
  }
  return (
    <div className="flexBetween w-full flex-wrap gap-4">
      <ul className="flex gap-1 justify-between overflow-auto">
        {categoryFilters.map((category) => (
          <button
            key={category}
            className={`px-3 py-4  rounded-lg capitalize whitespace-nowrap font-semibold hover:bg-[#00000065]  ${
              category === selectedCategory
                ? "font-medium bg-light-white-300 text-black "
                : "text-light-white-500"
            }`}
            type="button"
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Category;
