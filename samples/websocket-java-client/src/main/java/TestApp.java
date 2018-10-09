import java.io.*;
import java.net.*;
import java.util.*;
import java.util.stream.*;
import javax.json.*;
import javax.json.spi.*;
import javax.websocket.*;
import com.github.pgelinas.jackson.javax.json.spi.JacksonProvider;

public class TestApp {

    static JsonProvider jsonProvider = new JacksonProvider();

    public static void main(String[] args) {

        String host = "eba.ibm.com";
        String token = "<cca-token cookie value>";
        String backend = "<cca-backend cookie value>";
        String session = "<session id>";

        ClientEndpointConfig.Configurator configurator = new ClientEndpointConfig.Configurator() {
            public void beforeRequest(Map<String, List<String>> headers) {
                super.beforeRequest(headers);
                headers.put("Origin", Arrays.asList(String.format("https://%s", host)));
                headers.put("Cookie", Arrays.asList(String.format("cca-token=%s; cca-backend=%s", token, backend)));
            }
        };

        ClientEndpointConfig clientConfig = ClientEndpointConfig.Builder
            .create()
            .configurator(configurator)
            .build();

        Endpoint endpoint = new Endpoint() {

            public void onOpen(Session client, EndpointConfig config) {
                System.out.println("Websocket opened");
                RemoteEndpoint remote = client.getBasicRemote();
                client.addMessageHandler(new MessageHandler.Whole<String>() {
                     public void onMessage(String text) {
                        JsonReader reader = jsonProvider.createReader(new StringReader(text));
                        JsonObject message = reader.readObject();
                        reader.close();
                        handleMessage(message);
                     }
                });

            }

            public void onClose(Session client, CloseReason reason) {
                System.out.println(String.format("Websocket closed: %s", reason));
            }

            public void onError(Session client, Throwable thr) {
                System.err.println(String.format("Websocket error: %s", thr));
            }

            void handleMessage(JsonObject message) {
                switch (message.getString("name")) {
                    case "many":
                        for (JsonString text : message.getJsonArray("messages").getValuesAs(JsonString.class)) {
                            JsonReader reader = jsonProvider.createReader(new StringReader(text.getString()));
                            JsonObject nestedMessage = reader.readObject();
                            reader.close();
                            handleMessage(nestedMessage);
                        }
                        break;

                    case "state":
                        message
                            .getJsonObject("state")
                            .getJsonObject("nodes")
                            .entrySet()
                            .stream()
                            .map(entry -> (JsonObject)entry.getValue())
                            .sorted((x,y) -> Integer.compare(x.getInt("seqn"), y.getInt("seqn")))
                            .forEach(node -> handleNode(node));
                        break;

                    case "patch":
                        message
                            .getJsonArray("patch")
                            .getValuesAs(JsonArray.class)
                            .stream()
                            .flatMap(actions -> actions.getValuesAs(JsonObject.class).stream())
                            .flatMap(action -> action.getJsonArray("nodes").getValuesAs(JsonArray.class).stream())
                            .filter(entry -> !entry.isNull(1))
                            .forEach(entry -> handleNode(entry.getJsonObject(1)));
                        break;

                    case "working":
                        System.out.println(String.format("working: %s", message.getBoolean("status")));
                        break;
                }
            }

            void handleNode(JsonObject node) {
                String name = node.getString("name");

                List<String> tags = node
                    .getJsonArray("tags")
                    .getValuesAs(JsonString.class)
                    .stream()
                    .map(tag -> tag.getString())
                    .collect(Collectors.toList());

                if (name.equals("message") && tags.stream().anyMatch(tag -> tag.equals("selected"))) {
                    JsonObject data = node.getJsonObject("data");
                    if (!data.isNull("content")) {
                        JsonValue content = data.get("content");
                        switch (content.getValueType()) {
                            case STRING:
                                onReceive(
                                    Optional.of(((JsonString)content).getString()),
                                    Optional.empty(),
                                    tags);
                                break;

                            case OBJECT:
                                onReceive(
                                    Optional.ofNullable(((JsonObject)content).getString("text")),
                                    Optional.ofNullable(((JsonObject)content).get("data")),
                                    tags);
                                break;
                        }
                    }
                }
            }

            void onReceive(Optional<String> text, Optional<JsonValue> data, List<String> tags) {
                if (text.isPresent())
                    System.out.println(text.get());
                if (data.isPresent())
                    System.out.println(data.get());
            }
        };

        try {
            URI url = new URI(String.format("wss://%s/ws/%s", host, session));
            WebSocketContainer container = ContainerProvider.getWebSocketContainer();
            Session client = container.connectToServer(endpoint, clientConfig, url);
            System.out.println("Type your question or hit Ctrl+D to exit");
            try {
                for (;;) {
                    String question = System.console().readLine();

                    if (question == null)
                        break;

                    client.getBasicRemote().sendText(
                        jsonProvider
                            .createObjectBuilder()
                            .add("name", "ask")
                            .add("question", question)
                            .build()
                            .toString());
                }
            }
            finally {
                client.close();
            }
        } catch (IOException ex) {
            System.err.println("IOException exception: " + ex.getMessage());
        } catch (DeploymentException ex) {
            System.err.println("DeploymentException exception: " + ex.getMessage());
        } catch (URISyntaxException ex) {
            System.err.println("URISyntaxException exception: " + ex.getMessage());
        }
    }
}
