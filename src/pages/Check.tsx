import React, { useEffect, useState } from "react";
import { useFirebase } from "../module/firebase";

const Componenet = () => {
  const firebase = useFirebase();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    firebase.listAllTask().then((data: any) => {
      setTasks(data.docs);
    });
  }, []);
  // console.log(tasks[10].data().Task.created.toJSON);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.data().Task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Componenet;
