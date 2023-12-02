import io from "socket.io-client";
import socketBaseURL from "./socketBaseURL";

const socket = io(socketBaseURL);

export default socket;
