import { Engine, Scene, HemisphericLight, Vector3, CannonJSPlugin } from "babylonjs";
import * as GUI from  "babylonjs-gui";
import { addSpheres } from "./sphere";
import { addLabelToScene, updateScore } from "./score";
var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
    // Create scene
    var scene: Scene = new Scene(engine);

    var gravityVector = new BABYLON.Vector3(0, -1, 0);
    scene.enablePhysics(gravityVector, new CannonJSPlugin);

    var light = new HemisphericLight("light",Vector3.Zero(),scene);

    // Parameters : name, position, scene
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
    camera.checkCollisions = true;
    camera.applyGravity = true;
    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // Create Ground
    var ground = BABYLON.Mesh.CreatePlane("ground", 25.0, scene);
    ground.position = new BABYLON.Vector3(0, -10, 0);
    ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.backFaceCulling = false;
    ground.receiveShadows = true;
    //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0, restitution: 0 }, scene);

       // Create the 3D UI manager
    var manager = new GUI.GUI3DManager(scene);
    // Create a horizontal stack panel
    var panel = new GUI.StackPanel3D();
    panel.margin = 0.02;
    manager.addControl(panel);
    startGameButton(panel);
    addLabelToScene();
    // Enable VR
    var vrHelper = scene.createDefaultVRExperience();
    vrHelper.enableInteractions();

    return scene;
}

var startGameButton = function (panel) {
    var button = new GUI.Button3D();
    panel.addControl(button);
    button.onPointerUpObservable.add(function () {
        //reset score
        updateScore(0);
        addSpheres(scene);
    });
    var text1 = new GUI.TextBlock();
    text1.text = "Start Game";
    text1.color = "white";
    text1.fontSize = 24;
    button.content = text1;
}
var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
