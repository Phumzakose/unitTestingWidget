function billWithSettings() {
  var costOfCall = 0;
  var costOfSms = 0;
  var warningLevelValue = 0;
  var criticalLevelValue = 0;
  var totalCallCost = 0;
  var totalSmsCost = 0;
  //var totalCost = 0;

  function setCallCost(callCost) {
    costOfCall = callCost;
  }
  function getCallCost() {
    return costOfCall;
  }
  function setSmsCost(smsCost) {
    costOfSms = smsCost;
  }
  function getsmsCost() {
    return costOfSms;
  }
  function setWarningLevel(warningLevel) {
    warningLevelValue += warningLevel;
  }
  function getWarningLevel() {
    return warningLevelValue;
  }
  function setCriticalLevel(criticalLevel) {
    criticalLevelValue += criticalLevel;
  }
  function getCriticalLevel() {
    return criticalLevelValue;
  }
  function makeCall() {
    if (!hasReachedCriticalLevel()) {
      totalCallCost += costOfCall;
    }
  }
  function getTotalCallCost() {
    return totalCallCost;
  }
  function getTotalCost() {
    return totalCallCost + totalSmsCost;
  }
  function sendSms() {
    if (!hasReachedCriticalLevel()) {
      totalSmsCost += costOfSms;
    }
  }

  function getTotalSmsCost() {
    return totalSmsCost;
  }
  function hasReachedCriticalLevel() {
    return getTotalCost() >= getCriticalLevel();
  }

  function totalClassName() {
    if (hasReachedCriticalLevel()) {
      return "critical";
    }
    if (getTotalCost() >= getWarningLevel()) {
      return "warning";
    }
  }

  // function hasReachedCriticalLevel() {
  //   if (getTotalCost() < getCriticalLevel()) {
  //     return getTotalCallCost() + getTotalSmsCost();
  //   }
  // }

  return {
    setCallCost,
    setSmsCost,
    getCallCost,
    getsmsCost,
    setWarningLevel,
    getWarningLevel,
    setCriticalLevel,
    getCriticalLevel,
    makeCall,
    getTotalCallCost,
    getTotalCost,
    getTotalSmsCost,
    sendSms,
    totalClassName,
  };
}
