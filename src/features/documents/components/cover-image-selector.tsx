import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function CoverImageSelector({
  handleChangeCoverImage,
  setCoverImage,
  fileInputRef,
  handleCoverImageUpload,
}: {
  handleChangeCoverImage: (newCoverImage: string | null) => Promise<void>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleCoverImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCoverImage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  // Predefined image categories
  const imageCategories = [
    {
      name: 'Space',
      images: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1630694093867-4b947d812bf0?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1529788295308-1eace6f67388?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1564053051381-5cb91813736b?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1637984135921-301a7d39e3b7?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1589225529399-8705282f98e2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      name: 'Nature',
      images: [
        'https://images.unsplash.com/photo-1600823737203-3eea4e1be6f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1593693595296-7f89cb1d8b0b?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1646511281676-77d13aa943f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1518699086072-d567cb15b483?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        'https://images.unsplash.com/photo-1485204261646-2e9f783c88cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1577209299418-485f60c0d4de?q=80&w=1969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      name: 'Abstract',
      images: [
        'https://images.unsplash.com/photo-1692320536760-1ef1d6bcb548?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1729707711998-f430609bf68b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1510906594845-bc082582c8cc?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1552083974-186346191183?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1524169358666-79f22534bc6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
  ];
  // Predefined color options
  const colorOptions = [
    '#f87171', // red
    '#eab308', // yellow
    '#0ea5e9', // blue
    '#f5f5f4', // light gray
    'linear-gradient(to bottom, #06b6d4, #a5f3fc)', // cyan gradient
    '#ec4899', // pink
    '#ef4444', // orange-red
    'linear-gradient(to bottom, #0099ff, #ffffff)', // light blue gradient
    'linear-gradient(to bottom, #f472b6, #ef4444)', // pink to red
    'linear-gradient(to bottom, #a855f7, #ec4899)', // purple to pink
    'linear-gradient(to bottom, #0ea5e9, #a5f3fc)', // blue to cyan
    'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)',
    'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
    'linear-gradient(to right, #1e9600, #fff200, #ff0000)',
    'linear-gradient(90deg, #A100FFFF 0%, #71C4FFFF 100%)',
    'linear-gradient(to right, #f12711, #f5af19)',
    'linear-gradient(to right, #fc5c7d, #6a82fb)',
    'linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)',
    'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
  ];
  return (
    <Tabs defaultValue='gallery'>
      <TabsList className='grid grid-cols-4'>
        <TabsTrigger value='gallery'>Gallery</TabsTrigger>
        <TabsTrigger value='upload'>Upload</TabsTrigger>
        <TabsTrigger value='link'>Link</TabsTrigger>
        <TabsTrigger value='color'>Color</TabsTrigger>
      </TabsList>

      <TabsContent
        value='gallery'
        className='space-y-4 max-h-[400px] overflow-y-auto'
      >
        <div className='pt-2'>
          {imageCategories.map((category, idx) => (
            <div key={idx} className='mb-4'>
              <h3 className='text-sm font-medium mb-2'>{category.name}</h3>
              <div className='grid grid-cols-3 gap-2'>
                {category.images.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className='aspect-video rounded-md overflow-hidden cursor-pointer'
                    onClick={() => handleChangeCoverImage(img)}
                  >
                    <Image
                      src={img || '/placeholder.svg'}
                      alt={`${category.name} image ${imgIdx}`}
                      width={120}
                      height={80}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value='upload' className='space-y-4'>
        <div className='pt-2'>
          <Button
            variant='outline'
            className='w-full h-24 border-dashed'
            // onClick={() => fileInputRef.current?.click()}
            onClick={() => {
              alert('Upload functionality is not implemented yet.');
            }}
          >
            <UploadIcon className='mr-2 h-4 w-4' />
            Upload an image
          </Button>
          <input
            type='file'
            ref={fileInputRef}
            className='hidden'
            accept='image/*'
            onChange={handleCoverImageUpload}
          />
        </div>
      </TabsContent>

      <TabsContent value='link' className='space-y-4'>
        <div className='pt-2'>
          <Input
            placeholder='Paste an image link...'
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setCoverImage(value);
                handleChangeCoverImage(value);
              }
            }}
          />
        </div>
      </TabsContent>

      <TabsContent value='color' className='space-y-4'>
        <div className='pt-2'>
          <h3 className='text-sm font-medium mb-2'>Color & Gradient</h3>
          <div className='grid grid-cols-4 gap-2'>
            {colorOptions.map((color, idx) => (
              <div
                key={idx}
                className='aspect-video rounded-md overflow-hidden cursor-pointer relative'
                onClick={() => {
                  handleChangeCoverImage(color);
                  setCoverImage(color);
                }}
              >
                <div
                  className='absolute inset-0'
                  style={{
                    background: color,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export { CoverImageSelector };
