import Phaser from 'phaser';
import Player from './Player.js';
import GoldOre from './objectGold';

const gather = (player, star) => {
//    console.log('touched', player, star);
    player.gather(star);
}
    
export default class Game extends Phaser.Scene {
    constructor(config) {        
        super({...config, key:'game'});
        this.map = undefined;
        this.layer = undefined;
        this.layerTrees = undefined;
        this.gamepaused = undefined;
        this.scoreText = undefined;
        this.player = undefined;
        this.exits = undefined;
    }

    create ()
    {
        
        this.cameras.main.setRoundPixels(true);
        // start controls
        this.controls.start();
        this.exits = [];

        this.map = this.make.tilemap({ key: 'map' });
        var tileset = this.map.addTilesetImage('tiles');

        // create the player sprite    
        this.layer = this.map.createDynamicLayer('world', tileset, 0, 0);
        this.layerTrees = this.map.createDynamicLayer('trees', tileset, 0, 0);
        this.scoreText = this.add.text(16, 16, 'GOLD: 0', { fontSize: '22px', fill: '#FFF' });
   
        // set the boundaries of our game world
        this.physics.world.bounds.width = this.layer.width;
        this.physics.world.bounds.height = this.layer.height;

        this.addPlayer({x:200,y:200});
        
        this.layerTrees.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.layerTrees, this.player);
        const stars = this.physics.add.group({
            classType: GoldOre,
            key: 'gold',
            repeat: 5,
            setXY: { x: 12, y: 150, stepX: 130 }, 
            immovable: true,
            width:20,
            height:20,
        });
        // stars.children.entries.foreach( gold => {
        //     gold.setScale(0.4,0.4);
        // });
        stars.children.entries.forEach(gold => {
            gold.setDisplaySize(34,34);
        });
        this.physics.add.collider(stars, this.player, (player, star) => player.gather(star, this.scoreText));
        this.physics.add.collider(stars, this.layerTrees);        
     //   this.physics.add.overlap(this.player, stars, collect, null, this);
    }

    addPlayer({
        x = 64,
        y = 64
    } = {}) {
        this.player = new Player(this, x, y, 'player', 0, 'left');
        this.cameras.main.startFollow(this.player, true);
    }
       
    update(time, delta)
    {
        this.player.update(this.controls, time, delta);
    }

}