import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
    constructor(config) {
        super({...config, key:'preloader'});
    }

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.load.tilemapTiledJSON('map', 'dist/assets/level0.json');  
        this.load.image('tiles', 'dist/assets/32x32_map_tile3.1.png'); 
        this.load.image('gold', 'dist/assets/gold.png'); 
        this.load.spritesheet('player', 'dist/assets/char1.png', { frameWidth: 64, frameHeight: 64 });

        self = this;
        var loadingText = self.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });    
        loadingText.setOrigin(0.5, 0.5);        
        this.load.on('progress', function (value) {
            progressBar.clear();
            const color = value < 0.5 ? 0xff0000 : 0x00ff00;
            progressBar.fillStyle(color, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });
                    
        this.load.on('fileprogress', function (file) {
            loadingText.text = 'loading '+ file.key;        
        });
        
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            
        });
    }

    create ()
    {
        console.log('all loaded');
        this.scene.start('game');        
    }    
}