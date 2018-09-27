loadAPI(1)

// Defines and sets controller properties [company, device, version, uuid]
host.defineController('Samson', 'Conspiracy', '1.0', '40e37bd1-13ed-459a-a458-c05648fc2fa3');
host.defineMidiPorts(1,1);

var CC_RANGE_HI = 100;
var CC_RANGE_LO = 40;

function init() {
  userControls = host.createUserControlsSection(CC_RANGE_HI - CC_RANGE_LO + 1);
  transport = host.createTransport();
  for(var i = CC_RANGE_LO; i <= CC_RANGE_LO; i++) {
    userControls.getControl(i -CC_RANGE_LO).setLabel('CC' + i);
  }

  // Set Midi callbacks/port
  host.getMidiInPort(0).setMidiCallback(onMidiPort1);

  // Send notes to bitwig, with no input filters.
  noteIn = host.getMidiInPort(0).createNoteInput('Notes')
  noteIn.setShouldConsumeEvents(false);
}

function onMidiPort1(status, data1, data2) {
  // checks if the Midi data is a CC
  if (isChannelController(status)){
    // if it is, check if the CC is within our range
    if (data1 >= CC_RANGE_LO && data1 <= CC_RANGE_HI) {
      // if that's true, get the index of the CC in our userControls
      //  and set the value of the control to the value of our CC
      var index = data1 - CC_RANGE_LO;
      if (data1 == 51 && data2 > 0) {
        transport.play();
        }
      if (data1 == 46 && data2 > 0) {
        transport.stop();
      }
      if (data1 == 49 && data2 > 0) {
        transport.record();
      }
      userControls.getControl(index).set(data2, 128)
    }
  }
}

function exit() {
  println("exit.");
}
