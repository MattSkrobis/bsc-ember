var kot = function*() {
  yield 1;
  yield 2;
  yield 3;
};
let odpalKota = kot();
let wynik = odpalKota.next();
wynik
wynik = odpalKota.next();
wynik