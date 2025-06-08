import network
import time
import math
import random
from umqtt.simple import MQTTClient
import machine

# Dane sieci Wi-Fi
SSID = "FunBox2-806F" #nazwa wifi
PASSWORD = "DA5AC79C2D9559346C41DDFE1A" #hasło do wifi

MQTT_BROKER = "mqtt3.thingspeak.com"
MQTT_PORT = 1883  
MQTT_CLIENT_ID = "FDkcFBUtBiIfJzsIGykqIzI"
MQTT_USERNAME = "FDkcFBUtBiIfJzsIGykqIzI"
MQTT_PASSWORD = "58N0svt2DEQVj5urm5RSjkpD"

TOPIC = "channels/2894268/publish"  

# Inicjalizacja Wi-Fi
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(SSID, PASSWORD)
    
    print("Łączenie z Wi-Fi...")
    while not wlan.isconnected():
        time.sleep(1)
        print(".", end="")
    
    print("\nPołączono z Wi-Fi:", wlan.ifconfig())

# Połączenie z MQTT
def connect_mqtt():
    client = MQTTClient(MQTT_CLIENT_ID, MQTT_BROKER, MQTT_PORT, MQTT_USERNAME, MQTT_PASSWORD)
    client.connect()
    print("Połączono z ThingSpeak MQTT!")
    return client

import math

# Publikowanie danych do ThingSpeak
def publish_data(client, led, halogen, total):
    payload = "field1={}&field2={}&field3={}".format(led, halogen, total)
    client.publish(TOPIC, payload)
    print("Wysłano:", payload)

# Główna pętla programu
def main():
    connect_wifi()
    client = connect_mqtt()

    while True:
        led = napiecie1()
        halogen = napiecie2()
        total = natezenie()
        publish_data(client, led, halogen, total)
        
        time.sleep(100)  # ThingSpeak wymaga min. 15 sekund między aktualizacjami
        
        

try:
    main()
except Exception as e:
    print("Błąd:", e)

