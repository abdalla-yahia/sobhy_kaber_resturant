'use client'
import * as icon from '@/Utils/Icons';
import swal from 'sweetalert';
import Edit_Category_Form from "./Form_Edit_Category"
import Image from "next/image"
import { RootState, useAppDispatch, useAppSelector } from '@/Libs/Store/Store';
import { UpdateCategory } from '@/Interfaces/CategoryInterface';
import { deleteCategory } from '@/Features/Actions/CategoriesActions';
import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Category_Content({ Category }: { Category: UpdateCategory }) {
  const [isToggle, setIsToggle] = useState(false)
  const locale = useLocale()
  const dispatch = useAppDispatch()
  //Delete Category Handler By Id
  const DeleteHandler = (id: string) => {
    swal({
      title: "Are you sure you want to delete this Category?",
      text: "Once you delete this Category, you cannot recover its information!",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Delete"]
    })
      .then((willDelete) => {
        dispatch(deleteCategory(id as string));
        if (willDelete) {
          swal("Category deleted successfully!", {
            icon: "success",
          });
          window.location.reload();
        } else {
          swal("The Category is safe and was not deleted!");
        }
      });
  }
  //Get Translation Of Category Title 
  const title = Category?.translations?.find(t=>t.LocalId === locale)?.name
  return (
    <tr key={Category?.id}>
      <td className="p-2 border border-[#E4E5EE] flex justify-center items-center">
        <Link href={`/products/categories/${Category?.id}`}>
          <Image src={Category?.image as string} alt={Category?.title as string} width={40} height={40} />
        </Link>
      </td>
      <td className="p-2 border border-[#E4E5EE]">
        <Link href={`/products/categories/${Category?.id}`}>
          {title ? title : Category?.title}
        </Link>
      </td>
      <td className="p-2 border border-[#E4E5EE]">{Category?.description}</td>
      <td className="p-2 border border-[#E4E5EE]">
        <div className="w-full flex justify-between items-center px-2">
          {/*Edit Category Form*/}
          {
            isToggle && (<Edit_Category_Form Category={Category} setIsToggle={setIsToggle} />)
          }
          {/*Toggle Form Edit*/}
          <icon.FaRegEdit onClick={() => setIsToggle(!isToggle)} title="Edit" className="text-green-500 cursor-pointer" />
          {/*Delete Category Button*/}
          <icon.FaTrash onClick={() => DeleteHandler(Category?.id as string)} title="Delete" className="text-red-500 cursor-pointer" />
        </div>
      </td>
    </tr>
  )
}
