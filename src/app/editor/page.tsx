import dynamic from 'next/dynamic';


const Page: React.FC = () => {
  console.log('rendering page @ server');
  return (
    <div className="container mx-auto min-h-screen">
      |  hello world
    </div>
  );
};

export default Page;