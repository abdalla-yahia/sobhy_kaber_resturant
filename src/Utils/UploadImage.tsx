import Image from "next/image";
import { useState } from "react";
import * as icon from '@/Utils/Icons';

export default function UploadImages({images,setImages,}: {images: string[];setImages: (urls: string[]) => void;}) {
  const [previews, setPreviews] = useState<string[]>(images);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;

    const newPreviews: string[] = [];
    const newUrls: string[] = [...images];

    for (const file of Array.from(files)) {
      // Show Preview Before Upload
      const previewUrl = URL.createObjectURL(file);
      newPreviews.push(previewUrl);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        
      );

      // Upload to Cloudinary
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      newUrls.push(data.secure_url);
    }

    setPreviews((prev) => [...prev, ...newPreviews]);
    setImages(newUrls);
  };
  //Delete Image
  const DeleteImageHandler=(src:string)=>{
    const Filter = previews?.filter(e=>e !== src)
    setPreviews(Filter)
    setImages(Filter)
  }
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <label htmlFor="uploadimages" className="cursor-pointer shadow p-2 rounded" title="Upload Images">
        <input type="file" id="uploadimages" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)}/>
      
      <div className="flex flex-wrap gap-2">
        {previews.length > 0 ? (
          previews.map((src, i) => (
            <div  key={i} className=" relative">
            <Image src={src} alt={`Preview ${i}`} width={150} height={100} className="rounded "/>
            <icon.IoClose onClick={()=>DeleteImageHandler(src)} className=" absolute top-0 right-0 text-lg text-red-600 cursor-pointer"/>
            </div>
          ))
        ) : (
          <Image src="https://static.vecteezy.com/system/resources/previews/009/875/156/large_2x/3d-picture-icon-blue-white-color-free-png.png" alt="Placeholder" width={150} height={100}
          />
        )}
      </div>
      </label>

    </div>
  );
}
