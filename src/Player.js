class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key, frame, facing) {
        super(scene, x, y, key, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setDepth(1);
        this.setSize(64, 64, true);
        this.setCollideWorldBounds(true);

        // tweak stuff
        this.speedMax = 120;
        this.speedChange = 10;        
        this.gatherObject = null;
        // not tweakable
        this.facing = facing || 'down';
        this.idle = false;
        this.moveSpeed = 0;
        this.ani = 'idle-left';
        this.alive = true;
        this.level = 1;
        this.experience = 0;
        this.gold = 0;
        let anims = this.anims.animationManager;
        this.controls = null;
        if (!anims.get('idle-left')) {
            anims.create({
                key: 'idle-left',
                frames: anims.generateFrameNumbers('player', { start: 143, end: 143 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!anims.get('idle-right')) {
            anims.create({
                key: 'idle-right',
                frames: anims.generateFrameNumbers('player', { start: 143, end: 143 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!anims.get('run-left')) {
            anims.create({
                key: 'run-left',
                frames: anims.generateFrameNumbers('player', { start: 143, end: 151 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!anims.get('run-right')) {
            anims.create({
                key: 'run-right',
                frames: anims.generateFrameNumbers('player', { start: 143, end: 151 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!anims.get('walk-down')) {
            anims.create({
                key: 'walk-down',
                frames: anims.generateFrameNumbers('player', { start: 130, end: 138 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!anims.get('walk-up')) {
            anims.create({
                key: 'walk-up',
                frames: anims.generateFrameNumbers('player', { start: 104, end: 112 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    gather(ore, scoreText) {
        if (this.controls.aDown) {
            this.ani = 'walk-down';
        }      
        const gold= ore && this.controls.aDown && ore.gather(this) || 0;
        if(gold > 0 ) {
            this.gold+=gold;            
            this.experience+= Math.random()*100;        
            if(this.experience > 1000) {
                this.level++;
                this.experience=0;
            }     
            scoreText.setText(`GOLD: ${this.gold} - Level: ${this.level}`);
        }else {
            this.gatherObject = null;
        }
    };

    update(controls, time, delta) {
        if (!this.alive) {
            return;
        }

        // in a later tutorial i will show you how you can climb and swim
        this.runAndJump(controls, time, delta);
        this.controls = controls;
        // don't forget to animate :)
        this.anims.play(this.ani, true);
    }

    runAndJump(controls, time, delta)
    {
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.body.allowGravity = false;
        if(controls.aDown) {
            return null;            
        }
        if (controls.left) {

            this.moveSpeed -= this.speedChange;
            this.moveSpeed = Math.max(this.moveSpeed, -this.speedMax);
            this.body.setVelocityX(this.moveSpeed);
            this.ani = 'run-left';
            this.flipX = true;
            this.facing = 'left';
            this.idle = false;

        } else if (controls.right) {

            this.moveSpeed += this.speedChange;
            this.moveSpeed = Math.min(this.moveSpeed, this.speedMax);
            this.body.setVelocityX(this.moveSpeed);
            this.ani = 'run-right';
            this.flipX = false;
            this.facing = 'right';
            this.idle = false;

        } else if (controls.down) {

            this.moveSpeed+= this.speedChange;
            this.moveSpeed = Math.min(this.moveSpeed, this.speedMax);
            this.body.setVelocityY(this.moveSpeed);
            this.ani = 'walk-down';

            this.facing = 'down';
            this.idle = false;
        } else if (controls.up) {

            this.moveSpeed-= this.speedChange;
            this.moveSpeed = Math.max(this.moveSpeed, -this.speedMax);
            this.body.setVelocityY(this.moveSpeed);
            this.ani = 'walk-up';
            this.facing = 'up';
            this.idle = false;
        } else {
            this.moveSpeed = 0;
            this.body.setVelocityX(this.moveSpeed);
            this.body.setVelocityY(this.moveSpeed);
            this.ani = 'idle-left';
            this.idle = true;
        }
    }

    disappear()
    {
        this.alive = false;
        this.visible = false;
        this.body.enable = false;
    }
}

export default Player;
