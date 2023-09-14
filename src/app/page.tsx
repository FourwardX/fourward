import dynamic from 'next/dynamic';

const DynamicTextArea = dynamic(() => import('./components/TextAreaComponent'), { ssr: false });

const Page: React.FC = () => {
  console.log('rendering page @ server');
  return (
    <div className="container mx-auto min-h-screen">
      <DynamicTextArea />
    </div>
  );
};

export default Page;