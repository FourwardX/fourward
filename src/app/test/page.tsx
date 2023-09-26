import { ChatManager } from '@/core/ChatManager';
import { Response, Step } from '@/models/Response';
const Page: React.FC = async () => {
  console.log('rendering page @ server');
  const chatManagerInstance = new ChatManager();

  const chatResponseWrapper = await chatManagerInstance.processChat('How to use vending machine?');
  const chatResponse: Response | undefined = chatResponseWrapper?.data;

  return (
    <div className="container mx-auto min-h-screen">
      hello world
      {chatResponse ? (
        <div>
          <h1>{chatResponse.Title}</h1>
          <p>{chatResponse.Overview}</p>
          <ul>
            {chatResponse.Steps.map((step, index) => (
              <li key={index}>
                {step.index}. {step.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default Page;