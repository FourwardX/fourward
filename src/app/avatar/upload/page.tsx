'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (inputFileRef.current && inputFileRef.current.files) {
            const file = inputFileRef.current.files[0];
            if (file) {
              const response = await fetch(
                `/api/image/upload?filename=${file.name}`,
                {
                  method: 'POST',
                  body: file,
                },
              );

              const newBlob = (await response.json()) as PutBlobResult;
              setBlob(newBlob);
            }
          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
