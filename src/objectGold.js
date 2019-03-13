class GoldOre extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setDepth(1);
        this.amount = 1000;
        this.setCollideWorldBounds(true);
        this.empty = false;
        // tweak stuff
    }

    getAmountAvailable() {
        return this.amount;
    }

    gather(player) {
        if(this.empty) return 0;
        const value = parseInt(Math.random(this.amount/2)*10, 10);
        console.log('asassasa', value);
        this.amount-= value;        
        if(this.amount<0) {
            this.empty = true;
            this.destroy();
        };
        return value;
    }
}

export default GoldOre;