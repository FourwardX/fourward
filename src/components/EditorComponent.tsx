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
import AttendanceTool from '@/editorjs/block/AttendanceTool';
import Slogantool from '@/editorjs/block/Slogantool';

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
      {
        "type": "slogan",
        "data": {
        }
      }, {
        "type": "header",
        "data": {
          "text": "What is DOCU?",
          "level": 1
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/how%20Docu%20works%20in%20the%20future.drawio%20(1)-mI2xkIcAg199YpEVRDrJgTbSlnQhcq.png"
          },
          "caption": "  ",
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "DOCU is a one-stop platform future-ready word editor that allows stakeholders to upload data and assists HR in facilitating the HR management system. It provides services such as summarization and storyline generation, an attendance tracking system, and more, all of which can streamline the current manual tasks that consume significant manpower and time to resolve."
        }
      },
      {
        "type": "header",
        "data": {
          "text": "Feature 1: Storyline Summarization Generator",
          "level": 2
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "<b>Example</b>"
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Ways to generate step-by-step instructions for organizing a workshop for approximately 100 people."
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 1: Type in detail what you wish in the respective command prompt."
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Picture1-DXkWG9zznjER7LI8ofhNMuI5Fvuv2A.png"
          },
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },

      {
        "type": "paragraph",
        "data": {
          "text": "Step 2: Press the \"Create Storybook\" button."
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Picture2-06sgJKvJqSrrsZHwctjrphcH612mEg.png"
          },
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },

      {
        "type": "paragraph",
        "data": {
          "text": "Step 3: Wait for the AI to generate detailed instructions and corresponding images."
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Picture3-jp9aluC1QHr7sKcWJ9rO3dXkM777Jv.png"
          },
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 4: Review the step-by-step instructions."
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Picture4-y2OctNix9tqzpgYBM3iYLmDtJIiHML.png"
          },
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Picture4a-Z3jMCSx0fI0YPOVwEdm30poUk19TX7.png"
          },
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Picture4b-MQ8ty44mlK3HTCfqwxfkuFXMPLkSoS.png"
          },
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 5: For subsequent requests, click on the row below, and then click on the '+' button shown on the left-hand side."
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Picture5-95cuXlT00qXD2krGD9pJNpdS4l3Zhc.png"
          },
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 6: Choose and click the Storybook option, and there you go!"
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Picture6-00KaVZ3R6n0kkXk8hXra6LOdL0yiSn.png"
          },
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      },
      {
        "type": "delimiter",
        "data": {}
      },
      {
        "type": "header",
        "data": {
          "text": "Future implementation",
          "level": 1
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "i) Save each request and its corresponding response so that users can reference them in the future."
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "ii) Able to upload files such as datasheets, Annual Reports, Sustainability Reports, Internal reports, etc., to DOCU for analysis, summarization, and the generation of a storyline based on the clients' needs."
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "iii) Able to upload technical pictures, such as PCB short-circuiting, Arduino networks, and Power architecture, so that DOCU can detect the faulty areas and provide feedback."
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "iv) Able to produce demonstration videos."
        }
      },
      {
        "type": "header",
        "data": {
          "level": 2,
          "text": "Feature 2: Digital Attendance Taking System"
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Example\nWays to take attendance for the PSA Code Sprint 2023 Problem Statement Release Ceremony"
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "For Organizer:"
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/image%204-HEdF8PDPNPws5eNNk7bULYJbxcpoUy.png"
          },
          "withBorder": true,
          "stretched": false,
          "withBackground": false
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 2: Click the 'Add' button "
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/photo_2023-10-01_16-40-40-Pvkskw4H44T9CBnoJdi14kBytjDWHf.jpg"
          },
          "withBorder": true,
          "stretched": false,
          "withBackground": false
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 3: Key in the name/team name in the User ID field, and click the 'Confirm' button "
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/image-r978UWFKlIZBV8KFb66CIwB8XRLwpE.png"
          },
          "withBorder": true,
          "stretched": false,
          "withBackground": false
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 4: Repeat Step 2 and 3 to key in the subsequent names/team names."
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 5: Once the users have taken their attendance, the box besides their names will be ticked"
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/image-hcjYrrhBRVb05d8GNU2lG43TmhD617.png"
          },
          "withBorder": true,
          "stretched": false,
          "withBackground": false
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "For Users:"
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 1: Scan on any of the NFC Cards/devices"
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 2: For demonstration purposes, visit <a href='https://spirify.azurewebsites.net/welcome/Wenhao'>Welcome Wenhao</a> to trigger an \"Attend\" event, and use this url <a href='https://spirify.azurewebsites.net/welcome/wenhao/bye'>Bye Wenhao</a> to trigger a \"Leaving\" event. Observe the changes to the checkbox."
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Step 3: A welcome page will appear, signaling that attendance has been taken successfully."
        }
      },
      {
        "type": "header",
        "data": {
          "text": "Creating a Demand-Supply Dashboard",
          "level": 2
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Utilizing the same principles as our attendance-taking system, we can develop a Demand-Supply Dashboard using Docu. This will enable us to swiftly identify and analyze the diverse requirements of our clients."
        }
      },
      {
        "type": "delimiter",
        "data": {
        }
      },
      {
        "type": "header",
        "data": {
          "level": 2,
          "text": "Future Implementation"
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "i) Users will be able to take their attendance with Bluetooth or Wi-Fi, making it more convenient for them."
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "ii) Able to fully automate data pipeline. After uploading Excel, our system automates email merging, send emails to recipients, and orginizes names for easy attendance taking."
        }
      },
      {
        "type": "header",
        "data": {
          "text": "Future Roadmap",
          "level": 2
        }
      },
      {
        "type": "image",
        "data": {
          "file": {
            "url": "https://xvhx60gywwtyt2mu.public.blob.vercel-storage.com/Screenshot%202023-10-01%20at%206.13.50%20PM-FvU4tR5R5UkHHe74sUyagygnJWClBp.png"
          },
          "caption": "",
          "withBorder": false,
          "withBackground": false,
          "stretched": false
        }
      }, {
        "type": "header",
        "data": {
          "text": "Give It a Try!",
          "level": 1
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Start Typing in the Editor to See the Magic Unfold!"
        }
      }

    ],
    "version": "2.22.2"
  };

  useEffect(() => {
    editorRef.current = new EditorJS({
      holder: 'editorjs',
      readOnly: false,
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
        attendance: {
          class: AttendanceTool,
          inlineToolbar: true
        },
        slogan: {
          class: Slogantool,
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
