import { useState } from "react";
import { Input, Button, List, Typography, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import "antd/dist/antd.css";
// import deletebtn from "./deletebtn";
// import { red } from "@mui/material/colors";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [edititem, setEditiem] = useState({
    id: "",
    isEditig: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      const newTodo = { id: Date.now(), title };
      setTodos([...todos, newTodo]);
      setTitle("");
    }
  };

  const deleTodo = (id) => {
    const filterList = todos.filter((todo) => todo.id !== id);
    setTodos(filterList);
  };

  const edittodo = (id) => {
    const editableItem = todos.find((todo) => todo.id === id);
    setEditiem({
      id: id,
      isEditig: true,
    });
    setTitle(editableItem.title);
  };

  const editHandler = (e) => {
    e.preventDefault();
    const newTodo = todos.map((todo) =>
      todo.id === edititem.id ? { ...todo, title } : todo
    );
    setTodos(newTodo);
    setTitle("");
    setEditiem({
      id: "",
      isEditig: false,
    });
  };

  return (
    <div className="App" style={{ maxWidth: 600, margin: "0 auto", padding: 20,backgroundColor:"pink",height:550,marginTop:50,borderRadius:15 }}>
      <Typography.Title level={1} style={{textAlign:"center",fontWeight:"bolder"}}>Todo App</Typography.Title>

      <Space.Compact style={{ width: "90%",borderRadius:"20%"}}>
        <Input
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {edititem.isEditig ? (
          <Button type="primary" style={{marginLeft:10,borderRadius:10}} onClick={editHandler}>
            Edit
          </Button>
        ) : (
          <Button type="primary"  style={{marginLeft:10,borderRadius:10}} onClick={submitHandler}>
            Add
          </Button>
        )}
      </Space.Compact>
     

      { <List
        style={{ marginTop: 20,backgroundColor:"white"}}
        bordered
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item 
            actions={[
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleTodo(todo.id)}
              />,
              <Button
                type="default"
                icon={<EditOutlined />}
                onClick={() => edittodo(todo.id)}
              />,
            ]}
          >
            <Typography.Text>{todo.title}</Typography.Text>
          </List.Item>
        )}
      />  }
    </div>
  );
}
