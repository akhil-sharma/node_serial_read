long randomNumber;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
  randomSeed(1000);
}

void loop() {
  // repeatedly send some information to the serial port
  randomNumber = random(1, 26);
  Serial.println(randomNumber);
  delay(10000);
}
