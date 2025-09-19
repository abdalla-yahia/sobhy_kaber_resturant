import Image from "next/image";
import { useState } from "react";

export default function UploadOneImage({imageUrl,setImageUrl,}: {imageUrl: string;setImageUrl: (url: string) => void;}) {
  const [preview, setPreview] = useState<string>(imageUrl);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File | null) => {
    if (!file) return;

    // Local preview
    setPreview(URL.createObjectURL(file));

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset",process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url); 
      }
    } catch (err) {
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label htmlFor="uploadimage" className="cursor-pointer" title="Upload One Image">
        <input
          type="file"
          id="uploadimage"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files?.[0] || null)}
        />
        <Image
          loading="lazy"
          src={
            preview ||
            imageUrl ||
            "https://static.vecteezy.com/system/resources/previews/009/875/156/large_2x/3d-picture-icon-blue-white-color-free-png.png"
          }
          alt="Uploaded"
          width={150}
          height={100}
          className="rounded"
        />
      </label>

      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
