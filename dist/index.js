import { PPM } from "./src/PPM.js";
import Scene from "./src/Scene.js";
const scene = new Scene(800, 700, [35, 69, 94, 255]);
// alert(1);
// scene.setLine(-400, 0, 400, 0, [0, 0, 0, 255]);
// scene.setLine(0, 350, 0, -350, [0, 0, 0, 255]);
PPM(scene);
