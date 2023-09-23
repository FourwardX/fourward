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

const EditorComponent = () => {
  const editorRef = useRef<EditorJS | null>(null);

  // Sample saved data
  const savedData = {
    "time": 1632434075109,
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "Sample Header",
          "level": 1
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "This is a sample paragraph. Editor.js allows you to create structured content with various types of blocks."
        }
      },
      {
        "type": "list",
        "data": {
          "style": "unordered",
          "items": [
            {
              "content": "Apples",
              "items": [
                {
                  "content": "Red",
                  "items": []
                },
                {
                  "content": "Green",
                  "items": []
                },
              ]
            },
            {
              "content": "Bananas",
              "items": [
                {
                  "content": "Yellow",
                  "items": []
                },
              ]
            },
          ]
        }
      },
      {
        "type": "quote",
        "data": {
          "text": "This is a quote.",
          "caption": "Author"
        }
      },
      {
        "type": "code",
        "data": {
          "code": "console.log('Hello, world!');"
        }
      },
      {
        "type": "delimiter",
        "data": {}
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Another paragraph to conclude."
        }
      }, {
        "type": "warning",
        "data": {
          "title": "Note:",
          "message": "Avoid using this method just for lulz. It can be very dangerous opposite your daily fun stuff."
        }
      },
      {
        "type": "alert",
        "data": {
          "type": "danger",
          "align": "center",
          "text": "<strong>Holy smokes!</strong><br>Something seriously <em>bad</em> happened."
        }
      }, {
        "type": "image",
        "data": {
          "file": {
            "url": "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg"
          },
          "caption": "Roadster // tesla.com",
          "withBorder": false,
          "withBackground": false,
          "stretched": true
        }
      }
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
            endpoints: {
              byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
              byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            }
          }
        }
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
