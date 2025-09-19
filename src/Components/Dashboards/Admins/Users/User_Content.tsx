'use client'
import * as icon from '@/Utils/Icons';
import swal from 'sweetalert';
import Image from "next/image"
import { useAppDispatch } from '@/Libs/Store/Store';
import { UpdateUser } from '@/Interfaces/UserInterfaces';
import { deleteUser } from '@/Features/Actions/UsersActions';
import { useState } from 'react';

export default function User_Content({ User }: { User: UpdateUser }) {
  const [isToggle, setIsToggle] = useState(false)
  const dispatch = useAppDispatch()

  //Delete User Handler By Id
  const DeleteHandler = (id: string) => {
    swal({
      title: "Are you sure you want to delete this User?",
      text: "Once you delete this User, you cannot recover its information!",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Delete"]
    })
      .then((willDelete) => {
        dispatch(deleteUser(id as string));
        if (willDelete) {
          swal("User deleted successfully!", {
            icon: "success",
          });
          window.location.reload();
        } else {
          swal("The User is safe and was not deleted!");
        }
      });
  }
  return (
    <tr key={User?.id}>
      <td className="p-2 border border-[#E4E5EE]">
        <Image src={User?.image as string || 'https://static.vecteezy.com/system/resources/previews/060/423/145/non_2x/business-avatar-icon-with-a-simple-clean-design-featuring-a-man-in-a-suit-suitable-for-online-profiles-or-websites-free-png.png'} alt={User?.name as string} width={40} height={40} />
      </td>
      <td className="p-2 border border-[#E4E5EE]">
        {User?.gender === 'FEMALE' ? 'Mrs: ' : 'Mr: '}
        {User?.name}</td>
      <td className="p-2 border border-[#E4E5EE]">
        {User?.gender && (User?.gender === 'FEMALE' ? 'female' : 'Male')}
      </td>
      <td className="p-2 border border-[#E4E5EE]">{User?.email}</td>
      <td className="p-2 border border-[#E4E5EE]">{User?.phone}</td>
      <td className="p-2 border border-[#E4E5EE]">{User?.address}</td>
      <td className="p-2 border border-[#E4E5EE]">{User?.role}</td>
    </tr>
  )
}
