
function Key(index, key_w, key_h) {
    this.index = index;
    this.width = key_w - 4;
    this.height = key_h;
    this.left_edge = index * key_w;
    this.type = NOTE_OFF;
    this.channel = 0;
    this.velocity = 0;
    this.colour_off = color(0, 0, 10);
    this.colour_on = _.range(16).map(i => color(Math.round((i + 7) % 16 * 360 / 16), 100, 100, 1));

    this.draw = function () {
        // Always draw the empty key first, assuming note is off
        fill(this.colour_off);
        rect(this.left_edge, height - this.height, this.width, this.height);
        // Draw coloured key based on velocity (will end up transparent for NOTE_OFF since velocity=0)
        this.colour_on[this.channel]._array[3] = this.velocity;
        // console.log(this.colour_on[this.channel]);
        fill(this.colour_on[this.channel]);
        rect(this.left_edge, height - this.height, this.width, this.height);
    }
}

var keys = [];
var NUM_KEYS = 128;

function setup () {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    frameRate(12);
    colorMode(HSB); // Max values: 360, 100, 100, 1
    textFont('monospace');

    midiInput = new MIDIInput();
    midiInput.onMIDIMessage = function (data) {
        msg = new MIDI_Message(data.data);

        // Key display
        keys[msg.note].type = msg.type;
        keys[msg.note].channel = msg.channel;
        keys[msg.note].velocity = Math.round(msg.velocity / 127 * 100) / 100;;

        // Grow the tree
        if (msg.type === msg.NOTE_ON) {
            
        } else if (msg.type === msg.NOTE_OFF) {

        }
    }

    // Key display
    var keys_width = width / NUM_KEYS;
    var keys_height = 50;
    for (var i = 0; i < NUM_KEYS; i++) {
        key = new Key(i, keys_width, keys_height)
        keys.push(key);
    }
}

function draw() {
    background(0);
    for (var i = 0; i < NUM_KEYS; i++) {
        keys[i].draw();
    }
    fill(255);
}
