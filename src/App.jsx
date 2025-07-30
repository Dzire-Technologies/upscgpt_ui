import MainRoute from './routes/MainRoute'
import { ChatHistoryProvider } from "/src/context/ChatHistoryContext.jsx";

function App() {
  return (
    <ChatHistoryProvider>
      <MainRoute/>
    </ChatHistoryProvider>
  )
}

export default App
