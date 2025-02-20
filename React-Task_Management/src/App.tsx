import { TaskProvider } from "./Component/TaskProvider"
import { TaskManagement } from "./Component/TaskManagement"

function App() {


  return (
    <>

      <TaskProvider>
        <TaskManagement />
      </TaskProvider>
    </>
  )
}

export default App
