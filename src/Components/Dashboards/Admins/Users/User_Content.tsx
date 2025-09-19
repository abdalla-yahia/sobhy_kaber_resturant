'use client'
import Image from "next/image"
import { UpdateUser } from '@/Interfaces/UserInterfaces';

export default function User_Content({ User }: { User: UpdateUser }) {

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
