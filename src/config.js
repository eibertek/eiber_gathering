import Preloader from './preloader';
import Game from './game';
import SimplePlatformerControls from './plugins/SimplePlatformerControls.js';

export default {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableSleep: true,
            debug: true,
        }
    },
    plugins: {
        scene: [{ key: 'simplePlatformerControls', plugin: SimplePlatformerControls, mapping: 'controls' }],
    },
    input: {
        gamepad: true,
    },
    scene: [
        Preloader,
        Game,
    ]
};