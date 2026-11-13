package de.berlin.htw;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/api/todos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TodoResource {

    public static class Todo {
        public long id;
        public String text;
        public boolean completed;
    }

    private static final List<Todo> TODOS = new ArrayList<>();

    @GET
    public List<Todo> getAll() {
        return TODOS;
    }

    @POST
    public Todo add(Todo todo) {
        todo.id = System.currentTimeMillis();
        TODOS.add(todo);
        return todo;
    }
}