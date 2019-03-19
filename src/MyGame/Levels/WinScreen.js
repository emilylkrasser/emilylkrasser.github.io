/*
 * File: WinScreen.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame: false, SceneFileParser: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function WinScreen() 
{    
    this.kBG = "assets/LifeNightOcean.png";
    this.kBGMusic = "assets/Sounds/CalmSea.mp3";
    this.kMButton = "assets/MenuButton.png";
    
    //Camera to view the scene
    this.mCamera = null;
    this.mMenuButton = null;
}
gEngine.Core.inheritPrototype(WinScreen, Scene);

WinScreen.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.Textures.loadTexture(this.kMButton);
    
    gEngine.AudioClips.loadAudio(this.kBGMusic);
};

WinScreen.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Textures.unloadTexture(this.kMButton);
    
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBGMusic);
    
    var nextLevel = new StartMenu();
    gEngine.Core.startScene(nextLevel);
};

WinScreen.prototype.initialize = function () {
    gEngine.AudioClips.playBackgroundAudio(this.kBGMusic);
    
    //Define Camera with a black background
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mBG = new SpriteRenderable(this.kBG);
    this.mBG.setElementPixelPositions(0, 2048, 0, 2048);
    this.mBG.getXform().setPosition(0, 0);
    this.mBG.getXform().setSize(100, 75);
      
    
    this.mMenuButton = new UIButton(this.kMButton,this.menuSelect,this,[400,200],[250,125],"",0,[1,1,1,1],[0,0,0,1]);
   
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
WinScreen.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mBG.draw(this.mCamera);
    this.mMenuButton.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
WinScreen.prototype.update = function () {
    this.mMenuButton.update();
};

WinScreen.prototype.menuSelect = function() {
    gEngine.GameLoop.stop();
};