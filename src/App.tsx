import { Button, Heading, Text, TextField, View, withAuthenticator } from "@aws-amplify/ui-react";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/api";
import { type AuthUser } from "aws-amplify/auth";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { type Todo, type TodoInput } from "./API";
import { createTodo, deleteTodo, updateTodo } from "./graphql/mutations";
import { getTodos } from "./graphql/queries";

const initialState: TodoInput = { id: "", name: "", description: "" };
const client = generateClient();

type AppProps = {
  signOut?: UseAuthenticator["signOut"];
  user?: AuthUser;
};

const App: React.FC<AppProps> = ({ signOut, user }) => {
  const [formState, setFormState] = useState<TodoInput>(initialState);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = useCallback(async () => {
    try {
      const { data } = await client.graphql({ query: getTodos });
      console.log("🚀 ~ fetchTodos ~ data:", data.getTodos);
      setTodos(data.getTodos);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  }, []);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [field]: event.target.value });
  };

  const handleAddTodo = async () => {
    if (!formState.name || !formState.description) return;
    try {
      const newTodo = { ...formState, id: uuidv4() };
      const { data } = await client.graphql({
        query: createTodo,
        variables: { input: newTodo },
      });
      setTodos([...todos, data.createTodo]);
      setFormState(initialState);
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  };

  const handleUpdateTodo = async () => {
    if (!editingTodo) return;
    try {
      const updatedTodo = { id: editingTodo.id, ...formState };
      const { data } = await client.graphql({
        query: updateTodo,
        variables: { input: updatedTodo },
      });
      setTodos(todos.map((todo) => (todo.id === editingTodo.id ? data.updateTodo : todo)));
      setEditingTodo(null);
      setFormState(initialState);
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await client.graphql({
        query: deleteTodo,
        variables: { input: { id } },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setFormState({ name: todo.name, description: todo.description });
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setFormState(initialState);
  };

  return (
    <View style={styles.container}>
      <Heading level={3}>Hello {user?.username}</Heading>
      <Button style={styles.signOutButton} onClick={signOut}>
        Sign out
      </Button>
      <Heading level={2}>Amplify Todos</Heading>

      <View style={styles.formContainer}>
        <TextField
          placeholder="Name"
          onChange={handleInputChange("name")}
          style={styles.input}
          value={formState.name}
        />
        <TextField
          placeholder="Description"
          onChange={handleInputChange("description")}
          style={styles.input}
          value={formState.description}
        />
        <Button style={styles.button} onClick={editingTodo ? handleUpdateTodo : handleAddTodo}>
          {editingTodo ? "Update Todo" : "Create Todo"}
        </Button>
        {editingTodo && (
          <Button style={styles.button} onClick={handleCancelEdit}>
            Cancel
          </Button>
        )}
      </View>

      {todos.map((todo) => (
        <View key={todo.id} style={styles.todo}>
          <Text style={styles.todoName}>{todo.name}</Text>
          <Text style={styles.todoDescription}>{todo.description}</Text>
          <View style={styles.todoActions}>
            <Button style={styles.button} onClick={() => handleEditTodo(todo)}>
              Edit
            </Button>
            <Button style={styles.button} onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = {
  container: {
    width: 800,
    margin: "100px  auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
    marginRight: 10,
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  signOutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
    marginBottom: 20,
  },
  todo: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  todoName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  todoDescription: {
    fontSize: 16,
    color: "#555",
  },
  todoActions: {
    marginTop: 10,
    display: "flex",
    gap: 10,
  },
} as const;

export default withAuthenticator(App);
