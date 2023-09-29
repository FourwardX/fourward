import dynamic from 'next/dynamic';

const DynamicTextArea = dynamic(() => import('../components/EditorComponent'), { ssr: false });

const Page: React.FC = () => {
  console.log('rendering page @ server');
  return (
    <div className="container mx-auto min-h-screen storybook-page">
      <DynamicTextArea />
    </div>
  );
};

export default Page;