import './assets/css/style.css'; 
import { apiConnection } from "./classes/accessApi";

const apiConsumer = new apiConnection();
const example = apiConsumer.requestExample();