describe(" The settingsBill Factory Function", function () {
  it("should be able to set the value of call cost", function () {
    let settingsBill = billWithSettings();
    settingsBill.setCallCost(1.5);
    assert.equal(1.5, settingsBill.getCallCost());
  });
  it("should be able to set the value of sms cost", function () {
    let settingsBill = billWithSettings();
    settingsBill.setSmsCost(0.5);
    settingsBill.setCallCost(2.5);
    assert.equal(0.5, settingsBill.getsmsCost());
    assert.equal(2.5, settingsBill.getCallCost());
  });

  it("should be able to set the value of sms cost and call cost", function () {
    let settingsBill = billWithSettings();
    settingsBill.setSmsCost(0.5);
    assert.equal(0.5, settingsBill.getsmsCost());
  });

  it("should be able to set the value of warningLevel", function () {
    let settingsBill = billWithSettings();
    settingsBill.setWarningLevel(30);
    assert.equal(30, settingsBill.getWarningLevel());
  });
  it("should be able to set the value of criticalLevel", function () {
    let settingsBill = billWithSettings();
    settingsBill.setCriticalLevel(30);
    assert.equal(30, settingsBill.getCriticalLevel());
  });
});

describe("Use the values", function () {
  it("should be able to use the value of call cost set for 2 calls at 1.50", function () {
    let settingsBill = billWithSettings();
    settingsBill.setCallCost(1.5);
    settingsBill.setSmsCost(0.85);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    assert.equal(3, settingsBill.getTotalCost());
    assert.equal(3, settingsBill.getTotalCallCost());
    assert.equal(0, settingsBill.getTotalSmsCost());
  });
  it("should be able to use the value of call cost set for 3 calls at 2.50", function () {
    let settingsBill = billWithSettings();
    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(1.5);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    assert.equal(7.5, settingsBill.getTotalCallCost());
    assert.equal(7.5, settingsBill.getTotalCost());
    assert.equal(0, settingsBill.getTotalSmsCost());
  });
  it("should be able to use the sms cost set for 2 sms's at 0.50", function () {
    let settingsBill = billWithSettings();

    settingsBill.setSmsCost(0.5);
    settingsBill.setCallCost(2.5);
    settingsBill.setCriticalLevel(10);

    settingsBill.sendSms();
    settingsBill.sendSms();
    assert.equal(1, settingsBill.getTotalSmsCost());
    assert.equal(1, settingsBill.getTotalCost());
    assert.equal(0, settingsBill.getTotalCallCost());
  });
  it("should be able to send 2 sms's at 1.50 each and make 2 calls at 2.50 each", function () {
    let settingsBill = billWithSettings();
    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(1.5);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.sendSms();
    settingsBill.sendSms();
    assert.equal(5, settingsBill.getTotalCallCost());
    assert.equal(8, settingsBill.getTotalCost());
    assert.equal(3, settingsBill.getTotalSmsCost());
  });
});
describe("use the warning and critical level", function () {
  it("should return 'warning' if the warning level is reached", function () {
    let settingsBill = billWithSettings();
    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(0.9);
    settingsBill.setWarningLevel(5);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("warning", settingsBill.totalClassName());
  });

  it("should return 'critical' if the critical level is reached", function () {
    let settingsBill = billWithSettings();
    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(1.5);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.sendSms();
    settingsBill.sendSms();

    assert.equal("critical", settingsBill.totalClassName());
  });
  it("should stop the totalCost from increasing when the critical level is reached", function () {
    let settingsBill = billWithSettings();

    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(1);
    settingsBill.setCriticalLevel(10);
    settingsBill.setWarningLevel(5);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("critical", settingsBill.totalClassName());
    assert.equal(10, settingsBill.getTotalCost());
  });
  it("should allow the totalCost to increase when the critical level has been updated", function () {
    let settingsBill = billWithSettings();

    settingsBill.setCallCost(2.5);
    settingsBill.setSmsCost(1);
    settingsBill.setCriticalLevel(10);
    settingsBill.setWarningLevel(5);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("critical", settingsBill.totalClassName());
    assert.equal(10, settingsBill.getTotalCost());

    settingsBill.setCriticalLevel(20);
    assert.equal("warning", settingsBill.totalClassName());
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal(17.5, settingsBill.getTotalCost());
  });
});
