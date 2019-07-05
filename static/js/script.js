flock.synth({
    synthDef: {
        ugen: "flock.ugen.playBuffer",
        buffer: {
            id: "drum",
            url: "audio/kick.wav"
        },
        loop: 1,
        trigger: {
            ugen: "flock.ugen.impulse",
            freq: 1/2
        }
    }
});
