'use client'
import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import NestedList from '@editorjs/nested-list';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter'
import Header from '@editorjs/header'
import editorjsCodeflask from '@calumk/editorjs-codeflask';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist'
import Alert from 'editorjs-alert';
import ImageTool from '@editorjs/image';
import { PutBlobResult } from '@vercel/blob';
import Storybook from '../editorjs/block/Storybook';

const ImageAPI = {
  uploadImage: async (file: File) => {
    const response = await fetch(`/api/image/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });
    if (response.ok) {
      const blob = await response.json() as PutBlobResult;
      console.log(blob.url);
      return {
        "success": 1,
        "file": {
          "url": blob.url,
          // Add any other image data you want to store
        },
      };
    } else {
      return { success: 0 };
    }
  },
};


const EditorComponent = () => {
  const editorRef = useRef<EditorJS | null>(null);

  // Sample saved data
  const savedData = {
    "time": 1632434075109,
    "blocks": [
    ],
    "version": "2.22.2"
  };

  useEffect(() => {
    editorRef.current = new EditorJS({
      holder: 'editorjs',
      data: savedData,  // Load saved data here
      tools: {
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        delimiter: Delimiter,
        header: Header,
        code: editorjsCodeflask,
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+W',
          config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        alert: {
          class: Alert,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+A',
          config: {
            defaultType: 'primary',
            messagePlaceholder: 'Enter something',
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                try {
                  const result = await ImageAPI.uploadImage(file);
                  console.log('Upload result:', result);

                  return result;
                } catch (error) {
                  console.error('Upload failed:', error);
                  return { success: 0 };
                }
              },

              async uploadByUrl(url: string) {
                // Implement your logic for uploading by URL
              }
            }
          }
        },
        storybook: {
          class: Storybook,
          inlineToolbar: true
        },
      },

    });
  }, []);



  return (
    <div>
      <div id="editorjs"></div>
    </div>
  );
};

export default EditorComponent;
