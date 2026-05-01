let money = 200; 

function canAfford(cost) {
  return money >= cost;
}

function spendMoney(cost) {
  if (money >= cost) {
    money -= cost;
    return true;
  }
  return false;
}

function earnMoney(amount) {
  money += amount;
}